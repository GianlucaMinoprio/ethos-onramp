"use client";

import { Suspense } from "react";
import { useSearchParams } from "next/navigation";
import Globe from "./Globe";
import { DaimoPayButton, useDaimoPay } from "@daimo/pay";
import { isHydrated } from "@daimo/pay-common";
import type { DaimoPayOrder } from "@daimo/pay-common";
import { PoweredByPayFooter } from "./PoweredByPayFooter";

const COLOR_MAP: Record<string, string> = {
  Red: "#FE0000",
  Green: "#31D900",
  Aqua: "#00E4FF",
  Ochre: "#F08E29",
  Gray: "#C8C8C8",
};

function formatUsd(amount?: number) {
  if (amount == null) return undefined;
  try {
    return new Intl.NumberFormat("en-US", { style: "currency", currency: "USD" }).format(amount);
  } catch {
    return `$${amount.toFixed(2)}`;
  }
}

function HomeContent() {
  const params = useSearchParams();
  const payId = params.get("payId") ?? "";
  const colorKey = params.get("color") ?? "Gray";
  const systemColor = COLOR_MAP[colorKey] ?? COLOR_MAP["Gray"];

  const { order } = useDaimoPay();
  const daimoOrder = (order ?? null) as DaimoPayOrder | null;
  const amountUsd = formatUsd(daimoOrder && isHydrated(daimoOrder) ? daimoOrder.usdValue : undefined);

  return (
    <div className="flex items-center justify-center min-h-screen bg-black">
      <div className="relative overflow-hidden" style={{ width: 720, height: 720 }}>
        <Globe
          color={systemColor}
          className="absolute -top-[160px] -left-[160px]"
          style={{ width: 1040, height: 1040 }}
          opacity={0.5}
        />

        <div className="relative h-full w-full flex flex-col items-center justify-center gap-6">
          <div className="text-center">
            <div className="text-white text-4xl font-normal" style={{ fontFamily: "var(--font-space-mono)", fontWeight: 900, color: systemColor }}>DEPOSIT</div>
            {amountUsd && (
              <div
                className="mt-4 text-white text-7xl font-black tracking-tight"
                style={{ fontFamily: '"Pitagon Sans", var(--font-geist-sans), sans-serif', fontWeight: 600, letterSpacing: "0.10em" }}
              >
                {amountUsd}
              </div>
            )}
          </div>

          {payId ? (
            <DaimoPayButton.Custom payId={payId}>
              {({ show }) => (
                <button
                  type="button"
                  onClick={show}
                  className="px-8 py-4 md:px-10 md:py-6 text-3xl md:text-3xl font-black leading-none"
                  style={{
                    backgroundColor: systemColor,
                    color: "#000",
                    fontFamily: "var(--font-space-mono)",
                    fontWeight: 900,
                  }}
                >
                  PAY WITH CRYPTO
                </button>
              )}
            </DaimoPayButton.Custom>
          ) : (
            <div className="text-white">Missing payId</div>
          )}
          <div className="absolute bottom-6 left-0 right-0 flex justify-center">
            <PoweredByPayFooter />
          </div>
        </div>
      </div>
    </div>
  );
}

export default function Home() {
  return (
    <Suspense fallback={null}>
      <HomeContent />
    </Suspense>
  );
}
