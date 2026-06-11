import type { Metadata, Viewport } from "next";
import { Noto_Sans_KR, Cormorant_Garamond } from "next/font/google";
import "./globals.css";

// 한국어 기본 폰트 설정 (부드러운 디자인 매칭)
const notoSansKr = Noto_Sans_KR({
  subsets: ["latin"],
  weight: ["300", "400", "500", "700"],
  variable: "--font-sans",
});

// 영문 및 브랜드 명칭을 위한 고급 세리프 폰트 설정
const cormorantGaramond = Cormorant_Garamond({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  style: ["normal", "italic"],
  variable: "--font-playfair",
});

// Next.js 14+ 가이드라인에 부합하는 모바일 반응형 뷰포트 설정
export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
  userScalable: false, // 모바일 기기에서의 강제 줌인을 방어해 앱처럼 느끼게 함
};

// SEO 최적화를 위한 사이트 메타데이터 정의
export const metadata: Metadata = {
  title: "2026 인-코스메틱스 코리아",
  description: "글로벌 화장품 산업의 혁신 기술과 트렌드, 2026 인-코스메틱스 코리아 전시회에 여러분을 초대합니다.",
  // 검색엔진 노출 및 웹 표준 구조화
  openGraph: {
    title: "2026 인-코스메틱스 코리아",
    description: "2026.07.01 ~ 07.03 코엑스(COEX)에서 글로벌 화장품 원료 전문 전시회를 만나보세요.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ko" className={`${notoSansKr.variable} ${cormorantGaramond.variable}`}>
      <head>
        {/* 모바일 스마트폰 화면에서 스케일링이 이상해지지 않도록 방어하는 설정 */}
        <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1, user-scalable=no" />
      </head>
      <body className="antialiased selection:bg-amber-100 selection:text-amber-900">
        {children}
      </body>
    </html>
  );
}

