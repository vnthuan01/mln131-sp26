interface EducationalTipProps {
    title: string;
    content: string;
}

export default function EducationalTip({ title, content }: EducationalTipProps) {
    return (
        <div className="bg-gradient-to-r from-amber-50 to-yellow-50 rounded-xl p-5 border border-amber-100 relative overflow-hidden">
            {/* Background Icon */}
            <div className="absolute -right-4 -top-4 opacity-10">
                <span className="material-symbols-outlined text-8xl text-amber-600">
                    lightbulb
                </span>
            </div>

            <div className="relative z-10 flex items-start gap-4">
                {/* Icon */}
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-amber-500 text-white shrink-0">
                    <span className="material-symbols-outlined">tips_and_updates</span>
                </div>

                {/* Content */}
                <div>
                    <h4 className="font-bold text-amber-800 mb-1">{title}</h4>
                    <p className="text-sm text-amber-900/80 leading-relaxed">{content}</p>
                </div>
            </div>
        </div>
    );
}
