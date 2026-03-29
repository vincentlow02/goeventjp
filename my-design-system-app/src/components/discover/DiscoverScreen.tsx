"use client";

/* eslint-disable @next/next/no-img-element */

import { AnimatePresence, motion, useMotionValue, useTransform } from "framer-motion";
import Image from "next/image";
import { useEffect, useMemo, useRef, useState } from "react";

import { SUMMER_JAZZ_LAYOUT_IDS } from "@/lib/eventApp";

const discoverAssets = {
  avatar: "/discover/avatar.jpg",
  compass: "/discover/compass.svg",
  flag: "/discover/home-flag.png",
  food: "/discover/food.svg",
  goEventMark: "/discover/goevent-mark.svg",
  homeBlur: "/discover/home-blur.svg",
  homeBlurSignIn: "/discover/home-blur-signin.svg",
  map: "/discover/home-map.webp",
  music: "/discover/music.svg",
  oden: "/discover/oden.png",
  palette: "/discover/palette.png",
  plus: "/discover/plus.svg",
  previewBand: "/discover/preview-band.png",
  previewHeart: "/discover/preview-heart.svg",
  pulse: "/discover/pulse.svg",
  roundPushpin: "/discover/round-pushpin.png",
  search: "/discover/home-search.svg",
  searchArrow: "/discover/search-arrow.svg",
  searchBlur: "/discover/search-blur.svg",
  searchChevron: "/discover/search-chevron.svg",
  searchFestival: "/discover/search-festival.jpg",
  searchGourmet: "/discover/search-gourmet.jpg",
  searchIcon: "/discover/search-icon.svg",
  searchIllumination: "/discover/search-illumination.jpg",
  searchStars: "/discover/search-stars.svg",
  signInClose: "/discover/signin-close.svg",
  tumbler: "/discover/tumbler.png",
} as const;

function GlassPill({
  widthClass,
  blurMask,
  children,
}: {
  widthClass: string;
  blurMask: string;
  children: React.ReactNode;
}) {
  return (
    <div className={`relative h-[38px] ${widthClass}`}>
      <div className="absolute inset-0 rounded-[296px] shadow-[0_0_15.8px_rgba(0,0,0,0.07)]">
        <div className="absolute inset-[-26px] opacity-[0.67]">
          <div
            className="absolute inset-[28px_26px_24px_26px] rounded-[1000px] blur-[10px]"
            style={{
              maskImage: `url('${blurMask}')`,
              maskPosition: "-158.33% -162.5%",
              maskRepeat: "no-repeat",
              maskSize: "416.67% 416.67%",
            }}
          >
            <div className="absolute inset-0 rounded-[1000px] bg-transparent backdrop-blur-[14px] mix-blend-hard-light" />
          </div>
        </div>
        <div className="absolute inset-0 rounded-[296px] bg-white/90" />
      </div>
      <div className="relative flex h-full items-center">{children}</div>
    </div>
  );
}

function SearchField({
  blurMask = discoverAssets.homeBlur,
  flag = discoverAssets.flag,
  icon = discoverAssets.search,
  onClick,
}: {
  blurMask?: string;
  flag?: string;
  icon?: string;
  onClick?: () => void;
}) {
  const content = (
    <GlassPill blurMask={blurMask} widthClass="w-full min-w-0">
      <div className="flex min-w-0 items-center gap-[11px] px-[13px] py-[8px]">
        <img alt="" className="h-[15px] w-[13.33px] shrink-0" src={icon} />
        <div className="flex min-w-0 items-center gap-[8px]">
          <Image alt="" className="h-[19px] w-[19px] shrink-0" height={19} src={flag} width={19} />
          <span className="truncate text-[13px] leading-[20px] text-[#949494]">
            近くのイベントを検索
          </span>
        </div>
      </div>
    </GlassPill>
  );

  return onClick ? (
    <button className="block w-full text-left" onClick={onClick} type="button">
      {content}
    </button>
  ) : (
    content
  );
}

function SignInButton({ onClick }: { onClick: () => void }) {
  return (
    <button className="block h-[38px] w-[65px] shrink-0" onClick={onClick} type="button">
      <GlassPill blurMask={discoverAssets.homeBlurSignIn} widthClass="w-[65px]">
        <div className="flex w-full items-center justify-center px-[4px] py-[14px] text-[13px] font-medium leading-[20px] text-slate-900">
          ログイン
        </div>
      </GlassPill>
    </button>
  );
}

function FilterChip({
  icon,
  label,
  iconClassName,
}: {
  icon: string;
  label: string;
  iconClassName?: string;
}) {
  return (
    <div className="flex h-[28px] items-center rounded-[999px] border border-[rgba(255,255,255,0.3)] bg-[rgba(255,255,255,0.74)] px-[11px] shadow-[0_1px_2px_rgba(0,0,0,0.05)] backdrop-blur-[4px]">
      <img
        alt=""
        className={`mr-[4px] shrink-0 ${iconClassName ?? "h-[15px] w-auto"}`}
        src={icon}
      />
      <span className="whitespace-nowrap text-[11px] font-medium leading-[20px] text-[#334155]">{label}</span>
    </div>
  );
}

function DiscoverMarker({
  children,
  className,
  markerClassName,
  onClick,
}: {
  children: React.ReactNode;
  className: string;
  markerClassName?: string;
  onClick?: () => void;
}) {
  const content = (
    <motion.div
      className={`absolute rounded-[999px] bg-white px-[10px] py-[12px] shadow-[0_6px_20px_rgba(15,23,42,0.12)] ${className} ${markerClassName ?? ""}`}
      whileTap={onClick ? { scale: 0.965, y: 1 } : undefined}
    >
      <div className="flex items-center gap-[4px]">{children}</div>
    </motion.div>
  );

  return onClick ? (
    <button className="contents" onClick={onClick} type="button">
      {content}
    </button>
  ) : (
    content
  );
}

function RoundPushpin({ className }: { className?: string }) {
  return (
    <Image
      alt=""
      className={className}
      height={22}
      src={discoverAssets.roundPushpin}
      width={22}
    />
  );
}

function DiscoverPreviewCard({ onOpen }: { onOpen: () => void }) {
  return (
    <motion.button
      className="block w-full text-left"
      onClick={onOpen}
      transition={{ duration: 0.32, ease: [0.22, 1, 0.36, 1] }}
      type="button"
      whileTap={{ scale: 0.985 }}
    >
      <motion.div
        className="w-full rounded-[24px] bg-white p-[10px] shadow-[0_2px_66.8px_-12px_rgba(0,0,0,0.25)]"
        layoutId={SUMMER_JAZZ_LAYOUT_IDS.container}
      >
      <div className="flex items-center gap-[12px]">
          <motion.div
            className="relative h-[68px] w-[68px] shrink-0 overflow-hidden rounded-[11px]"
            layoutId={SUMMER_JAZZ_LAYOUT_IDS.image}
          >
            <Image
              alt=""
              className="absolute left-[-40.11%] top-[-41.23%] h-[182.1%] w-[183.97%] max-w-none"
              fill
              sizes="68px"
              src={discoverAssets.previewBand}
            />
            <div className="absolute inset-0 rounded-[11px] bg-gradient-to-t from-[rgba(0,0,0,0.8)] via-[rgba(0,0,0,0.2)] to-transparent" />
          </motion.div>

          <div className="min-w-0 flex-1">
            <p className="text-[11px] font-bold uppercase tracking-[0.5px] text-[#4aa6a2]">
              本日 <span className="text-black">&bull; 20:00</span>
            </p>
            <motion.p
              className="text-[14px] font-bold leading-[18px] text-[#0f172a]"
              layoutId={SUMMER_JAZZ_LAYOUT_IDS.title}
            >
              サマー・ルーフトップ・ジャズ
            </motion.p>
            <motion.div
              className="flex max-w-[160px] items-center pt-[2px] pr-[4px]"
              layoutId={SUMMER_JAZZ_LAYOUT_IDS.location}
            >
              <RoundPushpin className="mr-[1px] h-[15px] w-[16px]" />
              <p className="truncate text-[10px] leading-[16px] text-[#4e4e4e]">ドレス グレープ , 渋谷</p>
              <span className="ml-[6px] shrink-0 text-[11px] font-bold text-black">200M</span>
            </motion.div>
          </div>

          <div className="flex h-[36px] w-[36px] shrink-0 items-center justify-center rounded-full bg-[#f2f2f2]">
            <img alt="" className="h-[18.35px] w-[20px]" src={discoverAssets.previewHeart} />
          </div>
        </div>
      </motion.div>
    </motion.button>
  );
}

function SelectedJazzBubble() {
  return (
    <motion.div
      animate={{ opacity: 1, scale: 1, y: 0 }}
      className="relative inline-flex flex-col items-center"
      initial={{ opacity: 0, scale: 0.96, y: 6 }}
      transition={{ duration: 0.24, ease: [0.22, 1, 0.36, 1] }}
    >
      <div className="relative flex min-w-[156px] items-center gap-[12px] rounded-full border-[2.5px] border-[#00C2B8] bg-white py-[4px] pl-[8px] pr-[20px] shadow-[0_8px_20px_rgba(15,23,42,0.1)] whitespace-nowrap">
        <div className="relative h-[30px] w-[30px] shrink-0 overflow-hidden rounded-[8px]">
          <Image
            alt=""
            className="absolute left-[-40.11%] top-[-41.23%] h-[182.1%] w-[183.97%] max-w-none"
            fill
            sizes="30px"
            src={discoverAssets.previewBand}
          />
          <div className="absolute inset-0 rounded-[8px] bg-gradient-to-t from-[rgba(0,0,0,0.8)] via-[rgba(0,0,0,0.2)] to-transparent" />
        </div>
        <div className="flex flex-col justify-center pb-[0.5px]">
          <div className="flex items-center gap-[4px]">
            <span className="text-[11px] font-bold leading-[1.15] tracking-[0.1px] text-black">サマー</span>
            <img alt="" className="h-[11px] w-[11px] object-contain" src={discoverAssets.tumbler} />
          </div>
          <span className="text-[11px] font-bold leading-[1.15] tracking-[0.1px] text-black">ルーフトップ・ジャズ</span>
        </div>
      </div>
      <div className="relative -mt-[1.5px] h-[14px] w-[20px] overflow-hidden">
        <div className="absolute left-1/2 top-[-8px] h-[16px] w-[16px] -translate-x-1/2 rotate-45 rounded-[4px] border-r-[2.5px] border-b-[2.5px] border-[#00C2B8] bg-white" />
      </div>
      <div className="-mt-[2px] h-[16px] w-[16px] rounded-full border-[2.5px] border-[#00C2B8] bg-white" />
    </motion.div>
  );
}

function SearchResultCard({
  image,
  rank,
  subtitle,
  title,
}: {
  image: string;
  rank: string;
  subtitle: string;
  title: string;
}) {
  return (
    <button className="w-full overflow-hidden rounded-[7px] bg-[#fefefe] text-left" type="button">
      <div className="relative h-[46px] w-full">
        <Image alt="" className="object-cover" fill sizes="100vw" src={image} />
      </div>
      <div className="flex items-center gap-[7px] px-[14px] py-[8px]">
        <span className="flex h-[19px] w-[42px] items-center justify-center rounded-[7px] border border-[#dadada] bg-[#fafafa] text-[13px] font-semibold text-black shadow-[0_1px_4px_rgba(0,0,0,0.08)]">
          {rank}
        </span>
        <div className="min-w-0 flex-1">
          <p className="truncate text-[10px] font-semibold text-black">{title}</p>
          <p className="truncate text-[9px] text-[#3f3d3d]">{subtitle}</p>
        </div>
        <img alt="" className="h-[10.23px] w-[57px]" src={discoverAssets.searchStars} />
        <img alt="" className="h-[8px] w-[5px] rotate-180" src={discoverAssets.searchChevron} />
      </div>
    </button>
  );
}

function DiscoverSearchPanel({
  isOpen,
  onClose,
}: {
  isOpen: boolean;
  onClose: () => void;
}) {
  const contentRef = useRef<HTMLDivElement | null>(null);
  const dragY = useMotionValue(0);
  const rawOverlayOpacity = useTransform(dragY, [0, 220], [1, 0]);

  return (
    <div className={`absolute inset-0 z-20 overflow-hidden ${isOpen ? "pointer-events-auto" : "pointer-events-none"}`}>
      <motion.div
        animate={{ opacity: isOpen ? 1 : 0 }}
        className="absolute inset-0 bg-[rgba(15,23,42,0.12)]"
        onClick={onClose}
        style={{ opacity: isOpen ? rawOverlayOpacity : 0 }}
        transition={{ duration: 0.3, ease: "easeOut" }}
      />
      <motion.div
        animate={isOpen ? { opacity: 1, y: 0 } : { opacity: 0, y: 18 }}
        className="pointer-events-auto absolute inset-x-0 bottom-0 top-[38px] rounded-tl-[28px] rounded-tr-[40px] bg-[#f7f7f7] pb-[36px] pt-[28px] px-[28px]"
        drag="y"
        dragConstraints={{ top: 0, bottom: 0 }}
        dragElastic={{ top: 0, bottom: 0.8 }}
        onDragEnd={(e, info) => {
          if (info.offset.y > 56 || info.velocity.y > 400) {
            onClose();
          }
        }}
        style={{ touchAction: "none", y: dragY }}
        transition={{ duration: 0.3, ease: "easeOut" }}
      >
        <div
          className="pointer-events-auto flex h-full flex-col gap-[12px] overflow-y-auto overflow-x-hidden overscroll-y-contain"
          ref={contentRef}
          style={{ touchAction: "pan-y" }}
          onPointerDown={(e) => {
            if (contentRef.current && contentRef.current.scrollTop > 0) {
              e.stopPropagation();
            }
          }}
        >
          <div
            className={`flex flex-col gap-[23px] transition-all duration-300 ease-out ${
              isOpen ? "translate-y-0 opacity-100" : "translate-y-[12px] opacity-0"
            }`}
            style={{ transitionDelay: isOpen ? "40ms" : "0ms" }}
          >
            <div
              className="origin-top transition-[transform] duration-300 ease-out"
              style={{
                transform: isOpen ? "translate3d(0,0,0) scale(1)" : "translate3d(10px,-8px,0) scale(0.92)",
              }}
            >
              <SearchField
                blurMask={discoverAssets.searchBlur}
                flag={discoverAssets.flag}
                icon={discoverAssets.searchIcon}
                onClick={onClose}
              />
            </div>
            <button
              className="flex h-[24px] w-[110px] items-center gap-[4px] rounded-[9.5px] border border-[#dadada] bg-white px-[6px] pb-[9px] pr-[9px] pt-[3px] text-[13px] text-black"
              type="button"
            >
              <span>人気 (2月)</span>
              <img alt="" className="h-[5.25px] w-[8.25px]" src={discoverAssets.searchArrow} />
            </button>
          </div>

          <div
            className={`transition-all duration-300 ease-out ${
              isOpen ? "translate-y-0 opacity-100" : "translate-y-[14px] opacity-0"
            }`}
            style={{ transitionDelay: isOpen ? "80ms" : "0ms" }}
          >
            <SearchResultCard
              image={discoverAssets.searchFestival}
              rank="No.1"
              subtitle="会場: 日比谷公園"
              title="東京ミュージックフェスティバル・スペシャル"
            />
          </div>
          <div
            className={`transition-all duration-300 ease-out ${
              isOpen ? "translate-y-0 opacity-100" : "translate-y-[14px] opacity-0"
            }`}
            style={{ transitionDelay: isOpen ? "120ms" : "0ms" }}
          >
            <SearchResultCard
              image={discoverAssets.searchGourmet}
              rank="No.2"
              subtitle="会場: お台場海浜公園"
              title="東京グルメフェスティバル"
            />
          </div>
          <div
            className={`transition-all duration-300 ease-out ${
              isOpen ? "translate-y-0 opacity-100" : "translate-y-[14px] opacity-0"
            }`}
            style={{ transitionDelay: isOpen ? "160ms" : "0ms" }}
          >
            <SearchResultCard
              image={discoverAssets.searchIllumination}
              rank="No.3"
              subtitle="会場: 六本木ヒルズ"
              title="東京ウィンターイルミネーション2025"
            />
          </div>
        </div>
      </motion.div>
    </div>
  );
}

function AuthButton({
  dark = false,
  icon,
  label,
}: {
  dark?: boolean;
  icon: React.ReactNode;
  label: string;
}) {
  return (
    <button
      className={`flex h-[47px] w-full items-center justify-center gap-[12px] rounded-[34.5px] text-[17px] font-medium ${
        dark ? "bg-[#090909] text-white" : "bg-[#e8e8ea] text-black"
      }`}
      type="button"
    >
      <span className="flex h-[24px] min-w-[24px] items-center justify-center">{icon}</span>
      <span>{label}</span>
    </button>
  );
}

function AppleLogo() {
  return (
    <svg aria-hidden="true" className="h-[22px] w-[18px]" viewBox="0 0 18 22">
      <path
        d="M12.62 11.61c.02 2.68 2.3 3.57 2.33 3.58-.02.06-.36 1.22-1.18 2.42-.7 1.04-1.44 2.07-2.63 2.09-1.15.03-1.52-.71-2.86-.71-1.33 0-1.75.69-2.83.73-1.13.04-1.98-1.11-2.71-2.15C1.26 15.46.13 11.4 1.65 8.79c.76-1.31 2.1-2.14 3.56-2.16 1.11-.02 2.16.74 2.86.74.68 0 1.98-.91 3.34-.79.57.03 2.14.23 3.15 1.69-.08.05-1.89 1.12-1.94 3.34Z"
        fill="currentColor"
      />
      <path
        d="M10.84 3.17c.59-.71.98-1.68.88-2.67-.86.03-1.87.56-2.49 1.28-.56.63-1.03 1.65-.91 2.62.93.07 1.9-.49 2.52-1.23Z"
        fill="currentColor"
      />
    </svg>
  );
}

function GoogleLogo() {
  return (
    <svg aria-hidden="true" className="h-[24px] w-[24px]" viewBox="0 0 24 24">
      <path
        d="M21.81 12.23c0-.72-.06-1.25-.19-1.8H12.2v3.53h5.53c-.11.88-.73 2.2-2.09 3.09l-.02.12 2.82 2.14.2.02c1.84-1.66 2.9-4.1 2.9-7.1z"
        fill="#4285F4"
      />
      <path
        d="M12.2 21.88c2.71 0 4.98-.88 6.64-2.4l-3-2.28c-.8.55-1.88.94-3.64.94-2.65 0-4.9-1.72-5.7-4.09l-.11.01-2.93 2.22-.04.1c1.65 3.2 5.05 5.5 8.78 5.5z"
        fill="#34A853"
      />
      <path
        d="M6.5 14.05c-.21-.61-.34-1.26-.34-1.93 0-.67.12-1.32.33-1.93l-.01-.13-2.97-2.26-.1.04A9.73 9.73 0 0 0 2.39 12c0 1.53.37 2.97 1.03 4.24l3.08-2.2z"
        fill="#FBBC05"
      />
      <path
        d="M12.2 5.86c2.22 0 3.72.94 4.58 1.72l3.35-3.19C17.17 1.67 14.9.12 12.2.12 8.47.12 5.07 2.42 3.42 5.62l3.08 2.21c.81-2.37 3.06-4.1 5.7-4.1z"
        fill="#EA4335"
      />
    </svg>
  );
}

function SignInModal({ onClose }: { onClose: () => void }) {
  const closeTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const dragStartYRef = useRef<number | null>(null);
  const dragStartTimeRef = useRef<number>(0);
  const [isVisible, setIsVisible] = useState(false);
  const [dragY, setDragY] = useState(0);

  useEffect(() => {
    const frame = requestAnimationFrame(() => setIsVisible(true));
    return () => {
      cancelAnimationFrame(frame);
      if (closeTimerRef.current) {
        clearTimeout(closeTimerRef.current);
      }
    };
  }, []);

  const dismiss = () => {
    setIsVisible(false);
    closeTimerRef.current = setTimeout(() => onClose(), 240);
  };

  const overlayOpacity = useMemo(() => {
    const base = isVisible ? 0.28 : 0;
    return Math.max(0, base - dragY / 420);
  }, [dragY, isVisible]);

  const panelTransform = useMemo(() => {
    if (!isVisible) {
      return "translate3d(0, 24px, 0) scale(0.96)";
    }
    return `translate3d(0, ${dragY}px, 0) scale(1)`;
  }, [dragY, isVisible]);

  const handlePointerDown = (event: React.PointerEvent<HTMLDivElement>) => {
    dragStartYRef.current = event.clientY;
    dragStartTimeRef.current = performance.now();
    event.currentTarget.setPointerCapture(event.pointerId);
  };

  const handlePointerMove = (event: React.PointerEvent<HTMLDivElement>) => {
    if (dragStartYRef.current === null) {
      return;
    }

    const nextDrag = Math.max(0, event.clientY - dragStartYRef.current);
    setDragY(nextDrag);
  };

  const handlePointerEnd = (event: React.PointerEvent<HTMLDivElement>) => {
    if (dragStartYRef.current === null) {
      return;
    }

    const elapsed = Math.max(1, performance.now() - dragStartTimeRef.current);
    const velocity = dragY / elapsed;
    dragStartYRef.current = null;
    event.currentTarget.releasePointerCapture(event.pointerId);

    if (dragY > 120 || velocity > 0.85) {
      dismiss();
      return;
    }

    setDragY(0);
  };

  return (
    <div
      aria-hidden="true"
      className="absolute inset-0 z-20 transition-colors duration-300 ease-in-out"
      onClick={dismiss}
      style={{ backgroundColor: `rgba(0,0,0,${overlayOpacity})` }}
    >
      <div className="flex min-h-full items-end justify-center px-[12px] pb-[40px] pt-[60px]">
        <div
          className="relative w-full max-w-[406px] rounded-[34px] bg-white px-[24px] pb-[20px] pt-[20px] shadow-[0_24px_80px_rgba(15,23,42,0.18)] transition-transform duration-300 ease-in-out"
          onClick={(event) => event.stopPropagation()}
          onPointerDown={handlePointerDown}
          onPointerMove={handlePointerMove}
          onPointerUp={handlePointerEnd}
          onPointerCancel={handlePointerEnd}
          style={{
            transform: panelTransform,
            opacity: isVisible ? 1 : 0,
            transition: dragStartYRef.current === null ? "transform 300ms ease-in-out, opacity 300ms ease-in-out" : "none",
            touchAction: "none",
          }}
        >
          <button className="absolute right-[18px] top-[20px] h-[34px] w-[34px]" onClick={dismiss} type="button">
            <img alt="Close sign in modal" className="h-[34px] w-[34px]" src={discoverAssets.signInClose} />
          </button>

          <div className="flex min-h-[520px] flex-col">
            <div className="mx-auto mb-[18px] h-[5px] w-[58px] rounded-full bg-[#d9d9d9]" />

            <div className="flex flex-1 flex-col items-center pt-[38px] text-center">
              <img alt="" className="h-[52px] w-[52px]" src={discoverAssets.goEventMark} />
              <p className="mt-[10px] text-[28px] font-bold tracking-[-0.6px] text-black">GoEvent</p>
              <div className="mt-[18px] max-w-[300px] text-[16px] leading-[18px] text-[#585858]">
                <p>ログインしてチケットを予約したり、</p>
                <p>お気に入りのイベントを保存しましょう</p>
              </div>

              <div className="mt-[36px] flex w-full flex-col gap-[10px]">
                <AuthButton
                  dark
                  icon={<AppleLogo />}
                  label="Appleで続ける"
                />
                <AuthButton
                  icon={<GoogleLogo />}
                  label="Googleで続ける"
                />
                <AuthButton
                  icon={
                    <svg aria-hidden="true" className="h-[18px] w-[18px]" viewBox="0 0 24 24">
                      <rect
                        x="3"
                        y="5"
                        width="18"
                        height="14"
                        rx="2"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                      />
                      <path d="M4 7l8 6 8-6" fill="none" stroke="currentColor" strokeWidth="2" />
                    </svg>
                  }
                  label="メールアドレスでログイン"
                />
              </div>
            </div>

            <div className="mt-[18px] flex items-center justify-between px-[4px] text-[12px] text-black">
              <span>利用規約</span>
              <span>プライバシーポリシー</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export function DiscoverScreen({
  isDetailOpen = false,
  onCloseJazzPreview = () => {},
  onCloseSignIn = () => {},
  onOpenJazzDetail = () => {},
  onOpenJazzPreview = () => {},
  onOpenSignIn = () => {},
  onSearchPanelChange = () => {},
  showJazzPreview = false,
  showSignIn = false,
}: {
  isDetailOpen?: boolean;
  onCloseJazzPreview?: () => void;
  onCloseSignIn?: () => void;
  onOpenJazzDetail?: () => void;
  onOpenJazzPreview?: () => void;
  onOpenSignIn?: () => void;
  onSearchPanelChange?: (isOpen: boolean) => void;
  showJazzPreview?: boolean;
  showSignIn?: boolean;
}) {
  const [showSearchPanel, setShowSearchPanel] = useState(false);
  const [renderSearchPanel, setRenderSearchPanel] = useState(false);
  const previewDragStartYRef = useRef<number | null>(null);
  const previewDragStartTimeRef = useRef<number>(0);
  const [previewDragY, setPreviewDragY] = useState(0);

  useEffect(() => {
    if (showSearchPanel) {
      setRenderSearchPanel(true);
      return;
    }

    const timer = setTimeout(() => setRenderSearchPanel(false), 320);
    return () => clearTimeout(timer);
  }, [showSearchPanel]);

  useEffect(() => {
    onSearchPanelChange(renderSearchPanel || showSearchPanel);
  }, [onSearchPanelChange, renderSearchPanel, showSearchPanel]);

  const openSearchPanel = () => {
    setRenderSearchPanel(true);
    requestAnimationFrame(() => setShowSearchPanel(true));
  };

  const closeSearchPanel = () => {
    setShowSearchPanel(false);
  };

  const closeJazzPreview = () => {
    onCloseJazzPreview();
    setPreviewDragY(0);
    previewDragStartYRef.current = null;
  };

  const handlePreviewPointerDown = (event: React.PointerEvent<HTMLDivElement>) => {
    previewDragStartYRef.current = event.clientY;
    previewDragStartTimeRef.current = performance.now();
    event.currentTarget.setPointerCapture(event.pointerId);
  };

  const handlePreviewPointerMove = (event: React.PointerEvent<HTMLDivElement>) => {
    if (previewDragStartYRef.current === null) {
      return;
    }

    if (isDetailOpen) {
      setPreviewDragY(0);
      return;
    }

    setPreviewDragY(Math.max(0, event.clientY - previewDragStartYRef.current));
  };

  const handlePreviewPointerEnd = (event: React.PointerEvent<HTMLDivElement>) => {
    if (previewDragStartYRef.current === null) {
      return;
    }

    const elapsed = Math.max(1, performance.now() - previewDragStartTimeRef.current);
    const velocity = previewDragY / elapsed;
    previewDragStartYRef.current = null;

    if (event.currentTarget.hasPointerCapture(event.pointerId)) {
      event.currentTarget.releasePointerCapture(event.pointerId);
    }

    if (previewDragY > 72 || velocity > 0.75) {
      closeJazzPreview();
      return;
    }

    setPreviewDragY(0);
  };

  return (
    <div
      className="relative min-h-dvh w-full overflow-hidden bg-white"
      style={{ fontFamily: '"Nimbus Sans L","Nimbus Sans",Arial,Helvetica,sans-serif' }}
    >
      <div className="absolute inset-0">
        <Image
          alt=""
          className="object-cover"
          fill
          priority
          quality={82}
          sizes="430px"
          src={discoverAssets.map}
        />
        <motion.div
          className="absolute inset-0 bg-[rgba(255,255,255,0.04)]"
          animate={{
            backgroundColor: isDetailOpen
              ? "rgba(255,255,255,0.18)"
              : showJazzPreview
                ? "rgba(255,255,255,0.08)"
                : "rgba(255,255,255,0.04)",
          }}
          transition={{ duration: 0.32, ease: [0.22, 1, 0.36, 1] }}
        />
        <motion.div
          className="absolute inset-0 bg-[#eff2f7]"
          animate={{ opacity: isDetailOpen ? 0.42 : showJazzPreview ? 0.08 : 0 }}
          transition={{ duration: 0.32, ease: [0.22, 1, 0.36, 1] }}
        />
      </div>

      <div className="relative flex min-h-dvh flex-col px-[16px] pb-[140px] pt-[max(42px,env(safe-area-inset-top))]">
        <div className="flex flex-col items-center gap-[11px]">
          <div className="flex w-full items-center justify-center gap-[13px]">
            <div className="w-[267px] shrink-0">
              <SearchField onClick={openSearchPanel} />
            </div>
            <SignInButton onClick={onOpenSignIn} />
          </div>
          <div className="flex items-center justify-center gap-[9px]">
            <div className="w-auto">
              <FilterChip icon={discoverAssets.music} iconClassName="h-[13px] w-[9px]" label="音楽" />
            </div>
            <div className="w-auto">
              <FilterChip icon={discoverAssets.food} iconClassName="h-[15px] w-[11px]" label="フード" />
            </div>
            <div className="w-[37px]">
              <div className="flex h-[28px] w-[37px] items-center justify-center rounded-[999px] border border-[rgba(255,255,255,0.3)] bg-[rgba(255,255,255,0.74)] shadow-[0_1px_2px_rgba(0,0,0,0.05)] backdrop-blur-[4px]">
                <img alt="" className="h-[20px] w-[20px]" src={discoverAssets.plus} />
              </div>
            </div>
          </div>
        </div>

        {renderSearchPanel ? <DiscoverSearchPanel isOpen={showSearchPanel} onClose={closeSearchPanel} /> : null}

        <div className="relative flex-1">
          {showJazzPreview && !isDetailOpen ? (
            <button
              aria-label="Close event preview"
              className="absolute inset-0 z-0"
              onClick={closeJazzPreview}
              type="button"
            />
          ) : null}

          <DiscoverMarker className="left-[219px] top-[31px] px-[8px] py-[11px]">
            <img alt="" className="h-[20px] w-[20px]" src={discoverAssets.oden} />
            <span className="text-[13px] font-medium uppercase tracking-[0.5px] text-black">おでんイベント</span>
          </DiscoverMarker>

          {showJazzPreview ? (
            <motion.button
              animate={{ opacity: 1, scale: 1, y: 0 }}
              className="absolute left-[12px] top-[140px] z-10"
              initial={{ opacity: 0, scale: 0.96, y: 6 }}
              onClick={closeJazzPreview}
              transition={{ duration: 0.24, ease: [0.22, 1, 0.36, 1] }}
              type="button"
              whileTap={{ scale: 0.97, y: 1 }}
            >
              <SelectedJazzBubble />
            </motion.button>
          ) : (
            <DiscoverMarker
              className="left-0 top-[126px] py-[12px] pl-[10px] pr-[14px]"
              onClick={onOpenJazzPreview}
            >
              <img alt="" className="h-[17px] w-[17px]" src={discoverAssets.tumbler} />
              <span className="text-[13px] font-medium uppercase tracking-[0.5px] text-black">ジャズナイト</span>
            </DiscoverMarker>
          )}

          <DiscoverMarker className="left-0 top-[293px] py-[12px] pl-[9px] pr-[14px]">
            <img alt="" className="h-[18px] w-[18px]" src={discoverAssets.palette} />
            <span className="text-[13px] font-medium uppercase tracking-[0.5px] text-black">ワークショップ</span>
          </DiscoverMarker>

          <div className="absolute left-[176px] top-[198px]">
            <div className="flex h-[52px] w-[52px] items-start rounded-[26px] bg-[rgba(0,199,190,0.21)] p-[8px]">
              <Image
                alt=""
                className="h-[36px] w-[36px] rounded-[17px] border border-[#00c7be] object-cover"
                height={36}
                src={discoverAssets.avatar}
                width={36}
              />
            </div>
          </div>
        </div>

        <div className="mt-auto flex flex-col items-center gap-[20px]">
          <AnimatePresence>
            {showJazzPreview ? (
              <motion.div
                animate={{ opacity: 1, y: previewDragY }}
                className="w-full"
                exit={{ opacity: 0, y: 20 }}
                initial={{ opacity: 0, y: 26 }}
                onPointerCancel={handlePreviewPointerEnd}
                onPointerDown={handlePreviewPointerDown}
                onPointerMove={handlePreviewPointerMove}
                onPointerUp={handlePreviewPointerEnd}
                transition={{
                  opacity: { duration: 0.22, ease: "easeOut" },
                  y:
                    previewDragStartYRef.current === null
                      ? { duration: 0.26, ease: [0.22, 1, 0.36, 1] }
                      : { duration: 0 },
                }}
                style={{
                  touchAction: isDetailOpen ? "auto" : "none",
                }}
              >
                <DiscoverPreviewCard onOpen={onOpenJazzDetail} />
              </motion.div>
            ) : null}
          </AnimatePresence>
        </div>
      </div>

      {showSignIn ? <SignInModal onClose={onCloseSignIn} /> : null}
    </div>
  );
}
