import { siteConfig } from "@/lib/content";

export default function Footer() {
    return (
        <footer className="bg-white border-t border-[#f4f0f0] py-12">
            <div className="max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex flex-col md:flex-row justify-between items-center gap-6">
                    {/* Logo */}
                    <div className="flex items-center gap-3 text-[#181111]">
                        <span className="material-symbols-outlined text-2xl text-[#ee2b2b]">
                            local_library
                        </span>
                        <span className="text-lg font-bold">{siteConfig.name}</span>
                    </div>

                    {/* Links */}
                    <div className="flex flex-wrap justify-center gap-8">
                        <a
                            href="#"
                            className="text-[#896161] hover:text-[#ee2b2b] transition-colors text-sm"
                        >
                            Về chúng tôi
                        </a>
                        <a
                            href="#"
                            className="text-[#896161] hover:text-[#ee2b2b] transition-colors text-sm"
                        >
                            Điều khoản sử dụng
                        </a>
                        <a
                            href="#"
                            className="text-[#896161] hover:text-[#ee2b2b] transition-colors text-sm"
                        >
                            Chính sách bảo mật
                        </a>
                        <a
                            href="#"
                            className="text-[#896161] hover:text-[#ee2b2b] transition-colors text-sm"
                        >
                            Liên hệ
                        </a>
                    </div>

                    {/* Copyright */}
                    <div className="text-[#896161] text-sm">
                        © 2026 {siteConfig.name}. All rights reserved.
                    </div>
                </div>

                {/* Additional Info */}
                <div className="mt-8 pt-8 border-t border-[#f4f0f0] text-center">
                    <p className="text-[#896161] text-sm">
                        Nền tảng học tập trực tuyến về Chủ nghĩa Xã hội Khoa học dành cho sinh viên đại học
                    </p>
                    <div className="flex justify-center gap-4 mt-4">
                        <a
                            href="#"
                            className="p-1 rounded-full bg-[#f4f0f0] hover:bg-[#ee2b2b] hover:text-white text-[#896161] transition-colors flex items-center"
                        >
                            <span className="material-symbols-outlined text-xl">share</span>
                        </a>
                        <a
                            href="#"
                            className="p-1 rounded-full bg-[#f4f0f0] hover:bg-[#ee2b2b] hover:text-white text-[#896161] transition-colors flex items-center"
                        >
                            <span className="material-symbols-outlined text-xl">mail</span>
                        </a>
                    </div>
                </div>
            </div>
        </footer>
    );
}
