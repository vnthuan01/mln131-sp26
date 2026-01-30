// Vietnamese content data for the educational landing page
// Based on noidung.md - Chapter 6: Ethnic and Religious Issues

export const siteConfig = {
    name: "Tri Thức Việt",
    title: "Vấn Đề Dân Tộc và Tôn Giáo Trong Thời Kỳ Quá Độ Lên CNXH",
    subtitle: "Hiểu về Dân tộc, Tôn giáo và Đoàn kết Dân tộc tại Việt Nam ngày nay",
    description: "Chương trình học tương tác về Chủ nghĩa Xã hội Khoa học dành cho sinh viên đại học",
    icons: {
        icon: "/logo-mln131.png",
    },
};

export const heroContent = {
    badge: "Nền Tảng Giáo Dục",
    title: "Vấn Đề Dân Tộc và Tôn Giáo",
    titleHighlight: "Trong Thời Kỳ Quá Độ Lên CNXH",
    subtitle: "Khám phá chiều sâu tư tưởng về dân tộc, tôn giáo và đoàn kết dân tộc tại Việt Nam thông qua các bài học tương tác và trò chơi giáo dục.",
    ctaPrimary: "Khám Phá Nội Dung",
    ctaSecondary: "Chơi Game Học Tập",
    stats: {
        students: "999+",
        studentsLabel: "sinh viên đã tham gia học tập",
    }
};

export const introContent = {
    title: "Mở Đầu",
    content: `Trong thời kỳ quá độ lên chủ nghĩa xã hội, vấn đề dân tộc và tôn giáo là những vấn đề xã hội phức tạp, nhạy cảm, gắn chặt với lịch sử, văn hóa, tín ngưỡng và đời sống tinh thần của nhân dân.

Chủ nghĩa Mác – Lênin coi việc giải quyết đúng đắn vấn đề dân tộc và tôn giáo là điều kiện quan trọng để củng cố khối đại đoàn kết toàn dân tộc, bảo đảm ổn định chính trị – xã hội và phát triển bền vững.

Ở Việt Nam – một quốc gia đa dân tộc, đa tôn giáo, việc vận dụng sáng tạo lý luận Mác – Lênin có ý nghĩa đặc biệt quan trọng.`,
};

export const sections = [
    {
        id: "dan-toc",
        number: "I",
        title: "Quan điểm của Chủ nghĩa Mác – Lênin về Dân tộc",
        icon: "diversity_3",
        color: "primary",
        subsections: [
            {
                title: "1. Khái niệm và đặc trưng cơ bản của dân tộc",
                content: `Dân tộc là quá trình phát triển lâu dài của xã hội loài người (từ thị tộc, bộ lạc, bộ tộc đến dân tộc).`,
                points: [
                    "Nghĩa rộng (Quốc gia dân tộc - Nation): Cộng đồng chính trị - xã hội có 5 đặc trưng: Chung phương thức sinh hoạt kinh tế; Chung lãnh thổ ổn định; Chung nhà nước quản lý; Chung ngôn ngữ; Chung tâm lý văn hóa.",
                    "Nghĩa hẹp (Tộc người - Ethnies): Cộng đồng người hình thành lâu dài với 3 đặc trưng: Cộng đồng về ngôn ngữ; Cộng đồng về văn hóa; Ý thức tự giác tộc người (tiêu chí quan trọng nhất)."
                ]
            },
            {
                title: "2. Hai xu hướng khách quan của sự phát triển quan hệ dân tộc",
                points: [
                    "Xu hướng tách ra: Các cộng đồng dân cư muốn tách ra để thành lập các dân tộc độc lập (do thức tỉnh ý thức dân tộc).",
                    "Xu hướng liên hiệp lại: Các dân tộc muốn xích lại gần nhau, xóa bỏ hàng rào ngăn cách (do phát triển kinh tế, khoa học và giao lưu)."
                ]
            },
            {
                title: "3. Cương lĩnh dân tộc của Chủ nghĩa Mác – Lênin",
                content: "Gồm 3 nội dung chính:",
                principles: [
                    {
                        title: "Các dân tộc hoàn toàn bình đẳng",
                        description: "Nghĩa vụ và quyền lợi ngang nhau, không dân tộc nào có đặc quyền áp bức dân tộc khác."
                    },
                    {
                        title: "Các dân tộc được quyền tự quyết",
                        description: "Quyền tự quyết định vận mệnh, chế độ chính trị (tách ra hoặc liên hiệp lại) trên lập trường giai cấp công nhân."
                    },
                    {
                        title: "Liên hiệp công nhân tất cả các dân tộc",
                        description: "Nội dung chủ yếu, phản ánh sự thống nhất giữa giải phóng dân tộc và giải phóng giai cấp."
                    }
                ]
            }
        ],
        quiz: {
            question: "Tiêu chí nào là quan trọng nhất để phân định tộc người (nghĩa hẹp)?",
            options: ["Cộng đồng về ngôn ngữ", "Cộng đồng về văn hóa", "Ý thức tự giác tộc người", "Cộng đồng về kinh tế"],
            correctIndex: 2,
            explanation: "Ý thức tự giác tộc người là tiêu chí quan trọng nhất để phân định tộc người."
        },
        tip: {
            title: "Góc mở rộng",
            content: "Xu hướng 'Liên hiệp lại' ngày nay thể hiện rõ qua các tổ chức như ASEAN, EU, nơi các quốc gia hợp tác cùng phát triển."
        }
    },
    {
        id: "dan-toc-viet-nam",
        number: "II",
        title: "Dân tộc và Quan hệ dân tộc ở Việt Nam",
        icon: "flag",
        color: "red",
        subsections: [
            {
                title: "1. Đặc điểm dân tộc Việt Nam",
                points: [
                    "Chênh lệch về dân số (Kinh 85.7%, 53 dân tộc thiểu số 14.3%).",
                    "Cư trú xen kẽ (không dân tộc nào cư trú duy nhất một địa bàn).",
                    "Phân bố ở địa bàn chiến lược (biên giới, hải đảo, vùng sâu).",
                    "Trình độ phát triển không đều (về kinh tế, văn hóa, xã hội).",
                    "Truyền thống đoàn kết (gắn bó lâu đời trong dựng nước và giữ nước).",
                    "Bản sắc văn hóa riêng (thống nhất trong đa dạng)."
                ]
            },
            {
                title: "2. Quan điểm và chính sách dân tộc",
                content: "Vấn đề dân tộc là chiến lược, cơ bản, lâu dài và cấp bách.",
                points: [
                    "Chính trị: Bình đẳng, đoàn kết, nâng cao nhận thức.",
                    "Kinh tế: Phát triển miền núi, xóa đói giảm nghèo.",
                    "Văn hóa: Xây dựng văn hóa tiên tiến, đậm đà bản sắc.",
                    "Xã hội: Đảm bảo an sinh, y tế, giáo dục.",
                    "An ninh quốc phòng: Tăng cường quan hệ quân dân, bảo vệ biên giới."
                ]
            }
        ],
        quiz: {
            question: "Việt Nam có bao nhiêu dân tộc anh em?",
            options: ["53", "54", "55", "63"],
            correctIndex: 1,
            explanation: "Việt Nam có 54 dân tộc, trong đó dân tộc Kinh chiếm đa số."
        },
        tip: {
            title: "Thực tế",
            content: "Các dân tộc thiểu số ở Việt Nam tuy số lượng ít nhưng cư trú ở những địa bàn có vị trí chiến lược cực kỳ quan trọng về an ninh, quốc phòng."
        }
    },
    {
        id: "quan-diem-ton-giao",
        number: "III",
        title: "Quan điểm Mác – Lênin về Tôn Giáo",
        icon: "temple_buddhist",
        color: "amber",
        subsections: [
            {
                title: "1. Bản chất của tôn giáo",
                points: [
                    "Hình thái ý thức xã hội: Phản ánh hư ảo sức mạnh tự nhiên và xã hội.",
                    "Thực thể xã hội: Có niềm tin, giáo thuyết, cơ sở thờ tự/chức sắc, và cộng đồng tín đồ.",
                    "Bản chất nhân văn: Gửi gắm ước mơ về cuộc sống tốt đẹp hơn."
                ]
            },
            {
                title: "2. Nguồn gốc của tôn giáo",
                points: [
                    "Tự nhiên, Kinh tế - Xã hội: Cảm thấy yếu đuối trước thiên nhiên và bất công xã hội.",
                    "Nhận thức: Khoa học chưa giải thích được hết các hiện tượng.",
                    "Tâm lý: Sự sợ hãi, mong muốn bình an, lòng biết ơn."
                ]
            },
            {
                title: "3. Tính chất của tôn giáo",
                points: [
                    "Tính lịch sử: Biến đổi theo điều kiện kinh tế - xã hội.",
                    "Tính quần chúng: Nơi sinh hoạt văn hóa của số đông.",
                    "Tính chính trị: Phản ánh lợi ích giai cấp (khi xã hội có giai cấp)."
                ]
            },
            {
                title: "4. Nguyên tắc giải quyết vấn đề tôn giáo",
                content: "4 nguyên tắc 'vàng' trong thời kỳ quá độ:",
                principles: [
                    {
                        title: "Tôn trọng tự do tín ngưỡng",
                        description: "Quyền lựa chọn theo hoặc không theo đạo. Không ai được ép buộc hay cấm đoán."
                    },
                    {
                        title: "Khắc phục tiêu cực gắn với xây dựng xã hội mới",
                        description: "Cải thiện đời sống, nâng cao dân trí để giảm bớt ảo tưởng."
                    },
                    {
                        title: "Phân biệt hai mặt Tôn giáo",
                        description: "Mặt Tư tưởng (mâu thuẫn không đối kháng) và Mặt Chính trị (mâu thuẫn đối kháng - lợi dụng chống phá)."
                    },
                    {
                        title: " Quan điểm lịch sử cụ thể",
                        description: "Ứng xử linh hoạt theo từng giai đoạn lịch sử và vai trò của tôn giáo đó."
                    }
                ]
            }
        ],
        quiz: {
            question: "Trong 4 nguyên tắc giải quyết vấn đề tôn giáo, nguyên tắc nào giúp tránh nhầm lẫn giữa nhu cầu tâm linh và sự lợi dụng của thế lực thù địch?",
            options: [
                "Tôn trọng tự do tín ngưỡng",
                "Khắc phục tiêu cực",
                "Phân biệt mặt Chính trị và mặt Tư tưởng",
                "Quan điểm lịch sử cụ thể"
            ],
            correctIndex: 2,
            explanation: "Phân biệt mặt Chính trị (lợi dụng) và mặt Tư tưởng (niềm tin) là quan trọng nhất để xử lý đúng đắn."
        },
        tip: {
            title: "Từ khóa",
            content: "Tín ngưỡng là chuyện tâm hồn, lợi dụng là chuyện pháp luật. Rạch ròi hai mặt này là chìa khóa giải quyết vấn đề."
        }
    },
    {
        id: "ton-giao-viet-nam",
        number: "IV",
        title: "Tôn Giáo Ở Việt Nam & Chính Sách",
        icon: "volunteer_activism",
        color: "green",
        subsections: [
            {
                title: "1. Đặc điểm tôn giáo ở Việt Nam",
                points: [
                    "Quốc gia đa tôn giáo (43 tổ chức, 16 tôn giáo).",
                    "Sống hòa bình, không xung đột chiến tranh tôn giáo.",
                    "Tín đồ phần lớn là người lao động yêu nước.",
                    "Chức sắc có vai trò quan trọng và uy tín.",
                    "Có quan hệ quốc tế rộng rãi."
                ]
            },
            {
                title: "2. Chính sách của Đảng và Nhà nước",
                points: [
                    "Tôn giáo là nhu cầu tinh thần tồn tại lâu dài.",
                    "Đại đoàn kết dân tộc (đoàn kết lương - giáo).",
                    "Nội dung cốt lõi: Công tác vận động quần chúng ('tốt đời, đẹp đạo').",
                    "Trách nhiệm của cả hệ thống chính trị.",
                    "Quyền và nghĩa vụ: Tự do tín ngưỡng nhưng phải tuân thủ pháp luật."
                ],
                highlight: "Mục tiêu: Dân giàu, nước mạnh, dân chủ, công bằng, văn minh."
            }
        ],
        quiz: {
            question: "Nội dung cốt lõi của công tác tôn giáo ở Việt Nam là gì?",
            options: ["Quản lý hành chính", "Xây dựng cơ sở thờ tự", "Công tác vận động quần chúng", "Phát triển số lượng tín đồ"],
            correctIndex: 2,
            explanation: "Mục tiêu cốt lõi là vận động quần chúng để đồng bào có đạo sống 'tốt đời, đẹp đạo'."
        },
        tip: {
            title: "Thực tiễn",
            content: "Nhà nước đầu tư 'điện, đường, trường, trạm' tại vùng đồng bào có đạo không chỉ để phát triển kinh tế mà còn để bà con yên tâm tu hành."
        }
    }
];

export const conclusionContent = {
    title: "Kết Luận",
    content: `Việc giải quyết đúng đắn vấn đề dân tộc và tôn giáo trong thời kỳ quá độ lên chủ nghĩa xã hội có ý nghĩa chiến lược đối với sự ổn định và phát triển của đất nước.

Việt Nam kiên quyết đảm bảo quyền tự do tín ngưỡng, củng cố khối đại đoàn kết toàn dân tộc, đồng thời đấu tranh ngăn chặn mọi âm mưu lợi dụng vấn đề dân tộc, tôn giáo để chống phá chế độ.`
};

export const puzzleGameContent = {
    title: "Ghép Hình Tri Thức",
    subtitle: "Hoàn thành bức tranh về đoàn kết dân tộc và hài hòa tôn giáo",
    images: [
        {
            id: 1,
            src: "https://inkythuatso.com/uploads/thumbnails/800/2023/03/hinh-anh-bac-ho-doc-ban-tuyen-ngon-doc-lap-1-04-14-04-53.jpg",
            alt: "Bác Hồ đọc Tuyên ngôn độc lập",
            message: "Chủ tịch Hồ Chí Minh đọc Tuyên ngôn Độc lập. Nước Việt Nam có quyền hưởng tự do và độc lập."
        },
        {
            id: 2,
            src: "https://th.bing.com/th/id/R.0960f5c8a24ace04cbd23a229abb7500?rik=JpBA5rZVxQl1Nw&pid=ImgRaw&r=0",
            alt: "Đại đoàn kết 54 dân tộc",
            message: "54 dân tộc anh em đoàn kết, thống nhất cùng phát triển đất nước."
        },
        {
            id: 3,
            src: "https://lahata.vn/files/news/2021/12/22/-111847.jpg",
            alt: "Giáng sinh tại Việt Nam",
            message: "Không khí Giáng sinh an lành, thể hiện tự do tín ngưỡng tại Việt Nam."
        },
        {
            id: 4,
            src: "https://tuyenquang.dcs.vn/Image/Large/2024101518442_148039.jpg",
            alt: "Thanh niên Việt Nam",
            message: "Thế hệ trẻ Việt Nam tiếp bước cha anh xây dựng và bảo vệ Tổ quốc."
        },
        {
            id: 5,
            src: "https://lochoa.locninh.binhphuoc.gov.vn/uploads/lochoa/news/2024_11/image_22.png",
            alt: "Ngày hội Đại đoàn kết",
            message: "Ngày hội Đại đoàn kết toàn dân tộc thắt chặt tình làng nghĩa xóm."
        },
        {
            id: 6,
            src: "https://img5.thuthuatphanmem.vn/uploads/2022/01/16/anh-chua-tam-chuc-nhin-tu-xa_031721487.jpg",
            alt: "Chùa Tam Chúc",
            message: "Chùa Tam Chúc - Một biểu tượng của văn hóa Phật giáo Việt Nam hiện nay."
        }
    ],
    completionMessages: [
        {
            title: "Xuất sắc! 🎉",
            concept: "Độc lập - Tự do",
            description: "Quyền cơ bản của mọi dân tộc đã được khẳng định."
        },
        {
            title: "Tuyệt vời! 🌟",
            concept: "Đại đoàn kết",
            description: "Sức mạnh vô địch để vượt qua mọi khó khăn."
        },
        {
            title: "Chúc mừng! 🎄",
            concept: "Tự do tín ngưỡng",
            description: "Mọi người đều được tôn trọng quyền tâm linh của mình."
        },
        {
            title: "Hoàn hảo! 💯",
            concept: "Thanh niên xung kích",
            description: "Tương lai đất nước nằm trong tay thế hệ trẻ."
        },
        {
            title: "Rất tốt! 👏",
            concept: "Tình làng nghĩa xóm",
            description: "Gắn kết cộng đồng từ những điều giản dị nhất."
        },
        {
            title: "Tuyệt mỹ! 🛕",
            concept: "Văn hóa tâm linh",
            description: "Gìn giữ và phát huy các giá trị văn hóa tốt đẹp."
        }
    ]
};

export const knowledgeQuizGameContent = {
    title: "Đố Vui Kiến Thức",
    subtitle: "Thử thách hiểu biết của bạn về Dân tộc & Tôn giáo",
    questions: [
        {
            id: 1,
            question: "Theo nghĩa rộng (Quốc gia dân tộc), dân tộc có bao nhiêu đặc trưng?",
            options: ["3 đặc trưng", "4 đặc trưng", "5 đặc trưng", "6 đặc trưng"],
            correctIndex: 2,
            explanation: "5 đặc trưng: Chung kinh tế, chung lãnh thổ, chung nhà nước, chung ngôn ngữ, chung tâm lý văn hóa."
        },
        {
            id: 2,
            question: "Tiêu chí quan trọng nhất để phân định tộc người (nghĩa hẹp) là gì?",
            options: ["Ngôn ngữ chung", "Lãnh thổ chung", "Ý thức tự giác tộc người", "Văn hóa chung"],
            correctIndex: 2,
            explanation: "Ý thức tự giác tộc người là tiêu chí quan trọng nhất."
        },
        {
            id: 3,
            question: "Cương lĩnh dân tộc của Lênin gồm 3 nội dung, ngoại trừ:",
            options: ["Các dân tộc hoàn toàn bình đẳng", "Các dân tộc được quyền tự quyết", "Liên hiệp công nhân tất cả các dân tộc", "Các dân tộc phải đồng hóa văn hóa"],
            correctIndex: 3,
            explanation: "Đồng hóa không phải là quan điểm của Lênin. Ba nội dung là: Bình đẳng, Tự quyết, Liên hiệp công nhân."
        },
        {
            id: 4,
            question: "Việt Nam có bao nhiêu dân tộc thiểu số?",
            options: ["54", "53", "50", "43"],
            correctIndex: 1,
            explanation: "Có 54 dân tộc anh em, trừ đi dân tộc Kinh chiếm đa số, còn lại 53 dân tộc thiểu số."
        },
        {
            id: 5,
            question: "Nguyên tắc 'Vàng' nào giúp tránh nhầm lẫn khi xử lý vấn đề tôn giáo?",
            options: ["Tôn trọng tự do", "Khắc phục tiêu cực", "Phân biệt mặt Chính trị và Tư tưởng", "Quan điểm lịch sử"],
            correctIndex: 2,
            explanation: "Phân biệt Chính trị (lợi dụng - đối kháng) và Tư tưởng (niềm tin - không đối kháng) là cốt lõi."
        },
        {
            id: 6,
            question: "Mặt Chính trị của tôn giáo là mâu thuẫn gì?",
            options: ["Mâu thuẫn nội bộ", "Mâu thuẫn không đối kháng", "Mâu thuẫn đối kháng", "Mâu thuẫn văn hóa"],
            correctIndex: 2,
            explanation: "Mặt Chính trị phản ánh sự lợi dụng tôn giáo để chống phá, là mâu thuẫn đối kháng."
        },
        {
            id: 7,
            question: "Việt Nam có đặc điểm gì về tôn giáo?",
            options: ["Đơn tôn giáo", "Xung đột triền miên", "Đa tôn giáo, sống hòa bình", "Không có tôn giáo"],
            correctIndex: 2,
            explanation: "Việt Nam là quốc gia đa tôn giáo, các tôn giáo sống hòa bình, đoàn kết."
        },
        {
            id: 8,
            question: "Chính sách của Nhà nước ta coi tôn giáo là?",
            options: ["Thuốc phiện của nhân dân", "Nhu cầu tinh thần tồn tại lâu dài", "Đối tượng cần xóa bỏ ngay", "Mê tín dị đoan"],
            correctIndex: 1,
            explanation: "Đảng và Nhà nước ta xác định tôn giáo là nhu cầu tinh thần của một bộ phận nhân dân, tồn tại lâu dài."
        },
        {
            id: 9,
            question: "Nội dung cốt lõi của công tác tôn giáo là gì?",
            options: ["Xây dựng chùa chiền", "Vận động quần chúng", "Đào tạo chức sắc", "Phát triển kinh tế"],
            correctIndex: 1,
            explanation: "Công tác vận động quần chúng sống 'tốt đời, đẹp đạo' là cốt lõi."
        },
        {
            id: 10,
            question: "Đặc điểm cư trú của các dân tộc ở Việt Nam là?",
            options: ["Cư trú tập trung", "Tách biệt hoàn toàn", "Cư trú xen kẽ", "Phân chia Bắc - Nam rõ rệt"],
            correctIndex: 2,
            explanation: "Các dân tộc ở Việt Nam cư trú xen kẽ nhau, không dân tộc nào cư trú duy nhất một địa bàn."
        },
        {
            id: 11,
            question: "Câu 'Đoàn kết, đoàn kết, đại đoàn kết...' là của ai?",
            options: ["V.I.Lênin", "K.Marx", "Hồ Chí Minh", "Phạm Văn Đồng"],
            correctIndex: 2,
            explanation: "Hồ Chí Minh: 'Đoàn kết, đoàn kết, đại đoàn kết. Thành công, thành công, đại thành công'."
        },
        {
            id: 12,
            question: "Tôn giáo có tính chất nào sau đây?",
            options: ["Tính lịch sử", "Tính quần chúng", "Tính chính trị", "Cả 3 tính chất trên"],
            correctIndex: 3,
            explanation: "Tôn giáo có 3 tính chất: Lịch sử, Quần chúng, Chính trị."
        },
        {
            id: 13,
            question: "Nguồn gốc tâm lý của tôn giáo bao gồm?",
            options: ["Sự thông minh", "Sự sợ hãi và mong muốn bình an", "Sự giàu có", "Sự tò mò"],
            correctIndex: 1,
            explanation: "Nảy sinh từ sự sợ hãi (ốm đau, rủi ro) hoặc mong muốn được che chở, bình an."
        },
        {
            id: 14,
            question: "Quyền tự quyết của dân tộc bao gồm quyền nào?",
            options: ["Chỉ được liên hiệp", "Chỉ được tách ra", "Tách ra thành lập quốc gia độc lập hoặc liên hiệp lại", "Không có quyền gì"],
            correctIndex: 2,
            explanation: "Quyền tự quyết bao gồm quyền tách ra hoặc tự nguyện liên hiệp lại."
        },
        {
            id: 15,
            question: "Mối quan hệ giữa Dân tộc và Tôn giáo ở Việt Nam?",
            options: ["Tách rời nhau", "Luôn đối đầu", "Gắn bó mật thiết, chi phối lẫn nhau", "Không liên quan"],
            correctIndex: 2,
            explanation: "Quan hệ này gắn bó mật thiết và chịu sự chi phối mạnh mẽ của tín ngưỡng truyền thống."
        }
    ]
};

export const matchConceptsGameContent = {
    title: "Ghép Khái Niệm",
    subtitle: "Kết nối các khái niệm với định nghĩa đúng nhất",
    pairs: [
        {
            id: 1,
            term: "Dân tộc (Nghĩa rộng)",
            definition: "Cộng đồng chính trị - xã hội: Chung kinh tế, lãnh thổ, nhà nước, ngôn ngữ, văn hóa."
        },
        {
            id: 2,
            term: "Tín ngưỡng",
            definition: "Niềm tin thiêng liêng (chưa có hệ thống giáo lý chặt chẽ như tôn giáo)."
        },
        {
            id: 3,
            term: "Tôn giáo",
            definition: "Phản ánh hư ảo sức mạnh tự nhiên/xã hội, có tổ chức, giáo lý, giáo luật."
        },
        {
            id: 4,
            term: "Mê tín dị đoan",
            definition: "Niềm tin mù quáng gây hậu quả xấu (khác với tín ngưỡng, tôn giáo)."
        },
        {
            id: 5,
            term: "Mặt Tư tưởng",
            definition: "Niềm tin, sự khác nhau về giáo lý (Mâu thuẫn không đối kháng)."
        },
        {
            id: 6,
            term: "Mặt Chính trị",
            definition: "Sự lợi dụng tôn giáo để chống phá (Mâu thuẫn đối kháng)."
        },
        {
            id: 7,
            term: "Quyền tự quyết",
            definition: "Quyền tách ra thành lập quốc gia độc lập hoặc tự nguyện liên hiệp."
        },
        {
            id: 8,
            term: "Đại đoàn kết",
            definition: "Vũ khí chiến lược, động lực chủ yếu để xây dựng và bảo vệ Tổ quốc."
        }
    ]
};

export const flashcardsContent = {
    title: "Thẻ Ghi Nhớ",
    subtitle: "Ôn tập cốt lõi qua thẻ ghi nhớ thông minh",
    decks: [
        {
            id: "cot-loi",
            title: "Kiến thức cốt lõi",
            cards: [
                {
                    id: 1,
                    term: "Dân tộc (Nghĩa rộng)",
                    definition: "Là Quốc gia dân tộc (Nation) với 5 đặc trưng:\n1. Chung kinh tế\n2. Chung lãnh thổ\n3. Chung nhà nước\n4. Chung ngôn ngữ\n5. Chung văn hóa"
                },
                {
                    id: 2,
                    term: "Dân tộc (Nghĩa hẹp)",
                    definition: "Là Tộc người (Ethnies) với 3 đặc trưng:\n1. Chung về ngôn ngữ\n2. Chung về văn hóa\n3. Ý thức tự giác tộc người (Quan trọng nhất)"
                },
                {
                    id: 3,
                    term: "Cương lĩnh dân tộc Lênin",
                    definition: "1. Các dân tộc hoàn toàn bình đẳng\n2. Các dân tộc được quyền tự quyết\n3. Liên hiệp công nhân tất cả các dân tộc"
                },
                {
                    id: 4,
                    term: "Đặc điểm Dân tộc VN",
                    definition: "- 54 dân tộc (Kinh đa số)\n- Cư trú xen kẽ\n- Phân bố địa bàn chiến lược\n- Trình độ không đều\n- Đoàn kết & Bản sắc riêng"
                },
                {
                    id: 5,
                    term: "Bản chất tôn giáo",
                    definition: "Là sự phản ánh hư ảo sức mạnh tự nhiên & xã hội vào đầu óc con người. Lực lượng trần thế biến thành siêu trần thế."
                },
                {
                    id: 6,
                    term: "3 Nguồn gốc tôn giáo",
                    definition: "1. Tự nhiên & KT-XH (Yếu đuối, bất công)\n2. Nhận thức (Khoa học chưa giải thích được)\n3. Tâm lý (Sợ hãi, mong bình an)"
                },
                {
                    id: 7,
                    term: "3 Tính chất tôn giáo",
                    definition: "1. Tính Lịch sử (Biến đổi theo thời đại)\n2. Tính Quần chúng (Nhu cầu đông đảo)\n3. Tính Chính trị (Phản ánh lợi ích giai cấp)"
                },
                {
                    id: 8,
                    term: "4 Nguyên tắc 'Vàng'",
                    definition: "1. Tôn trọng tự do tín ngưỡng\n2. Khắc phục tiêu cực gắn với xây dựng XH mới\n3. Phân biệt Chính trị & Tư tưởng\n4. Quan điểm lịch sử cụ thể"
                },
                {
                    id: 9,
                    term: "Chính trị vs Tư tưởng",
                    definition: "- Tư tưởng: Niềm tin, khác biệt giáo lý -> Mâu thuẫn không đối kháng.\n- Chính trị: Lợi dụng chống phá -> Mâu thuẫn đối kháng."
                },
                {
                    id: 10,
                    term: "Đặc điểm Tôn giáo VN",
                    definition: "- Đa tôn giáo, sống hòa bình\n- Tín đồ là người lao động\n- Chức sắc có uy tín\n- Quan hệ quốc tế rộng rãi"
                },
                {
                    id: 11,
                    term: "Chính sách Tôn giáo",
                    definition: "- Tôn giáo là nhu cầu lâu dài\n- Đại đoàn kết lương - giáo\n- Vận động quần chúng là cốt lõi\n- Trách nhiệm cả hệ thống trị"
                },
                {
                    id: 12,
                    term: "Tín ngưỡng vs Tôn giáo",
                    definition: "- Tín ngưỡng: Niềm tin thiêng liêng (thờ cúng, dân gian).\n- Tôn giáo: Có tổ chức, giáo lý, giáo luật chặt chẽ."
                }
            ]
        }
    ]
};

export const navItems = [
    { label: "Trang chủ", href: "#hero" },
    { label: "Nội dung", href: "#content" },
    { label: "Game học tập", href: "#game" },
];
