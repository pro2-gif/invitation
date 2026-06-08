"use client";

import { useEffect, useState } from "react";
import { Calendar, MapPin, ExternalLink, CalendarRange, Share2, Check } from "lucide-react";

// 전시회 시작일 타겟 설정: 2026년 7월 1일 오전 10시
const TARGET_DATE = "2026-07-01T10:00:00";
// 구글 지도 공식 검색 링크 (코엑스)
const GOOGLE_MAP_URL = "https://maps.google.com/?q=COEX";


/**
 * [2026 인-코스메틱스 코리아 디지털 초청장 메인 페이지]
 * 
 * 단 하나의 파일로 모든 레이아웃, 상태 관리, 유틸리티 기능을 구현했습니다.
 * B2B 전문가 전시회의 느낌을 살릴 수 있도록 깔끔한 화이트 배경과 
 * 신뢰감을 주는 딥 네이비(Navy) 컬러를 매칭하여 세련되고 신뢰도 높은 화면을 구성했습니다.
 */
export default function Home() {
  // 1. 화면 마운트(렌더링 완료) 여부 확인 상태 (Hydration 오류 방지)
  const [isMounted, setIsMounted] = useState(false);
  
  // 2. 링크 복사 완료 토스트 안내 창 표시 여부 상태
  const [showToast, setShowToast] = useState(false);

  // 3. 실시간 남은 시간을 관리하는 상태값
  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
    isCompleted: false,
  });

  // 4. 컴포넌트 마운트 및 실시간 타이머 작동 처리
  useEffect(() => {
    setIsMounted(true); // 브라우저 로드 완료 표시

    const targetTime = new Date(TARGET_DATE).getTime();

    // 남은 시간 실시간 계산기
    const calculateTime = () => {
      const now = new Date().getTime();
      const difference = targetTime - now;

      // 전시회가 이미 시작된 경우
      if (difference <= 0) {
        setTimeLeft({ days: 0, hours: 0, minutes: 0, seconds: 0, isCompleted: true });
        return;
      }

      // 일, 시간, 분, 초 단위 연산
      const days = Math.floor(difference / (1000 * 60 * 60 * 24));
      const hours = Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
      const minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
      const seconds = Math.floor((difference % (1000 * 60)) / 1000);

      setTimeLeft({ days, hours, minutes, seconds, isCompleted: false });
    };

    calculateTime(); // 즉시 1회 실행
    const interval = setInterval(calculateTime, 1000); // 1초 간격 갱신

    return () => clearInterval(interval); // 화면을 나갈 때 타이머 클리어
  }, []);

  // 5. 초청장 주소 클립보드 복사 함수
  const handleCopyLink = async () => {
    try {
      const currentUrl = typeof window !== "undefined" ? window.location.href : "https://in-cosmeticskorea-2026.kr";
      await navigator.clipboard.writeText(currentUrl);
      
      setShowToast(true); // 토스트 창 띄우기
      setTimeout(() => setShowToast(false), 2000); // 2초 뒤 서서히 닫기
    } catch (err) {
      console.error("복사 실패:", err);
      alert("주소 복사에 실패했습니다. 브라우저 주소창에서 링크를 수동으로 복사해 주세요.");
    }
  };

  return (
    // 전체 데스크톱 화면 중앙에 450px 크기의 모바일 모양 카드를 띄웁니다.
    <div className="min-h-screen bg-slate-100 flex items-center justify-center p-0 sm:py-6 selection:bg-blue-100 selection:text-blue-900">
      
      {/* 모바일 우선 프레임 카드 레이아웃 (네이비 & 화이트 테마) */}
      <main className="w-full max-w-[450px] min-h-screen sm:min-h-[850px] sm:rounded-[32px] bg-white shadow-2xl flex flex-col justify-between overflow-hidden border border-slate-200 relative">
        
        {/* 상단 포인트 데코 데코레이션 라인 (딥 네이비) */}
        <div className="w-full h-1.5 bg-[#0f172a]" />
        
        {/* 본문 콘텐츠 스크롤 컨테이너 */}
        <div className="flex-1 flex flex-col items-center">
          
          {/* ================= HERO SECTION ================= */}
          <section className="relative w-full flex flex-col items-center justify-center pt-16 pb-10 px-6 text-center overflow-hidden">
            {/* 은은한 네이비 백그라운드 블러 그래픽 */}
            <div className="absolute top-0 w-64 h-64 rounded-full bg-blue-50/70 blur-3xl opacity-80 pointer-events-none" />

            <div className="z-10 flex flex-col items-center">
              <span className="text-xs font-semibold tracking-[0.25em] text-blue-700 uppercase mb-3">
                B2B Exhibition Invitation
              </span>
              {/* 메인 헤드카피 */}
              <p className="font-sans text-sm font-medium text-slate-500 tracking-wide mb-2">
                {"\"국내 유일의 화장품 원료 전문 전시회\""}
              </p>
              {/* 전시회 공식 로고 타이틀 */}
              <h1 className="font-sans text-3xl font-extrabold tracking-tight text-slate-900 leading-none mt-2">
                in-cosmetics Korea 2026
              </h1>
              <p className="font-sans text-sm font-semibold text-slate-700 tracking-wider mt-1">
                2026 인-코스메틱스 코리아
              </p>
              <div className="w-12 h-[3px] bg-blue-700 my-6 rounded-full" />
            </div>

            <div className="z-10 mt-1 max-w-sm">
              <h2 className="font-sans text-base font-light leading-relaxed text-slate-600 tracking-wide">
                글로벌 화장품 산업의 혁신 기술과 트렌드,<br />
                그 생생한 비즈니스의 현장으로 여러분을 초대합니다.
              </h2>
            </div>
          </section>

          {/* ================= VISUAL COUNTDOWN ================= */}
          <div className="w-full flex justify-center px-6 mb-8">
            <div className="w-full max-w-sm px-5 py-6 bg-slate-50 rounded-2xl border border-slate-100 flex flex-col items-center shadow-sm">
              <span className="text-[11px] tracking-[0.2em] font-sans text-slate-400 uppercase mb-4 font-semibold">
                Opening Countdown
              </span>

              {/* Hydration 에러 방지: 브라우저가 화면을 띄우기 전에는 기본 형태 유지 */}
              {!isMounted ? (
                <div className="flex gap-3 justify-center items-center">
                  {["일", "시", "분", "초"].map((label, idx) => (
                    <div key={idx} className="flex flex-col items-center">
                      <div className="w-14 h-14 bg-white border border-slate-200 rounded-xl flex items-center justify-center">
                        <span className="text-slate-300 text-lg font-light">--</span>
                      </div>
                      <span className="text-[10px] text-slate-400 mt-2">{label}</span>
                    </div>
                  ))}
                </div>
              ) : timeLeft.isCompleted ? (
                <div className="py-2 text-center">
                  <span className="text-sm font-semibold text-blue-700">인-코스메틱스 코리아 전시회가 개막했습니다!</span>
                </div>
              ) : (
                <div className="flex gap-3 justify-center items-center">
                  {/* 일(Days) 박스 */}
                  <div className="flex flex-col items-center">
                    <div className="w-16 h-16 bg-white border border-slate-200/80 rounded-2xl flex items-center justify-center shadow-sm">
                      <span className="text-2xl font-bold text-slate-800 font-mono">
                        {String(timeLeft.days).padStart(2, "0")}
                      </span>
                    </div>
                    <span className="text-[10px] text-slate-400 mt-2 font-medium">일 (Days)</span>
                  </div>

                  <span className="text-slate-300 text-lg font-bold self-start mt-4">:</span>

                  {/* 시간(Hours) 박스 */}
                  <div className="flex flex-col items-center">
                    <div className="w-16 h-16 bg-white border border-slate-200/80 rounded-2xl flex items-center justify-center shadow-sm">
                      <span className="text-2xl font-bold text-slate-800 font-mono">
                        {String(timeLeft.hours).padStart(2, "0")}
                      </span>
                    </div>
                    <span className="text-[10px] text-slate-400 mt-2 font-medium">시 (Hours)</span>
                  </div>

                  <span className="text-slate-300 text-lg font-bold self-start mt-4">:</span>

                  {/* 분(Minutes) 박스 */}
                  <div className="flex flex-col items-center">
                    <div className="w-16 h-16 bg-white border border-slate-200/80 rounded-2xl flex items-center justify-center shadow-sm">
                      <span className="text-2xl font-bold text-slate-800 font-mono">
                        {String(timeLeft.minutes).padStart(2, "0")}
                      </span>
                    </div>
                    <span className="text-[10px] text-slate-400 mt-2 font-medium">분 (Mins)</span>
                  </div>

                  <span className="text-slate-300 text-lg font-bold self-start mt-4">:</span>

                  {/* 초(Seconds) 박스 */}
                  <div className="flex flex-col items-center">
                    <div className="w-16 h-16 bg-white border border-slate-200/80 rounded-2xl flex items-center justify-center shadow-sm">
                      <span className="text-2xl font-bold text-blue-700 font-mono">
                        {String(timeLeft.seconds).padStart(2, "0")}
                      </span>
                    </div>
                    <span className="text-[10px] text-slate-400 mt-2 font-medium text-blue-700">초 (Secs)</span>
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* ================= INFORMATION CARDS ================= */}
          <div className="w-full flex flex-col gap-4 px-6 mb-6">
            
            {/* 일정 안내 카드 */}
            <div className="w-full p-5 bg-white border border-slate-100 rounded-2xl shadow-sm flex gap-4 items-start border-l-4 border-l-blue-700">
              <div className="p-3 bg-blue-50 rounded-xl text-blue-700">
                <Calendar className="w-5.5 h-5.5 stroke-[2]" />
              </div>
              <div className="flex flex-col">
                <span className="text-[10px] tracking-wider font-sans text-slate-400 uppercase font-semibold">
                  Date
                </span>
                <h4 className="font-sans text-sm font-bold text-slate-800 mt-1.5">
                  전시 일정
                </h4>
                <p className="font-sans text-sm text-slate-600 mt-1">
                  2026.07.01(수) ~ 2026.07.03(금)
                </p>
                <span className="inline-block self-start text-[10px] bg-blue-50 text-blue-800 rounded-full px-2.5 py-0.5 mt-2 font-medium">
                  3일간 진행
                </span>
              </div>
            </div>

            {/* 장소 안내 카드 */}
            <div className="w-full p-5 bg-white border border-slate-100 rounded-2xl shadow-sm flex gap-4 items-start border-l-4 border-l-blue-700">
              <div className="p-3 bg-blue-50 rounded-xl text-blue-700">
                <MapPin className="w-5.5 h-5.5 stroke-[2]" />
              </div>
              <div className="flex flex-col flex-1">
                <span className="text-[10px] tracking-wider font-sans text-slate-400 uppercase font-semibold">
                  Venue
                </span>
                <h4 className="font-sans text-sm font-bold text-slate-800 mt-1.5">
                  전시 장소
                </h4>
                <p className="font-sans text-sm text-slate-600 mt-1 leading-normal font-medium">
                  코엑스 (COEX)
                </p>
                <p className="font-sans text-[11px] text-slate-400 mt-0.5">
                  서울특별시 강남구 영동대로 513
                </p>

                {/* 지도를 페이지 내에서 즉시 확인하는 구글 맵 임베드 영역 */}
                <div className="w-full h-44 rounded-xl overflow-hidden border border-slate-200/60 mt-3 shadow-inner relative z-10">
                  <iframe
                    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3165.1764263721326!2d127.0567406764516!3d37.5120531013401!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x357ca46bc14e4bdf%3A0x89dc845d42b3d32!2z7L2U7JeJ7IqkIENPRVg!5e0!3m2!1sko!2skr!4v1717805100000!5m2!1sko!2skr"
                    width="100%"
                    height="100%"
                    style={{ border: 0 }}
                    allowFullScreen={false}
                    loading="lazy"
                    referrerPolicy="no-referrer-when-downgrade"
                  />
                </div>

                {/* 구글 지도 길찾기 아웃바운드 링크 */}
                <a
                  href={GOOGLE_MAP_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-1.5 text-xs text-blue-700 hover:text-blue-900 mt-3.5 font-semibold transition-colors w-fit"
                >
                  <span>구글 지도에서 위치 확인</span>
                  <ExternalLink className="w-3.5 h-3.5" />
                </a>
              </div>
            </div>

          </div>

          {/* ================= ACTION BUTTONS ================= */}
          <div className="w-full px-6 py-4 flex flex-col gap-3 relative z-20">
            {/* 사전 등록 버튼 (B2B 딥 네이비 단색) - 공식 홈페이지로 직접 이동 (사전등록 페이지 미오픈 시 메인으로) */}
            <a
              href="https://www.in-cosmetics.com/korea/ko-kr.html"
              target="_blank"
              rel="noopener noreferrer"
              className="w-full py-4 bg-slate-900 hover:bg-slate-800 text-white rounded-2xl flex items-center justify-center gap-2.5 font-sans text-sm font-semibold tracking-wider transition-all duration-300 shadow-md hover:translate-y-[-1px]"
            >
              <CalendarRange className="w-4.5 h-4.5" />
              <span>전시회 사전 등록하기</span>
            </a>

            {/* 링크 공유 복사 버튼 (클린 보더 스타일) */}
            <button
              onClick={handleCopyLink}
              className="w-full py-4 bg-white hover:bg-slate-50 text-slate-700 border border-slate-200 rounded-2xl flex items-center justify-center gap-2.5 font-sans text-sm font-semibold tracking-wider transition-all duration-300 shadow-sm hover:translate-y-[-1px]"
            >
              <Share2 className="w-4.5 h-4.5 text-blue-700" />
              <span>초청장 링크 복사하기</span>
            </button>
          </div>

        </div>

        {/* ================= FOOTER ================= */}
        <footer className="w-full py-8 text-center bg-slate-50 border-t border-slate-100 px-6">
          <p className="font-sans text-[10px] font-bold tracking-[0.2em] text-slate-700 uppercase">
            in-cosmetics Korea 2026
          </p>
          <p className="font-sans text-[9px] text-slate-400 mt-2 tracking-wide leading-relaxed">
            본 초청장은 모바일 화면 비율에 완벽히 최적화되어 있습니다.<br />
            © 2026 In-Cosmetics. All rights reserved.
          </p>
        </footer>

      </main>

      {/* 링크 복사 완료 토스트 알림 메시지 */}
      {showToast && (
        <div className="fixed bottom-10 left-1/2 -translate-x-1/2 z-50 bg-slate-900/90 text-white px-5 py-3 rounded-full flex items-center gap-2 shadow-lg backdrop-blur-md animate-fade-in text-xs font-sans tracking-wide">
          <div className="bg-emerald-500 rounded-full p-0.5">
            <Check className="w-3.5 h-3.5 text-white" />
          </div>
          <span>초청장 주소가 복사되었습니다.</span>
        </div>
      )}

    </div>
  );
}
