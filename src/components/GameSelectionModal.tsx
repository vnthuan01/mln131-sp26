"use client";

import { useEffect, useState } from "react";

interface GameSelectionModalProps {
    isOpen: boolean;
    onClose: () => void;
    onSelectPuzzle: () => void;
    onSelectQuiz: () => void;
    onSelectMatch: () => void;
}

export default function GameSelectionModal({
    isOpen,
    onClose,
    onSelectPuzzle,
    onSelectQuiz,
    onSelectMatch
}: GameSelectionModalProps) {
    const [isVisible, setIsVisible] = useState(false);

    useEffect(() => {
        if (isOpen) {
            setIsVisible(true);
        } else {
            const timer = setTimeout(() => setIsVisible(false), 300);
            return () => clearTimeout(timer);
        }
    }, [isOpen]);

    if (!isVisible) return null;

    return (
        <div
            className={`fixed inset-0 z-50 flex items-center justify-center p-4 transition-opacity duration-300 ${isOpen ? "opacity-100" : "opacity-0"}`}
        >
            <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" onClick={onClose}></div>

            <div
                className={`relative w-full max-w-5xl max-h-[90vh] overflow-y-auto bg-white rounded-2xl shadow-2xl p-6 md:p-8 transform transition-all duration-300 ${isOpen ? "scale-100 translate-y-0" : "scale-95 translate-y-4"}`}
            >
                <div className="text-center mb-8">
                    <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#ee2b2b]/10 text-[#ee2b2b] text-xs font-bold uppercase tracking-wider mb-4">
                        <span className="material-symbols-outlined text-[16px]">
                            stadia_controller
                        </span>
                        Chọn trò chơi
                    </div>
                    <h2 className="text-2xl md:text-3xl font-bold text-[#181111] mb-2">
                        Kho Tàng Trò Chơi
                    </h2>
                    <p className="text-[#896161]">
                        Chọn một trò chơi để bắt đầu hành trình khám phá kiến thức
                    </p>
                </div>

                <div className="grid md:grid-cols-3 gap-4">
                    {/* Puzzle Game */}
                    <button
                        onClick={() => { onClose(); onSelectPuzzle(); }}
                        className="group flex flex-col items-center p-6 rounded-xl border-2 border-[#ee2b2b]/10 bg-gradient-to-br from-[#ee2b2b]/5 to-amber-500/5 hover:border-[#ee2b2b] hover:shadow-lg transition-all text-center"
                    >
                        <div className="w-16 h-16 rounded-full bg-[#ee2b2b]/10 flex items-center justify-center mb-4 text-[#ee2b2b] group-hover:bg-[#ee2b2b] group-hover:text-white transition-colors duration-300">
                            <span className="material-symbols-outlined text-3xl">extension</span>
                        </div>
                        <h3 className="text-lg font-bold text-[#181111] mb-1">Ghép Hình</h3>
                        <p className="text-xs text-[#896161] mb-3">Khám phá văn hóa qua hình ảnh</p>
                        <span className="mt-auto text-sm font-bold text-[#ee2b2b] group-hover:underline">Chơi ngay</span>
                    </button>

                    {/* Quiz Game */}
                    <button
                        onClick={() => { onClose(); onSelectQuiz(); }}
                        className="group flex flex-col items-center p-6 rounded-xl border-2 border-blue-500/10 bg-gradient-to-br from-blue-500/5 to-indigo-500/5 hover:border-blue-500 hover:shadow-lg transition-all text-center"
                    >
                        <div className="w-16 h-16 rounded-full bg-blue-500/10 flex items-center justify-center mb-4 text-blue-600 group-hover:bg-blue-600 group-hover:text-white transition-colors duration-300">
                            <span className="material-symbols-outlined text-3xl">quiz</span>
                        </div>
                        <h3 className="text-lg font-bold text-[#181111] mb-1">Trắc Nghiệm</h3>
                        <p className="text-xs text-[#896161] mb-3">Thử thách kiến thức nhanh</p>
                        <span className="mt-auto text-sm font-bold text-blue-600 group-hover:underline">Chơi ngay</span>
                    </button>

                    {/* Match Game */}
                    <button
                        onClick={() => { onClose(); onSelectMatch(); }}
                        className="group flex flex-col items-center p-6 rounded-xl border-2 border-purple-500/10 bg-gradient-to-br from-purple-500/5 to-pink-500/5 hover:border-purple-500 hover:shadow-lg transition-all text-center"
                    >
                        <div className="w-16 h-16 rounded-full bg-purple-500/10 flex items-center justify-center mb-4 text-purple-600 group-hover:bg-purple-600 group-hover:text-white transition-colors duration-300">
                            <span className="material-symbols-outlined text-3xl">match_word</span>
                        </div>
                        <h3 className="text-lg font-bold text-[#181111] mb-1">Ghép Khái Niệm</h3>
                        <p className="text-xs text-[#896161] mb-3">Nối từ và định nghĩa</p>
                        <span className="mt-auto text-sm font-bold text-purple-600 group-hover:underline">Chơi ngay</span>
                    </button>
                </div>

                <div className="mt-8 text-center">
                    <button
                        onClick={onClose}
                        className="px-6 py-2 rounded-lg text-gray-500 hover:bg-gray-100 transition-colors font-medium"
                    >
                        Đóng
                    </button>
                </div>
            </div>
        </div>
    );
}
