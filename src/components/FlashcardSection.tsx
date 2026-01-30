"use client";

import { useState, useEffect, useRef } from "react";
import { flashcardsContent } from "@/lib/content";

export default function FlashcardSection() {
    const [currentCardIndex, setCurrentCardIndex] = useState(0);
    const [isFlipped, setIsFlipped] = useState(false);
    const [isListExpanded, setIsListExpanded] = useState(false);

    // New state for Expanding Card (Mobile Optimization)
    const [isCardExpanded, setIsCardExpanded] = useState(false);

    // Touch handling state
    const [touchStart, setTouchStart] = useState<number | null>(null);
    const [touchEnd, setTouchEnd] = useState<number | null>(null);

    const sectionRef = useRef<HTMLElement>(null);

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
        }, 300);
    };

    const handlePrev = () => {
        setIsFlipped(false);
        setTimeout(() => {
            setCurrentCardIndex((prev) => (prev - 1 + cards.length) % cards.length);
        }, 300);
    };

    const toggleCardExpand = (e: React.MouseEvent) => {
        e.stopPropagation();
        setIsCardExpanded(!isCardExpanded);
    };

    // Keyboard Navigation
    useEffect(() => {
        const handleKeyDown = (e: KeyboardEvent) => {
            // If card is expanded, we always handle keys regardless of scroll position
            if (isCardExpanded) {
                if (e.key === "ArrowRight") {
                    e.preventDefault();
                    handleNext();
                } else if (e.key === "ArrowLeft") {
                    e.preventDefault();
                    handlePrev();
                } else if (e.key === " " || e.key === "Spacebar") {
                    e.preventDefault();
                    handleFlip();
                } else if (e.key === "Escape") {
                    setIsCardExpanded(false);
                }
                return;
            }

            // Normal mode: check visibility
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
                e.preventDefault();
                handleFlip();
            }
        };

        window.addEventListener("keydown", handleKeyDown);
        return () => window.removeEventListener("keydown", handleKeyDown);
    }, [cards.length, isCardExpanded]); // Added isCardExpanded dependency

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

                {/* Game Interface Container - Handles Expansion */}
                <div
                    className={`
                        transition-all duration-300 ease-in-out
                        ${isCardExpanded
                            ? "fixed inset-0 z-50 flex flex-col items-center justify-center p-4 sm:p-8 bg-gray-900/95 backdrop-blur-sm"
                            : "bg-white max-w-4xl mx-auto rounded-3xl shadow-xl shadow-orange-500/5 overflow-hidden border border-orange-100 relative"}
                    `}
                >
                    {/* Expand/Close Button */}
                    <button
                        onClick={toggleCardExpand}
                        className={`absolute top-2 right-2 z-50 p-2 flex items-center cursor-pointer rounded-full transition-colors
                            ${isCardExpanded ? "bg-white/10 text-white hover:bg-white/20" : "bg-gray-100 text-gray-500 hover:bg-gray-200"}
                        `}
                        title={isCardExpanded ? "Thu nhỏ" : "Phóng to toàn màn hình"}
                    >
                        <span className="material-symbols-outlined">
                            {isCardExpanded ? "close_fullscreen" : "open_in_full"}
                        </span>
                    </button>

                    {/* Main Interaction Area */}
                    <div
                        className={`
                            flex flex-col items-center justify-center w-full
                            ${isCardExpanded ? "h-full max-w-5xl mx-auto" : "p-6 md:p-12 min-h-[400px] bg-[url('/grid-pattern.svg')] bg-fixed"}
                        `}
                        onTouchStart={onTouchStart}
                        onTouchMove={onTouchMove}
                        onTouchEnd={onTouchEnd}
                    >
                        {/* Toolbar (Only visible in normal mode for card count) */}
                        {!isCardExpanded && (
                            <div className="w-full flex justify-start mb-4 text-sm font-medium text-gray-500">
                                <span>{currentCardIndex + 1} / {cards.length}</span>
                            </div>
                        )}

                        {/* Card Container */}
                        <div className={`w-full transition-all duration-300 ${isCardExpanded ? "h-[70vh] md:h-[80vh]" : "max-w-3xl aspect-[3/4] sm:aspect-[3/2] md:aspect-[2/1]"}`}>
                            <div
                                className="relative w-full h-full perspective-1000 cursor-pointer group mb-6 md:mb-10"
                                onClick={handleFlip}
                            >
                                <div
                                    className={`absolute inset-0 w-full h-full transition-transform duration-700 transform-style-3d ${isFlipped ? "rotate-y-neg-180" : ""
                                        }`}
                                >
                                    {/* Front */}
                                    <div className="absolute inset-0 backface-hidden bg-white rounded-2xl shadow-lg border-2 border-orange-100 flex flex-col items-center justify-center p-6 md:p-10 z-[2]">
                                        <div className="w-full h-full flex flex-col items-center justify-center overflow-y-auto custom-scrollbar">
                                            <div className="inline-block px-3 py-1 bg-orange-50 rounded-full text-xs font-bold text-orange-500 uppercase tracking-widest mb-6 shrink-0">
                                                {deck.title}
                                            </div>
                                            <h3 className={`font-bold text-[#181111] text-center leading-relaxed transition-all ${isCardExpanded ? "text-3xl md:text-5xl" : "text-2xl md:text-4xl"}`}>
                                                {cards[currentCardIndex].term}
                                            </h3>
                                            <div className="mt-8 text-sm text-gray-400 flex items-center gap-2 animate-pulse-subtle shrink-0">
                                                <span className="material-symbols-outlined">touch_app</span>
                                                {isFlipped ? "Chạm để xem thuật ngữ" : "Chạm để xem định nghĩa"}
                                            </div>
                                        </div>
                                    </div>

                                    {/* Back */}
                                    <div className="absolute inset-0 backface-hidden rotate-y-neg-180 bg-orange-50 rounded-2xl shadow-lg border-2 border-orange-200 flex flex-col items-center justify-center p-6 md:p-10 z-[1]">
                                        <div className="w-full h-full overflow-y-auto custom-scrollbar flex flex-col items-center text-center">
                                            <div className="text-xs font-bold text-orange-400 uppercase tracking-widest mb-3 shrink-0">
                                                {cards[currentCardIndex].term}
                                            </div>
                                            <h4 className="text-sm font-bold text-orange-600 mb-4 shrink-0">ĐỊNH NGHĨA</h4>

                                            {/* Scrollable Definition */}
                                            <div className="flex-1 flex items-center justify-center w-full">
                                                <p className={`text-[#181111] leading-relaxed font-medium whitespace-pre-line text-left w-full
                                                    ${isCardExpanded ? "text-xl md:text-3xl px-4" : "text-xl md:text-2xl"}
                                                `}>
                                                    {cards[currentCardIndex].definition}
                                                </p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Controls */}
                        <div className={`flex justify-center items-center gap-8 mt-4 ${isCardExpanded ? "text-white" : ""}`}>
                            <button
                                onClick={(e) => { e.stopPropagation(); handlePrev(); }}
                                className={`h-14 w-14 rounded-full shadow-lg border flex items-center justify-center transition-all group
                                    ${isCardExpanded
                                        ? "bg-white/10 border-white/20 text-white hover:bg-white/20"
                                        : "bg-white border-gray-100 text-gray-500 hover:text-orange-600 hover:border-orange-200 hover:scale-110"}
                                `}
                            >
                                <span className="material-symbols-outlined text-3xl group-hover:animate-shake">arrow_back</span>
                            </button>

                            <div className={`h-1.5 w-48 rounded-full overflow-hidden ${isCardExpanded ? "bg-white/20" : "bg-gray-100"}`}>
                                <div
                                    className="h-full bg-gradient-to-r from-orange-400 to-red-500 transition-all duration-300"
                                    style={{ width: `${((currentCardIndex + 1) / cards.length) * 100}%` }}
                                ></div>
                            </div>

                            <button
                                onClick={(e) => { e.stopPropagation(); handleNext(); }}
                                className={`h-14 w-14 rounded-full shadow-lg border flex items-center justify-center transition-all group
                                    ${isCardExpanded
                                        ? "bg-white/10 border-white/20 text-white hover:bg-white/20"
                                        : "bg-white border-gray-100 text-gray-500 hover:text-orange-600 hover:border-orange-200 hover:scale-110"}
                                `}
                            >
                                <span className="material-symbols-outlined text-3xl group-hover:animate-shake">arrow_forward</span>
                            </button>
                        </div>

                        {!isCardExpanded && (
                            <p className="text-center text-xs text-gray-400 mt-6 font-medium">
                                Mẹo: Dùng phím <kbd className="font-sans px-1.5 py-0.5 bg-gray-100 rounded border border-gray-300 mx-1">←</kbd> <kbd className="font-sans px-1.5 py-0.5 bg-gray-100 rounded border border-gray-300 mx-1">→</kbd> để chuyển thẻ, <kbd className="font-sans px-1.5 py-0.5 bg-gray-100 rounded border border-gray-300 mx-1">Space</kbd> để lật thẻ
                            </p>
                        )}
                        {isCardExpanded && (
                            <p className="text-center text-xs text-white/50 mt-6 font-medium">
                                Lướt trái phải hoặc nhấp vào mũi tên để chuyển thẻ
                            </p>
                        )}
                        {isCardExpanded && (
                            <p className="text-center text-xs text-white/50 mt-2 font-medium">
                                Nhấn ESC hoặc nút thu nhỏ để thoát chế độ toàn màn hình
                            </p>
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
                                        <p className="text-gray-600 leading-relaxed border-t border-gray-200 pt-2 mt-2 whitespace-pre-line">{card.definition}</p>
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

// Ensure global styles for 3D transform exist if not already defined
// .transform-style-3d { transform-style: preserve-3d; }
// .backface-hidden { backface-visibility: hidden; }
// .rotate-y-neg-180 { transform: rotateY(-180deg); }
// .perspective-1000 { perspective: 1000px; }
