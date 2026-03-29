/* eslint-disable @next/next/no-img-element */

import type { MainTab } from "@/lib/eventApp";

const navAssets = {
  discover: "/discover/nav-discover-active.svg",
  discoverActive: "/discover/nav-discover.svg",
  ticket: "/discover/nav-ticket.svg",
  ticketActive: "/discover/nav-ticket-active.svg",
  saved: "/discover/nav-saved.svg",
  savedActive: "/discover/nav-saved-active.svg",
  profile: "/discover/nav-profile.svg",
  profileActive: "/discover/nav-profile-active.svg",
} as const;

function NavItem({
  active = false,
  icon,
  activeIcon,
  iconClass,
  activeIconClass,
  label,
  onClick,
}: {
  active?: boolean;
  icon: string;
  activeIcon?: string;
  iconClass: string;
  activeIconClass?: string;
  label: string;
  onClick?: () => void;
}) {
  return (
    <button className="flex w-[44px] flex-col items-center gap-[4px]" onClick={onClick} type="button">
      <span className="flex h-[29px] w-full items-center justify-center">
        <img
          alt=""
          className={active && activeIconClass ? activeIconClass : iconClass}
          src={active && activeIcon ? activeIcon : icon}
        />
      </span>
      <span className={`whitespace-nowrap text-[9px] leading-[12px] ${active ? "text-black" : "text-[#94a3b8]"}`}>
        {label}
      </span>
    </button>
  );
}

export function BottomNav({
  activeTab,
  onTabChange,
}: {
  activeTab: MainTab;
  onTabChange: (tab: MainTab) => void;
}) {
  return (
    <div className="mx-auto w-full max-w-[312px] rounded-[32px] border border-[#ededed] bg-white px-[24px] pb-[14px] pt-[19px] shadow-[0_25px_50px_rgba(0,0,0,0.25)]">
      <div className="flex items-end justify-center gap-[26px]">
        <NavItem
          active={activeTab === "discover"}
          activeIcon={navAssets.discoverActive}
          activeIconClass="h-[20px] w-[20px]"
          icon={navAssets.discover}
          iconClass="h-[20px] w-[20px]"
          label="おすすめ"
          onClick={() => onTabChange("discover")}
        />
        <NavItem
          active={activeTab === "ticket"}
          activeIcon={navAssets.ticketActive}
          activeIconClass="h-[29px] w-[29px]"
          icon={navAssets.ticket}
          iconClass="h-[29px] w-[28px]"
          label="チケット"
          onClick={() => onTabChange("ticket")}
        />
        <NavItem
          active={activeTab === "saved"}
          activeIcon={navAssets.savedActive}
          activeIconClass="h-[24px] w-[24px]"
          icon={navAssets.saved}
          iconClass="h-[24px] w-[24px]"
          label="保存済み"
          onClick={() => onTabChange("saved")}
        />
        <NavItem
          active={activeTab === "profile"}
          activeIcon={navAssets.profileActive}
          activeIconClass="h-[24px] w-[24px]"
          icon={navAssets.profile}
          iconClass="h-[23px] w-[23px]"
          label="マイページ"
          onClick={() => onTabChange("profile")}
        />
      </div>
    </div>
  );
}
