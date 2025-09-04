'use client';

import React, { useMemo } from 'react';
import { DaimoPayProvider, getDefaultConfig, type CustomTheme } from '@daimo/pay';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { WagmiProvider, createConfig } from 'wagmi';
import { useSearchParams } from 'next/navigation';

const wagmiConfig = createConfig(
  getDefaultConfig({
    appName: 'Ethos Onramp',
  })
);

const queryClient = new QueryClient();

const COLOR_MAP: Record<string, string> = {
  Red: '#FE0000',
  Green: '#31D900',
  Aqua: '#00E4FF',
  Ochre: '#F08E29',
  Gray: '#C8C8C8',
};

const BASE_THEME_WITH_PLACEHOLDERS: Record<string, string> = {
  '--ck-font-family': 'var(--font-roboto)',
  '--ck-font-weight': '400',
  '--ck-border-radius': '0px',
  '--ck-overlay-backdrop-filter': 'blur(0px)',
  '--ck-modal-heading-font-weight': '600',
  '--ck-qr-border-radius': '0px',
  '--ck-connectbutton-font-size': '15px',
  '--ck-connectbutton-color': '#373737',
  '--ck-connectbutton-background': '#F6F7F9',
  '--ck-connectbutton-background-secondary': '{systemColor}',
  '--ck-connectbutton-border-radius': '16px',
  '--ck-connectbutton-box-shadow': '0 0 0 0 #ffffff',
  '--ck-connectbutton-hover-color': '#373737',
  '--ck-connectbutton-hover-background': '#F0F2F5',
  '--ck-connectbutton-hover-box-shadow': '0 0 0 0 #ffffff',
  '--ck-connectbutton-active-color': '#373737',
  '--ck-connectbutton-active-background': '#EAECF1',
  '--ck-connectbutton-active-box-shadow': '0 0 0 0 #ffffff',
  '--ck-connectbutton-balance-color': '#373737',
  '--ck-connectbutton-balance-background': '#fff',
  '--ck-connectbutton-balance-box-shadow': 'inset 0 0 0 1px #F6F7F9',
  '--ck-connectbutton-balance-hover-background': '#F6F7F9',
  '--ck-connectbutton-balance-hover-box-shadow': 'inset 0 0 0 1px #F0F2F5',
  '--ck-connectbutton-balance-active-background': '#F0F2F5',
  '--ck-connectbutton-balance-active-box-shadow': 'inset 0 0 0 1px #EAECF1',
  '--ck-primary-button-font-weight': '600',
  '--ck-primary-button-border-radius': '0px',
  '--ck-primary-button-color': '{systemColor}',
  '--ck-primary-button-background': '#000000',
  '--ck-primary-button-box-shadow': '0px 0px 0px 3px {systemColor}',
  '--ck-primary-button-hover-color': '#000000',
  '--ck-primary-button-hover-background': '{systemColor}',
  '--ck-primary-button-hover-box-shadow': '0px 0px 0px 3px {systemColor}',
  '--ck-primary-button-active-color': '#373737',
  '--ck-primary-button-active-background': '{systemColor}',
  '--ck-primary-button-active-box-shadow': '0px 0px 0px 3px {systemColor}',
  '--ck-secondary-button-font-weight': '600',
  '--ck-secondary-button-border-radius': '0px',
  '--ck-secondary-button-color': '{systemColor}',
  '--ck-secondary-button-background': '#000000',
  '--ck-secondary-button-box-shadow': '0px 0px 0px 3px {systemColor}',
  '--ck-secondary-button-hover-color': '#000000',
  '--ck-secondary-button-hover-background': '{systemColor}',
  '--ck-secondary-button-hover-box-shadow': '0px 0px 0px 3px {systemColor}',
  '--ck-secondary-button-active-color': '#373737',
  '--ck-secondary-button-active-background': '{systemColor}',
  '--ck-secondary-button-active-box-shadow': '0px 0px 0px 3px {systemColor}',
  '--ck-tertiary-button-font-weight': '500',
  '--ck-tertiary-button-border-radius': '16px',
  '--ck-tertiary-button-color': '#373737',
  '--ck-tertiary-button-background': '#F6F7F9',
  '--ck-tertiary-button-box-shadow': '0 0 0 0 #ffffff',
  '--ck-tertiary-button-hover-color': '#373737',
  '--ck-tertiary-button-hover-background': '#F6F7F9',
  '--ck-tertiary-button-hover-box-shadow': '0 0 0 0 #ffffff',
  '--ck-tertiary-button-active-color': '#373737',
  '--ck-tertiary-button-active-background': '#F6F7F9',
  '--ck-tertiary-button-active-box-shadow': '0 0 0 0 #ffffff',
  '--ck-modal-box-shadow': '0px 2px 4px 0px #00000005',
  '--ck-overlay-background': '#00000008',
  '--ck-body-color': '#ffffff',
  '--ck-body-color-muted': '#ffffff',
  '--ck-body-color-muted-hover': '{systemColor}',
  '--ck-body-background': '#000000',
  '--ck-body-background-transparent': 'rgba(255,255,255,0)',
  '--ck-body-background-secondary': '#000000',
  '--ck-body-background-secondary-hover-background': '#e0e4eb',
  '--ck-body-background-secondary-hover-outline': '#4282FF',
  '--ck-body-background-tertiary': '#F3F4F7',
  '--ck-body-action-color': '{systemColor}',
  '--ck-body-divider': '{systemColor}',
  '--ck-body-color-danger': '#FF4E4E',
  '--ck-body-color-valid': '#32D74B',
  '--ck-siwe-border': '#F0F0F0',
  '--ck-body-disclaimer-background': '#f6f7f9',
  '--ck-body-disclaimer-color': '#AAAAAB',
  '--ck-body-disclaimer-link-color': '#838485',
  '--ck-body-disclaimer-link-hover-color': '#000000',
  '--ck-tooltip-background': '{systemColor}',
  '--ck-tooltip-background-secondary': '#ffffff',
  '--ck-tooltip-color': '#000000',
  '--ck-tooltip-shadow': '0px 2px 10px 0 #00000014',
  '--ck-dropdown-button-color': '#999999',
  '--ck-dropdown-button-box-shadow': '0 0 0 1px rgba(0,0,0,0.01), 0px 0px 7px rgba(0, 0, 0, 0.05)',
  '--ck-dropdown-button-background': '#fff',
  '--ck-dropdown-button-hover-color': '#8B8B8B',
  '--ck-dropdown-button-hover-background': '#F5F7F9',
  '--ck-qr-dot-color': '#ffffff',
  '--ck-qr-background': '#000000',
  '--ck-qr-border-color': '{systemColor}',
  '--ck-focus-color': '#ffffff',
  '--ck-spinner-color': '{systemColor}',
  '--ck-copytoclipboard-stroke': '#CCCCCC',
  '--ck-recent-badge-color': '#000000',
  '--ck-recent-badge-background': '{systemColor}',
  '--ck-recent-badge-border-radius': '32px',
};

export default function Providers({ children }: { children: React.ReactNode }) {
  const params = useSearchParams();
  const colorKey = params.get('color') ?? 'Gray';
  const systemColor = COLOR_MAP[colorKey] ?? COLOR_MAP['Gray'];

  const customTheme: CustomTheme = useMemo(() => {
    const t: Record<string, string> = { ...BASE_THEME_WITH_PLACEHOLDERS };
    for (const key of Object.keys(t)) {
      const v = t[key];
      if (typeof v === 'string') {
        t[key] = v.replaceAll('{systemColor}', systemColor);
      }
    }
    return t as CustomTheme;
  }, [systemColor]);

  return (
    <WagmiProvider config={wagmiConfig}>
      <QueryClientProvider client={queryClient}>
        <DaimoPayProvider customTheme={customTheme}>{children}</DaimoPayProvider>
      </QueryClientProvider>
    </WagmiProvider>
  );
}