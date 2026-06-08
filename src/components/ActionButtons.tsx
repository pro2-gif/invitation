"use client";

import { useState } from "react";
import { CalendarRange, Share2, Check } from "lucide-react";

/**
 * [ActionButtons 컴포넌트]
 * 모바일 환경에서 사용자의 편의를 높이기 위해 배치된 2개의 핵심 버튼입니다.
 * 1. 구글 캘린더에 전시회 일정을 클릭 한 번으로 자동 등록할 수 있게 해 줍니다.
 * 2. 현재 웹 페이지 주소를 클립보드에 복사하고 복사 완료 토스트 창을 예쁘게 보여줍니다.
 */
export default function ActionButtons() {
  // 복사 완료 안내 토스트 창을 띄울지 여부를 결정하는 상태값
  const [showToast, setShowToast] = useState(false);

  // 1. 구글 캘린더 일정 등록용 주소 생성 함수
  const getGoogleCalendarUrl = () => {
    const title = encodeURIComponent("[제니트리] 2026 홍콩 코스모프로프 아시아 미용 전시회");
    // 시작일시: 2026년 11월 11일 오전 9시 (한국/홍콩 시간 기준 표기 포맷)
    // 종료일시: 2026년 11월 13일 오후 6시
    const dates = "20261111T090000/20261113T180000";
    const details = encodeURIComponent("화장품/뷰티 프리미엄 브랜드 제니트리(JANYTREE) 참가 안내 디지털 초청장 일정입니다. 부스 위치는 추후 별도 안내 예정입니다.");
    const location = encodeURIComponent("홍콩전시컨벤션센터 (HKCEC, Hong Kong Convention and Exhibition Centre)");

    return `https://calendar.google.com/calendar/render?action=TEMPLATE&text=${title}&dates=${dates}&details=${details}&location=${location}`;
  };

  // 2. 현재 초청장 주소 복사 함수
  const handleCopyLink = async () => {
    try {
      // 실제 모바일 브라우저 주소 혹은 기본 윈도우 주소 획득
      const currentUrl = typeof window !== "undefined" ? window.location.href : "https://janytree-cosmoprof.kr";
      
      // 클립보드 복사 API 호출
      await navigator.clipboard.writeText(currentUrl);

      // 토스트 메시지 띄우기
      setShowToast(true);

      // 2초 뒤에 서서히 토스트 메시지 닫기
      setTimeout(() => {
        setShowToast(false);
      }, 2000);
    } catch (err) {
      console.error("링크 복사 실패:", err);
      alert("주소 복사에 실패했습니다. 브라우저 주소창에서 링크를 수동으로 복사해 주세요.");
    }
  };

  return (
    <div className="w-full px-6 py-8 flex flex-col gap-3 relative z-20">
      
      {/* 구글 캘린더 등록 버튼 */}
      <a
        href={getGoogleCalendarUrl()}
        target="_blank"
        rel="noopener noreferrer"
        className="w-full py-4 bg-[#2d2621] hover:bg-[#443b35] text-white rounded-2xl flex items-center justify-center gap-2.5 font-sans text-sm font-semibold tracking-wider transition-all duration-300 shadow-[0_8px_25px_rgba(45,38,33,0.15)] hover:translate-y-[-1px]"
      >
        <CalendarRange className="w-4.5 h-4.5" />
        <span>구글 캘린더에 일정 등록</span>
      </a>

      {/* 초청장 링크 복사 버튼 (아이보리/골드 톤에 맞는 보더 스타일) */}
      <button
        onClick={handleCopyLink}
        className="w-full py-4 bg-white hover:bg-[var(--gold-soft)]/30 text-gray-700 border border-[var(--gold-light)] rounded-2xl flex items-center justify-center gap-2.5 font-sans text-sm font-semibold tracking-wider transition-all duration-300 shadow-[0_4px_15px_rgba(0,0,0,0.01)] hover:translate-y-[-1px]"
      >
        <Share2 className="w-4.5 h-4.5 text-[var(--gold-dark)]" />
        <span>초청장 링크 복사하기</span>
      </button>

      {/* 복사 성공 안내 토스트 메시지 (모바일 레이아웃 하단에 팝업) */}
      {showToast && (
        <div className="fixed bottom-10 left-1/2 -translate-x-1/2 z-50 bg-gray-900/90 text-white px-5 py-3 rounded-full flex items-center gap-2 shadow-lg backdrop-blur-md animate-fade-in text-xs font-sans tracking-wide">
          <div className="bg-emerald-500 rounded-full p-0.5">
            <Check className="w-3.5 h-3.5 text-white" />
          </div>
          <span>초청장 주소가 복사되었습니다.</span>
        </div>
      )}

    </div>
  );
}
