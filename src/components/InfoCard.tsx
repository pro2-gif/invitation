"use client";

import { Calendar, MapPin, ExternalLink } from "lucide-react";

/**
 * [InfoCard 컴포넌트]
 * 전시회의 핵심 안내 데이터인 '일정'과 '장소'를 레이아웃에 맞춰 카드 형태로 보여줍니다.
 * 각 카드는 아이콘과 직관적인 텍스트 구조를 가지며, 사용자가 터치하여 
 * 장소 위치를 외부 지도로 손쉽게 볼 수 있는 링크 버튼을 제공합니다.
 */
export default function InfoCard() {
  // 전시 장소 정보 클릭 시 이동할 구글 맵 주소
  const GOOGLE_MAP_URL = "https://maps.app.goo.gl/hY8X9vH2T1x2p2HPA"; // HKCEC 구글맵 좌표 예시 링크

  return (
    <div className="w-full flex flex-col gap-5 px-6">
      
      {/* 1. 개최기간 (Calendar Card) */}
      <div className="w-full p-6 bg-white border border-gray-100 rounded-2xl shadow-[0_10px_35px_rgba(0,0,0,0.015)] flex gap-4 items-start transition-all duration-300 hover:border-[var(--gold-light)]/40">
        <div className="p-3 bg-[var(--gold-soft)] rounded-xl text-[var(--gold-dark)]">
          {/* Lucide React 달력 아이콘 */}
          <Calendar className="w-6 h-6 stroke-[1.5]" />
        </div>
        <div className="flex flex-col">
          <span className="text-[10px] tracking-widest font-sans text-gray-400 uppercase font-semibold">
            Date & Time
          </span>
          <h4 className="font-sans text-sm font-semibold text-gray-800 mt-2">
            개최 기간
          </h4>
          <p className="font-sans text-sm text-gray-600 mt-1 leading-relaxed">
            2026년 11월 11일(수) ~ 11월 13일(금)
          </p>
          <span className="inline-block self-start text-[10px] bg-amber-50 text-[var(--gold-dark)] border border-amber-100/50 rounded-full px-2.5 py-0.5 mt-2 font-medium">
            3일간 진행
          </span>
        </div>
      </div>

      {/* 2. 개최장소 (MapPin Card) */}
      <div className="w-full p-6 bg-white border border-gray-100 rounded-2xl shadow-[0_10px_35px_rgba(0,0,0,0.015)] flex gap-4 items-start transition-all duration-300 hover:border-[var(--gold-light)]/40">
        <div className="p-3 bg-[var(--gold-soft)] rounded-xl text-[var(--gold-dark)]">
          {/* Lucide React 지도 핀 아이콘 */}
          <MapPin className="w-6 h-6 stroke-[1.5]" />
        </div>
        <div className="flex flex-col flex-1 w-full">
          <span className="text-[10px] tracking-widest font-sans text-gray-400 uppercase font-semibold">
            Location
          </span>
          <h4 className="font-sans text-sm font-semibold text-gray-800 mt-2">
            개최 장소
          </h4>
          <p className="font-sans text-sm text-gray-600 mt-1 leading-normal font-medium">
            홍콩전시컨벤션센터 HKCEC
          </p>
          <p className="font-sans text-[11px] text-gray-400 mt-0.5">
            Hong Kong Convention and Exhibition Centre
          </p>

          {/* 구글 지도 직접 확인 영역 (임베드 iframe) */}
          <div className="w-full h-48 rounded-xl overflow-hidden border border-gray-100 mt-3 shadow-inner relative z-10">
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3691.0125439537965!2d114.17028127608149!3d22.286944379695627!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3404005c6d3bc01b%3A0x6bd7eb1ecfbe3a98!2z7ZmN7L2p7KCE7Iuc7Luo67Kk7IWY7IS87YSw!5e0!3m2!1sko!2skr!4v1717306230812!5m2!1sko!2skr"
              width="100%"
              height="100%"
              style={{ border: 0 }}
              allowFullScreen={false}
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            />
          </div>
          
          {/* 외부 구글 지도 링크 연결 버튼 */}
          <a
            href={GOOGLE_MAP_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-1.5 text-xs text-[var(--gold-dark)] hover:text-amber-800 mt-3 font-medium transition-colors w-fit"
          >
            <span>구글 지도 앱으로 길 찾기</span>
            <ExternalLink className="w-3.5 h-3.5" />
          </a>
        </div>
      </div>

    </div>
  );
}
