import { render, screen, waitFor, fireEvent, act } from '@testing-library/react';
import { vi, describe, it, expect, beforeEach } from 'vitest';
import Caso from '../pages/Caso';
import { useGame } from '../game/GameProvider';
import { MemoryRouter, Route, Routes } from 'react-router-dom';
import React from 'react';

// Mock do GameProvider
vi.mock('../game/GameProvider', () => ({
  useGame: vi.fn(),
  useGameDispatch: vi.fn(() => vi.fn())
}));

// Mock de componentes
vi.mock('../components/DialogBox', () => ({
  default: ({ text, onComplete }) => (
    <div data-testid="dialog-box">
      <p>{text}</p>
      <button onClick={onComplete}>ENTENDIDO ✓</button>
    </div>
  )
}));

vi.mock('../components/ModalMsg', () => ({
  default: ({ message, onConfirm, onClose }) => (
    <div data-testid="modal-msg">
      <p>{message}</p>
      <button onClick={onConfirm}>Confirmar</button>
      <button onClick={onClose}>Fechar</button>
    </div>
  )
}));

vi.mock('../components/SuspectGallery', () => ({
  default: () => <div data-testid="suspect-gallery">Suspect Gallery</div>
}));

vi.mock('../pages/Analisar', () => ({
  default: ({ onBack }) => <div data-testid="analisar"><button onClick={onBack}>Voltar</button></div>
}));

// Hoisted Mocks
const { mockChannel, mockSupabase, getCapturedCallback } = vi.hoisted(() => {
  let cb = null;
  const channel = {
    on: vi.fn((event, config, callback) => {
      if (event === 'broadcast') cb = callback;
      return channel;
    }),
    subscribe: vi.fn().mockReturnThis(),
    send: vi.fn().mockResolvedValue({}),
    unsubscribe: vi.fn()
  };

  const queryBuilder = {
    select: vi.fn().mockReturnThis(),
    update: vi.fn().mockReturnThis(),
    eq: vi.fn().mockReturnThis(),
    single: vi.fn().mockResolvedValue({ data: { status: 'active' }, error: null }),
    then: vi.fn().mockImplementation((resolver) => {
      if (resolver) resolver({ data: [{ status: 'active' }], error: null });
      return Promise.resolve({ data: [{ status: 'active' }], error: null });
    })
  };

  const supabase = {
    channel: vi.fn(() => channel),
    removeChannel: vi.fn(),
    from: vi.fn(() => queryBuilder)
  };

  return { mockChannel: channel, mockSupabase: supabase, getCapturedCallback: () => cb };
});

vi.mock('../lib/supabase', () => ({
  supabase: mockSupabase
}));

const mockNavigate = vi.fn();
vi.mock('react-router-dom', async () => {
    const actual = await vi.importActual('react-router-dom');
    return {
        ...actual,
        useNavigate: () => mockNavigate,
        useParams: () => ({ caseId: 'C009' }),
        useSearchParams: () => [new URLSearchParams('mode=competitive&lobbyId=123&scenario=C009_S5')]
    };
});

vi.mock('../game/DestRoutes', () => ({
    DESTINATION_OPTIONS: [
        { id: 'R1', origem: 'Roma', cidade: 'Viena', coords: { x: 200, y: 50 }, flag: '🇦🇹', pais: 'Áustria' }
    ]
}));

window.scrollTo = vi.fn();

describe('Caso Competitive Sync', () => {
  let mockState;
  const mockReplaceState = vi.fn();

  beforeEach(() => {
    vi.clearAllMocks();
    mockState = {
      player: { supabaseId: 'p1', nome: 'Agente 1', dinheiro: 1000, xp: 0 },
      cases: [{ id: 'C009', titulo: 'Protocolo Fantasma', recompensa: 5000, xp: 1000, localFinal: { cidade: 'Zurich' }, localInicial: { pais: 'Alemanha', cidade: 'Berlim' } }],
      runs: {
        C009: {
          status: 'IN_PROGRESS',
          scenarioId: 'C009_S5',
          targetSuspectId: '015',
          localAtual: { cidade: 'Roma', pais: 'Itália' },
          pistasDescobertas: [],
          jornal: [],
          tempoRestanteHoras: 999,
          mandadoEmitido: true,
          warrantId: '015',
          isCompetitive: true,
          lobbyId: '123'
        }
      }
    };
    useGame.mockReturnValue({ state: mockState, replaceState: mockReplaceState });
  });

  it('deve renderizar o componente e iniciar a missão', async () => {
    render(
      <MemoryRouter initialEntries={['/caso/C009']}>
        <Routes><Route path="/caso/:caseId" element={<Caso />} /></Routes>
      </MemoryRouter>
    );

    expect(screen.getAllByText(/Protocolo Fantasma/i).length).toBeGreaterThan(0);
  });

  it('deve encerrar a missão e INCREMENTAR DERROTAS quando recebe broadcast de vitória externo', async () => {
    // Configura como difícil para testar hardLosses
    mockState.cases[0].dificuldade = "DIFICIL";
    mockState.player.hardLosses = 2;

    render(
      <MemoryRouter initialEntries={['/caso/C009']}>
        <Routes><Route path="/caso/:caseId" element={<Caso />} /></Routes>
      </MemoryRouter>
    );

    const cb = getCapturedCallback();
    await waitFor(() => expect(cb).not.toBeNull());
    
    await act(async () => {
      cb({ payload: { winnerId: 'p2', winnerName: 'Agente 2' } });
    });

    // Verificamos se replaceState foi chamado com hardLosses = 3 em algum momento
    await waitFor(() => {
        expect(mockReplaceState).toHaveBeenCalled();
        const found = mockReplaceState.mock.calls.some(call => call[0].player?.hardLosses === 3);
        expect(found).toBe(true);
        expect(mockNavigate).toHaveBeenCalled();
    });
  });

  it('deve enviar broadcast ao capturar corretamente no NPC final', async () => {
    mockState.runs.C009.localAtual = { cidade: 'Zurich', pais: 'Suíça' };
    mockState.runs.C009.investigationCountByCity = { 'Zurich': 2 };
    mockState.runs.C009.pistasDescobertas = [1, 2, 3]; // Necessário para hasMissionProgressed

    render(
      <MemoryRouter initialEntries={['/caso/C009']}>
        <Routes><Route path="/caso/:caseId" element={<Caso />} /></Routes>
      </MemoryRouter>
    );

    fireEvent.click(screen.getByText(/ENTENDIDO ✓/i));
    fireEvent.click(await screen.findByText(/INVESTIGAR/i));

    const npcBtn = screen.getAllByText(/Ir para/i)[0];
    fireEvent.click(npcBtn);

    await waitFor(() => {
        expect(mockChannel.send).toHaveBeenCalledWith(expect.objectContaining({ event: 'mission_finished' }));
    });
  });

  it('NÃO deve enviar broadcast se o mandado for ERRADO', async () => {
    mockState.runs.C009.warrantId = '999';

    render(
      <MemoryRouter initialEntries={['/caso/C009']}>
        <Routes><Route path="/caso/:caseId" element={<Caso />} /></Routes>
      </MemoryRouter>
    );

    fireEvent.click(screen.getByText(/ENTENDIDO ✓/i));
    fireEvent.click(await screen.findByText(/INVESTIGAR/i));
    fireEvent.click(screen.getAllByText(/Ir para/i)[0]);

    await waitFor(() => {
        expect(mockReplaceState).toHaveBeenCalled();
        expect(mockChannel.send).not.toHaveBeenCalledWith(expect.objectContaining({ event: 'mission_finished' }));
    });
  });
});
