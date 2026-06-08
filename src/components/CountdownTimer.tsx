"use client";

import { useEffect, useState } from "react";

// 전시회 타겟 날짜 설정: 2026년 11월 11일 오전 9시
const TARGET_DATE = "2026-11-11T09:00:00";

/**
 * [CountdownTimer 컴포넌트]
 * 지정한 타겟 시간까지 남은 기간을 일(Days), 시간(Hours), 분(Minutes), 초(Seconds)로
 * 실시간 계산하여 출력해 줍니다. 
 * Next.js의 고유 현상인 Hydration Error(서버의 시간과 사용자 컴퓨터의 시간 차이로 발생하는 화면 불일치 오류)를
 * 완전히 예방하도록 설계되었습니다.
 */
export default function CountdownTimer() {
  // 클라이언트 브라우저가 화면을 마운트(렌더링 완료)했는지 체크하는 상태
  const [isMounted, setIsMounted] = useState(false);
  
  // 남은 시간을 보관할 상태값 정의
  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
    isCompleted: false,
  });

  useEffect(() => {
    // 1. 화면에 마운트(화면 로드 완료)되었음을 표시
    setIsMounted(true);

    // 타겟 날짜를 밀리초 숫자로 변환
    const targetTime = new Date(TARGET_DATE).getTime();

    // 2. 실시간 남은 시간을 계산하는 함수 정의
    const calculateTimeLeft = () => {
      const currentTime = new Date().getTime();
      const difference = targetTime - currentTime;

      // 만약 타겟 시간이 이미 지났다면 타이머 정지
      if (difference <= 0) {
        setTimeLeft({
          days: 0,
          hours: 0,
          minutes: 0,
          seconds: 0,
          isCompleted: true,
        });
        return;
      }

      // 일, 시간, 분, 초 단위로 남은 시간 환산
      const days = Math.floor(difference / (1000 * 60 * 60 * 24));
      const hours = Math.floor(
        (difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
      );
      const minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
      const seconds = Math.floor((difference % (1000 * 60)) / 1000);

      setTimeLeft({
        days,
        hours,
        minutes,
        seconds,
        isCompleted: false,
      });
    };

    // 로드되자마자 1회 계산 실행
    calculateTimeLeft();

    // 1초 간격으로 반복하여 남은 시간 갱신
    const timerInterval = setInterval(calculateTimeLeft, 1000);

    // 컴포넌트가 화면에서 사라질 때 타이머 정지(메모리 누수 방지)
    return () => clearInterval(timerInterval);
  }, []);

  // 3. 서버 렌더링 중(아직 클라이언트 마운트 전)에는 정적 스켈레톤(기본 모양)을 보여주어 Hydration 에러를 예방합니다.
  if (!isMounted) {
    return (
      <div className="w-full max-w-sm px-6 py-6 mb-8 flex flex-col items-center">
        <span className="text-[10px] tracking-[0.2em] font-sans text-gray-400 uppercase mb-4">
          D-Day Countdown
        </span>
        <div className="flex gap-4 justify-center items-center">
          {["Days", "Hours", "Mins", "Secs"].map((label, idx) => (
            <div key={idx} className="flex flex-col items-center">
              <div className="w-14 h-14 bg-gray-50 border border-gray-100 rounded-xl flex items-center justify-center">
                <span className="text-gray-300 text-lg font-light">--</span>
              </div>
              <span className="text-[10px] text-gray-400 mt-2 font-light">{label}</span>
            </div>
          ))}
        </div>
      </div>
    );
  }

  // 4. 전시회 개막일 이후인 경우 출력할 문구
  if (timeLeft.isCompleted) {
    return (
      <div className="w-full max-w-sm px-6 py-8 mb-8 bg-[var(--gold-soft)]/40 rounded-2xl border border-[var(--gold-light)]/20 text-center">
        <span className="font-playfair text-xs tracking-wider text-[var(--gold-dark)] block mb-1">
          Welcome to Cosmoprof Asia
        </span>
        <p className="font-sans text-sm text-gray-800 font-medium">
          제니트리 미용 전시회가 진행 중입니다.
        </p>
      </div>
    );
  }

  // 5. 실제 남은 시간을 보여주는 뷰 렌더링
  return (
    <div className="w-full max-w-sm px-6 py-6 mb-8 flex flex-col items-center">
      <span className="text-[11px] tracking-[0.25em] font-sans text-[var(--gold-dark)] uppercase mb-4 font-medium">
        Opening Countdown
      </span>
      <div className="flex gap-3 justify-center items-center">
        {/* '일(Days)' 카드 */}
        <div className="flex flex-col items-center">
          <div className="w-16 h-16 bg-white border border-[var(--gold-light)]/20 rounded-2xl flex items-center justify-center shadow-[0_4px_20px_rgba(0,0,0,0.01)]">
            <span className="text-2xl font-light text-gray-800 font-sans">
              {String(timeLeft.days).padStart(2, "0")}
            </span>
          </div>
          <span className="text-[10px] text-gray-400 mt-2 tracking-widest font-light">Days</span>
        </div>

        <span className="text-gray-300 text-lg font-light self-start mt-4">:</span>

        {/* '시간(Hours)' 카드 */}
        <div className="flex flex-col items-center">
          <div className="w-16 h-16 bg-white border border-[var(--gold-light)]/20 rounded-2xl flex items-center justify-center shadow-[0_4px_20px_rgba(0,0,0,0.01)]">
            <span className="text-2xl font-light text-gray-800 font-sans">
              {String(timeLeft.hours).padStart(2, "0")}
            </span>
          </div>
          <span className="text-[10px] text-gray-400 mt-2 tracking-widest font-light">Hours</span>
        </div>

        <span className="text-gray-300 text-lg font-light self-start mt-4">:</span>

        {/* '분(Minutes)' 카드 */}
        <div className="flex flex-col items-center">
          <div className="w-16 h-16 bg-white border border-[var(--gold-light)]/20 rounded-2xl flex items-center justify-center shadow-[0_4px_20px_rgba(0,0,0,0.01)]">
            <span className="text-2xl font-light text-gray-800 font-sans">
              {String(timeLeft.minutes).padStart(2, "0")}
            </span>
          </div>
          <span className="text-[10px] text-gray-400 mt-2 tracking-widest font-light">Mins</span>
        </div>

        <span className="text-gray-300 text-lg font-light self-start mt-4">:</span>

        {/* '초(Seconds)' 카드 */}
        <div className="flex flex-col items-center">
          <div className="w-16 h-16 bg-white border border-[var(--gold-light)]/20 rounded-2xl flex items-center justify-center shadow-[0_4px_20px_rgba(0,0,0,0.01)]">
            <span className="text-2xl font-light text-[var(--gold-dark)] font-sans">
              {String(timeLeft.seconds).padStart(2, "0")}
            </span>
          </div>
          <span className="text-[10px] text-gray-400 mt-2 tracking-widest font-light">Secs</span>
        </div>
      </div>
    </div>
  );
}
