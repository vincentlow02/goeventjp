"use client";

import dynamic from "next/dynamic";
import { AnimatePresence, LayoutGroup, motion } from "framer-motion";
import { useState } from "react";

import { DiscoverScreen } from "@/components/discover/DiscoverScreen";
import { BottomNav } from "@/components/navigation/BottomNav";
import type {
  ActiveView,
  DetailSourceTab,
  MainTab,
  TicketQuantityMap,
} from "@/lib/eventApp";

const TicketPage = dynamic(() =>
  import("@/components/screens/TicketFlow").then((module) => module.TicketPage),
  { ssr: false },
);
const EventDetailPage = dynamic(() =>
  import("@/components/screens/TicketFlow").then((module) => module.EventDetailPage),
  { ssr: false },
);
const BookingPage = dynamic(() =>
  import("@/components/screens/TicketFlow").then((module) => module.BookingPage),
  { ssr: false },
);
const SavedPage = dynamic(() =>
  import("@/components/screens/LibraryScreens").then((module) => module.SavedPage),
  { ssr: false },
);
const ProfilePage = dynamic(() =>
  import("@/components/screens/LibraryScreens").then((module) => module.ProfilePage),
  { ssr: false },
);

export default function Page() {
  const [showDiscoverSearch, setShowDiscoverSearch] = useState(false);
  const [showSignIn, setShowSignIn] = useState(false);
  const [showDiscoverPreview, setShowDiscoverPreview] = useState(false);
  const [hasPurchasedTicket, setHasPurchasedTicket] = useState(false);
  const [bookingQuantities, setBookingQuantities] = useState<TicketQuantityMap>({
    general: 0,
    vip: 0,
  });
  const [detailSourceTab, setDetailSourceTab] = useState<DetailSourceTab>("discover");
  const [activeView, setActiveView] = useState<ActiveView>("discover");
  const [checkoutStepDirection, setCheckoutStepDirection] = useState<1 | -1>(1);
  const showDiscoverDetail = activeView === "ticketDetail" && detailSourceTab === "discover";
  const showDiscoverBooking = activeView === "ticketBooking" && detailSourceTab === "discover";
  const showDiscoverPayment = activeView === "ticketPayment" && detailSourceTab === "discover";
  const showDiscoverSuccess = activeView === "ticketSuccess" && detailSourceTab === "discover";
  const showTicketBooking = activeView === "ticketBooking" && detailSourceTab === "ticket";
  const showTicketPayment = activeView === "ticketPayment" && detailSourceTab === "ticket";
  const showTicketSuccess = activeView === "ticketSuccess" && detailSourceTab === "ticket";

  const navigateToTab = (tab: MainTab) => {
    if (tab !== "discover") {
      setShowDiscoverPreview(false);
    }

    setActiveView(tab);
  };

  const currentTab: MainTab =
    activeView === "discover"
      ? "discover"
      : activeView === "saved"
        ? "saved"
        : activeView === "profile"
          ? "profile"
          : activeView === "ticket" ||
              activeView === "ticketBooking" ||
              activeView === "ticketPayment" ||
              activeView === "ticketSuccess"
            ? "ticket"
            : "discover";

  return (
    <main className="min-h-dvh overflow-x-hidden bg-white">
      <div className="relative mx-auto min-h-dvh w-full max-w-[430px]">
        {activeView === "discover" ||
        showDiscoverDetail ||
        showDiscoverBooking ||
        showDiscoverPayment ||
        showDiscoverSuccess ? (
          <LayoutGroup id="summer-jazz-transition">
            <div className="relative min-h-dvh">
              <motion.div
                animate={
                  showDiscoverBooking || showDiscoverPayment || showDiscoverSuccess
                    ? { opacity: 0.92, scale: 0.994, y: -4, filter: "brightness(0.9)" }
                    : { opacity: 1, scale: 1, y: 0, filter: "brightness(1)" }
                }
                className="min-h-dvh origin-top"
                transition={{ duration: 0.28, ease: [0.22, 1, 0.36, 1] }}
              >
                <DiscoverScreen
                  isDetailOpen={
                    showDiscoverDetail ||
                    showDiscoverBooking ||
                    showDiscoverPayment ||
                    showDiscoverSuccess
                  }
                  onCloseJazzPreview={() => setShowDiscoverPreview(false)}
                  onCloseSignIn={() => setShowSignIn(false)}
                  onOpenJazzDetail={() => {
                    setDetailSourceTab("discover");
                    setActiveView("ticketDetail");
                  }}
                  onOpenJazzPreview={() => setShowDiscoverPreview(true)}
                  onOpenSignIn={() => setShowSignIn(true)}
                  onSearchPanelChange={setShowDiscoverSearch}
                  showJazzPreview={showDiscoverPreview}
                  showSignIn={showSignIn}
                />
              </motion.div>

              <AnimatePresence mode="wait">
                {showDiscoverDetail ||
                showDiscoverBooking ||
                showDiscoverPayment ||
                showDiscoverSuccess ? (
                  <motion.div
                    key="discover-detail"
                    className="absolute inset-0 z-20 overflow-y-auto overscroll-y-contain"
                    initial={{ opacity: 0 }}
                    animate={
                      showDiscoverBooking || showDiscoverPayment || showDiscoverSuccess
                        ? { opacity: 1, scale: 0.992, y: -4, filter: "brightness(0.9)" }
                        : { opacity: 1, scale: 1, y: 0, filter: "brightness(1)" }
                    }
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.22, ease: "easeOut" }}
                    style={{ WebkitOverflowScrolling: "touch", touchAction: "pan-y" }}
                  >
                    <EventDetailPage
                      isMapTransition
                      isBookingOpen={
                        showDiscoverBooking || showDiscoverPayment || showDiscoverSuccess
                      }
                      showBookTickets
                      onBookTickets={() => {
                        setCheckoutStepDirection(1);
                        setActiveView("ticketBooking");
                      }}
                      onClose={() => setActiveView("discover")}
                    />
                  </motion.div>
                ) : null}
              </AnimatePresence>

              <AnimatePresence>
                {showDiscoverBooking || showDiscoverPayment || showDiscoverSuccess ? (
                  <BookingPage
                    onClose={() => setActiveView("ticketDetail")}
                    onBack={() => {
                      setCheckoutStepDirection(-1);
                      setActiveView("ticketBooking");
                    }}
                    onPayNow={() => {
                      setHasPurchasedTicket(true);
                      setCheckoutStepDirection(1);
                      setActiveView("ticketSuccess");
                    }}
                    onProceed={() => {
                      setCheckoutStepDirection(1);
                      setActiveView("ticketPayment");
                    }}
                    onSuccessClose={() => setActiveView("discover")}
                    onSuccessDiscover={() => {
                      setShowDiscoverPreview(false);
                      setActiveView("discover");
                    }}
                    onSuccessViewTickets={() => navigateToTab("ticket")}
                    quantities={bookingQuantities}
                    setQuantities={setBookingQuantities}
                    step={
                      showDiscoverSuccess
                        ? "success"
                        : showDiscoverPayment
                          ? "payment"
                          : "booking"
                    }
                    stepDirection={checkoutStepDirection}
                  />
                ) : null}
              </AnimatePresence>
            </div>
          </LayoutGroup>
        ) : activeView === "ticket" ? (
          <TicketPage
            hasPurchasedTicket={hasPurchasedTicket}
            onOpenDetail={() => {
              setDetailSourceTab("ticket");
              setActiveView("ticketDetail");
            }}
          />
        ) : activeView === "saved" ? (
          <SavedPage />
        ) : activeView === "profile" ? (
          <ProfilePage />
        ) : activeView === "ticketDetail" ||
          showTicketBooking ||
          showTicketPayment ||
          showTicketSuccess ? (
          <div className="relative min-h-dvh">
            <motion.div
              animate={
                showTicketBooking || showTicketPayment || showTicketSuccess
                  ? { opacity: 1, scale: 0.992, y: -4, filter: "brightness(0.9)" }
                  : { opacity: 1, scale: 1, y: 0, filter: "brightness(1)" }
              }
              className="min-h-dvh origin-top"
              transition={{ duration: 0.28, ease: [0.22, 1, 0.36, 1] }}
            >
              <EventDetailPage
                isBookingOpen={showTicketBooking || showTicketPayment || showTicketSuccess}
                showBookTickets={false}
                onBookTickets={() => {
                  setCheckoutStepDirection(1);
                  setActiveView("ticketBooking");
                }}
                onClose={() => setActiveView(detailSourceTab)}
              />
            </motion.div>

            <AnimatePresence>
              {showTicketBooking || showTicketPayment || showTicketSuccess ? (
                <BookingPage
                  onClose={() => setActiveView("ticketDetail")}
                  onBack={() => {
                    setCheckoutStepDirection(-1);
                    setActiveView("ticketBooking");
                  }}
                  onPayNow={() => {
                    setHasPurchasedTicket(true);
                    setCheckoutStepDirection(1);
                    setActiveView("ticketSuccess");
                  }}
                  onProceed={() => {
                    setCheckoutStepDirection(1);
                    setActiveView("ticketPayment");
                  }}
                  onSuccessClose={() => setActiveView("ticket")}
                  onSuccessDiscover={() => {
                    setShowDiscoverPreview(false);
                    setActiveView("discover");
                  }}
                  onSuccessViewTickets={() => navigateToTab("ticket")}
                  quantities={bookingQuantities}
                  setQuantities={setBookingQuantities}
                  step={
                    showTicketSuccess ? "success" : showTicketPayment ? "payment" : "booking"
                  }
                  stepDirection={checkoutStepDirection}
                />
              ) : null}
            </AnimatePresence>
          </div>
        ) : null}

        {activeView !== "ticketBooking" &&
        activeView !== "ticketPayment" &&
        activeView !== "ticketSuccess" &&
        !showDiscoverDetail &&
        !showSignIn &&
        !showDiscoverSearch ? (
          <div className="pointer-events-none fixed inset-x-0 bottom-[max(36px,env(safe-area-inset-bottom))] z-30 flex justify-center">
            <div className="pointer-events-auto w-full max-w-[430px] px-[16px]">
              <BottomNav activeTab={currentTab} onTabChange={navigateToTab} />
            </div>
          </div>
        ) : null}
      </div>
    </main>
  );
}
