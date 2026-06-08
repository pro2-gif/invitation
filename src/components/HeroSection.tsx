"use client";

import { motion } from "framer-motion";

/**
 * [HeroSection 컴포넌트]
 * 초청장 가장 상단에 보여지는 영역으로, '제니트리' 브랜드 로고와 환영 문구 및
 * 전시회 공식 명칭을 아름다운 모션 그래픽 애니메이션과 함께 사용자에게 전달합니다.
 */
export default function HeroSection() {
  return (
    <section className="relative flex flex-col items-center justify-center pt-16 pb-12 px-6 text-center overflow-hidden">
      
      {/* 1. 뒷배경의 은은한 골드 빛 원형 그래픽 (미세한 퍼짐 효과) */}
      <div className="absolute top-10 left-1/2 -translate-x-1/2 w-72 h-72 rounded-full bg-[var(--gold-soft)] blur-3xl opacity-60 pointer-events-none" />

      {/* 2. 최상단 브랜드 로고 및 텍스트 애니메이션 */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1.2, ease: "easeOut" }}
        className="z-10 flex flex-col items-center"
      >
        <span className="font-playfair text-sm tracking-[0.3em] text-[var(--gold-dark)] uppercase mb-2">
          Premium Beauty Brand
        </span>
        <h1 className="font-playfair text-4xl font-light tracking-[0.2em] text-[#2d2621]">
          JANYTREE
        </h1>
        <div className="w-8 h-[1px] bg-[var(--gold-main)] my-6" />
      </motion.div>

      {/* 3. 메인 환영 메시지 및 안내 문구 */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.4, duration: 1.5 }}
        className="z-10 mt-2 max-w-sm"
      >
        <p className="font-sans text-xs tracking-[0.15em] text-gray-500 uppercase mb-4">
          Official Invitation
        </p>
        <h2 className="font-sans text-lg font-light leading-relaxed text-gray-800 tracking-wide text-balance">
          글로벌 브랜드와 혁신 트렌드를 한자리에서 만나세요.<br />
          새로운 뷰티의 미래와 감각,<br />
          제니트리가 여러분을 초청합니다.
        </h2>
      </motion.div>

      {/* 4. 전시회 이름 및 서브 정보 (우아한 카드 스타일 박스) */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.8, duration: 1.2, ease: "easeOut" }}
        className="z-10 w-full mt-10 p-6 bg-white/40 backdrop-blur-md rounded-2xl border border-[var(--gold-light)]/30 shadow-[0_8px_30px_rgb(0,0,0,0.02)]"
      >
        <div className="text-[10px] tracking-[0.2em] font-sans text-[var(--gold-dark)] uppercase mb-3 font-semibold">
          Cosmoprof Asia 2026
        </div>
        <h3 className="font-sans text-base font-semibold leading-snug text-gray-800 tracking-tight text-balance">
          2026 중국 홍콩 코스모프로프 아시아 미용 전시회
        </h3>
        <p className="font-sans text-xs text-gray-500 mt-2 tracking-wider">
          Janytree Global Exhibition
        </p>
      </motion.div>

    </section>
  );
}
