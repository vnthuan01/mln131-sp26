import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Vấn Đề Dân Tộc và Tôn Giáo | Tri Thức Việt",
  icons: {
    icon: "/favicon.ico",
    shortcut: "/favicon.ico",
  },
  description: "Tìm hiểu về vấn đề dân tộc và tôn giáo trong thời kỳ quá độ lên chủ nghĩa xã hội - Chương trình học tương tác dành cho sinh viên đại học.",
  keywords: "dân tộc, tôn giáo, chủ nghĩa xã hội, Việt Nam, giáo dục, Mác-Lênin",
  authors: [{ name: "Tri Thức Việt" }],
  openGraph: {
    title: "Vấn Đề Dân Tộc và Tôn Giáo Trong Thời Kỳ Quá Độ",
    description: "Khám phá kiến thức về dân tộc và tôn giáo trong thời kỳ quá độ lên CNXH thông qua các bài học tương tác.",
    type: "website",
    locale: "vi_VN",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="vi">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link rel="icon" href="/logo-mln131.jpeg" />
        <link rel="shortcut icon" href="/logo-mln131.jpeg" />
        <link
          href="https://fonts.googleapis.com/css2?family=Be+Vietnam+Pro:wght@300;400;500;600;700;800;900&display=swap"
          rel="stylesheet"
        />
        <link
          href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@20..48,100..700,0..1,-50..200&display=swap"
          rel="stylesheet"
        />
      </head>
      <body
        style={{
          fontFamily: '"Be Vietnam Pro", Arial, Helvetica, sans-serif',
          backgroundColor: '#f8f6f6',
          color: '#181111',
          minHeight: '100vh',
          display: 'flex',
          flexDirection: 'column',
          overflowX: 'hidden'
        }}
      >
        {children}
      </body>
    </html>
  );
}
