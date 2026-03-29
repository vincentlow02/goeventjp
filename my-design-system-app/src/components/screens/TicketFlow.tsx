"use client";

/* eslint-disable @next/next/no-img-element */

import { AnimatePresence, motion, useMotionValue, useTransform } from "framer-motion";
import { useRef, useState } from "react";

import {
  formatYen,
  SUMMER_JAZZ_LAYOUT_IDS,
  ticketOptions,
  type TicketQuantityMap,
} from "@/lib/eventApp";

const assets = {
  detailArtist1: "https://www.figma.com/api/mcp/asset/95f969bd-7919-4c32-bd14-a829490a0bd5",
  detailArtist2: "https://www.figma.com/api/mcp/asset/ec8d9579-33f6-4b8b-8709-aa1c9ed29aaf",
  detailCloseButton: "https://www.figma.com/api/mcp/asset/580f9ab0-c6c1-40ac-817d-919d677c216e",
  detailFavorite: "https://www.figma.com/api/mcp/asset/fac3a7b2-47e4-4056-9ed3-b134c62d8acc",
  detailHero: "https://www.figma.com/api/mcp/asset/47d97d65-9c62-43d1-a24c-c3d11c76c95a",
  detailLocationPhoto: "https://www.figma.com/api/mcp/asset/b059f63c-80a4-418e-a1ad-775ca3a00d21",
  detailPager: "https://www.figma.com/api/mcp/asset/05d5f67c-0617-451b-a509-72957c42d588",
  detailPagerActive: "https://www.figma.com/api/mcp/asset/55fc19e6-c9ed-4fc8-a66f-aed686b54c73",
  detailPin: "https://www.figma.com/api/mcp/asset/73997481-86a0-4f47-bf79-a86b70496d58",
  previewBand: "/discover/preview-band.png",
  paymentApplePay: "https://www.figma.com/api/mcp/asset/475f9278-e187-4f34-878f-9bccb4140788",
  paymentBack: "https://www.figma.com/api/mcp/asset/bc2ab41e-c3c2-47a4-8119-735f23dd7568",
  paymentGooglePay: "https://www.figma.com/api/mcp/asset/8c126be8-276e-4ff3-bc35-13c948e6c083",
  paymentSuccess: "https://www.figma.com/api/mcp/asset/3ef12a7c-607c-4e25-943d-5a49b66de28a",
  ticketAvatar: "https://www.figma.com/api/mcp/asset/6b0d2a36-6d2f-45b9-8eae-6dc9541ed14b",
  ticketDivider: "https://www.figma.com/api/mcp/asset/1944c6f3-f9a1-46be-836c-6265bd65630e",
  ticketHero: "https://www.figma.com/api/mcp/asset/0e6c9ea0-fbac-446e-898c-e492bba9a2f1",
  ticketLiveMusic: "https://www.figma.com/api/mcp/asset/bdd17d26-6c0e-4068-8ad6-330fcf2ae496",
  ticketLocation: "https://www.figma.com/api/mcp/asset/164b2cc7-4ba8-4190-8e2a-250a95064749",
} as const;

function TicketSegment({
  active,
  children,
}: {
  active?: boolean;
  children: React.ReactNode;
}) {
  return (
    <button
      className={`flex h-[43px] whitespace-nowrap items-center justify-center rounded-[28.5px] border px-[clamp(14px,4vw,20px)] text-[13px] font-bold sm:text-[14px] ${
        active ? "border-black bg-black text-white" : "border-[#c5c5c5] bg-white text-[#8e8e93]"
      }`}
      type="button"
    >
      {children}
    </button>
  );
}

function TicketCard({ onOpen }: { onOpen: () => void }) {
  return (
    <div className="w-full rounded-[24px] border-[0.4px] border-[rgba(219,219,219,0.96)] bg-white px-[clamp(14px,4.8vw,20px)] pb-[12px] pt-[clamp(18px,7vw,29px)] shadow-[0_4px_29.3px_rgba(0,0,0,0.07)]">
      <div className="flex flex-col gap-[13px]">
        <div className="flex items-center gap-[clamp(10px,4vw,15px)]">
          <button
            className="relative h-[clamp(72px,24vw,85px)] w-[clamp(72px,24vw,85px)] shrink-0 overflow-hidden rounded-[11px]"
            onClick={onOpen}
            type="button"
          >
            <img
              alt=""
              className="absolute left-[-40.11%] top-[-41.23%] h-[182.1%] w-[183.97%] max-w-none"
              src={assets.ticketHero}
            />
            <div className="absolute inset-0 rounded-[12px] bg-gradient-to-t from-[rgba(0,0,0,0.8)] via-[rgba(0,0,0,0.2)] to-transparent" />
          </button>

          <div className="min-w-0 flex-1">
            <div className="mb-[12px] inline-flex items-center gap-[3px] rounded-[12px] bg-[#ffecee] px-[11px] pb-[3px] pt-[5px] text-[11px] font-bold text-[#dc2626] sm:text-[12px]">
              <img alt="" className="h-[14px] w-[14px]" src={assets.ticketLiveMusic} />
              <span>ライブミュージック</span>
            </div>
            <p className="text-[clamp(16px,4.8vw,18px)] font-bold leading-[1.15] text-[#0f172a]">
              サマー・ルーフトップ・ジャズ
            </p>
            <div className="mt-[1px] flex items-end gap-[3px]">
              <img alt="" className="h-[17px] w-[17px]" src={assets.ticketLocation} />
              <p className="truncate text-[clamp(11px,3.5vw,13px)] font-bold leading-[16px] text-[#6c6868]">
                ドレス グレープ , 渋谷
              </p>
            </div>
          </div>
        </div>

        <img alt="" className="h-px w-full" src={assets.ticketDivider} />

        <div className="flex items-end justify-between gap-[12px]">
          <div>
            <p className="text-[13px] font-bold leading-[17px] text-black">8月24日 (金)</p>
            <p className="text-[11px] font-bold leading-[17px] text-[#999999]">開場 18:00</p>
          </div>
          <button
            className="h-[42px] shrink-0 rounded-[23.5px] bg-[#04bcb4] px-[clamp(16px,6vw,22px)] text-[14px] font-bold text-white"
            onClick={onOpen}
            type="button"
          >
            チケットを見る
          </button>
        </div>
      </div>
    </div>
  );
}

function EmptyTicketState() {
  return (
    <div className="flex w-full flex-1 items-center justify-center rounded-[24px] border border-[#ececec] bg-[#fbfbfb] px-[24px] py-[42px] text-center shadow-[0_4px_29.3px_rgba(0,0,0,0.04)]">
      <div>
        <p className="text-[18px] font-bold leading-[24px] text-[#0f172a]">チケットはまだありません</p>
        <p className="mt-[8px] text-[13px] leading-[20px] text-[#6b7280]">
          購入したイベントのチケットがここに表示されます。
        </p>
      </div>
    </div>
  );
}

export function TicketPage({
  hasPurchasedTicket,
  onOpenDetail,
}: {
  hasPurchasedTicket: boolean;
  onOpenDetail: () => void;
}) {
  return (
    <div className="relative min-h-dvh w-full bg-white px-[clamp(20px,10.5vw,42px)] pb-[140px] pt-[max(24px,env(safe-area-inset-top))]">
      <div className="flex min-h-[calc(100dvh-max(48px,env(safe-area-inset-top))-max(24px,env(safe-area-inset-bottom)))] flex-col">
        <div className="flex flex-1 flex-col gap-[30px]">
          <div className="flex justify-end">
            <div className="h-[43px] w-[43px] overflow-hidden rounded-[21.5px] border border-[#929292]">
              <img alt="" className="h-full w-full object-cover" src={assets.ticketAvatar} />
            </div>
          </div>

          <div className="flex flex-col gap-[19px]">
            <h1 className="text-[24px] font-bold leading-[20px] text-black">チケット</h1>
            <div className="flex items-center gap-[8px] overflow-x-auto pb-[2px]">
              <TicketSegment active>{`今後の予定(${hasPurchasedTicket ? 1 : 0})`}</TicketSegment>
              <TicketSegment>過去のイベント</TicketSegment>
              <TicketSegment>譲渡</TicketSegment>
            </div>
          </div>

          {hasPurchasedTicket ? <TicketCard onOpen={onOpenDetail} /> : <EmptyTicketState />}
        </div>

        <div className="mt-auto pt-[40px]" />
      </div>
    </div>
  );
}

function DetailInfoCard({
  title,
  value,
  subtext,
}: {
  title: string;
  value: string;
  subtext: string;
}) {
  return (
    <div className="flex-1 rounded-[16px] border border-[#f3f4f6] bg-white px-[16px] py-[16px] shadow-[0_1px_2px_rgba(0,0,0,0.05)]">
      <p className="mb-[12px] text-[12px] font-bold uppercase tracking-[1px] text-[#64748b]">数量</p>
      <p className="mt-[4px] text-[14px] font-bold leading-[20px] text-[#0f172a]">{value}</p>
      <p className="mt-[4px] text-[12px] leading-[16px] text-[#6b7280]">{subtext}</p>
    </div>
  );
}

function ArtistRow({
  image,
  name,
  genre,
  time,
  bordered = true,
}: {
  image: string;
  name: string;
  genre: string;
  time: string;
  bordered?: boolean;
}) {
  return (
    <div className="flex items-center gap-[16px]">
      <div className="h-[48px] w-[48px] shrink-0 overflow-hidden rounded-full bg-[#e5e7eb]">
        <img alt="" className="h-full w-full object-cover" src={image} />
      </div>
      <div className={`min-w-0 flex-1 pb-[17px] ${bordered ? "border-b border-[#f3f4f6]" : ""}`}>
        <p className="text-[14px] font-bold leading-[20px] text-[#0f172a]">{name}</p>
        <p className="text-[12px] leading-[16px] text-[#9ca3af]">{genre}</p>
      </div>
      <div className="pb-[16px] text-[12px] leading-[16px] text-[#94a3b8]">{time}</div>
    </div>
  );
}

export function EventDetailPage({
  isMapTransition = false,
  isBookingOpen = false,
  onBookTickets,
  onClose,
  showBookTickets = true,
}: {
  isMapTransition?: boolean;
  isBookingOpen?: boolean;
  onBookTickets: () => void;
  onClose: () => void;
  showBookTickets?: boolean;
}) {
  const contentTransition = isMapTransition
    ? {
        initial: { opacity: 0, y: 18 },
        animate: { opacity: 1, y: 0 },
        transition: { delay: 0.18, duration: 0.28, ease: [0.22, 1, 0.36, 1] as const },
      }
    : {};

  const bodyTransition = isMapTransition
    ? {
        initial: { opacity: 0, y: 22 },
        animate: { opacity: 1, y: 0 },
        transition: { delay: 0.24, duration: 0.3, ease: [0.22, 1, 0.36, 1] as const },
      }
    : {};

  const rootClassName = isMapTransition
    ? "h-dvh w-full overflow-y-auto overflow-x-hidden bg-transparent overscroll-y-contain"
    : "min-h-dvh w-full overflow-visible bg-transparent";

  return (
    <div
      className={rootClassName}
      style={{ WebkitOverflowScrolling: "touch", touchAction: "pan-y" }}
    >
      <motion.div
        className="min-h-dvh w-full bg-white pb-[40px]"
        layoutId={isMapTransition ? SUMMER_JAZZ_LAYOUT_IDS.container : undefined}
        transition={{
          duration: 0.34,
          ease: [0.22, 1, 0.36, 1],
        }}
      >
        <div className="relative h-[309px] overflow-hidden">
          {isMapTransition ? (
            <>
              <motion.div className="absolute inset-0 overflow-hidden" layoutId={SUMMER_JAZZ_LAYOUT_IDS.image}>
                <img alt="" className="h-full w-full scale-[1.28] object-cover" src={assets.previewBand} />
                <div className="absolute inset-0 bg-gradient-to-t from-black via-[rgba(0,0,0,0.53)] to-transparent" />
              </motion.div>
              <motion.img
                alt=""
                animate={{ opacity: 1, scale: 1.28 }}
                className="absolute inset-0 h-full w-full object-cover"
                initial={{ opacity: 0, scale: 1.32 }}
                src={assets.detailHero}
                transition={{ delay: 0.12, duration: 0.24, ease: "easeOut" }}
              />
            </>
          ) : (
            <img alt="" className="h-full w-full scale-[1.28] object-cover" src={assets.detailHero} />
          )}
          <div className="absolute inset-x-0 bottom-0 h-[240px] bg-gradient-to-t from-black via-[rgba(0,0,0,0.53)] to-transparent" />
          <div className="absolute left-[27px] top-[107px] rounded-[11px] bg-[#dc2626] px-[6px] py-[3px] text-[10px] font-bold uppercase tracking-[0.5px] text-white">
            本日開催
          </div>
          <button className="absolute right-[19px] top-[101px] h-[40px] w-[40px]" onClick={onClose} type="button">
            <img alt="Close detail" className="h-full w-full" src={assets.detailCloseButton} />
          </button>
          <div className="absolute bottom-[26px] left-1/2 flex -translate-x-1/2 items-center gap-[4px]">
            <img alt="" className="h-[6px] w-[6px]" src={assets.detailPagerActive} />
            <img alt="" className="h-[6px] w-[6px]" src={assets.detailPager} />
            <img alt="" className="h-[6px] w-[6px]" src={assets.detailPager} />
            <img alt="" className="h-[6px] w-[6px]" src={assets.detailPager} />
          </div>
        </div>

        <div className="relative -mt-[20px] rounded-t-[20px] bg-white px-[26px] pb-[48px] pt-[32px]">
          <div className="flex flex-col gap-[32px]">
            <motion.div className="flex flex-col gap-[15px]" {...contentTransition}>
              <div className="flex items-start justify-between gap-[16px]">
                <div>
                  <motion.h1
                    className="text-[24px] font-bold leading-[1.2] text-[#080808]"
                    layoutId={isMapTransition ? SUMMER_JAZZ_LAYOUT_IDS.title : undefined}
                  >
                    サマー・ルーフトップ・ジャズ
                  </motion.h1>
                  <motion.div
                    className="mt-[4px] flex items-center gap-[2px]"
                    layoutId={isMapTransition ? SUMMER_JAZZ_LAYOUT_IDS.location : undefined}
                  >
                    <img alt="" className="h-[23px] w-[24px]" src={assets.detailPin} />
                    <p className="text-[13px] leading-[20px] text-black">ドレス グレープ, 渋谷</p>
                  </motion.div>
                </div>
                <div className="flex h-[40px] w-[40px] shrink-0 items-center justify-center rounded-full bg-[#f2f2f2]">
                  <img alt="" className="h-[18.35px] w-[20px]" src={assets.detailFavorite} />
                </div>
              </div>
            </motion.div>

            <motion.div className="flex gap-[16px]" {...bodyTransition}>
              <DetailInfoCard title="日時" value="本日, 8月24日" subtext="20:00 - 23:30" />
              <DetailInfoCard title="入場料" value={formatYen(3500)} subtext="1ドリンク付き" />
            </motion.div>

            <motion.div {...bodyTransition}>
              <h2 className="text-[18px] font-bold leading-[28px] text-[#0f172a]">イベントについて</h2>
              <p className="text-[14px] leading-[22.75px] text-[#4b5563]">
                渋谷の息をのむような夜景を背景に、コンテンポラリージャズの魅惑的な夜を体験してください。DRESS GRAPEのルーフトップは、日が沈むにつれて親密な音楽のサンクチュアリへと変わります。東京で最高峰のジャズミュージシャンたちの日替わりラインナップをお楽しみいただけます。
              </p>
            </motion.div>

            <motion.div {...bodyTransition}>
              <h2 className="mb-[16px] text-[18px] font-bold leading-[28px] text-[#0f172a]">本日のラインナップ</h2>
              <div className="flex flex-col gap-[16px]">
                <ArtistRow image={assets.detailArtist1} genre="コンテンポラリージャズ / サックス" name="田中健二トリオ" time="20:30" />
                <ArtistRow bordered={false} image={assets.detailArtist2} genre="ボーカルジャズ / ソウル" name="サラ・オハラ" time="22:00" />
              </div>
            </motion.div>

            <motion.div {...bodyTransition}>
              <h2 className="mb-[19px] text-[18px] font-bold leading-[28px] text-[#0f172a]">開催地</h2>
              <div className="overflow-hidden rounded-[16px] border border-[#f3f4f6] bg-white p-[1px] shadow-[0_1px_2px_rgba(0,0,0,0.05)]">
              <div className="relative h-[156px] overflow-hidden rounded-[9px]">
                <img alt="" className="h-full w-full object-cover" src={assets.detailLocationPhoto} />
              </div>
            </div>
              <div className="mt-[19px] flex items-start justify-between gap-[16px]">
                <div>
                  <p className="text-[14px] font-bold leading-[20px] text-[#0f172a]">DRESS GRAPE</p>
                  <p className="text-[12px] leading-[16px] text-[#6b7280]">東京都渋谷区桜丘町1-1-1F</p>
                </div>
                <button className="h-[34px] shrink-0 rounded-[7px] border border-[#999] bg-white px-[16px] text-[12px] font-bold uppercase tracking-[0.3px] text-black" type="button">
                  マップで開く
                </button>
              </div>
            </motion.div>

            {showBookTickets ? (
              <motion.button
                className="h-[52px] w-full rounded-[24px] bg-[#04bcb4] text-[16px] font-bold text-white"
                onClick={onBookTickets}
                type="button"
                animate={isBookingOpen ? { scale: 0.988, y: 1 } : { scale: 1, y: 0 }}
                whileTap={{ scale: 0.976, y: 2 }}
                transition={{ duration: 0.18, ease: [0.22, 1, 0.36, 1] }}
                {...bodyTransition}
              >
                チケットを予約する
              </motion.button>
            ) : null}
          </div>
        </div>
      </motion.div>
    </div>
  );
}

function BookingCounterButton({
  children,
  disabled = false,
  onClick,
}: {
  children: React.ReactNode;
  disabled?: boolean;
  onClick: () => void;
}) {
  return (
    <button
      aria-disabled={disabled}
      className={`flex h-[40px] w-[40px] items-center justify-center rounded-full border transition ${
        disabled ? "border-[#e5e7eb] text-[#b6bcc6] opacity-40" : "border-[#e5e7eb] text-[#111827] active:scale-95"
      }`}
      disabled={disabled}
      onClick={onClick}
      type="button"
    >
      {children}
    </button>
  );
}

function TicketSelectorCard({
  ticket,
  quantity,
  onDecrement,
  onIncrement,
}: {
  ticket: (typeof ticketOptions)[number];
  quantity: number;
  onDecrement: () => void;
  onIncrement: () => void;
}) {
  return (
    <div className="rounded-[21px] border border-[#e3e5ea] bg-white px-[16px] pb-[18px] pt-[24px]">
      <div className="flex flex-col gap-[16px]">
        <div className="flex items-start justify-between gap-[12px]">
          <div className="min-w-0">
            <div className="flex flex-wrap items-center gap-[10px]">
              <p className="text-[16px] font-bold leading-[1.44] tracking-[1px] text-black">{ticket.name}</p>
              {ticket.badge ? (
                <span className="rounded-[4px] bg-[#fef3b1] px-[6px] py-[2px] text-[10px] font-bold text-[#854d0e]">
                  {ticket.badge}
                </span>
              ) : null}
            </div>
            <div className="mt-[8px] text-[#868686]">
              <p className="text-[15px] leading-[1.14] tracking-[1px]">{ticket.description[0]}</p>
              <p
                className={`leading-[1.14] tracking-[1px] ${
                  ticket.id === "vip" ? "max-w-[180px] text-[12px]" : "text-[15px]"
                }`}
              >
                {ticket.description[1]}
              </p>
            </div>
          </div>
          <p className="shrink-0 text-[22px] font-bold leading-[1.44] tracking-[1px] text-[#352c2c]">
            {formatYen(ticket.price)}
          </p>
        </div>

        <div className="flex items-center justify-end">
          <BookingCounterButton disabled={quantity === 0} onClick={onDecrement}>
            <svg aria-hidden="true" className="h-[20px] w-[20px]" viewBox="0 0 20 20">
              <path d="M5 10h10" fill="none" stroke="currentColor" strokeLinecap="round" strokeWidth="1.8" />
            </svg>
          </BookingCounterButton>
          <div className="flex w-[56px] justify-center pl-[16px] text-center text-[18px] font-bold leading-[28px] text-black">
            {quantity}
          </div>
          <div className="pl-[16px]">
            <BookingCounterButton onClick={onIncrement}>
              <svg aria-hidden="true" className="h-[20px] w-[20px]" viewBox="0 0 20 20">
                <path
                  d="M10 5v10M5 10h10"
                  fill="none"
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeWidth="1.8"
                />
              </svg>
            </BookingCounterButton>
          </div>
        </div>
      </div>
    </div>
  );
}

export function BookingPage({
  onClose,
  onBack,
  onPayNow,
  onProceed,
  onSuccessClose,
  onSuccessDiscover,
  onSuccessViewTickets,
  quantities,
  setQuantities,
  step,
  stepDirection,
}: {
  onClose: () => void;
  onBack: () => void;
  onPayNow: () => void;
  onProceed: () => void;
  onSuccessClose: () => void;
  onSuccessDiscover: () => void;
  onSuccessViewTickets: () => void;
  quantities: TicketQuantityMap;
  setQuantities: React.Dispatch<React.SetStateAction<TicketQuantityMap>>;
  step: "booking" | "payment" | "success";
  stepDirection: 1 | -1;
}) {
  const totalAmount = ticketOptions.reduce((sum, ticket) => sum + ticket.price * (quantities[ticket.id] ?? 0), 0);
  const selectedCount = ticketOptions.reduce((sum, ticket) => sum + (quantities[ticket.id] ?? 0), 0);
  const [paymentMethod, setPaymentMethod] = useState<"card" | "apple" | "google">("card");
  const dragY = useMotionValue(0);
  const overlayOpacity = useTransform(dragY, [0, 420], [0.24, 0]);
  const selectedTickets = ticketOptions.filter((ticket) => (quantities[ticket.id] ?? 0) > 0);

  const updateQuantity = (ticketId: string, delta: number) => {
    setQuantities((current) => ({
      ...current,
      [ticketId]: Math.max(0, (current[ticketId] ?? 0) + delta),
    }));
  };
  const isPaymentStep = step === "payment";
  const isSuccessStep = step === "success";
  const stepVariants = {
    enter: (direction: 1 | -1) => ({
      x: direction > 0 ? 34 : -34,
      opacity: 0,
    }),
    center: {
      x: 0,
      opacity: 1,
    },
    exit: (direction: 1 | -1) => ({
      x: direction > 0 ? -24 : 24,
      opacity: 0,
    }),
  };

  return (
    <div className="absolute inset-0 z-30 overflow-hidden">
      <motion.div
        className="absolute inset-0 bg-[rgba(15,23,42,0.22)] backdrop-blur-[6px]"
        initial={{ opacity: 0 }}
        onClick={onClose}
        style={{ opacity: overlayOpacity }}
        transition={{ duration: 0.28, ease: "easeOut" }}
      />
      <div className="absolute inset-0 flex items-end">
        <motion.div
          animate={{ y: 0 }}
          className="relative w-full"
          drag="y"
          dragConstraints={{ top: 0, bottom: 0 }}
          dragElastic={{ top: 0, bottom: 1 }}
          exit={{ y: "100%" }}
          initial={{ y: "100%" }}
          onDragEnd={(e, info) => {
            if (info.offset.y > 104 || info.velocity.y > 400) {
              onClose();
            }
          }}
          style={{ y: dragY, touchAction: "none" }}
          transition={{ duration: 0.34, ease: [0.22, 1, 0.36, 1] }}
        >
          <div className="relative z-10 flex min-h-[calc(100dvh-34px)] max-h-[calc(100dvh-34px)] flex-col rounded-t-[28px] border border-[rgba(255,255,255,0.7)] bg-white px-[20px] pb-[28px] pt-[16px] shadow-[0_-24px_60px_rgba(15,23,42,0.18)]">
            <div className="mb-[18px] flex justify-center">
              <div className="h-[5px] w-[56px] rounded-full bg-[#d7dce4]" />
            </div>
            <motion.div
              animate={{ opacity: 1, y: 0 }}
              className="relative flex items-center justify-start"
              initial={{ opacity: 0, y: 12 }}
              transition={{ delay: 0.1, duration: 0.22, ease: "easeOut" }}
            >
              <button
                aria-label="Close booking"
                className="flex h-[34px] w-[34px] items-center justify-center rounded-full bg-[#f0f0f0] text-[#3c3c43] active:scale-95"
                onClick={isSuccessStep ? onSuccessClose : isPaymentStep ? onBack : onClose}
                type="button"
              >
                <svg aria-hidden="true" className="h-[15px] w-[15px]" viewBox="0 0 16 16">
                  {isSuccessStep ? (
                    <path
                      d="M3.5 3.5l9 9m0-9l-9 9"
                      fill="none"
                      stroke="currentColor"
                      strokeLinecap="round"
                      strokeWidth="1.6"
                    />
                  ) : isPaymentStep ? (
                    <path
                      d="M10.5 3.5L4.5 8l6 4.5"
                      fill="none"
                      stroke="currentColor"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="1.8"
                    />
                  ) : (
                    <path
                      d="M3.5 3.5l9 9m0-9l-9 9"
                      fill="none"
                      stroke="currentColor"
                      strokeLinecap="round"
                      strokeWidth="1.6"
                    />
                  )}
                </svg>
              </button>
              <AnimatePresence initial={false} mode="wait">
                <motion.p
                  key={step}
                  animate={{ opacity: 1, x: 0 }}
                  className="absolute left-1/2 -translate-x-1/2 text-[16px] font-bold leading-[1.44] tracking-[1px] text-black"
                  exit={{ opacity: 0, x: stepDirection > 0 ? -12 : 12 }}
                  initial={{ opacity: 0, x: stepDirection > 0 ? 12 : -12 }}
                  transition={{ duration: 0.22, ease: [0.22, 1, 0.36, 1] }}
                >
                  <div className="flex-1 text-center text-[20px] font-bold leading-[20px] text-black">
                    {isSuccessStep ? "ありがとうございます" : isPaymentStep ? "お支払い" : "チケットを予約する"}
                  </div>
                </motion.p>
              </AnimatePresence>
            </motion.div>

            <div className="mt-[28px] min-h-0 flex flex-1 flex-col overflow-hidden">
              <AnimatePresence custom={stepDirection} initial={false} mode="wait">
                {isSuccessStep ? (
                  <motion.div
                    key="success"
                    animate="center"
                    className="flex min-h-0 flex-1 flex-col"
                    custom={stepDirection}
                    exit="exit"
                    initial="enter"
                    variants={stepVariants}
                    transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
                  >
                    <div className="min-h-0 flex-1 overflow-y-auto overflow-x-hidden pb-[20px]">
                      <motion.div
                        animate={{ opacity: 1, y: 0 }}
                        className="flex flex-col items-center px-[6px] pt-[28px]"
                        initial={{ opacity: 0, y: 10 }}
                        transition={{ delay: 0.08, duration: 0.22, ease: "easeOut" }}
                      >
                        <SuccessIllustration />
                        <div className="mt-[15px] flex w-full flex-col items-center">
                          <div className="text-center">
                            <h1 className="mt-[24px] text-[32px] font-bold tracking-[-0.02em] text-[#0f172a]">ありがとうございます！</h1>
                            <p className="mt-[8px] text-[18px] font-medium leading-[28px] text-[#475569]">
                              登録が完了しました！
                            </p>
                          </div>

                          <div className="mt-[36px] w-full rounded-[12px] border border-[rgba(20,184,166,0.1)] bg-[rgba(20,184,166,0.05)] px-[17px] py-[14px]">
                            <p className="mt-[12px] text-center text-[14px] leading-[22px] text-[#64748b]">
                              登録内容を記載した確認メールを以下の宛先に送信しました：
                              <br />
                              <span className="font-semibold text-[#0f172a]">alex@example.com</span>
                            </p>
                          </div>

                          <div className="mt-[36px] flex w-full flex-col gap-[13px]">
                            <button
                              className="h-[45px] w-full rounded-[20px] bg-[#00c7be] text-[13px] font-bold tracking-[1px] text-white shadow-[0_1px_15.9px_rgba(0,199,190,0.18)]"
                              onClick={onSuccessViewTickets}
                              type="button"
                            >
                              チケットを見る
                            </button>
                            <button
                              className="h-[45px] w-full rounded-[20px] border border-[#00c7be] bg-transparent text-[13px] font-bold tracking-[1px] text-[#00c7be]"
                              onClick={onSuccessDiscover}
                              type="button"
                            >
                              イベントを探す
                            </button>
                          </div>
                        </div>
                      </motion.div>
                    </div>
                  </motion.div>
                ) : isPaymentStep ? (
                  <motion.div
                    key="payment"
                    animate="center"
                    className="flex min-h-0 flex-1 flex-col"
                    custom={stepDirection}
                    exit="exit"
                    initial="enter"
                    variants={stepVariants}
                    transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
                  >
                    <div className="min-h-0 flex-1 overflow-y-auto overflow-x-hidden pb-[20px]">
                      <motion.div
                        animate={{ opacity: 1, y: 0 }}
                        className="flex flex-col gap-[34px]"
                        initial={{ opacity: 0, y: 10 }}
                        transition={{ delay: 0.08, duration: 0.22, ease: "easeOut" }}
                      >
                        <section className="flex flex-col gap-[16px]">
                          <h1 className="text-[18px] font-bold leading-[28px] text-[#0f172a]">Order Summary</h1>
                          <div className="rounded-[16px] border border-[#e5e7eb] bg-white p-[21px] shadow-[0_1px_2px_rgba(0,0,0,0.05)]">
                            <div className="flex flex-col gap-[13px]">
                              {selectedTickets.length > 0 ? (
                                selectedTickets.map((ticket, index) => (
                                  <div key={ticket.id}>
                                    {index > 0 ? <div className="mb-[13px] border-t border-[#f3f4f6]" /> : null}
                                    <div className="flex items-start justify-between gap-[12px]">
                                      <div>
                                        <p className="text-[18px] font-bold leading-[28px] text-[#0f172a]">
                                          {ticket.name}
                                        </p>
                                        <p className="text-[14px] leading-[20px] text-[#6b7280]">
                                          {ticket.description.join(" ")}
                                        </p>
                                      </div>
                                      <p className="text-[18px] font-bold leading-[28px] text-[#0f172a]">
                                        {formatYen(ticket.price)}
                                      </p>
                                    </div>
                                    <div className="mt-[13px] flex items-center justify-between border-t border-[#f3f4f6] pt-[13px]">
                                      <div className="text-[10px] font-bold leading-[12px] text-[#64748b]">カード</div>
                                      <p className="text-[14px] font-bold leading-[20px] text-[#0f172a]">
                                        x {quantities[ticket.id]}
                                      </p>
                                    </div>
                                  </div>
                                ))
                              ) : (
                                selectedCount === 0 && (
                                  <div className="py-[16px] text-center text-[14px] text-[#64748b]">チケットが選択されていません。</div>
                                )
                              )}
                            </div>
                          </div>
                        </section>

                        <section className="flex flex-col gap-[16px]">
                          <h2 className="text-[18px] font-bold leading-[28px] text-[#0f172a]">Payment Method</h2>
                          <div className="flex flex-col gap-[16px]">
                            <PaymentMethodOption
                              checked={paymentMethod === "card"}
                              onClick={() => setPaymentMethod("card")}
                            >
                              <div className="flex items-center">
                                <span className="mr-[12px] flex h-[28px] w-[40px] items-center justify-center rounded-[4px] bg-[#e5e7eb] text-[8px] font-bold text-[#4b5563]">
                                  CARD
                                </span>
                                <span className="text-[16px] leading-[24px] text-[#111827]">
                                  Credit / Debit Card
                                </span>
                              </div>
                            </PaymentMethodOption>

                            <PaymentMethodOption
                              checked={paymentMethod === "apple"}
                              onClick={() => setPaymentMethod("apple")}
                            >
                              <div className="flex items-center gap-[15px]">
                                <img
                                  alt=""
                                  className="h-[29px] w-[29px] object-cover"
                                  src={assets.paymentApplePay}
                                />
                                <span className="text-[14px] leading-[20px] text-[#111827]">Apple Pay</span>
                              </div>
                            </PaymentMethodOption>

                            <PaymentMethodOption
                              checked={paymentMethod === "google"}
                              onClick={() => setPaymentMethod("google")}
                            >
                              <div className="flex items-center gap-[15px]">
                                <img
                                  alt=""
                                  className="h-[37px] w-[37px] object-cover"
                                  src={assets.paymentGooglePay}
                                />
                                <span className="text-[14px] leading-[20px] text-black">Google Pay</span>
                              </div>
                            </PaymentMethodOption>
                          </div>
                        </section>
                      </motion.div>
                    </div>
                  </motion.div>
                ) : (
                  <motion.div
                    key="booking"
                    animate="center"
                    className="flex min-h-0 flex-1 flex-col"
                    custom={stepDirection}
                    exit="exit"
                    initial="enter"
                    variants={stepVariants}
                    transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
                  >
                    <div className="min-h-0 flex-1 overflow-y-auto overflow-x-hidden pb-[12px]">
                      <motion.div
                        animate={{ opacity: 1, y: 0 }}
                        className="flex flex-col gap-[22px]"
                        initial={{ opacity: 0, y: 16 }}
                        transition={{ delay: 0.08, duration: 0.22, ease: "easeOut" }}
                      >
                        <h1 className="text-[18px] font-bold leading-[1.44] tracking-[1px] text-black">
                          Select Tickets
                        </h1>
                        {ticketOptions.map((ticket) => (
                          <TicketSelectorCard
                            key={ticket.id}
                            onDecrement={() => updateQuantity(ticket.id, -1)}
                            onIncrement={() => updateQuantity(ticket.id, 1)}
                            quantity={quantities[ticket.id] ?? 0}
                            ticket={ticket}
                          />
                        ))}
                      </motion.div>

                      <motion.div
                        animate={{ opacity: 1, y: 0 }}
                        className="mt-[22px] rounded-[12px] border border-[#dbeafe] bg-[#eff6ff] px-[16px] py-[15px]"
                        initial={{ opacity: 0, y: 18 }}
                        transition={{ delay: 0.14, duration: 0.22, ease: "easeOut" }}
                      >
                        <div className="flex items-start gap-[12px]">
                          <div className="pt-[3px] text-[#2563eb]">
                            <svg aria-hidden="true" className="h-[16px] w-[16px]" viewBox="0 0 20 20">
                              <circle
                                cx="10"
                                cy="10"
                                r="7"
                                fill="none"
                                stroke="currentColor"
                                strokeWidth="1.5"
                              />
                              <path
                                d="M10 8v5m0-8h.01"
                                fill="none"
                                stroke="currentColor"
                                strokeLinecap="round"
                                strokeWidth="1.5"
                              />
                            </svg>
                          </div>
                          <div>
                            <p className="text-[14px] font-semibold leading-[20px] text-[#1e3a8a]">
                              Entry Information
                            </p>
                            <p className="mt-[4px] text-[12px] leading-[19.5px] text-[#1d4ed8]">
                              Doors open at 7:30 PM. Please present your digital ticket QR code at the
                              reception desk on the 1st floor of DRESS GRAPE.
                            </p>
                          </div>
                        </div>
                      </motion.div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            <motion.div
              animate={{ opacity: 1, y: 0 }}
              className={`mt-[24px] border-t border-dashed border-[#d6d7dc] pt-[24px] ${isSuccessStep ? "hidden" : ""}`}
              initial={{ opacity: 0, y: 20 }}
              transition={{ delay: 0.28, duration: 0.24, ease: "easeOut" }}
            >
              <div className="flex items-center justify-between px-[24px] py-[20px]">
                <div>
                  <p className="text-[13px] leading-[18px] text-[#64748b]">合計</p>
                  <p className="text-[20px] font-bold leading-[24px] text-[#0f172a]">{formatYen(totalAmount)}</p>
                </div>
                <motion.button
                  className={`flex h-[48px] min-w-[140px] items-center justify-center rounded-[24px] bg-[#04bcb4] px-[24px] text-[15px] font-bold text-white transition-all disabled:opacity-50 ${
                    isPaymentStep ? "min-w-[117px]" : "min-w-[182px]"
                  }`}
                  disabled={totalAmount === 0}
                  onClick={isPaymentStep ? onPayNow : onProceed}
                  type="button"
                  whileTap={{ scale: 0.982, y: 1 }}
                >
                  {isPaymentStep ? "支払う" : "支払いに進む"}
                </motion.button>
              </div>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}

function PaymentMethodOption({
  checked,
  children,
  onClick,
}: {
  checked?: boolean;
  children: React.ReactNode;
  onClick: () => void;
}) {
  return (
    <button
      className={`flex w-full items-center rounded-[16px] border px-[16px] py-[17px] text-left transition ${
        checked ? "border-[#14b8a6] bg-[#f8fafc] shadow-[0_0_0_1px_#14b8a6_inset]" : "border-[#e5e7eb] bg-white"
      }`}
      onClick={onClick}
      type="button"
    >
      <span
        className={`flex h-[18px] w-[18px] items-center justify-center rounded-full border ${
          checked ? "border-[#0d9488] bg-[#0d9488]" : "border-[#d1d5db] bg-white"
        }`}
      >
        {checked ? <span className="h-[6px] w-[6px] rounded-full bg-white" /> : null}
      </span>
      <div className="ml-[16px]">{children}</div>
    </button>
  );
}

export function PaymentPage({
  onBack,
  onPayNow,
  quantities,
}: {
  onBack: () => void;
  onPayNow: () => void;
  quantities: TicketQuantityMap;
}) {
  const [paymentMethod, setPaymentMethod] = useState<"card" | "apple" | "google">("card");

  const selectedTickets = ticketOptions.filter((ticket) => (quantities[ticket.id] ?? 0) > 0);
  const totalAmount = selectedTickets.reduce((sum, ticket) => sum + ticket.price * (quantities[ticket.id] ?? 0), 0);

  return (
    <div className="h-dvh w-full overflow-hidden bg-black pt-[53px]">
      <div className="relative h-[calc(100dvh-53px)] overflow-hidden">
        <div className="absolute left-[12px] top-0 z-0 h-[24px] w-[378px] rounded-t-[10px] bg-[#a6adad]" />
        <div className="relative z-10 mt-[11px] flex h-[calc(100%-11px)] flex-col rounded-t-[15px] bg-white px-[26px] pt-[30px]">
          <div className="relative flex items-center justify-start shrink-0">
            <button aria-label="Back to booking" className="flex h-[24px] w-[24px] items-center justify-center" onClick={onBack} type="button">
              <img alt="" className="h-[12px] w-[10px] rotate-180" src={assets.paymentBack} />
            </button>
            <p className="absolute left-1/2 -translate-x-1/2 text-[16px] font-bold leading-[28px] text-black">
              Payment
            </p>
          </div>

          <div className="min-h-0 flex-1 overflow-y-auto overflow-x-hidden pb-[148px] pt-[44px]">
            <div className="flex flex-col gap-[34px]">
              <section className="flex flex-col gap-[16px]">
                <h1 className="text-[18px] font-bold leading-[28px] text-[#0f172a]">Order Summary</h1>
                <div className="rounded-[16px] border border-[#e5e7eb] bg-white p-[21px] shadow-[0_1px_2px_rgba(0,0,0,0.05)]">
                  <div className="flex flex-col gap-[13px]">
                    {selectedTickets.length > 0 ? (
                      selectedTickets.map((ticket, index) => (
                        <div key={ticket.id}>
                          {index > 0 ? <div className="mb-[13px] border-t border-[#f3f4f6]" /> : null}
                          <div className="flex items-start justify-between gap-[12px]">
                            <div>
                              <p className="text-[18px] font-bold leading-[28px] text-[#0f172a]">{ticket.name}</p>
                              <p className="text-[14px] leading-[20px] text-[#6b7280]">{ticket.description.join(" ")}</p>
                            </div>
                            <p className="text-[18px] font-bold leading-[28px] text-[#0f172a]">{formatYen(ticket.price)}</p>
                          </div>
                          <div className="mt-[13px] flex items-center justify-between border-t border-[#f3f4f6] pt-[13px]">
                            <p className="text-[14px] leading-[20px] text-[#6b7280]">Quantity</p>
                            <p className="text-[14px] font-bold leading-[20px] text-[#0f172a]">x {quantities[ticket.id]}</p>
                          </div>
                        </div>
                      ))
                    ) : (
                      <p className="text-[14px] leading-[20px] text-[#6b7280]">No tickets selected.</p>
                    )}
                  </div>
                </div>
              </section>

              <section className="flex flex-col gap-[16px]">
                <h2 className="text-[18px] font-bold leading-[28px] text-[#0f172a]">Payment Method</h2>

                <div className="flex flex-col gap-[16px]">
                  <PaymentMethodOption checked={paymentMethod === "card"} onClick={() => setPaymentMethod("card")}>
                    <div className="flex items-center">
                      <span className="mr-[12px] flex h-[28px] w-[40px] items-center justify-center rounded-[4px] bg-[#e5e7eb] text-[8px] font-bold text-[#4b5563]">
                        CARD
                      </span>
                      <span className="text-[16px] leading-[24px] text-[#111827]">Credit / Debit Card</span>
                    </div>
                  </PaymentMethodOption>

                  <PaymentMethodOption checked={paymentMethod === "apple"} onClick={() => setPaymentMethod("apple")}>
                    <div className="flex items-center gap-[15px]">
                      <img alt="" className="h-[29px] w-[29px] object-cover" src={assets.paymentApplePay} />
                      <span className="text-[14px] leading-[20px] text-[#111827]">Apple Pay</span>
                    </div>
                  </PaymentMethodOption>

                  <PaymentMethodOption checked={paymentMethod === "google"} onClick={() => setPaymentMethod("google")}>
                    <div className="flex items-center gap-[15px]">
                      <img alt="" className="h-[37px] w-[37px] object-cover" src={assets.paymentGooglePay} />
                      <span className="text-[14px] leading-[20px] text-black">Google Pay</span>
                    </div>
                  </PaymentMethodOption>
                </div>
              </section>
            </div>
          </div>

          <div className="sticky bottom-0 shrink-0 border-t border-dashed border-[#d6d7dc] bg-white pb-[max(28px,env(safe-area-inset-bottom))] pt-[24px]">
            <div className="flex items-center justify-between gap-[12px]">
              <div>
                <p className="text-[12px] leading-[1.44] tracking-[1px] text-[#a59999]">Total Amount</p>
                <p className="mt-[3px] text-[22px] font-bold leading-[1.1] text-[#352c2c]">{formatYen(totalAmount).replace(",", "")}</p>
              </div>
              <button
                className="h-[41px] min-w-[117px] rounded-[20px] bg-[#04bcb4] px-[28px] text-[13px] font-bold tracking-[1px] text-white disabled:opacity-60"
                disabled={totalAmount === 0}
                onClick={onPayNow}
                type="button"
              >
                Pay Now
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export function ThankYouPage({
  email,
  onClose,
  onDiscover,
  onViewTickets,
}: {
  email: string;
  onClose: () => void;
  onDiscover: () => void;
  onViewTickets: () => void;
}) {
  return (
    <div className="h-dvh w-full overflow-hidden bg-black pt-[53px]">
      <div className="relative h-[calc(100dvh-53px)] overflow-hidden">
        <div className="absolute left-[12px] top-0 z-0 h-[24px] w-[378px] rounded-t-[10px] bg-[#a6adad]" />
        <div className="relative z-10 mt-[11px] flex h-[calc(100%-11px)] flex-col rounded-t-[15px] bg-white px-[26px] pb-[40px] pt-[40px]">
          <div className="flex items-center justify-between">
            <p className="pl-[104px] text-[18px] font-bold leading-[28px] text-black">完了</p>
            <button className="text-[12px] tracking-[1px] text-[#5a5a5a]" onClick={onClose} type="button">
              閉じる
            </button>
          </div>

          <div className="flex flex-1 flex-col items-center justify-start pt-[88px]">
            <SuccessIllustration />

            <div className="mt-[15px] flex w-full flex-col items-center">
              <div className="text-center">
                <h1 className="mt-[24px] text-[32px] font-bold tracking-[-0.02em] text-[#0f172a]">ありがとうございます！</h1>
                <p className="mt-[8px] text-[18px] font-medium leading-[28px] text-[#475569]">
                  登録が完了しました！
                </p>
              </div>

              <div className="mt-[36px] w-full rounded-[12px] border border-[rgba(20,184,166,0.1)] bg-[rgba(20,184,166,0.05)] px-[17px] py-[14px]">
                <p className="mt-[12px] text-center text-[14px] leading-[22px] text-[#64748b]">
                  登録内容を記載した確認メールを以下の宛先に送信しました：
                  <br />
                  <span className="font-semibold text-[#0f172a]">{email}</span>
                </p>
              </div>

              <div className="mt-[36px] flex w-full flex-col gap-[13px]">
                <button
                  className="h-[45px] w-full rounded-[20px] bg-[#00c7be] text-[13px] font-bold tracking-[1px] text-white shadow-[0_1px_15.9px_rgba(0,199,190,0.18)]"
                  onClick={onViewTickets}
                  type="button"
                >
                  チケットを見る
                </button>
                <button
                  className="h-[45px] w-full rounded-[20px] border border-[#00c7be] bg-transparent text-[13px] font-bold tracking-[1px] text-[#00c7be]"
                  onClick={onDiscover}
                  type="button"
                >
                  イベントを探す
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function SuccessIllustration() {
  return (
    <div className="relative h-[159px] w-[206px] select-none">
      <div className="absolute left-1/2 top-1/2 h-[122px] w-[122px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[rgba(32,210,209,0.10)]" />
      <div className="absolute left-1/2 top-1/2 h-[90px] w-[90px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[rgba(32,210,209,0.18)]" />
      <div className="absolute left-1/2 top-1/2 flex h-[74px] w-[74px] -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full bg-white ring-[11px] ring-[rgba(32,210,209,0.28)]">
        <svg aria-hidden="true" className="h-[27px] w-[33px]" viewBox="0 0 33 27">
          <path
            d="M4 14.5l7.2 7.2L28.5 4.5"
            fill="none"
            stroke="#18C7C9"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="5.5"
          />
        </svg>
      </div>

      <div className="float-star absolute left-[34px] top-[28px]">
        <svg aria-hidden="true" className="h-[24px] w-[24px]" viewBox="0 0 24 24">
          <path
            d="M12 1.5l1.92 7.08L21 10.5l-7.08 1.92L12 19.5l-1.92-7.08L3 10.5l7.08-1.92L12 1.5z"
            fill="#F4BF18"
          />
        </svg>
      </div>

      <div className="float-plus absolute right-[46px] top-[34px]">
        <svg aria-hidden="true" className="h-[18px] w-[18px]" viewBox="0 0 18 18">
          <path
            d="M9 3v12M3 9h12"
            fill="none"
            stroke="#5A9BFF"
            strokeLinecap="round"
            strokeWidth="2.8"
          />
        </svg>
      </div>

      <div className="float-dot absolute left-[38px] top-[102px] h-[12px] w-[12px] rounded-full bg-[#EF5BB7]" />

      <style jsx>{`
        .float-star {
          animation: floatStar 4.2s ease-in-out infinite;
          transform-origin: center;
        }

        .float-plus {
          animation: floatPlus 3.8s ease-in-out infinite;
          transform-origin: center;
        }

        .float-dot {
          animation: floatDot 4.6s ease-in-out infinite;
        }

        @keyframes floatStar {
          0%,
          100% {
            transform: translate3d(0, 0, 0) rotate(0deg) scale(1);
          }
          50% {
            transform: translate3d(-4px, -6px, 0) rotate(-4deg) scale(1.02);
          }
        }

        @keyframes floatPlus {
          0%,
          100% {
            transform: translate3d(0, 0, 0) rotate(0deg);
          }
          50% {
            transform: translate3d(5px, -4px, 0) rotate(5deg);
          }
        }

        @keyframes floatDot {
          0%,
          100% {
            transform: translate3d(0, 0, 0);
          }
          50% {
            transform: translate3d(-3px, 5px, 0);
          }
        }
      `}</style>
    </div>
  );
}
