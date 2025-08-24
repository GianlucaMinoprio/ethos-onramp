"use client";

import { useSearchParams } from "next/navigation";
import Globe from "./Globe";
import { DaimoPayButton, useDaimoPay } from "@daimo/pay";
import { isHydrated } from "@daimo/pay-common";
import type { DaimoPayOrder } from "@daimo/pay-common";

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

export default function Home() {
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
          className="absolute -top-[214px] -left-[214px]"
          style={{ width: 1148, height: 1148 }}
          opacity={0.5}
        />

        <div className="relative h-full w-full flex flex-col items-center justify-center gap-6">
          <div className="text-center">
            <div className="text-white text-4xl font-normal" style={{ fontFamily: "var(--font-space-mono)" }}>Deposit</div>
            {amountUsd && (
              <div className="mt-2 text-white text-2xl" style={{ fontFamily: '"Pitagon Sans", var(--font-geist-sans), sans-serif' }}>
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
                  className="px-6 py-3 border border-black/10"
                  style={{
                    backgroundColor: systemColor,
                    color: "#000",
                    fontFamily: "var(--font-space-mono)",
                    fontWeight: 700,
                    letterSpacing: "0.01em",
                    borderRadius: 0,
                  }}
                >
                  Pay with crypto
                </button>
              )}
            </DaimoPayButton.Custom>
          ) : (
            <div className="text-white">Missing payId</div>
          )}
        </div>
      </div>
    </div>
  );
}
