"use client";

import { useState, useEffect } from "react";
import { flashcardsContent } from "@/lib/content";

interface FlashcardGameProps {
    isOpen: boolean;
    onClose: () => void;
}

type Mode = "study" | "quiz";

export default function FlashcardGame({ isOpen, onClose }: FlashcardGameProps) {
    const [currentCardIndex, setCurrentCardIndex] = useState(0);
    const [isFlipped, setIsFlipped] = useState(false);
    const [mode, setMode] = useState<Mode>("study");
    const [quizOptions, setQuizOptions] = useState<string[]>([]);
    const [quizAnswer, setQuizAnswer] = useState<string | null>(null);
    const [score, setScore] = useState(0);
    const [showQuizResult, setShowQuizResult] = useState(false);

    // Touch handling state
    const [touchStart, setTouchStart] = useState<number | null>(null);
    const [touchEnd, setTouchEnd] = useState<number | null>(null);

    // Assuming we use the first deck for now
    const deck = flashcardsContent.decks[0];
    const cards = deck.cards;

    // Minimum swipe distance (in px)
    const minSwipeDistance = 50;

    const handleFlip = () => {
        setIsFlipped(!isFlipped);
    };

    const handleNext = () => {
        setIsFlipped(false);
        setTimeout(() => {
            setCurrentCardIndex((prev) => (prev + 1) % cards.length);
            setQuizAnswer(null);
            setShowQuizResult(false);
        }, 300);
    };

    const handlePrev = () => {
        setIsFlipped(false);
        setTimeout(() => {
            setCurrentCardIndex((prev) => (prev - 1 + cards.length) % cards.length);
            setQuizAnswer(null);
            setShowQuizResult(false);
        }, 300);
    };

    // Keyboard Navigation
    useEffect(() => {
        if (!isOpen) return;

        const handleKeyDown = (e: KeyboardEvent) => {
            if (e.key === "ArrowRight") {
                handleNext();
            } else if (e.key === "ArrowLeft") {
                handlePrev();
            } else if (e.key === " " || e.key === "Spacebar") {
                // Space to flip (only in study mode)
                if (mode === "study") {
                    e.preventDefault(); // Prevent scrolling
                    handleFlip();
                }
            } else if (e.key === "Escape") {
                onClose();
            }
        };

        window.addEventListener("keydown", handleKeyDown);
        return () => window.removeEventListener("keydown", handleKeyDown);
    }, [isOpen, mode, cards.length, onClose]); // Dependencies for keyboard listener

    // Touch Event Handlers
    const onTouchStart = (e: React.TouchEvent) => {
        setTouchEnd(null); // Reset
        setTouchStart(e.targetTouches[0].clientX);
    };

    const onTouchMove = (e: React.TouchEvent) => {
        setTouchEnd(e.targetTouches[0].clientX);
    };

    const onTouchEnd = () => {
        if (!touchStart || !touchEnd) return;

        const distance = touchStart - touchEnd;
        const isLeftSwipe = distance > minSwipeDistance;
        const isRightSwipe = distance < -minSwipeDistance;

        if (isLeftSwipe) {
            handleNext();
        } else if (isRightSwipe) {
            handlePrev();
        }
    };

    // Generate quiz options
    useEffect(() => {
        if (mode === "quiz") {
            const currentCard = cards[currentCardIndex];
            const otherCards = cards.filter(c => c.id !== currentCard.id);
            const randomDistractors = otherCards
                .sort(() => 0.5 - Math.random())
                .slice(0, 3)
                .map(c => c.definition);

            const options = [...randomDistractors, currentCard.definition]
                .sort(() => 0.5 - Math.random());

            setQuizOptions(options);
            setQuizAnswer(null);
            setShowQuizResult(false);
        }
    }, [currentCardIndex, mode, cards]);

    const handleQuizOptionSelect = (selectedOption: string) => {
        if (showQuizResult) return;

        setQuizAnswer(selectedOption);
        setShowQuizResult(true);

        if (selectedOption === cards[currentCardIndex].definition) {
            setScore(prev => prev + 1);
        }
    };

    // Reset when opening
    useEffect(() => {
        if (isOpen) {
            setCurrentCardIndex(0);
            setIsFlipped(false);
            setMode("study");
            setScore(0);
        }
    }, [isOpen]);

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-fade-in-up">
            <div
                className="bg-white rounded-2xl shadow-2xl w-full max-w-5xl h-[85vh] md:h-auto md:max-h-[90vh] flex flex-col transition-all duration-300 relative"
                onTouchStart={onTouchStart}
                onTouchMove={onTouchMove}
                onTouchEnd={onTouchEnd}
            >
                {/* Header */}
                <div className="p-5 md:p-6 border-b border-gray-100 flex items-center justify-between shrink-0">
                    <div className="flex items-center gap-3 pr-10">
                        <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-orange-500/10 text-orange-600 shrink-0">
                            <span className="material-symbols-outlined text-2xl">
                                style
                            </span>
                        </div>
                        <div>
                            <h2 className="text-xl font-bold text-[#181111] line-clamp-1">
                                {flashcardsContent.title}
                            </h2>
                            <p className="text-xs md:text-sm text-[#896161] line-clamp-1">
                                {flashcardsContent.subtitle}
                            </p>
                        </div>
                    </div>
                    <button
                        onClick={onClose}
                        className="absolute right-4 top-4 md:right-6 md:top-6 p-2 rounded-lg hover:bg-gray-100 transition-colors z-10"
                    >
                        <span className="material-symbols-outlined text-[#896161] text-2xl">
                            close
                        </span>
                    </button>
                </div>

                {/* Mode Switcher */}
                <div className="px-6 py-3 flex justify-center border-b border-gray-50 shrink-0 bg-white">
                    <div className="flex bg-gray-100 p-1 rounded-lg">
                        <button
                            onClick={() => setMode("study")}
                            className={`px-4 md:px-6 py-2 rounded-md text-sm font-bold transition-all ${mode === "study"
                                ? "bg-white text-orange-600 shadow-sm"
                                : "text-gray-500 hover:text-gray-700"
                                }`}
                        >
                            <span className="flex items-center gap-2">
                                <span className="material-symbols-outlined text-lg">school</span>
                                Học tập
                            </span>
                        </button>
                        <button
                            onClick={() => setMode("quiz")}
                            className={`px-4 md:px-6 py-2 rounded-md text-sm font-bold transition-all ${mode === "quiz"
                                ? "bg-white text-blue-600 shadow-sm"
                                : "text-gray-500 hover:text-gray-700"
                                }`}
                        >
                            <span className="flex items-center gap-2">
                                <span className="material-symbols-outlined text-lg">quiz</span>
                                Kiểm tra
                            </span>
                        </button>
                    </div>
                </div>

                {/* Content Area - Flexible height */}
                <div className="flex-1 overflow-y-auto p-4 md:p-8 bg-gray-50/50 flex flex-col items-center">
                    <div className="w-full max-w-3xl flex flex-col flex-1 min-h-0">
                        {/* Progress */}
                        <div className="flex items-center justify-between mb-2 md:mb-6 text-sm font-medium text-gray-500 shrink-0">
                            <span>Thẻ {currentCardIndex + 1} / {cards.length}</span>
                            {mode === "quiz" && (
                                <span className="text-blue-600">Điểm: {score}</span>
                            )}
                        </div>

                        {mode === "study" ? (
                            /* Study Mode: Flashcard */
                            <div className="flex flex-col items-center w-full flex-1 justify-center min-h-0">
                                <div
                                    className="w-full aspect-[3/2] md:aspect-[16/9] perspective-1000 cursor-pointer group mb-4 md:mb-6 max-h-[50vh] md:max-h-[60vh]"
                                    onClick={handleFlip}
                                >
                                    {/* Rotate -180deg for Right-to-Left flip (or Left-to-Right depending on perspective), but user asked for "left to right" so we try negative rotation.
                                        Standard rotateY(180) is usually seen as 'flipping over' like a page.
                                        If user saw mirrored text, it means Back face was wrong.
                                        We use rotate-y-neg-180 for the flip.
                                    */}
                                    <div
                                        className={`relative w-full h-full transition-transform duration-700 transform-style-3d ${isFlipped ? "rotate-y-neg-180" : ""
                                            }`}
                                    >
                                        {/* Front Face (0deg) */}
                                        <div className="absolute inset-0 backface-hidden bg-white rounded-2xl shadow-xl border-2 border-orange-100 flex flex-col items-center justify-center p-6 md:p-10 hover:border-orange-300 transition-colors z-[2]">
                                            <div className="text-center w-full">
                                                <div className="inline-block px-3 py-1 bg-orange-50 rounded-full text-xs font-bold text-orange-500 uppercase tracking-widest mb-4 md:mb-6">
                                                    {deck.title}
                                                </div>
                                                <h3 className="text-xl md:text-3xl font-bold text-[#181111] leading-relaxed">
                                                    {cards[currentCardIndex].term}
                                                </h3>
                                                <div className="mt-6 md:mt-8 text-sm text-gray-400 flex items-center justify-center gap-2 animate-pulse-subtle">
                                                    <span className="material-symbols-outlined">touch_app</span>
                                                    {isFlipped ? "Chạm để xem thuật ngữ" : "Chạm để xem định nghĩa"}
                                                </div>
                                            </div>
                                        </div>

                                        {/* Back Face (-180deg start, becomes 0 when container is -180) */}
                                        <div className="absolute inset-0 backface-hidden rotate-y-neg-180 bg-orange-50 rounded-2xl shadow-xl border-2 border-orange-200 flex flex-col items-center justify-center p-6 md:p-10 z-[1]">
                                            <div className="text-center w-full overflow-y-auto max-h-full custom-scrollbar pr-2">
                                                <div className="text-xs font-bold text-orange-400 uppercase tracking-widest mb-2 sticky top-0 bg-orange-50 pb-2">
                                                    {cards[currentCardIndex].term}
                                                </div>
                                                <h4 className="text-sm font-bold text-orange-600 mb-3 sticky top-6 bg-orange-50 pb-2">
                                                    ĐỊNH NGHĨA
                                                </h4>
                                                <p className="text-lg md:text-xl text-[#181111] leading-relaxed whitespace-pre-line font-medium">
                                                    {cards[currentCardIndex].definition}
                                                </p>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                {/* Controls */}
                                <div className="flex items-center gap-4 md:gap-6 shrink-0 pb-2">
                                    <button
                                        onClick={(e) => { e.stopPropagation(); handlePrev(); }}
                                        className="h-10 w-10 md:h-12 md:w-12 rounded-full bg-white shadow-md border border-gray-100 flex items-center justify-center text-gray-600 hover:text-orange-600 hover:scale-110 transition-all focus:outline-none focus:ring-2 focus:ring-orange-200"
                                        aria-label="Previous card"
                                    >
                                        <span className="material-symbols-outlined">arrow_back</span>
                                    </button>

                                    <div className="h-2 w-24 md:w-48 bg-gray-200 rounded-full overflow-hidden">
                                        <div
                                            className="h-full bg-orange-500 transition-all duration-300"
                                            style={{ width: `${((currentCardIndex + 1) / cards.length) * 100}%` }}
                                        ></div>
                                    </div>

                                    <button
                                        onClick={(e) => { e.stopPropagation(); handleNext(); }}
                                        className="h-10 w-10 md:h-12 md:w-12 rounded-full bg-white shadow-md border border-gray-100 flex items-center justify-center text-gray-600 hover:text-orange-600 hover:scale-110 transition-all focus:outline-none focus:ring-2 focus:ring-orange-200"
                                        aria-label="Next card"
                                    >
                                        <span className="material-symbols-outlined">arrow_forward</span>
                                    </button>
                                </div>

                                <p className="text-xs text-gray-400 mt-4 hidden md:block">
                                    Mẹo: Dùng phím mũi tên Trái/Phải để chuyển thẻ, Space để lật
                                </p>
                            </div>
                        ) : (
                            /* Quiz Mode: Multiple Choice */
                            <div className="w-full flex-1 flex flex-col justify-center min-h-0">
                                <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-6 md:p-8 w-full">
                                    <h3 className="text-xl font-bold text-[#181111] text-center mb-6">
                                        {cards[currentCardIndex].term} là gì?
                                    </h3>
                                    <div className="grid gap-3 md:grid-cols-1">
                                        {quizOptions.map((option, idx) => {
                                            const isSelected = quizAnswer === option;
                                            const isCorrect = option === cards[currentCardIndex].definition;

                                            let btnClass = "border-gray-200 hover:bg-gray-50 hover:border-blue-400";

                                            if (showQuizResult) {
                                                if (isCorrect) btnClass = "bg-green-50 border-green-500 text-green-800";
                                                else if (isSelected) btnClass = "bg-red-50 border-red-500 text-red-800";
                                                else btnClass = "opacity-50 border-gray-200";
                                            } else if (isSelected) {
                                                btnClass = "border-blue-500 bg-blue-50";
                                            }

                                            return (
                                                <button
                                                    key={idx}
                                                    onClick={() => handleQuizOptionSelect(option)}
                                                    disabled={showQuizResult}
                                                    className={`w-full p-4 rounded-xl border-2 text-left transition-all ${btnClass}`}
                                                >
                                                    <p className="text-sm md:text-base font-medium whitespace-pre-line line-clamp-2 md:line-clamp-none">{option}</p>
                                                </button>
                                            );
                                        })}
                                    </div>
                                    {showQuizResult && (
                                        <div className="mt-6 flex justify-center animate-fade-in-up">
                                            <button
                                                onClick={handleNext}
                                                className="px-6 py-2 bg-blue-600 text-white rounded-lg font-bold hover:bg-blue-700 transition-colors flex items-center gap-2"
                                            >
                                                Câu tiếp theo
                                                <span className="material-symbols-outlined">arrow_forward</span>
                                            </button>
                                        </div>
                                    )}
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}

// Add Tailwind styles for 3D flip effect
// You may need to add these utilities to your tailwind.config.ts or globals.css if not already present
// But we can simulate them with standard classes or style props if needed.
// For now, I'll rely on inline styles or standard classes if possible, but 'perspective' and 'rotate-y' are needed.
// Since we might not have the plugin for 3d transform, I will inject a style tag for the flip effect classes just in case.
