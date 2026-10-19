import type { Metadata } from "next";
import { Barlow_Condensed, DM_Sans } from "next/font/google";
import "./globals.css";

const barlow = Barlow_Condensed({
  subsets: ["latin"],
  weight: ["400", "600", "700", "800"],
  variable: "--font-display",
});

const dmSans = DM_Sans({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-body",
});

export const metadata: Metadata = {
  title: "Kratux — Máquinas Pesadas",
  description:
    "Máquinas pesadas com qualidade de ponta, preço competitivo e pós-venda de excelência. Crédito em 24h, 140+ assistências no Brasil.",
  openGraph: {
    title: "Kratux — Máquinas Pesadas",
    description:
      "Qualidade de ponta e preço competitivo com o pós-venda que o seu negócio merece.",
    locale: "pt_BR",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="pt-BR"
      className={`${barlow.variable} ${dmSans.variable} antialiased`}
    >
      <body className="min-h-screen">{children}</body>
    </html>
  );
}
