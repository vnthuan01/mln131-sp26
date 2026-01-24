"use client";

import { useState } from "react";
import { navItems, siteConfig } from "@/lib/content";

export default function Header() {
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

    return (
        <header className="sticky top-0 z-50 w-full bg-white/95 backdrop-blur-sm border-b border-[#f4f0f0]">
            <div className="max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-8">
                <nav className="flex items-center justify-between h-16">
                    {/* Logo & Brand */}
                    <div className="flex items-center gap-3">
                        <span className="material-symbols-outlined text-3xl text-[#ee2b2b]">
                            local_library
                        </span>
                        <h2 className="text-[#181111] text-xl font-bold tracking-tight">
                            {siteConfig.name}
                        </h2>
                    </div>

                    {/* Desktop Navigation */}
                    <div className="hidden md:flex items-center gap-6">
                        {navItems.map((item, index) => (
                            <a
                                key={index}
                                href={item.href}
                                className="text-[#181111] hover:text-[#ee2b2b] text-sm font-medium transition-colors"
                            >
                                {item.label}
                            </a>
                        ))}
                    </div>

                    {/* Actions */}
                    <div className="flex items-center gap-3">
                        {/* Desktop Search */}
                        <div className="hidden lg:flex items-center bg-[#f4f0f0] rounded-lg px-3 py-2 w-48">
                            <span className="material-symbols-outlined text-[#896161] text-[20px]">
                                search
                            </span>
                            <input
                                className="bg-transparent border-none focus:ring-0 focus:outline-none text-sm w-full text-[#181111] placeholder:text-[#896161] ml-2"
                                placeholder="Tìm kiếm..."
                                type="text"
                            />
                        </div>

                        {/* Mobile Menu Button */}
                        <button
                            className="md:hidden p-2 rounded-lg hover:bg-gray-100 transition-colors"
                            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                        >
                            <span className="material-symbols-outlined text-[#181111]">
                                {mobileMenuOpen ? "close" : "menu"}
                            </span>
                        </button>
                    </div>
                </nav>

                {/* Mobile Menu */}
                {mobileMenuOpen && (
                    <div className="md:hidden py-4 border-t border-[#f4f0f0] animate-fade-in-up">
                        <div className="flex flex-col gap-4">
                            {navItems.map((item, index) => (
                                <a
                                    key={index}
                                    href={item.href}
                                    className="text-[#181111] hover:text-[#ee2b2b] text-base font-medium transition-colors px-2 py-1"
                                    onClick={() => setMobileMenuOpen(false)}
                                >
                                    {item.label}
                                </a>
                            ))}
                        </div>
                    </div>
                )}
            </div>
        </header>
    );
}
