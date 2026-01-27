"use client";

import { useState, useEffect, useRef } from "react";
import { flashcardsContent } from "@/lib/content";

type Mode = "study" | "quiz";

export default function FlashcardSection() {
    const [currentCardIndex, setCurrentCardIndex] = useState(0);
    const [isFlipped, setIsFlipped] = useState(false);
    const [mode, setMode] = useState<Mode>("study");
    const [quizOptions, setQuizOptions] = useState<string[]>([]);
    const [quizAnswer, setQuizAnswer] = useState<string | null>(null);
    const [score, setScore] = useState(0);
    const [showQuizResult, setShowQuizResult] = useState(false);
    const [isListExpanded, setIsListExpanded] = useState(false);

    // Touch handling state
    const [touchStart, setTouchStart] = useState<number | null>(null);
    const [touchEnd, setTouchEnd] = useState<number | null>(null);

    const sectionRef = useRef<HTMLElement>(null);
    const questionTitleRef = useRef<HTMLHeadingElement>(null);
    const nextButtonRef = useRef<HTMLDivElement>(null);

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

            // Scroll to title on next question
            if (mode === 'quiz' && questionTitleRef.current) {
                // Small delay to ensure render
                setTimeout(() => {
                    questionTitleRef.current?.scrollIntoView({ behavior: 'smooth', block: 'center' });
                }, 100);
            }
        }, 300);
    };

    const handlePrev = () => {
        setIsFlipped(false);
        setTimeout(() => {
            setCurrentCardIndex((prev) => (prev - 1 + cards.length) % cards.length);
            setQuizAnswer(null);
            setShowQuizResult(false);

            // Scroll to title on prev question (if in quiz mode)
            if (mode === 'quiz' && questionTitleRef.current) {
                setTimeout(() => {
                    questionTitleRef.current?.scrollIntoView({ behavior: 'smooth', block: 'center' });
                }, 100);
            }
        }, 300);
    };

    // Keyboard Navigation
    useEffect(() => {
        const handleKeyDown = (e: KeyboardEvent) => {
            // Only handle keys if the section is in view or focused? 
            // For simplicity, we check if the active element is within this component or just handle global if simpler, 
            // but global might interfere with other scroll. 
            // Let's add a check if the user is near this section? 
            // Actually, user requested "keyboard navigate", usually implies global when the component is active.
            // Since this is now on the page, we should be careful. 
            // Let's rely on hover or just simple global listener but maybe guard it?
            // For now, I'll keep it global but maybe we should rely on the user having interacted with it.

            // To be safe and not annoy users scrolling elsewhere, let's only capture if the section is somewhat visible.
            if (!sectionRef.current) return;
            const rect = sectionRef.current.getBoundingClientRect();
            const isVisible = rect.top < window.innerHeight && rect.bottom > 0;

            if (!isVisible) return;

            if (e.key === "ArrowRight") {
                e.preventDefault();
                handleNext();
            } else if (e.key === "ArrowLeft") {
                e.preventDefault();
                handlePrev();
            } else if (e.key === " " || e.key === "Spacebar") {
                if (mode === "study") {
                    e.preventDefault();
                    handleFlip();
                }
            }
        };

        window.addEventListener("keydown", handleKeyDown);
        return () => window.removeEventListener("keydown", handleKeyDown);
    }, [mode, cards.length]);

    // Touch Event Handlers
    const onTouchStart = (e: React.TouchEvent) => {
        setTouchEnd(null);
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

        // Auto scroll to next button
        setTimeout(() => {
            if (nextButtonRef.current) {
                nextButtonRef.current.scrollIntoView({ behavior: "smooth", block: "center" });
            }
        }, 100);
    };

    return (
        <section ref={sectionRef} id="flashcard-section" className="py-16 bg-gradient-to-br from-orange-50/50 to-yellow-50/30 border-y border-orange-100">
            <div className="max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-8">

                {/* Header */}
                <div className="text-center mb-10">
                    <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-orange-100 text-orange-600 text-xs font-bold uppercase tracking-wider mb-4">
                        <span className="material-symbols-outlined text-[16px]">style</span>
                        Ghi nhớ kiến thức
                    </div>
                    <h2 className="text-3xl md:text-4xl font-bold text-[#181111] mb-4">
                        {flashcardsContent.title}
                    </h2>
                    <p className="text-[#896161] max-w-2xl mx-auto text-lg">
                        {flashcardsContent.subtitle}
                    </p>
                </div>

                {/* Game Interface */}
                <div className="max-w-4xl mx-auto bg-white rounded-3xl shadow-xl shadow-orange-500/5 overflow-hidden border border-orange-100">

                    {/* Toolbar */}
                    <div className="px-6 py-4 bg-gray-50/80 border-b border-gray-100 flex flex-wrap gap-4 items-center justify-between">
                        <div className="flex bg-white p-1 rounded-lg border border-gray-100 shadow-sm">
                            <button
                                onClick={() => setMode("study")}
                                className={`px-4 py-1.5 rounded-md text-sm font-bold transition-all flex items-center gap-2 ${mode === "study"
                                    ? "bg-orange-50 text-orange-600"
                                    : "text-gray-500 hover:text-gray-700 hover:bg-gray-50"
                                    }`}
                            >
                                <span className="material-symbols-outlined text-lg">school</span>
                                Học tập
                            </button>
                            <button
                                onClick={() => setMode("quiz")}
                                className={`px-4 py-1.5 rounded-md text-sm font-bold transition-all flex items-center gap-2 ${mode === "quiz"
                                    ? "bg-blue-50 text-blue-600"
                                    : "text-gray-500 hover:text-gray-700 hover:bg-gray-50"
                                    }`}
                            >
                                <span className="material-symbols-outlined text-lg">quiz</span>
                                Kiểm tra
                            </button>
                        </div>

                        <div className="text-sm font-medium text-gray-500 flex items-center gap-4 ml-auto">
                            <span>{currentCardIndex + 1} / {cards.length}</span>
                            {mode === "quiz" && (
                                <span className="px-3 py-1 bg-blue-50 text-blue-600 rounded-full text-xs font-bold">
                                    Điểm: {score}
                                </span>
                            )}
                        </div>
                    </div>

                    {/* Main Interaction Area */}
                    <div
                        className="p-6 md:p-12 min-h-[400px] flex flex-col items-center justify-center bg-[url('/grid-pattern.svg')] bg-fixed"
                        onTouchStart={onTouchStart}
                        onTouchMove={onTouchMove}
                        onTouchEnd={onTouchEnd}
                    >
                        {mode === "study" ? (
                            <div className="w-full max-w-3xl mx-auto">
                                <div
                                    className="relative w-full aspect-[16/9] md:aspect-[2/1] perspective-1000 cursor-pointer group mb-10"
                                    onClick={handleFlip}
                                >
                                    <div
                                        className={`absolute inset-0 w-full h-full transition-transform duration-700 transform-style-3d ${isFlipped ? "rotate-y-neg-180" : ""
                                            }`}
                                    >
                                        {/* Front */}
                                        <div className="absolute inset-0 backface-hidden bg-white rounded-2xl shadow-lg border-2 border-orange-100 flex flex-col items-center justify-center p-8 z-[2]">
                                            <div className="inline-block px-3 py-1 bg-orange-50 rounded-full text-xs font-bold text-orange-500 uppercase tracking-widest mb-6">
                                                {deck.title}
                                            </div>
                                            <h3 className="text-2xl md:text-4xl font-bold text-[#181111] text-center leading-relaxed">
                                                {cards[currentCardIndex].term}
                                            </h3>
                                            <div className="absolute bottom-6 text-sm text-gray-400 flex items-center gap-2 animate-pulse-subtle">
                                                <span className="material-symbols-outlined">touch_app</span>
                                                {isFlipped ? "Chạm để xem thuật ngữ" : "Chạm để xem định nghĩa"}
                                            </div>
                                        </div>

                                        {/* Back */}
                                        <div className="absolute inset-0 backface-hidden rotate-y-neg-180 bg-orange-50 rounded-2xl shadow-lg border-2 border-orange-200 flex flex-col items-center justify-center p-8 z-[1]">
                                            <div className="w-full h-full overflow-y-auto custom-scrollbar flex flex-col items-center justify-center text-center">
                                                <div className="text-xs font-bold text-orange-400 uppercase tracking-widest mb-3">
                                                    {cards[currentCardIndex].term}
                                                </div>
                                                <h4 className="text-sm font-bold text-orange-600 mb-4">ĐỊNH NGHĨA</h4>
                                                <p className="text-xl md:text-2xl text-[#181111] leading-relaxed font-medium">
                                                    {cards[currentCardIndex].definition}
                                                </p>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                {/* Controls */}
                                <div className="flex justify-center items-center gap-8">
                                    <button
                                        onClick={(e) => { e.stopPropagation(); handlePrev(); }}
                                        className="h-14 w-14 rounded-full bg-white shadow-lg border border-gray-100 flex items-center justify-center text-gray-500 hover:text-orange-600 hover:border-orange-200 hover:scale-110 transition-all group"
                                    >
                                        <span className="material-symbols-outlined text-3xl group-hover:animate-shake">arrow_back</span>
                                    </button>

                                    <div className="h-1.5 w-48 bg-gray-100 rounded-full overflow-hidden">
                                        <div
                                            className="h-full bg-gradient-to-r from-orange-400 to-red-500 transition-all duration-300"
                                            style={{ width: `${((currentCardIndex + 1) / cards.length) * 100}%` }}
                                        ></div>
                                    </div>

                                    <button
                                        onClick={(e) => { e.stopPropagation(); handleNext(); }}
                                        className="h-14 w-14 rounded-full bg-white shadow-lg border border-gray-100 flex items-center justify-center text-gray-500 hover:text-orange-600 hover:border-orange-200 hover:scale-110 transition-all group"
                                    >
                                        <span className="material-symbols-outlined text-3xl group-hover:animate-shake">arrow_forward</span>
                                    </button>
                                </div>

                                <p className="text-center text-xs text-gray-400 mt-6 font-medium">
                                    Mẹo: Dùng phím <kbd className="font-sans px-1.5 py-0.5 bg-gray-100 rounded border border-gray-300 mx-1">←</kbd> <kbd className="font-sans px-1.5 py-0.5 bg-gray-100 rounded border border-gray-300 mx-1">→</kbd> để chuyển thẻ, <kbd className="font-sans px-1.5 py-0.5 bg-gray-100 rounded border border-gray-300 mx-1">Space</kbd> để lật
                                </p>
                            </div>
                        ) : (
                            <div className="w-full max-w-2xl mx-auto">
                                <div className="bg-white rounded-2xl shadow-sm border border-orange-100 p-8 md:p-10 mb-8">
                                    <h3
                                        ref={questionTitleRef}
                                        className="text-2xl font-bold text-[#181111] text-center mb-8 scroll-mt-24"
                                    >
                                        {cards[currentCardIndex].term} là gì?
                                    </h3>
                                    <div className="space-y-3">
                                        {quizOptions.map((option, idx) => {
                                            const isSelected = quizAnswer === option;
                                            const isCorrect = option === cards[currentCardIndex].definition;

                                            let btnClass = "border-gray-200 hover:border-blue-400 hover:bg-blue-50";
                                            if (showQuizResult) {
                                                if (isCorrect) btnClass = "bg-green-50 border-green-500 text-green-700";
                                                else if (isSelected) btnClass = "bg-red-50 border-red-500 text-red-700";
                                                else btnClass = "opacity-50 border-gray-200";
                                            } else if (isSelected) {
                                                btnClass = "border-blue-500 bg-blue-50 text-blue-700 shadow-md";
                                            }

                                            return (
                                                <button
                                                    key={idx}
                                                    onClick={() => handleQuizOptionSelect(option)}
                                                    disabled={showQuizResult}
                                                    className={`w-full p-5 rounded-xl border-2 text-left transition-all text-lg ${btnClass}`}
                                                >
                                                    {option}
                                                </button>
                                            );
                                        })}
                                    </div>

                                    {showQuizResult && (
                                        <div
                                            ref={nextButtonRef}
                                            className="mt-8 flex justify-center animate-fade-in-up scroll-mt-24"
                                        >
                                            <button
                                                onClick={handleNext}
                                                className="px-8 py-3 bg-blue-600 text-white rounded-xl font-bold hover:bg-blue-700 hover:shadow-lg transition-all flex items-center gap-2 transform active:scale-95"
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

                {/* Toggleable List Section */}
                <div className="max-w-4xl mx-auto mt-6">
                    <button
                        onClick={() => setIsListExpanded(!isListExpanded)}
                        className="w-full flex items-center justify-between px-6 py-4 bg-white rounded-xl border border-gray-200 shadow-sm hover:shadow-md hover:border-orange-200 transition-all group"
                    >
                        <span className="font-bold text-[#181111] flex items-center gap-2">
                            <span className="material-symbols-outlined text-orange-500">list_alt</span>
                            Danh sách thuật ngữ ({cards.length})
                        </span>
                        <span className={`material-symbols-outlined text-gray-400 transition-transform duration-300 group-hover:text-orange-500 ${isListExpanded ? "rotate-180" : ""}`}>
                            expand_more
                        </span>
                    </button>

                    <div className={`grid transition-all duration-300 ease-in-out ${isListExpanded ? "grid-rows-[1fr] opacity-100 mt-4" : "grid-rows-[0fr] opacity-0"}`}>
                        <div className="overflow-hidden">
                            <div className="grid gap-4 bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
                                {cards.map((card) => (
                                    <div key={card.id} className="p-4 rounded-xl bg-gray-50 border border-gray-100 hover:bg-orange-50/50 hover:border-orange-100 transition-colors">
                                        <h4 className="font-bold text-[#181111] mb-2 text-lg">{card.term}</h4>
                                        <p className="text-gray-600 leading-relaxed border-t border-gray-200 pt-2 mt-2">{card.definition}</p>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>

            </div>
        </section>
    );
}
