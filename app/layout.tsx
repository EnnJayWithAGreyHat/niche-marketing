import type { Metadata } from 'next';
import './globals.css';
import { Analytics } from '@vercel/analytics/react';
import { SpeedInsights } from '@vercel/speed-insights/next';
import { brand } from '@/lib/brand';
import { DM_Sans, DM_Mono, Manrope } from 'next/font/google';

const dmSans=DM_Sans({subsets:['latin'],variable:'--font-dm-sans',display:'swap'});
const dmMono=DM_Mono({subsets:['latin'],weight:['400','500'],variable:'--font-dm-mono',display:'swap'});
const manrope=Manrope({subsets:['latin'],variable:'--font-manrope',display:'swap'});
import SiteHeader from '@/components/SiteHeader';
import SiteFooter from '@/components/SiteFooter';

export const metadata: Metadata = {
  metadataBase: new URL(brand.siteUrl),
  title: { default: "NJ's Business Marketing — Websites for commercial service companies", template: "%s | NJ's Business Marketing" },
  description: 'Human-led websites and customer request workflows for commercial food equipment and refrigeration service companies.',
  openGraph: { type: 'website', siteName: brand.name, title: "NJ's Business Marketing", description: 'Clearer service requests for the people keeping commercial kitchens running.' },
  twitter: { card: 'summary_large_image' },
};
export default function RootLayout({ children }: { children: React.ReactNode }) {
  return <html lang="en"><body className={`${dmSans.variable} ${dmMono.variable} ${manrope.variable}`}><a className="skip-link" href="#main-content">Skip to content</a><SiteHeader/><div id="main-content">{children}</div><SiteFooter/><Analytics/><SpeedInsights/></body></html>;
}
