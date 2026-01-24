"use client";

import QuizCard from "./QuizCard";
import EducationalTip from "./EducationalTip";

interface Principle {
    title: string;
    description: string;
    vietnam: string;
}

interface Subsection {
    title: string;
    content?: string;
    points?: string[];
    note?: string;
    highlight?: string;
    principles?: Principle[];
    examples?: string[];
    quote?: string;
    distinction?: string[];
}

interface SectionData {
    id: string;
    number: string;
    title: string;
    icon: string;
    color: string;
    subsections: Subsection[];
    quiz: {
        question: string;
        options: string[];
        correctIndex: number;
        explanation: string;
    };
    tip: {
        title: string;
        content: string;
    };
}

interface ContentSectionProps {
    section: SectionData;
    index: number;
}

const colorClasses: Record<string, { bg: string; text: string; border: string; light: string }> = {
    primary: {
        bg: "bg-[#ee2b2b]",
        text: "text-[#ee2b2b]",
        border: "border-[#ee2b2b]",
        light: "bg-[#ee2b2b]/10",
    },
    blue: {
        bg: "bg-blue-600",
        text: "text-blue-600",
        border: "border-blue-600",
        light: "bg-blue-600/10",
    },
    amber: {
        bg: "bg-amber-600",
        text: "text-amber-600",
        border: "border-amber-600",
        light: "bg-amber-600/10",
    },
    green: {
        bg: "bg-green-600",
        text: "text-green-600",
        border: "border-green-600",
        light: "bg-green-600/10",
    },
};

export default function ContentSection({ section, index }: ContentSectionProps) {
    const colors = colorClasses[section.color] || colorClasses.primary;

    return (
        <section
            id={section.id}
            className={`py-12 ${index % 2 === 1 ? "bg-white" : "bg-[#f8f6f6]"}`}
        >
            <div className="max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-8">
                {/* Section Header */}
                <div className="flex items-center gap-4 mb-8">
                    <div
                        className={`flex h-14 w-14 items-center justify-center rounded-xl ${colors.light} ${colors.text}`}
                    >
                        <span className="material-symbols-outlined text-3xl">
                            {section.icon}
                        </span>
                    </div>
                    <div>
                        <span className={`text-sm font-bold uppercase tracking-widest ${colors.text}`}>
                            Phần {section.number}
                        </span>
                        <h2 className="text-2xl md:text-3xl font-bold text-[#181111]">
                            {section.title}
                        </h2>
                    </div>
                </div>

                {/* Subsections Grid */}
                <div className="grid lg:grid-cols-3 gap-8">
                    {/* Main Content (2 columns) */}
                    <div className="lg:col-span-2 space-y-8">
                        {section.subsections.map((subsection, subIndex) => (
                            <div
                                key={subIndex}
                                className="bg-white rounded-xl p-6 shadow-soft border border-gray-100 card-hover"
                            >
                                <h3 className={`text-lg font-bold ${colors.text} mb-4`}>
                                    {subsection.title}
                                </h3>

                                {subsection.content && (
                                    <p className="text-[#181111]/80 mb-4 leading-relaxed">
                                        {subsection.content}
                                    </p>
                                )}

                                {subsection.points && (
                                    <ul className="space-y-2 mb-4">
                                        {subsection.points.map((point, pointIndex) => (
                                            <li
                                                key={pointIndex}
                                                className="flex items-start gap-3 text-[#181111]/80"
                                            >
                                                <span className={`material-symbols-outlined text-sm ${colors.text} mt-1`}>
                                                    check_circle
                                                </span>
                                                <span>{point}</span>
                                            </li>
                                        ))}
                                    </ul>
                                )}

                                {subsection.principles && (
                                    <div className="space-y-4">
                                        {subsection.principles.map((principle, pIndex) => (
                                            <div
                                                key={pIndex}
                                                className={`p-4 rounded-lg ${colors.light} border-l-4 ${colors.border}`}
                                            >
                                                <h4 className={`font-bold ${colors.text} mb-2`}>
                                                    ({pIndex + 1}) {principle.title}
                                                </h4>
                                                <p className="text-[#181111]/80 text-sm mb-2">
                                                    {principle.description}
                                                </p>
                                                <div className="bg-white/50 rounded p-3 mt-2">
                                                    <span className="text-xs font-bold text-[#896161] uppercase tracking-wider">
                                                        📍 Thực tế Việt Nam:
                                                    </span>
                                                    <p className="text-sm text-[#181111]/80 mt-1">
                                                        {principle.vietnam}
                                                    </p>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                )}

                                {subsection.examples && (
                                    <div className="mt-4 p-4 bg-gray-50 rounded-lg">
                                        <span className="text-xs font-bold text-[#896161] uppercase tracking-wider">
                                            📍 Ví dụ thực tế:
                                        </span>
                                        <ul className="mt-2 space-y-1">
                                            {subsection.examples.map((example, eIndex) => (
                                                <li key={eIndex} className="text-sm text-[#181111]/80 flex items-start gap-2">
                                                    <span className="text-[#ee2b2b]">•</span>
                                                    {example}
                                                </li>
                                            ))}
                                        </ul>
                                    </div>
                                )}

                                {subsection.distinction && (
                                    <div className="mt-4 grid grid-cols-2 gap-4">
                                        <div className="p-3 bg-green-50 rounded-lg border border-green-200">
                                            <span className="text-green-700 font-bold text-sm">✓ {subsection.distinction[0]}</span>
                                        </div>
                                        <div className="p-3 bg-red-50 rounded-lg border border-red-200">
                                            <span className="text-red-700 font-bold text-sm">✗ {subsection.distinction[1]}</span>
                                        </div>
                                    </div>
                                )}

                                {subsection.quote && (
                                    <blockquote className="mt-4 p-4 bg-gray-50 rounded-lg border-l-4 border-gray-300 italic text-[#181111]/70">
                                        {subsection.quote}
                                    </blockquote>
                                )}

                                {subsection.note && (
                                    <div className="mt-4 flex items-start gap-2 p-3 bg-blue-50 rounded-lg">
                                        <span className="material-symbols-outlined text-blue-600 text-sm">
                                            info
                                        </span>
                                        <span className="text-sm text-blue-800">
                                            {subsection.note}
                                        </span>
                                    </div>
                                )}

                                {subsection.highlight && (
                                    <div className={`mt-4 p-4 rounded-lg ${colors.light} ${colors.text}`}>
                                        <span className="material-symbols-outlined text-sm mr-2">
                                            flag
                                        </span>
                                        <span className="font-medium">{subsection.highlight}</span>
                                    </div>
                                )}
                            </div>
                        ))}
                    </div>

                    {/* Sidebar (1 column) */}
                    <div className="space-y-6">
                        {/* Educational Tip */}
                        <EducationalTip
                            title={section.tip.title}
                            content={section.tip.content}
                        />

                        {/* Quiz Card */}
                        <QuizCard
                            question={section.quiz.question}
                            options={section.quiz.options}
                            correctIndex={section.quiz.correctIndex}
                            explanation={section.quiz.explanation}
                        />
                    </div>
                </div>
            </div>
        </section>
    );
}
