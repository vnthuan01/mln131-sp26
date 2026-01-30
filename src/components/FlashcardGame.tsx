"use client";

import { useState, useEffect } from "react";
import { flashcardsContent } from "@/lib/content";

interface FlashcardGameProps {
    isOpen: boolean;
    onClose: () => void;
}

export default function FlashcardGame({ isOpen, onClose }: FlashcardGameProps) {
    const [currentCardIndex, setCurrentCardIndex] = useState(0);
    const [isFlipped, setIsFlipped] = useState(false);
    // New state for expanding the card on mobile/small screens for better reading
    const [isExpanded, setIsExpanded] = useState(false);

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
        }, 300);
    };

    const handlePrev = () => {
        setIsFlipped(false);
        setTimeout(() => {
            setCurrentCardIndex((prev) => (prev - 1 + cards.length) % cards.length);
        }, 300);
    };

    // Toggle expand mode
    const toggleExpand = (e: React.MouseEvent) => {
        e.stopPropagation();
        setIsExpanded(!isExpanded);
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
                e.preventDefault(); // Prevent scrolling
                handleFlip();
            } else if (e.key === "Escape") {
                if (isExpanded) {
                    setIsExpanded(false);
                } else {
                    onClose();
                }
            }
        };

        window.addEventListener("keydown", handleKeyDown);
        return () => window.removeEventListener("keydown", handleKeyDown);
    }, [isOpen, cards.length, onClose, isExpanded]);

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

    // Reset when opening
    useEffect(() => {
        if (isOpen) {
            setCurrentCardIndex(0);
            setIsFlipped(false);
            setIsExpanded(false);
        }
    }, [isOpen]);

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-fade-in-up">
            <div
                className={`bg-white rounded-2xl shadow-2xl flex flex-col transition-all duration-300 relative
                    ${isExpanded
                        ? "fixed inset-0 m-0 w-full h-full rounded-none md:rounded-2xl md:m-4 md:h-[90vh] md:w-auto md:max-w-6xl"
                        : "w-full max-w-5xl h-[80vh] md:h-auto md:max-h-[90vh]"}
                `}
                onTouchStart={onTouchStart}
                onTouchMove={onTouchMove}
                onTouchEnd={onTouchEnd}
            >
                {/* Header */}
                <div className="p-4 md:p-6 border-b border-gray-100 flex items-center justify-between shrink-0">
                    <div className="flex items-center gap-3 pr-10">
                        <div className="flex h-10 w-10 md:h-12 md:w-12 items-center justify-center rounded-xl bg-orange-500/10 text-orange-600 shrink-0">
                            <span className="material-symbols-outlined text-xl md:text-2xl">
                                style
                            </span>
                        </div>
                        <div>
                            <h2 className="text-lg md:text-xl font-bold text-[#181111] line-clamp-1">
                                {flashcardsContent.title}
                            </h2>
                            <p className="text-xs md:text-sm text-[#896161] line-clamp-1">
                                {flashcardsContent.subtitle}
                            </p>
                        </div>
                    </div>
                    <div className="flex items-center gap-2">
                        {/* Expand Toggle Button (Visible primarily on mobile/tablet) */}
                        <button
                            onClick={toggleExpand}
                            className="p-2 rounded-lg hover:bg-gray-100 transition-colors text-gray-500 hidden sm:flex"
                            title={isExpanded ? "Thu nhỏ" : "Phóng to"}
                        >
                            <span className="material-symbols-outlined">
                                {isExpanded ? "close_fullscreen" : "open_in_full"}
                            </span>
                        </button>

                        <button
                            onClick={onClose}
                            className="p-2 rounded-lg hover:bg-gray-100 transition-colors z-10"
                        >
                            <span className="material-symbols-outlined text-[#896161] text-2xl">
                                close
                            </span>
                        </button>
                    </div>
                </div>

                {/* Content Area */}
                <div className="flex-1 overflow-hidden p-4 md:p-8 bg-gray-50/50 flex flex-col items-center justify-center relative">
                    <div className={`w-full flex flex-col flex-1 min-h-0 transition-all duration-300 ${isExpanded ? "max-w-5xl" : "max-w-3xl"}`}>
                        {/* Progress */}
                        <div className="flex items-center justify-between mb-4 md:mb-6 text-sm font-medium text-gray-500 shrink-0">
                            <span>Thẻ {currentCardIndex + 1} / {cards.length}</span>
                            <button
                                onClick={toggleExpand}
                                className="sm:hidden flex items-center gap-1 text-orange-600 p-2 -mr-2"
                            >
                                <span className="material-symbols-outlined text-lg">
                                    {isExpanded ? "close_fullscreen" : "open_in_full"}
                                </span>
                                <span className="text-xs font-bold">{isExpanded ? "Thu nhỏ" : "Phóng to"}</span>
                            </button>
                        </div>

                        {/* Flashcard Container */}
                        <div className="flex flex-col items-center w-full flex-1 justify-center min-h-0 relative">
                            <div
                                className={`w-full perspective-1000 cursor-pointer group mb-4 md:mb-6 transition-all duration-300
                                    ${isExpanded ? "h-full" : "aspect-[3/4] sm:aspect-[3/2] md:aspect-[16/9] max-h-[60vh]"}
                                `}
                                onClick={handleFlip}
                            >
                                <div
                                    className={`relative w-full h-full transition-transform duration-700 transform-style-3d ${isFlipped ? "rotate-y-neg-180" : ""
                                        }`}
                                >
                                    {/* Front Face (0deg) */}
                                    <div className="absolute inset-0 backface-hidden bg-white rounded-2xl shadow-xl border-2 border-orange-100 flex flex-col items-center justify-center p-6 md:p-10 hover:border-orange-300 transition-colors z-[2]">
                                        <div className="text-center w-full overflow-y-auto max-h-full custom-scrollbar">
                                            <div className="inline-block px-3 py-1 bg-orange-50 rounded-full text-xs font-bold text-orange-500 uppercase tracking-widest mb-4 md:mb-6">
                                                {deck.title}
                                            </div>
                                            <h3 className={`font-bold text-[#181111] leading-relaxed transition-all
                                                 ${isExpanded ? "text-2xl md:text-4xl" : "text-xl md:text-3xl"}
                                            `}>
                                                {cards[currentCardIndex].term}
                                            </h3>
                                            <div className="mt-6 md:mt-8 text-sm text-gray-400 flex items-center justify-center gap-2 animate-pulse-subtle">
                                                <span className="material-symbols-outlined">touch_app</span>
                                                {isFlipped ? "Chạm để xem thuật ngữ" : "Chạm để xem định nghĩa"}
                                            </div>
                                        </div>
                                    </div>

                                    {/* Back Face (-180deg start) */}
                                    <div className="absolute inset-0 backface-hidden rotate-y-neg-180 bg-orange-50 rounded-2xl shadow-xl border-2 border-orange-200 flex flex-col items-center justify-center p-4 md:p-10 z-[1]">
                                        <div className="text-center w-full h-full flex flex-col">
                                            <div className="text-xs font-bold text-orange-400 uppercase tracking-widest mb-2 shrink-0">
                                                {cards[currentCardIndex].term}
                                            </div>
                                            <h4 className="text-sm font-bold text-orange-600 mb-2 shrink-0">
                                                ĐỊNH NGHĨA
                                            </h4>

                                            {/* Scrollable Definition Area */}
                                            <div className="flex-1 overflow-y-auto custom-scrollbar px-2 flex items-center justify-center">
                                                <p className={`text-[#181111] leading-relaxed whitespace-pre-line font-medium text-left w-full
                                                    ${isExpanded ? "text-lg md:text-2xl" : "text-base md:text-xl"}
                                                `}>
                                                    {cards[currentCardIndex].definition}
                                                </p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* Controls */}
                            <div className="flex items-center gap-4 md:gap-6 shrink-0 pb-2 z-20">
                                <button
                                    onClick={(e) => { e.stopPropagation(); handlePrev(); }}
                                    className="h-12 w-12 md:h-14 md:w-14 rounded-full bg-white shadow-lg border border-gray-100 flex items-center justify-center text-gray-600 hover:text-orange-600 hover:scale-110 active:scale-95 transition-all focus:outline-none focus:ring-2 focus:ring-orange-200"
                                    aria-label="Previous card"
                                >
                                    <span className="material-symbols-outlined text-2xl">arrow_back</span>
                                </button>

                                <div className="h-2 w-24 md:w-48 bg-gray-200 rounded-full overflow-hidden hidden sm:block">
                                    <div
                                        className="h-full bg-orange-500 transition-all duration-300"
                                        style={{ width: `${((currentCardIndex + 1) / cards.length) * 100}%` }}
                                    ></div>
                                </div>

                                <button
                                    onClick={(e) => { e.stopPropagation(); handleNext(); }}
                                    className="h-12 w-12 md:h-14 md:w-14 rounded-full bg-white shadow-lg border border-gray-100 flex items-center justify-center text-gray-600 hover:text-orange-600 hover:scale-110 active:scale-95 transition-all focus:outline-none focus:ring-2 focus:ring-orange-200"
                                    aria-label="Next card"
                                >
                                    <span className="material-symbols-outlined text-2xl">arrow_forward</span>
                                </button>
                            </div>

                            <p className="text-xs text-gray-400 mt-4 hidden md:block">
                                Mẹo: Dùng phím mũi tên Trái/Phải để chuyển thẻ, Space để lật
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

// Add CSS for 3D Transform if not present in global CSS
// .transform-style-3d { transform-style: preserve-3d; }
// .backface-hidden { backface-visibility: hidden; }
// .rotate-y-neg-180 { transform: rotateY(-180deg); }
// .perspective-1000 { perspective: 1000px; }
