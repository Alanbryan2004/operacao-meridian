import React from "react";

/**
 * Componente de Modal padronizado conforme solicitação do usuário.
 * Utiliza classes do Tailwind conforme o exemplo fornecido.
 */
export default function ModalMsg({
    message,
    onClose,
    type = "SUCCESS",
    confirmText = "OK",
    isConfirm = false,
    onConfirm
}) {
    const isSuccess = type === "SUCCESS";

    return (
        <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-[9999]">
            <div className="bg-white p-6 shadow-lg rounded border text-center w-[300px] animate-in fade-in zoom-in duration-200">
                <p className={`${isSuccess ? "text-green-700" : "text-red-700"} font-bold mb-4 whitespace-pre-wrap`}>
                    {message}
                </p>
                <div className="flex justify-center gap-3">
                    {isConfirm && (
                        <button
                            className="px-3 py-1 bg-gray-500 text-white rounded hover:bg-gray-600 transition-colors"
                            onClick={onClose}
                        >
                            CANCELAR
                        </button>
                    )}
                    <button
                        className={`px-3 py-1 ${isSuccess ? "bg-green-700" : "bg-red-700"} text-white rounded hover:opacity-90 transition-opacity`}
                        onClick={() => {
                            if (isConfirm && onConfirm) {
                                onConfirm();
                            } else {
                                onClose();
                            }
                        }}
                    >
                        {confirmText}
                    </button>
                </div>
            </div>
        </div>
    );
}
