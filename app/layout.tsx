import type { Metadata, Viewport } from "next";
import type { ReactNode } from "react";
import { headers } from 'next/headers';
import { detectIOS } from '@vkontakte/vkjs';
import { ConfigProvider, AppRoot, AdaptivityProvider } from '@vkontakte/vkui';
import '@vkontakte/vkui/dist/cssm/styles/themes.css';
import "./globals.css";

export const metadata: Metadata = {
  title: "VK Pulse",
  description: "",
};

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  userScalable: false,
  viewportFit: 'cover',
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: ReactNode;
}>) {
  const headersList = await headers();
 
  // Определяем платформу
  const userAgent = headersList.get('user-agent') || '';
  const platform = detectIOS(userAgent).isIOS ? 'ios' : 'android';
 
  // Определяем направление текста
  const acceptLanguage = headersList.get('accept-language') || 'en-US';
  const lang = acceptLanguage.split('-')[0];
  const direction = ['ar', 'he', 'fa', 'ur'].includes(lang) ? 'rtl' : 'ltr';
  
  return (
    <html lang={lang} dir={direction} className="vkui">
      <body className="vkui__root">
        <ConfigProvider platform={platform} direction={direction}>
      <AdaptivityProvider>
        <AppRoot disableSettingVKUIClassesInRuntime>{children}</AppRoot>
      </AdaptivityProvider>
    </ConfigProvider>
      </body>
    </html>
  );
}
