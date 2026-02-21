import { NavLink } from "react-router-dom";

function Tab({ to, label }) {
    return (
        <NavLink
            to={to}
            className={({ isActive }) =>
                [
                    "flex-1 py-2 text-center text-[12px] rounded-xl",
                    isActive ? "bg-black text-white" : "text-gray-700",
                ].join(" ")
            }
        >
            {label}
        </NavLink>
    );
}

export default function AppShell({
    title,
    subtitle,
    rightTop,
    children,
    bottomTabs,
}) {
    return (
        <div className="min-h-screen bg-gray-100">
            {/* Topbar */}
            <div className="sticky top-0 z-20 bg-gradient-to-r from-black to-gray-900 text-white">
                <div className="px-4 pt-3 pb-3">
                    <div className="flex items-start justify-between gap-3">
                        <div>
                            <div className="text-[11px] opacity-80">A.T.L.A.S.</div>
                            <div className="text-[16px] font-semibold leading-tight">{title}</div>
                            {subtitle ? (
                                <div className="text-[12px] opacity-80 mt-0.5">{subtitle}</div>
                            ) : null}
                        </div>
                        {rightTop ? <div className="text-right">{rightTop}</div> : null}
                    </div>
                </div>
            </div>

            {/* Conteúdo */}
            <div className="px-3 py-3 pb-24">{children}</div>

            {/* Bottom bar */}
            {bottomTabs ? (
                <div className="fixed bottom-0 left-0 right-0 z-30">
                    <div className="mx-auto max-w-md px-3 pb-3">
                        <div className="bg-white shadow-lg rounded-2xl p-2 border">
                            <div className="flex gap-2">{bottomTabs}</div>
                        </div>
                    </div>
                </div>
            ) : null}
        </div>
    );
}

export function BottomTabsMural() {
    return (
        <>
            <Tab to="/mural" label="Mural" />
            <Tab to="/login" label="Perfil" />
        </>
    );
}

export function BottomTabsCaso({ caseId }) {
    return (
        <>
            <Tab to="/mural" label="Mural" />
            <Tab to={`/caso/${caseId}`} label="Caso" />
            <a
                href="#jornal"
                className="flex-1 py-2 text-center text-[12px] rounded-xl text-gray-700"
            >
                Jornal
            </a>
        </>
    );
}