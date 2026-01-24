"use client";

import { useState, useCallback, useEffect } from "react";
import { puzzleGameContent } from "@/lib/content";

interface PuzzleGameProps {
    isOpen: boolean;
    onClose: () => void;
}

interface PuzzleTile {
    id: number;
    currentPosition: number;
    correctPosition: number;
}

export default function PuzzleGame({ isOpen, onClose }: PuzzleGameProps) {
    const [tiles, setTiles] = useState<PuzzleTile[]>([]);
    const [selectedTile, setSelectedTile] = useState<number | null>(null);
    const [moves, setMoves] = useState(0);
    const [isCompleted, setIsCompleted] = useState(false);
    const [currentImageIndex, setCurrentImageIndex] = useState(0);

    // Initialize puzzle
    const initializePuzzle = useCallback(() => {
        // Ensure tiles are reset
        setTiles([]);
        const positions = [0, 1, 2, 3, 4, 5, 6, 7, 8];
        // Shuffle positions
        for (let i = positions.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [positions[i], positions[j]] = [positions[j], positions[i]];
        }

        const newTiles = positions.map((pos, index) => ({
            id: index,
            currentPosition: pos,
            correctPosition: index,
        }));

        setTiles(newTiles);
        setMoves(0);
        setIsCompleted(false);
        setSelectedTile(null);
    }, []);

    // Initialize on mount and when opening
    useEffect(() => {
        if (isOpen) {
            initializePuzzle();
            setCurrentImageIndex(Math.floor(Math.random() * puzzleGameContent.images.length));
        }
    }, [isOpen, initializePuzzle]);

    // Check if puzzle is solved
    const checkCompletion = useCallback((currentTiles: PuzzleTile[]) => {
        const isSolved = currentTiles.every(
            (tile) => tile.currentPosition === tile.correctPosition
        );
        if (isSolved) {
            setIsCompleted(true);
        }
    }, []);

    // Handle tile click
    const handleTileClick = (tileId: number) => {
        if (isCompleted) return;

        if (selectedTile === null) {
            setSelectedTile(tileId);
        } else if (selectedTile === tileId) {
            setSelectedTile(null);
        } else {
            // Swap tiles
            const newTiles = tiles.map((tile) => {
                if (tile.id === selectedTile) {
                    const otherTile = tiles.find((t) => t.id === tileId);
                    return { ...tile, currentPosition: otherTile!.currentPosition };
                }
                if (tile.id === tileId) {
                    const otherTile = tiles.find((t) => t.id === selectedTile);
                    return { ...tile, currentPosition: otherTile!.currentPosition };
                }
                return tile;
            });

            setTiles(newTiles);
            setMoves((prev) => prev + 1);
            setSelectedTile(null);
            checkCompletion(newTiles);
        }
    };

    // Get tile position in grid
    const getTileGridPosition = (position: number) => {
        const row = Math.floor(position / 3);
        const col = position % 3;
        return { row, col };
    };



    const currentImage = puzzleGameContent.images[currentImageIndex];
    const completionMessage = puzzleGameContent.completionMessages[currentImageIndex];

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-fade-in-up">
            <div className="bg-white rounded-2xl shadow-2xl w-full max-h-[90vh] overflow-y-auto max-w-2xl md:max-w-6xl transition-all duration-300">
                {/* Header */}
                <div className="p-6 border-b border-gray-100">
                    <div className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-[#ee2b2b]/10 text-[#ee2b2b]">
                                <span className="material-symbols-outlined text-2xl">
                                    extension
                                </span>
                            </div>
                            <div>
                                <h2 className="text-xl font-bold text-[#181111]">
                                    {puzzleGameContent.title}
                                </h2>
                                <p className="text-sm text-[#896161]">
                                    {puzzleGameContent.subtitle}
                                </p>
                            </div>
                        </div>
                        <button
                            onClick={onClose}
                            className="p-2 rounded-lg hover:bg-gray-100 transition-colors"
                        >
                            <span className="material-symbols-outlined text-[#896161]">
                                close
                            </span>
                        </button>
                    </div>
                </div>

                <div className="p-6">
                    {!isCompleted ? (
                        <div className="flex flex-col md:flex-row gap-8">
                            {/* Left Side: Puzzle Grid */}
                            <div className="flex-1">
                                <div className="relative aspect-square bg-gray-100 rounded-xl overflow-hidden shadow-inner">
                                    <div className="grid grid-cols-3 gap-1 h-full p-1">
                                        {[0, 1, 2, 3, 4, 5, 6, 7, 8].map((position) => {
                                            const tile = tiles.find((t) => t.currentPosition === position);
                                            if (!tile) return null;

                                            const isSelected = selectedTile === tile.id;
                                            const isCorrect = tile.currentPosition === tile.correctPosition;

                                            return (
                                                <button
                                                    key={position}
                                                    onClick={() => handleTileClick(tile.id)}
                                                    className={`relative overflow-hidden rounded-lg transition-all ${isSelected
                                                        ? "ring-4 ring-[#ee2b2b] scale-95 z-10"
                                                        : isCorrect
                                                            ? "ring-2 ring-green-500 z-0"
                                                            : "hover:scale-98 z-0"
                                                        }`}
                                                >
                                                    <div
                                                        className="absolute inset-0 pointer-events-none"
                                                        style={{
                                                            width: "300%",
                                                            height: "300%",
                                                            left: `-${(tile.correctPosition % 3) * 100}%`,
                                                            top: `-${Math.floor(tile.correctPosition / 3) * 100}%`,
                                                        }}
                                                    >
                                                        <img
                                                            src={currentImage.src}
                                                            alt=""
                                                            className="w-full h-full object-cover max-w-none"
                                                        />
                                                    </div>
                                                    {/* Tile Number Overlay */}
                                                    <div
                                                        className={`absolute inset-0 flex items-center justify-center ${isSelected
                                                            ? "bg-[#ee2b2b]/30"
                                                            : "bg-black/10 hover:bg-black/5"
                                                            } transition-colors`}
                                                    >
                                                        {isSelected && (
                                                            <span className="material-symbols-outlined text-white text-2xl">
                                                                touch_app
                                                            </span>
                                                        )}
                                                    </div>
                                                </button>
                                            );
                                        })}
                                    </div>
                                </div>
                            </div>

                            {/* Right Side: Info & Controls */}
                            <div className="w-full md:w-80 flex flex-col gap-4">
                                {/* Instructions */}
                                <div className="flex items-center gap-2 p-3 bg-blue-50 rounded-lg">
                                    <span className="material-symbols-outlined text-blue-600">
                                        info
                                    </span>
                                    <p className="text-sm text-blue-800">
                                        Nhấp vào hai ô để hoán đổi vị trí. Ghép đúng hình ảnh để hoàn thành!
                                    </p>
                                </div>

                                {/* Stats */}
                                <div className="bg-gray-50 p-4 rounded-xl border border-gray-100">
                                    <div className="flex items-center justify-between mb-4">
                                        <div className="flex items-center gap-2">
                                            <span className="material-symbols-outlined text-[#ee2b2b]">
                                                swap_horiz
                                            </span>
                                            <span className="text-sm font-medium text-[#181111]">
                                                Số lần di chuyển
                                            </span>
                                        </div>
                                        <span className="text-xl font-bold text-[#ee2b2b]">{moves}</span>
                                    </div>

                                    <div className="grid grid-cols-2 gap-2">
                                        <button
                                            onClick={initializePuzzle}
                                            className="flex items-center justify-center gap-1 px-3 py-2 bg-white border border-gray-200 rounded-lg text-sm text-[#896161] hover:text-[#ee2b2b] hover:border-[#ee2b2b] transition-all"
                                        >
                                            <span className="material-symbols-outlined text-sm">
                                                restart_alt
                                            </span>
                                            Chơi lại
                                        </button>
                                        <button
                                            onClick={() => {
                                                setCurrentImageIndex((prev) => (prev + 1) % puzzleGameContent.images.length);
                                                setTimeout(initializePuzzle, 0);
                                            }}
                                            className="flex items-center justify-center gap-1 px-3 py-2 bg-white border border-gray-200 rounded-lg text-sm text-[#896161] hover:text-[#ee2b2b] hover:border-[#ee2b2b] transition-all"
                                        >
                                            <span className="material-symbols-outlined text-sm">
                                                skip_next
                                            </span>
                                            Ảnh khác
                                        </button>
                                    </div>
                                </div>

                                {/* Preview */}
                                <div className="bg-white p-4 rounded-xl border border-gray-100 shadow-sm flex-1 flex flex-col">
                                    <span className="text-xs font-bold text-[#896161] uppercase tracking-wider mb-2">
                                        Hình mẫu
                                    </span>
                                    <div className="w-full aspect-video rounded-lg overflow-hidden border border-gray-100 mb-2">
                                        <img
                                            src={currentImage.src}
                                            alt={currentImage.alt}
                                            className="w-full h-full object-cover"
                                        />
                                    </div>
                                    <p className="text-sm text-[#181111] font-medium text-center">{currentImage.alt}</p>
                                </div>
                            </div>
                        </div>
                    ) : (
                        /* Completion State */
                        <div className="text-center py-8">
                            <div className="animate-bounce-subtle">
                                <span className="material-symbols-outlined text-6xl text-[#ee2b2b]">
                                    celebration
                                </span>
                            </div>
                            <h3 className="text-2xl font-bold text-[#181111] mt-4">
                                {completionMessage.title}
                            </h3>
                            <p className="text-[#896161] mt-2">
                                Hoàn thành trong <strong>{moves}</strong> lần di chuyển
                            </p>

                            {/* Completed Image */}
                            <div className="mt-6 rounded-xl overflow-hidden shadow-lg">
                                <img
                                    src={currentImage.src}
                                    alt={currentImage.alt}
                                    className="w-full h-full object-cover"
                                />
                            </div>

                            {/* Educational Message */}
                            <div className="mt-6 p-4 bg-gradient-to-r from-[#ee2b2b]/10 to-amber-500/10 rounded-xl">
                                <div className="flex items-center justify-center gap-2 mb-2">
                                    <span className="material-symbols-outlined text-[#ee2b2b]">
                                        school
                                    </span>
                                    <span className="font-bold text-[#ee2b2b]">
                                        {completionMessage.concept}
                                    </span>
                                </div>
                                <p className="text-[#181111]/80 text-sm">
                                    {completionMessage.description}
                                </p>
                                <p className="text-[#896161] text-sm mt-3 italic">
                                    {currentImage.message}
                                </p>
                            </div>

                            {/* Actions */}
                            <div className="mt-6 flex gap-3 justify-center">
                                <button
                                    onClick={initializePuzzle}
                                    className="flex items-center gap-2 px-6 py-3 rounded-lg bg-[#ee2b2b] text-white font-bold hover:bg-red-700 transition-colors"
                                >
                                    <span className="material-symbols-outlined text-sm">
                                        replay
                                    </span>
                                    Chơi lại
                                </button>
                                <button
                                    onClick={() => {
                                        setCurrentImageIndex((prev) => (prev + 1) % puzzleGameContent.images.length);
                                        setTimeout(initializePuzzle, 0);
                                    }}
                                    className="flex items-center gap-2 px-6 py-3 rounded-lg border border-gray-200 text-[#181111] font-bold hover:bg-gray-50 transition-colors cursor-pointer"
                                >
                                    Tiếp tục học
                                </button>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}
