"use client";

import { useState, useEffect, useCallback } from "react";
import { matchConceptsGameContent } from "@/lib/content";

interface MatchConceptsGameProps {
    isOpen: boolean;
    onClose: () => void;
}

interface Card {
    id: number;
    type: "term" | "definition";
    content: string;
    pairId: number;
    isMatched: boolean;
}

export default function MatchConceptsGame({ isOpen, onClose }: MatchConceptsGameProps) {
    const [gameState, setGameState] = useState<"intro" | "playing" | "result">("intro");
    const [cards, setCards] = useState<Card[]>([]);
    const [selectedCard, setSelectedCard] = useState<Card | null>(null);
    const [matches, setMatches] = useState(0);
    const [moves, setMoves] = useState(0);
    const [wrongPair, setWrongPair] = useState<number[]>([]); // Array of card IDs

    // Initialize game
    const startGame = useCallback(() => {
        // Select 4 random pairs to avoid overcrowding
        const shuffledPairs = [...matchConceptsGameContent.pairs].sort(() => 0.5 - Math.random()).slice(0, 4);

        const newCards: Card[] = [];
        shuffledPairs.forEach((pair, index) => {
            newCards.push({
                id: index * 2,
                type: "term",
                content: pair.term,
                pairId: pair.id,
                isMatched: false
            });
            newCards.push({
                id: index * 2 + 1,
                type: "definition",
                content: pair.definition,
                pairId: pair.id,
                isMatched: false
            });
        });

        // Shuffle cards
        setCards(newCards.sort(() => 0.5 - Math.random()));

        setGameState("playing");
        setSelectedCard(null);
        setMatches(0);
        setMoves(0);
        setWrongPair([]);
    }, []);

    const handleCardClick = (card: Card) => {
        if (card.isMatched || wrongPair.length > 0) return;

        if (selectedCard && selectedCard.id === card.id) {
            setSelectedCard(null); // Deselect if clicking same card
            return;
        }

        if (!selectedCard) {
            setSelectedCard(card);
        } else {
            // Check match
            setMoves((prev) => prev + 1);
            if (selectedCard.pairId === card.pairId) {
                // Match found!
                setCards((prev) => prev.map(c =>
                    (c.id === card.id || c.id === selectedCard.id) ? { ...c, isMatched: true } : c
                ));
                setMatches((prev) => prev + 1);
                setSelectedCard(null);

                // Check win condition
                if (matches + 1 === 4) { // 4 pairs total
                    setTimeout(() => setGameState("result"), 1000);
                }
            } else {
                // Wrong match
                setWrongPair([selectedCard.id, card.id]);
                setTimeout(() => {
                    setWrongPair([]);
                    setSelectedCard(null);
                }, 1000);
            }
        }
    };

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-fade-in-up">
            <div className="bg-white rounded-2xl shadow-2xl w-full max-h-[90vh] overflow-y-auto max-w-2xl md:max-w-6xl transition-all duration-300">
                {/* Header */}
                <div className="p-6 border-b border-gray-100 flex items-center justify-between">
                    <div className="flex items-center gap-3">
                        <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-purple-100 text-purple-600">
                            <span className="material-symbols-outlined text-2xl">
                                match_word
                            </span>
                        </div>
                        <div>
                            <h2 className="text-xl font-bold text-[#181111]">
                                {matchConceptsGameContent.title}
                            </h2>
                            <p className="text-sm text-[#896161]">
                                {gameState === "playing"
                                    ? `Số lần thử: ${moves}`
                                    : matchConceptsGameContent.subtitle}
                            </p>
                        </div>
                    </div>
                    <button onClick={onClose} className="p-2 rounded-lg hover:bg-gray-100 transition-colors">
                        <span className="material-symbols-outlined text-[#896161]">close</span>
                    </button>
                </div>

                {/* Content */}
                <div className="p-6 bg-gray-50/50 min-h-[400px]">
                    {gameState === "intro" && (
                        <div className="text-center py-12">
                            <div className="w-24 h-24 mx-auto bg-purple-50 rounded-full flex items-center justify-center mb-6">
                                <span className="material-symbols-outlined text-5xl text-purple-500">
                                    link
                                </span>
                            </div>
                            <h3 className="text-2xl font-bold text-[#181111] mb-2">Nối từ thông minh</h3>
                            <p className="text-[#896161] mb-8 max-w-md mx-auto">
                                Chọn một khái niệm và tìm định nghĩa tương ứng của nó. Hoàn thành tất cả các cặp để chiến thắng!
                            </p>
                            <button
                                onClick={startGame}
                                className="px-8 py-4 rounded-xl bg-purple-600 text-white font-bold hover:bg-purple-700 transition-all hover:scale-105 shadow-lg shadow-purple-600/20"
                            >
                                Bắt đầu chơi
                            </button>
                        </div>
                    )}

                    {gameState === "playing" && (
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 animate-fade-in-up">
                            {cards.map((card) => {
                                const isSelected = selectedCard?.id === card.id;
                                const isWrong = wrongPair.includes(card.id);

                                let cardStyle = "bg-white border-2 border-gray-200 text-[#181111] hover:border-purple-300 hover:shadow-md";

                                if (card.isMatched) {
                                    cardStyle = "bg-green-100 border-2 border-green-400 opacity-60 scale-95 cursor-default";
                                } else if (isWrong) {
                                    cardStyle = "bg-red-50 border-2 border-red-400 animate-shake";
                                } else if (isSelected) {
                                    cardStyle = "bg-purple-50 border-2 border-purple-500 ring-2 ring-purple-200";
                                }

                                return (
                                    <button
                                        key={card.id}
                                        onClick={() => handleCardClick(card)}
                                        className={`p-4 rounded-xl h-40 flex items-center justify-center transition-all duration-300 ${cardStyle}`}
                                    >
                                        <div className="text-center">
                                            {card.type === "term" && (
                                                <span className="block text-xs font-bold text-purple-500 uppercase tracking-wider mb-2">Khái niệm</span>
                                            )}
                                            <span className={`${card.type === "term" ? "text-lg font-bold" : "text-sm"}`}>
                                                {card.content}
                                            </span>
                                        </div>
                                    </button>
                                );
                            })}
                        </div>
                    )}

                    {gameState === "result" && (
                        <div className="text-center py-12 animate-fade-in-up">
                            <span className="text-6xl mb-4 block">🎉</span>
                            <h3 className="text-3xl font-bold text-[#181111] mb-2">Xuất sắc!</h3>
                            <p className="text-[#896161] mb-8">
                                Bạn đã hoàn thành trò chơi trong <strong>{moves}</strong> lần thử.
                            </p>

                            <div className="flex gap-3 justify-center">
                                <button
                                    onClick={startGame}
                                    className="flex items-center gap-2 px-6 py-3 rounded-xl bg-purple-600 text-white font-bold hover:bg-purple-700 transition-colors shadow-lg shadow-purple-600/20"
                                >
                                    <span className="material-symbols-outlined">replay</span>
                                    Chơi lại
                                </button>
                                <button
                                    onClick={onClose}
                                    className="flex items-center gap-2 px-6 py-3 rounded-xl bg-white border-2 border-gray-200 text-[#181111] font-bold hover:bg-gray-50 transition-colors"
                                >
                                    <span className="material-symbols-outlined">home</span>
                                    Về trang chủ
                                </button>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}
