"use client";

import { useState, useEffect } from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import HeroSection from "@/components/HeroSection";
import ContentSection from "@/components/ContentSection";
import ProgressIndicator from "@/components/ProgressIndicator";
import PuzzleGame from "@/components/PuzzleGame";
import KnowledgeQuizGame from "@/components/KnowledgeQuizGame";
import MatchConceptsGame from "@/components/MatchConceptsGame";
import GameSelectionModal from "@/components/GameSelectionModal";
import { sections, introContent, conclusionContent } from "@/lib/content";
import FlashcardSection from "@/components/FlashcardSection";

export default function Home() {
  const [isGameSelectionOpen, setIsGameSelectionOpen] = useState(false);
  const [isPuzzleOpen, setIsPuzzleOpen] = useState(false);
  const [isQuizGameOpen, setIsQuizGameOpen] = useState(false);
  const [isMatchGameOpen, setIsMatchGameOpen] = useState(false);
  const [currentSection, setCurrentSection] = useState(0);

  // Track scroll position to update current section
  useEffect(() => {
    const handleScroll = () => {
      // Check if user has scrolled to the bottom of the page
      const windowHeight = window.innerHeight;
      const documentHeight = document.documentElement.scrollHeight;
      const scrollTop = window.scrollY; // Use window.scrollY instead of document.documentElement.scrollTop for better compatibility

      // If we are at the bottom (allow for 20px threshold), select the last section
      if (windowHeight + scrollTop >= documentHeight - 50) {
        setCurrentSection(sections.length - 1);
        return;
      }

      const sectionElements = sections.map((section) =>
        document.getElementById(section.id)
      );

      const scrollPosition = window.scrollY + 200;

      for (let i = sectionElements.length - 1; i >= 0; i--) {
        const element = sectionElements[i];
        if (element && element.offsetTop <= scrollPosition) {
          setCurrentSection(i);
          break;
        }
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <>
      <Header />

      <main className="flex-grow">
        {/* Hero Section */}
        <HeroSection onPlayGame={() => setIsGameSelectionOpen(true)} />

        {/* Introduction */}
        <section className="py-12 bg-white">
          <div className="max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-4xl mx-auto text-center">
              <h2 className="text-2xl md:text-3xl font-bold text-[#181111] mb-6">
                {introContent.title}
              </h2>
              <div className="prose prose-lg max-w-none text-[#181111]/80 leading-relaxed">
                {introContent.content.split("\n\n").map((paragraph, index) => (
                  <p key={index} className="mb-4">
                    {paragraph}
                  </p>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Progress Indicator */}
        <div id="content">
          <ProgressIndicator
            currentSection={currentSection}
            totalSections={sections.length}
            sectionTitles={sections.map((s) => s.title)}
          />
        </div>

        {/* Content Sections */}
        {sections.map((section, index) => (
          <ContentSection
            key={section.id}
            section={section}
            index={index}
          />
        ))}

        {/* Flashcard Section - New dedicated section */}
        <FlashcardSection />

        {/* Conclusion */}
        <section className="py-16 bg-gradient-to-b from-[#f8f6f6] to-white">
          <div className="max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-4xl mx-auto text-center">
              <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-[#ee2b2b]/10 text-[#ee2b2b] mb-6">
                <span className="material-symbols-outlined text-3xl">
                  auto_stories
                </span>
              </div>
              <h2 className="text-2xl md:text-3xl font-bold text-[#181111] mb-6">
                {conclusionContent.title}
              </h2>
              <div className="prose prose-lg max-w-none text-[#181111]/80 leading-relaxed">
                {conclusionContent.content.split("\n\n").map((paragraph, index) => (
                  <p key={index} className="mb-4">
                    {paragraph}
                  </p>
                ))}
              </div>

              {/* Final CTA */}
              <div className="mt-10 flex flex-wrap justify-center gap-4">
                <button
                  onClick={() => setIsGameSelectionOpen(true)}
                  className="flex items-center gap-2 px-8 py-4 rounded-xl bg-[#ee2b2b] text-white font-bold shadow-lg shadow-[#ee2b2b]/20 hover:bg-red-700 hover:scale-105 transition-all"
                >
                  <span className="material-symbols-outlined">
                    sports_esports
                  </span>
                  Chơi game học tập
                </button>
                <a
                  href="#hero"
                  className="flex items-center gap-2 px-8 py-4 rounded-xl border-2 border-[#ee2b2b] text-[#ee2b2b] font-bold hover:bg-[#ee2b2b]/5 transition-all"
                >
                  <span className="material-symbols-outlined">
                    arrow_upward
                  </span>
                  Về đầu trang
                </a>
              </div>
            </div>
          </div>
        </section>

        {/* Games Section Preview */}
        <section id="game" className="py-16 bg-white border-t border-gray-100">
          <div className="max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-10">
              <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#ee2b2b]/10 text-[#ee2b2b] text-xs font-bold uppercase tracking-wider mb-4">
                <span className="material-symbols-outlined text-[16px]">
                  stadia_controller
                </span>
                Học mà chơi
              </div>
              <h2 className="text-2xl md:text-3xl font-bold text-[#181111] mb-4">
                Trò Chơi Giáo Dục
              </h2>
              <p className="text-[#896161] max-w-2xl mx-auto">
                Củng cố kiến thức thông qua các trò chơi tương tác thú vị
              </p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {/* Puzzle Game Card */}
              <div className="group bg-gradient-to-br from-[#ee2b2b]/5 to-amber-500/5 rounded-xl p-6 border-2 border-[#ee2b2b]/20 hover:border-[#ee2b2b]/50 transition-all card-hover">
                <div className="flex items-center justify-between mb-4">
                  <span className="px-3 py-1 rounded-md bg-[#ee2b2b]/10 text-xs font-bold text-[#ee2b2b] uppercase tracking-wide">
                    Ghép hình
                  </span>
                  <div className="flex items-center gap-1 text-xs text-[#896161]">
                    <span className="material-symbols-outlined text-[16px]">
                      timer
                    </span>
                    2-5 phút
                  </div>
                </div>
                <div className="w-16 h-16 rounded-full bg-[#ee2b2b]/10 flex items-center justify-center mb-4 text-[#ee2b2b] group-hover:bg-[#ee2b2b] group-hover:text-white transition-colors duration-300">
                  <span className="material-symbols-outlined text-3xl">
                    extension
                  </span>
                </div>
                <h3 className="text-xl font-bold text-[#181111] mb-2">
                  Ghép Hình Tri Thức
                </h3>
                <p className="text-[#896161] text-sm mb-6">
                  Ghép các mảnh hình ảnh về văn hóa dân tộc và tôn giáo.
                </p>
                <button
                  onClick={() => setIsPuzzleOpen(true)}
                  className="w-full py-3 rounded-lg bg-[#ee2b2b] text-white font-bold hover:bg-red-700 transition-colors flex items-center justify-center gap-2"
                >
                  Chơi ngay
                  <span className="material-symbols-outlined text-[18px]">
                    play_arrow
                  </span>
                </button>
              </div>

              {/* Knowledge Quiz Game Card */}
              <div className="group bg-gradient-to-br from-blue-500/5 to-indigo-500/5 rounded-xl p-6 border-2 border-blue-500/20 hover:border-blue-500/50 transition-all card-hover">
                <div className="flex items-center justify-between mb-4">
                  <span className="px-3 py-1 rounded-md bg-blue-500/10 text-xs font-bold text-blue-600 uppercase tracking-wide">
                    Trắc nghiệm
                  </span>
                  <div className="flex items-center gap-1 text-xs text-[#896161]">
                    <span className="material-symbols-outlined text-[16px]">
                      timer
                    </span>
                    3-5 phút
                  </div>
                </div>
                <div className="w-16 h-16 rounded-full bg-blue-500/10 flex items-center justify-center mb-4 text-blue-600 group-hover:bg-blue-600 group-hover:text-white transition-colors duration-300">
                  <span className="material-symbols-outlined text-3xl">
                    quiz
                  </span>
                </div>
                <h3 className="text-xl font-bold text-[#181111] mb-2">
                  Đố Vui Kiến Thức
                </h3>
                <p className="text-[#896161] text-sm mb-6">
                  Trả lời các câu hỏi trắc nghiệm với thời gian giới hạn.
                </p>
                <button
                  onClick={() => setIsQuizGameOpen(true)}
                  className="w-full py-3 rounded-lg bg-blue-600 text-white font-bold hover:bg-blue-700 transition-colors flex items-center justify-center gap-2"
                >
                  Chơi ngay
                  <span className="material-symbols-outlined text-[18px]">
                    play_arrow
                  </span>
                </button>
              </div>

              {/* Match Concepts Game Card */}
              <div className="group bg-gradient-to-br from-purple-500/5 to-pink-500/5 rounded-xl p-6 border-2 border-purple-500/20 hover:border-purple-500/50 transition-all card-hover">
                <div className="flex items-center justify-between mb-4">
                  <span className="px-3 py-1 rounded-md bg-purple-500/10 text-xs font-bold text-purple-600 uppercase tracking-wide">
                    Ghép đôi
                  </span>
                  <div className="flex items-center gap-1 text-xs text-[#896161]">
                    <span className="material-symbols-outlined text-[16px]">
                      timer
                    </span>
                    4-6 phút
                  </div>
                </div>
                <div className="w-16 h-16 rounded-full bg-purple-500/10 flex items-center justify-center mb-4 text-purple-600 group-hover:bg-purple-600 group-hover:text-white transition-colors duration-300">
                  <span className="material-symbols-outlined text-3xl">
                    match_word
                  </span>
                </div>
                <h3 className="text-xl font-bold text-[#181111] mb-2">
                  Ghép Khái Niệm
                </h3>
                <p className="text-[#896161] text-sm mb-6">
                  Kéo thả để nối khái niệm với định nghĩa tương ứng.
                </p>
                <button
                  onClick={() => setIsMatchGameOpen(true)}
                  className="w-full py-3 rounded-lg bg-purple-600 text-white font-bold hover:bg-purple-700 transition-colors flex items-center justify-center gap-2"
                >
                  Chơi ngay
                  <span className="material-symbols-outlined text-[18px]">
                    play_arrow
                  </span>
                </button>
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer />

      {/* Game Modals */}
      <GameSelectionModal
        isOpen={isGameSelectionOpen}
        onClose={() => setIsGameSelectionOpen(false)}
        onSelectPuzzle={() => setIsPuzzleOpen(true)}
        onSelectQuiz={() => setIsQuizGameOpen(true)}
        onSelectMatch={() => setIsMatchGameOpen(true)}
      />
      <PuzzleGame isOpen={isPuzzleOpen} onClose={() => setIsPuzzleOpen(false)} />
      <KnowledgeQuizGame isOpen={isQuizGameOpen} onClose={() => setIsQuizGameOpen(false)} />
      <MatchConceptsGame isOpen={isMatchGameOpen} onClose={() => setIsMatchGameOpen(false)} />
    </>
  );
}
