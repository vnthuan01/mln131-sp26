"use client";

import { useState } from "react";

interface QuizCardProps {
    question: string;
    options: string[];
    correctIndex: number;
    explanation: string;
}

export default function QuizCard({
    question,
    options,
    correctIndex,
    explanation,
}: QuizCardProps) {
    const [selectedIndex, setSelectedIndex] = useState<number | null>(null);
    const [showResult, setShowResult] = useState(false);

    const handleSelect = (index: number) => {
        if (showResult) return;
        setSelectedIndex(index);
    };

    const handleCheck = () => {
        if (selectedIndex === null) return;
        setShowResult(true);
    };

    const handleReset = () => {
        setSelectedIndex(null);
        setShowResult(false);
    };

    const isCorrect = selectedIndex === correctIndex;

    return (
        <div className="bg-white rounded-xl p-6 shadow-soft border border-gray-100">
            {/* Quiz Header */}
            <div className="flex items-center gap-3 mb-4">
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-[#ee2b2b]/10 text-[#ee2b2b]">
                    <span className="material-symbols-outlined">quiz</span>
                </div>
                <h3 className="text-lg font-bold text-[#181111]">Câu hỏi trắc nghiệm</h3>
            </div>

            {/* Question */}
            <p className="text-[#181111] font-medium mb-6">{question}</p>

            {/* Options */}
            <div className="space-y-3 mb-6">
                {options.map((option, index) => {
                    let optionClass = "border-gray-200 bg-gray-50 hover:border-[#ee2b2b] hover:bg-[#ee2b2b]/5";

                    if (showResult) {
                        if (index === correctIndex) {
                            optionClass = "border-green-500 bg-green-50";
                        } else if (index === selectedIndex && !isCorrect) {
                            optionClass = "border-red-500 bg-red-50";
                        } else {
                            optionClass = "border-gray-200 bg-gray-50 opacity-60";
                        }
                    } else if (index === selectedIndex) {
                        optionClass = "border-[#ee2b2b] bg-[#ee2b2b]/5";
                    }

                    return (
                        <button
                            key={index}
                            onClick={() => handleSelect(index)}
                            disabled={showResult}
                            className={`w-full p-4 rounded-lg border-2 text-left transition-all flex items-center gap-3 ${optionClass}`}
                        >
                            <span
                                className={`flex h-6 w-6 items-center justify-center rounded-full text-xs font-bold ${showResult && index === correctIndex
                                        ? "bg-green-500 text-white"
                                        : showResult && index === selectedIndex && !isCorrect
                                            ? "bg-red-500 text-white"
                                            : index === selectedIndex
                                                ? "bg-[#ee2b2b] text-white"
                                                : "bg-gray-200 text-gray-600"
                                    }`}
                            >
                                {String.fromCharCode(65 + index)}
                            </span>
                            <span className="text-[#181111]">{option}</span>
                            {showResult && index === correctIndex && (
                                <span className="material-symbols-outlined text-green-500 ml-auto">
                                    check_circle
                                </span>
                            )}
                            {showResult && index === selectedIndex && !isCorrect && (
                                <span className="material-symbols-outlined text-red-500 ml-auto">
                                    cancel
                                </span>
                            )}
                        </button>
                    );
                })}
            </div>

            {/* Result & Explanation */}
            {showResult && (
                <div
                    className={`p-4 rounded-lg mb-4 ${isCorrect ? "bg-green-50 border border-green-200" : "bg-amber-50 border border-amber-200"
                        }`}
                >
                    <div className="flex items-center gap-2 mb-2">
                        <span
                            className={`material-symbols-outlined ${isCorrect ? "text-green-600" : "text-amber-600"
                                }`}
                        >
                            {isCorrect ? "celebration" : "lightbulb"}
                        </span>
                        <span
                            className={`font-bold ${isCorrect ? "text-green-700" : "text-amber-700"
                                }`}
                        >
                            {isCorrect ? "Chính xác! 🎉" : "Hãy xem lại nhé!"}
                        </span>
                    </div>
                    <p className="text-sm text-gray-700">{explanation}</p>
                </div>
            )}

            {/* Actions */}
            <div className="flex gap-3">
                {!showResult ? (
                    <button
                        onClick={handleCheck}
                        disabled={selectedIndex === null}
                        className={`flex-1 py-3 rounded-lg font-bold transition-all ${selectedIndex !== null
                                ? "bg-[#ee2b2b] text-white hover:bg-red-700"
                                : "bg-gray-200 text-gray-400 cursor-not-allowed"
                            }`}
                    >
                        Kiểm tra
                    </button>
                ) : (
                    <button
                        onClick={handleReset}
                        className="flex-1 py-3 rounded-lg font-bold bg-gray-100 text-[#181111] hover:bg-gray-200 transition-all"
                    >
                        Làm lại
                    </button>
                )}
            </div>
        </div>
    );
}
