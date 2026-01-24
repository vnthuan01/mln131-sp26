"use client";

import { heroContent } from "@/lib/content";

interface HeroSectionProps {
    onPlayGame: () => void;
}

export default function HeroSection({ onPlayGame }: HeroSectionProps) {
    const scrollToContent = () => {
        document.getElementById("content")?.scrollIntoView({ behavior: "smooth" });
    };

    return (
        <section id="hero" className="relative py-16 lg:py-24 overflow-hidden">
            {/* Background Decorations */}
            <div className="absolute -right-20 top-20 h-[500px] w-[500px] rounded-full bg-[#ee2b2b]/5 blur-3xl"></div>
            <div className="absolute -left-20 bottom-20 h-[300px] w-[300px] rounded-full bg-amber-500/5 blur-3xl"></div>

            <div className="max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex flex-col lg:flex-row items-center gap-12 lg:gap-20">
                    {/* Left Content */}
                    <div className="flex-1 text-center lg:text-left relative z-10">
                        {/* Badge */}
                        <div className="inline-flex items-center gap-2 mb-6">
                            <div className="h-[2px] w-8 bg-[#ee2b2b]"></div>
                            <span className="text-xs font-bold uppercase tracking-widest text-[#ee2b2b]">
                                {heroContent.badge}
                            </span>
                        </div>

                        {/* Title */}
                        <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black leading-[1.1] tracking-tight text-[#181111] mb-6">
                            {heroContent.title}
                            <br />
                            <span className="text-[#ee2b2b]">{heroContent.titleHighlight}</span>
                        </h1>

                        {/* Subtitle */}
                        <p className="max-w-[540px] text-lg font-medium leading-relaxed text-[#181111]/70 mb-8 mx-auto lg:mx-0">
                            {heroContent.subtitle}
                        </p>

                        {/* CTA Buttons */}
                        <div className="flex flex-wrap gap-4 justify-center lg:justify-start">
                            <button
                                onClick={scrollToContent}
                                className="flex h-12 min-w-[140px] cursor-pointer items-center justify-center gap-2 rounded-lg bg-[#ee2b2b] px-6 text-base font-bold text-white shadow-lg shadow-[#ee2b2b]/20 transition-all hover:bg-red-700 hover:shadow-[#ee2b2b]/40 hover:scale-105"
                            >
                                <span>{heroContent.ctaPrimary}</span>
                                <span className="material-symbols-outlined text-[20px]">
                                    arrow_forward
                                </span>
                            </button>
                            <button
                                onClick={onPlayGame}
                                className="flex h-12 min-w-[140px] cursor-pointer items-center justify-center gap-2 rounded-lg border border-[#e6e0e0] bg-white px-6 text-base font-bold text-[#181111] shadow-sm transition-all hover:bg-gray-50 hover:border-[#ee2b2b] hover:text-[#ee2b2b]"
                            >
                                <span className="material-symbols-outlined text-[20px]">
                                    sports_esports
                                </span>
                                <span>{heroContent.ctaSecondary}</span>
                            </button>
                        </div>

                        {/* Stats/Social Proof */}
                        <div className="mt-8 flex flex-col sm:flex-row items-center gap-4 justify-center lg:justify-start">
                            <div className="flex -space-x-3">
                                {[1, 2, 3].map((i) => (
                                    <div
                                        key={i}
                                        className="h-10 w-10 rounded-full border-2 border-white bg-gradient-to-br from-[#ee2b2b]/20 to-amber-500/20 flex items-center justify-center"
                                    >
                                        <span className="material-symbols-outlined text-[#ee2b2b] text-sm">
                                            person
                                        </span>
                                    </div>
                                ))}
                                <div className="flex h-10 w-10 items-center justify-center rounded-full border-2 border-white bg-[#ee2b2b] text-[10px] font-bold text-white">
                                    {heroContent.stats.students}
                                </div>
                            </div>
                            <div className="flex flex-col">
                                <div className="flex items-center gap-1">
                                    {[1, 2, 3, 4, 5].map((i) => (
                                        <span
                                            key={i}
                                            className="material-symbols-outlined text-sm text-yellow-500"
                                            style={{ fontVariationSettings: "'FILL' 1" }}
                                        >
                                            star
                                        </span>
                                    ))}
                                </div>
                                <p className="text-sm font-medium text-[#181111]/60">
                                    {heroContent.stats.studentsLabel}
                                </p>
                            </div>
                        </div>
                    </div>

                    {/* Right Content - Illustration */}
                    <div className="relative flex-1 w-full max-w-[500px]">
                        <div className="relative aspect-square overflow-hidden rounded-2xl bg-gradient-to-br from-[#ee2b2b]/10 to-amber-500/10 shadow-2xl shadow-[#ee2b2b]/10 ring-1 ring-black/5">
                            {/* Main Image Background */}
                            <div
                                className="h-full w-full bg-cover bg-center transition-transform duration-700 hover:scale-105"
                                style={{
                                    backgroundImage:
                                        'url("https://images.unsplash.com/photo-1583417319070-4a69db38a482?w=600&h=600&fit=crop")',
                                }}
                            ></div>

                            {/* Overlay Gradient */}
                            <div className="absolute inset-0 bg-gradient-to-tr from-[#ee2b2b]/30 to-transparent mix-blend-multiply"></div>

                            {/* Floating Card 1 */}
                            <div className="absolute -left-3 top-50 hidden sm:flex flex-col gap-1 rounded-xl bg-white p-4 shadow-xl animate-bounce-subtle">
                                <div className="flex items-center gap-3">
                                    <div className="flex h-10 w-10 items-center justify-center rounded-full bg-green-100 text-green-600">
                                        <span className="material-symbols-outlined">diversity_3</span>
                                    </div>
                                    <div>
                                        <p className="text-xs font-bold text-gray-500">Chủ đề</p>
                                        <p className="text-sm font-bold text-[#181111]">54 Dân tộc</p>
                                        <p className="text-xs text-gray-400">Anh em một nhà</p>
                                    </div>
                                </div>
                            </div>

                            {/* Floating Card 2 */}
                            <div className="absolute -right-3 top-24 hidden sm:flex flex-col gap-1 rounded-xl bg-white p-4 shadow-xl animate-bounce-subtle">
                                <div className="flex items-center gap-3">
                                    <div className="flex h-10 w-10 items-center justify-center rounded-full bg-amber-100 text-amber-600">
                                        <span className="material-symbols-outlined">temple_buddhist</span>
                                    </div>
                                    <div>
                                        <p className="text-xs font-bold text-gray-500">Tín ngưỡng và văn hóa</p>
                                        <p className="text-sm font-bold text-[#181111]">Tôn giáo</p>
                                        <p className="text-xs text-gray-400">Đoàn kết là sức mạnh</p>
                                    </div>
                                </div>
                            </div>
                            {/* Floating Card - Vietnam */}
                            <div className="absolute -left-4 top-8 hidden sm:flex flex-col gap-1 rounded-xl bg-white p-4 shadow-xl animate-bounce-subtle">
                                <div className="flex items-center gap-3">
                                    <div className="flex h-10 w-10 items-center justify-center rounded-full bg-red-100 text-red-600">
                                        <span className="material-symbols-outlined">flag</span>
                                    </div>
                                    <div>
                                        <p className="text-xs font-bold text-gray-500">Quốc gia</p>
                                        <p className="text-sm font-bold text-[#181111]">Nước Việt Nam</p>
                                        <p className="text-xs text-gray-400">Độc lập – Thống nhất</p>
                                    </div>
                                </div>
                            </div>
                            {/* Floating Card - Socialism */}
                            <div className="absolute -right-4 bottom-40 hidden sm:flex flex-col gap-1 rounded-xl bg-white p-4 shadow-xl animate-bounce-subtle">
                                <div className="flex items-center gap-3">
                                    <div className="flex h-10 w-10 items-center justify-center rounded-full bg-yellow-100 text-yellow-600">
                                        <span className="material-symbols-outlined">diversity_3</span>
                                    </div>
                                    <div>
                                        <p className="text-xs font-bold text-gray-500">Lý tưởng</p>
                                        <p className="text-sm font-bold text-[#181111]">Chủ nghĩa Xã hội</p>
                                        <p className="text-xs text-gray-400">Dân giàu – Nước mạnh</p>
                                    </div>
                                </div>
                            </div>
                            {/* Floating Card - Socialism */}
                            <div className="absolute -left-3 bottom-8 hidden sm:flex flex-col gap-1 rounded-xl bg-white p-4 shadow-xl animate-bounce-subtle">
                                <div className="flex items-center gap-3">
                                    <div className="flex h-10 w-10 items-center justify-center rounded-full bg-blue-100 text-blue-600">
                                        <span className="material-symbols-outlined">hub</span>
                                    </div>
                                    <div>
                                        <p className="text-xs font-bold text-gray-500">Liên kết</p>
                                        <p className="text-sm font-bold text-[#181111]">Dân tộc và Quốc gia</p>
                                        <p className="text-xs text-gray-400">Đoàn kết là sức mạnh</p>
                                    </div>
                                </div>
                            </div>

                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
