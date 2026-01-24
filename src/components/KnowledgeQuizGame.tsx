"use client";

import { useState, useEffect, useCallback } from "react";
import { knowledgeQuizGameContent } from "@/lib/content";

interface KnowledgeQuizGameProps {
    isOpen: boolean;
    onClose: () => void;
}

export default function KnowledgeQuizGame({ isOpen, onClose }: KnowledgeQuizGameProps) {
    const [gameState, setGameState] = useState<"intro" | "playing" | "result">("intro");
    const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
    const [score, setScore] = useState(0);
    const [timeLeft, setTimeLeft] = useState(30);
    const [gameQuestions, setGameQuestions] = useState<any[]>([]);
    const [selectedOption, setSelectedOption] = useState<number | null>(null);
    const [isAnswered, setIsAnswered] = useState(false);
    const [streak, setStreak] = useState(0);

    // Initialize game
    const startGame = useCallback(() => {
        // Shuffle and pick 5 random questions
        const shuffled = [...knowledgeQuizGameContent.questions].sort(() => 0.5 - Math.random());
        setGameQuestions(shuffled.slice(0, 5));

        setGameState("playing");
        setCurrentQuestionIndex(0);
        setScore(0);
        setTimeLeft(30);
        setSelectedOption(null);
        setIsAnswered(false);
        setStreak(0);
    }, []);

    // Timer logic
    useEffect(() => {
        let timer: NodeJS.Timeout;
        if (gameState === "playing" && timeLeft > 0 && !isAnswered) {
            timer = setInterval(() => {
                setTimeLeft((prev) => prev - 1);
            }, 1000);
        } else if (timeLeft === 0 && !isAnswered) {
            handleTimeOut();
        }
        return () => clearInterval(timer);
    }, [gameState, timeLeft, isAnswered]);

    const handleTimeOut = () => {
        setIsAnswered(true);
        setSelectedOption(-1); // -1 indicates timeout
        setStreak(0);
    };

    const handleAnswer = (optionIndex: number) => {
        if (isAnswered) return;

        setSelectedOption(optionIndex);
        setIsAnswered(true);

        const currentQuestion = gameQuestions[currentQuestionIndex];
        if (optionIndex === currentQuestion.correctIndex) {
            setScore((prev) => prev + 10 + Math.ceil(timeLeft / 2)); // Dynamic scoring
            setStreak((prev) => prev + 1);
        } else {
            setStreak(0);
        }
    };

    const nextQuestion = () => {
        if (currentQuestionIndex < gameQuestions.length - 1) {
            setCurrentQuestionIndex((prev) => prev + 1);
            setTimeLeft(30);
            setSelectedOption(null);
            setIsAnswered(false);
        } else {
            setGameState("result");
        }
    };

    if (!isOpen) return null;

    const currentQuestion = gameQuestions[currentQuestionIndex];

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-fade-in-up">
            <div className="bg-white rounded-2xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
                {/* Header */}
                <div className="p-6 border-b border-gray-100 flex items-center justify-between">
                    <div className="flex items-center gap-3">
                        <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-blue-100 text-blue-600">
                            <span className="material-symbols-outlined text-2xl">
                                quiz
                            </span>
                        </div>
                        <div>
                            <h2 className="text-xl font-bold text-[#181111]">
                                {knowledgeQuizGameContent.title}
                            </h2>
                            <p className="text-sm text-[#896161]">
                                {gameState === "playing"
                                    ? `Câu hỏi ${currentQuestionIndex + 1}/${gameQuestions.length}`
                                    : knowledgeQuizGameContent.subtitle}
                            </p>
                        </div>
                    </div>
                    <button onClick={onClose} className="p-2 rounded-lg hover:bg-gray-100 transition-colors">
                        <span className="material-symbols-outlined text-[#896161]">close</span>
                    </button>
                </div>

                {/* Content */}
                <div className="p-6">
                    {gameState === "intro" && (
                        <div className="text-center py-8">
                            <div className="w-24 h-24 mx-auto bg-blue-50 rounded-full flex items-center justify-center mb-6">
                                <span className="material-symbols-outlined text-5xl text-blue-500">
                                    school
                                </span>
                            </div>
                            <h3 className="text-2xl font-bold text-[#181111] mb-2">Sẵn sàng thử thách?</h3>
                            <p className="text-[#896161] mb-8 max-w-md mx-auto">
                                Bạn sẽ có 5 câu hỏi ngẫu nhiên. Mỗi câu có 30 giây để trả lời. Trả lời càng nhanh điểm càng cao!
                            </p>
                            <button
                                onClick={startGame}
                                className="px-8 py-4 rounded-xl bg-blue-600 text-white font-bold hover:bg-blue-700 transition-all hover:scale-105 shadow-lg shadow-blue-600/20"
                            >
                                Bắt đầu ngay
                            </button>
                        </div>
                    )}

                    {gameState === "playing" && currentQuestion && (
                        <div className="animate-fade-in-up">
                            {/* Score & Timer Header */}
                            <div className="flex justify-between items-center mb-6">
                                <div className="flex items-center gap-2 px-4 py-2 bg-yellow-50 rounded-lg text-yellow-700 font-bold border border-yellow-200">
                                    <span className="material-symbols-outlined">emoji_events</span>
                                    <span>{score} điểm</span>
                                </div>
                                <div className="flex items-center gap-1">
                                    <span className="material-symbols-outlined text-[#ee2b2b]">timer</span>
                                    <span className={`text-xl font-bold font-mono ${timeLeft <= 5 ? 'text-[#ee2b2b] animate-pulse' : 'text-[#896161]'}`}>
                                        {timeLeft}s
                                    </span>
                                </div>
                            </div>

                            {/* Question Card */}
                            <div className="mb-6">
                                <h3 className="text-xl font-bold text-[#181111] leading-relaxed mb-6">
                                    {currentQuestion.question}
                                </h3>
                                <div className="space-y-3">
                                    {currentQuestion.options.map((option: string, index: number) => {
                                        let optionClass = "border-2 border-gray-100 bg-white hover:border-blue-200 hover:bg-blue-50";
                                        let icon = <span className="w-6 h-6 flex items-center justify-center rounded-full bg-gray-100 text-xs font-bold text-gray-500">{String.fromCharCode(65 + index)}</span>;

                                        if (isAnswered) {
                                            if (index === currentQuestion.correctIndex) {
                                                optionClass = "border-2 border-green-500 bg-green-50";
                                                icon = <span className="material-symbols-outlined text-green-600">check_circle</span>;
                                            } else if (index === selectedOption) {
                                                optionClass = "border-2 border-red-500 bg-red-50";
                                                icon = <span className="material-symbols-outlined text-red-600">cancel</span>;
                                            } else {
                                                optionClass = "border-gray-100 bg-gray-50 opacity-50";
                                            }
                                        } else if (selectedOption === index) {
                                            optionClass = "border-blue-500 bg-blue-50";
                                        }

                                        return (
                                            <button
                                                key={index}
                                                onClick={() => handleAnswer(index)}
                                                disabled={isAnswered}
                                                className={`w-full p-4 rounded-xl text-left transition-all duration-200 flex items-center gap-3 ${optionClass}`}
                                            >
                                                {icon}
                                                <span className="font-medium text-[#181111]">{option}</span>
                                            </button>
                                        );
                                    })}
                                </div>
                            </div>

                            {/* Explanation & Next Button */}
                            {isAnswered && (
                                <div className="animate-fade-in-up">
                                    <div className={`p-4 rounded-xl mb-4 ${selectedOption === currentQuestion.correctIndex
                                            ? "bg-green-50 border border-green-200 text-green-900"
                                            : "bg-red-50 border border-red-200 text-red-900"
                                        }`}>
                                        <div className="flex items-center gap-2 mb-1 font-bold">
                                            <span className="material-symbols-outlined">
                                                {selectedOption === currentQuestion.correctIndex ? "sentiment_very_satisfied" : "lightbulb"}
                                            </span>
                                            {selectedOption === currentQuestion.correctIndex ? "Chính xác!" : "Giải thích:"}
                                        </div>
                                        <p className="text-sm">{currentQuestion.explanation}</p>
                                    </div>
                                    <button
                                        onClick={nextQuestion}
                                        className="w-full py-3 rounded-xl bg-blue-600 text-white font-bold hover:bg-blue-700 transition-colors flex items-center justify-center gap-2"
                                    >
                                        {currentQuestionIndex < gameQuestions.length - 1 ? "Câu tiếp theo" : "Xem kết quả"}
                                        <span className="material-symbols-outlined">arrow_forward</span>
                                    </button>
                                </div>
                            )}
                        </div>
                    )}

                    {gameState === "result" && (
                        <div className="text-center py-8 animate-fade-in-up">
                            <span className="text-6xl mb-4 block">🏆</span>
                            <h3 className="text-3xl font-bold text-[#181111] mb-2">Hoàn thành!</h3>
                            <p className="text-[#896161] mb-6">Bạn đã hoàn thành phần thi trắc nghiệm.</p>

                            <div className="bg-gradient-to-br from-blue-500 to-indigo-600 rounded-2xl p-6 text-white mb-8 shadow-xl">
                                <div className="text-sm opacity-90 mb-1">Tổng điểm của bạn</div>
                                <div className="text-5xl font-bold mb-2">{score}</div>
                                <div className="inline-block px-3 py-1 rounded-full bg-white/20 text-xs font-bold">
                                    {score > 200 ? "Xuất sắc!" : score > 100 ? "Làm tốt lắm!" : "Cố gắng hơn nhé!"}
                                </div>
                            </div>

                            <div className="flex gap-3 justify-center">
                                <button
                                    onClick={startGame}
                                    className="flex items-center gap-2 px-6 py-3 rounded-xl bg-gray-100 text-[#181111] font-bold hover:bg-gray-200 transition-colors"
                                >
                                    <span className="material-symbols-outlined">replay</span>
                                    Chơi lại
                                </button>
                                <button
                                    onClick={onClose}
                                    className="flex items-center gap-2 px-6 py-3 rounded-xl bg-blue-600 text-white font-bold hover:bg-blue-700 transition-colors"
                                >
                                    <span className="material-symbols-outlined">check</span>
                                    Hoàn thành
                                </button>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}
