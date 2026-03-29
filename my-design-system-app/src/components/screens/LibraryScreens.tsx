"use client";

/* eslint-disable @next/next/no-img-element */

const assets = {
  profileAvatar: "https://www.figma.com/api/mcp/asset/f393857f-85cf-45c0-b2af-fad8f978a4e9",
  profileBell: "https://www.figma.com/api/mcp/asset/0651717b-12cd-4302-87a5-52759478bc90",
  profileChevron: "https://www.figma.com/api/mcp/asset/f0abc905-1ef1-4c38-8ad6-b275d44bc4e6",
  profileCrown: "https://www.figma.com/api/mcp/asset/e0ed7e57-5a4f-4fce-87fe-35718be265c2",
  profileHelp: "https://www.figma.com/api/mcp/asset/aa73e4ec-3944-446f-9472-39683e607e8d",
  profileNotifications: "https://www.figma.com/api/mcp/asset/bd752722-e2f4-4b7e-8f20-ff96c6d22074",
  profileOrganize: "https://www.figma.com/api/mcp/asset/79841cfb-6165-4b65-af5d-bcd46f875e3b",
  profilePayments: "https://www.figma.com/api/mcp/asset/1c429fb0-7a6f-47ff-aa1c-2a78c09fa10a",
  profilePersonal: "https://www.figma.com/api/mcp/asset/5f239728-8a05-41a7-a1a0-58f9a171c7b3",
  profilePrivacy: "https://www.figma.com/api/mcp/asset/b2db389a-ab68-4d37-97f0-cb24c903804f",
  profileRewards: "https://www.figma.com/api/mcp/asset/be980d70-0ff1-4edb-8c60-ee2ebc1d2607",
  savedArtWorkshop: "https://www.figma.com/api/mcp/asset/6fffc4cf-d0b7-4741-9fff-b4ee702ddbec",
  savedConcert: "https://www.figma.com/api/mcp/asset/7eb27bfd-7a08-4962-a258-11e767717ded",
  savedLocalMeetups: "https://www.figma.com/api/mcp/asset/a7b5a2ca-2efa-4509-a17a-20e297963bdd",
  savedMusicFestival: "https://www.figma.com/api/mcp/asset/71689b51-503b-4f4f-bbdf-d08eae4886c6",
  savedParty: "https://www.figma.com/api/mcp/asset/05b7d853-ca73-4919-a2b7-1cb3050b4ebe",
  savedRecentIcon: "https://www.figma.com/api/mcp/asset/eb1c5056-731c-4bc6-bf3d-8bf802cd26c1",
} as const;

function SavedCard({
  children,
  itemCount,
  title,
}: {
  children: React.ReactNode;
  itemCount?: string;
  title: string;
}) {
  return (
    <div className="flex flex-col gap-[8px]">
      {children}
      <div className="pt-[4px]">
        <p className="text-[16px] font-semibold leading-[24px] text-[#111827]">{title}</p>
        {itemCount ? <p className="text-[14px] leading-[20px] text-[#6b7280]">{itemCount}</p> : null}
      </div>
    </div>
  );
}

export function SavedPage() {
  return (
    <div className="relative min-h-dvh w-full bg-white px-[30px] pb-[140px] pt-[25px]">
      <div className="flex min-h-[calc(100dvh-51px)] flex-col">
        <div className="flex flex-col gap-[20px]">
          <div className="flex flex-col items-end gap-[18px]">
            <button
              className="flex h-[31px] w-[58px] items-center justify-center rounded-[28.5px] bg-[#f2f2f2] pb-[7px] pl-[16px] pr-[10px] pt-[11px] text-[14px] leading-[20px] text-black"
              type="button"
            >
              編集
            </button>
            <h1 className="w-full text-[32px] font-bold leading-[20px] text-black">保存済み</h1>
          </div>

          <div className="grid grid-cols-2 gap-x-[16px] gap-y-[32px]">
            <SavedCard title="最近見たイベント">
              <div className="aspect-square rounded-[16px] bg-[#0d0d0d]">
                <div className="flex h-full items-center justify-center">
                  <img alt="" className="h-[54px] w-[54px]" src={assets.savedRecentIcon} />
                </div>
              </div>
            </SavedCard>

            <SavedCard itemCount="12件" title="音楽フェス">
              <div className="grid aspect-square grid-cols-2 grid-rows-2 gap-[2px] overflow-hidden rounded-[16px]">
                <img alt="" className="h-full w-full object-cover" src={assets.savedMusicFestival} />
                <img alt="" className="h-full w-full object-cover" src={assets.savedConcert} />
                <img alt="" className="col-span-2 h-full w-full object-cover" src={assets.savedParty} />
              </div>
            </SavedCard>

            <SavedCard itemCount="5件" title="アートワークショップ">
              <div className="overflow-hidden rounded-[16px] bg-[#f3f4f6]">
                <img alt="" className="aspect-square w-full object-cover" src={assets.savedArtWorkshop} />
              </div>
            </SavedCard>

            <SavedCard itemCount="8件" title="ローカルミートアップ">
              <div className="overflow-hidden rounded-[16px] bg-[#f3f4f6]">
                <img alt="" className="aspect-square w-full object-cover" src={assets.savedLocalMeetups} />
              </div>
            </SavedCard>
          </div>
        </div>

        <div className="mt-auto pt-[40px]" />
      </div>
    </div>
  );
}

function ProfileSettingRow({
  chevronClassName = "h-[12px] w-[7.4px]",
  icon,
  iconClassName,
  label,
}: {
  chevronClassName?: string;
  icon: string;
  iconClassName: string;
  label: string;
}) {
  return (
    <button
      className="flex w-full items-center justify-between border-b border-[#f1f5f9] px-[8px] py-[16px] text-left"
      type="button"
    >
      <div className="flex items-center gap-[16px]">
        <img alt="" className={iconClassName} src={icon} />
        <span className="text-[16px] font-medium leading-[24px] text-[#0f172a]">{label}</span>
      </div>
      <img alt="" className={chevronClassName} src={assets.profileChevron} />
    </button>
  );
}

export function ProfilePage() {
  return (
    <div className="min-h-dvh w-full bg-[#f7f7f7] px-[20px] pb-[140px] pt-[18px]">
      <div className="flex min-h-[calc(100dvh-44px)] flex-col">
        <div className="flex flex-col gap-[33px]">
          <div className="flex flex-col gap-[26px]">
            <div className="flex items-center justify-between">
              <h1 className="text-[30px] font-bold tracking-[-0.75px] text-[#0f172a]">マイページ</h1>
              <button className="flex h-[40px] w-[40px] items-center justify-center rounded-full bg-white" type="button">
                <img alt="" className="h-[20px] w-[16px]" src={assets.profileBell} />
              </button>
            </div>

            <div className="flex items-center gap-[29px]">
              <img alt="" className="h-[80px] w-[80px] rounded-full border border-[#929292] object-cover" src={assets.profileAvatar} />
              <div>
                <p className="text-[24px] font-bold leading-[28px] text-[#0f172a]">Alex Johnson</p>
                <div className="mt-[2px] flex items-center gap-[6px]">
                  <img alt="" className="h-[11.67px] w-[5.83px]" src={assets.profileCrown} />
                  <span className="text-[14px] font-medium leading-[20px] text-[#475569]">シルバー会員</span>
                </div>
                <button className="mt-[4px] text-[12px] leading-[16px] text-[#64748b] underline" type="button">
                  プロフィールを表示
                </button>
              </div>
            </div>
          </div>

          <div className="flex flex-col gap-[16px]">
            <div className="rounded-[12px] border border-[#e2e8f0] bg-white p-[20px] shadow-[0_4px_29.3px_rgba(0,0,0,0.07),0_1px_2px_rgba(0,0,0,0.05)]">
              <div className="flex items-start justify-between">
                <div>
                  <p className="text-[10px] font-bold uppercase tracking-[1px] text-[#04bcb4]">メンバー特典</p>
                  <p className="mt-[4px] text-[24px] font-bold leading-[32px] text-[#0f172a]">
                    2,450 <span className="text-[14px] font-normal text-[#64748b]">pt</span>
                  </p>
                </div>
                <img alt="" className="h-[48px] w-[48px]" src={assets.profileRewards} />
              </div>
              <div className="mt-[15px] h-[8px] overflow-hidden rounded-full bg-[#f1f5f9]">
                <div className="h-full w-3/4 bg-[#04bcb4]" />
              </div>
              <p className="mt-[12px] text-[12px] leading-[16px] text-[#64748b]">
                <span className="font-bold text-[#0f172a]">ゴールド会員</span> まで残り550ポイント
              </p>
              <button className="mt-[16px] h-[44px] w-full rounded-[8px] border border-[#e2e8f0] text-[14px] font-semibold text-[#0f172a]" type="button">
                特典を見る
              </button>
            </div>

            <div className="flex items-center justify-between rounded-[12px] border border-[#e2e8f0] bg-white p-[21px] shadow-[0_1px_2px_rgba(0,0,0,0.05)]">
              <div>
                <p className="text-[16px] font-bold leading-[24px] text-[#0f172a]">イベントを主催する</p>
                <p className="mt-[2px] text-[14px] leading-[20px] text-[#64748b]">
                  イベントを公開して、たくさんの人に届けましょう。
                </p>
              </div>
              <div className="flex h-[48px] w-[48px] items-center justify-center rounded-[12px] bg-[#04bcb4]">
                <img alt="" className="h-[24px] w-[24px]" src={assets.profileOrganize} />
              </div>
            </div>

            <div className="rounded-[19px] bg-white px-[24px] py-[16px]">
              <h2 className="pb-[16px] text-[18px] font-bold leading-[28px] text-[#0f172a]">設定</h2>
              <ProfileSettingRow icon={assets.profilePersonal} iconClassName="h-[16px] w-[16px]" label="個人情報" />
              <ProfileSettingRow icon={assets.profilePayments} iconClassName="h-[16px] w-[22px]" label="支払いと受け取り" />
              <ProfileSettingRow icon={assets.profileNotifications} iconClassName="h-[20px] w-[16px]" label="通知" />
              <ProfileSettingRow icon={assets.profilePrivacy} iconClassName="h-[20px] w-[16px]" label="プライバシーと共有" />
              <ProfileSettingRow chevronClassName="h-[12px] w-[7.4px]" icon={assets.profileHelp} iconClassName="h-[20px] w-[20px]" label="ヘルプ" />
            </div>
          </div>
        </div>

        <div className="mt-auto pt-[40px]" />
      </div>
    </div>
  );
}
