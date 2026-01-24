"use client";

import { useEffect, useState } from "react";

interface ProgressIndicatorProps {
    currentSection: number;
    totalSections: number;
    sectionTitles: string[];
}

export default function ProgressIndicator({
    currentSection,
    totalSections,
    sectionTitles,
}: ProgressIndicatorProps) {
    const progress = ((currentSection + 1) / totalSections) * 100;
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        setMounted(true);
    }, []);

    if (!mounted) return null;

    return (
        <>
            {/* Mobile/Tablet Horizontal Bar (Visible < md) */}
            <div className="md:hidden sticky top-16 z-40 bg-white/95 backdrop-blur-sm border-b border-[#f4f0f0] py-3 transition-transform duration-300">
                <div className="px-4">
                    <div className="flex items-center justify-between mb-2">
                        <span className="text-xs font-bold text-[#896161]">
                            {currentSection + 1}/{totalSections}: {sectionTitles[currentSection]}
                        </span>
                        <span className="text-xs text-[#ee2b2b] font-bold">
                            {Math.round(progress)}%
                        </span>
                    </div>
                    <div className="h-1.5 w-full bg-[#f4f4f4] rounded-full overflow-hidden">
                        <div
                            className="h-full bg-[#ee2b2b] transition-all duration-500 ease-out rounded-full"
                            style={{ width: `${progress}%` }}
                        ></div>
                    </div>
                </div>
            </div>

            {/* Desktop Vertical Sidebar (Visible >= md) */}
            <div className="hidden md:flex fixed left-8 top-1/2 -translate-y-1/2 z-40 flex-col gap-8">
                {/* Connector Line */}
                <div className="absolute left-[15px] top-4 bottom-4 w-[2px] bg-gradient-to-b from-transparent via-[#e6dbdb] to-transparent -z-10"></div>

                {sectionTitles.map((title, index) => {
                    const isActive = index === currentSection;
                    const isPast = index < currentSection;

                    return (
                        <div key={index} className="group relative flex items-center gap-4">
                            {/* Dot / Indicator */}
                            <div
                                className={`relative z-10 flex h-8 w-8 items-center justify-center rounded-full border-2 transition-all duration-300 ${isActive
                                    ? "border-[#ee2b2b] bg-white scale-110 shadow-lg shadow-[#ee2b2b]/20"
                                    : isPast
                                        ? "border-[#ee2b2b] bg-[#ee2b2b]"
                                        : "border-gray-200 bg-white group-hover:border-[#ee2b2b]/50"
                                    }`}
                            >
                                {isPast ? (
                                    <span className="material-symbols-outlined text-white text-[16px] font-bold">
                                        check
                                    </span>
                                ) : (
                                    <span
                                        className={`text-xs font-bold transition-colors ${isActive ? "text-[#ee2b2b]" : "text-gray-400 group-hover:text-gray-600"
                                            }`}
                                    >
                                        {index + 1}
                                    </span>
                                )}

                                {/* Active Pulse Ring */}
                                {isActive && (
                                    <span className="absolute inset-0 -z-10 animate-ping rounded-full bg-[#ee2b2b]/20"></span>
                                )}
                            </div>

                            {/* Label */}
                            <div
                                className={`absolute left-10 w-max max-w-[200px] rounded-lg px-3 py-2 text-sm font-medium transition-all duration-300 ${isActive
                                    ? "bg-[#ee2b2b] text-white opacity-340 translate-x-0 shadow-lg shadow-[#ee2b2b]/10 "
                                    : "bg-white text-gray-600 opacity-0 -translate-x-4 shadow-soft group-hover:opacity-100 group-hover:translate-x-0 "
                                    }`}
                            >
                                {title}
                                {/* Arrow pointer */}
                                <div
                                    className={`absolute top-1/2 -left-1 -mt-1 h-2 w-2 -rotate-45 transform ${isActive ? "bg-[#ee2b2b]" : "bg-white"
                                        }`}
                                ></div>
                            </div>
                        </div>
                    );
                })}
            </div>
        </>
    );
}
