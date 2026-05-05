import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import Script from "next/script";
import "./globals.css";

const geistSans = Geist({ variable: "--font-geist-sans", subsets: ["latin"] });
const geistMono = Geist_Mono({ variable: "--font-geist-mono", subsets: ["latin"] });

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: "Naxi Taxi BB — Taxi prevoz 24/7",
    template: "%s | Naxi Taxi BB",
  },
  description:
    "Naxi Taxi BB — pouzdan taxi prevoz 24/7. Brzo i jednostavno naručite taxi pozivom, Viberom ili WhatsApp porukom. Taxi do aerodroma, poslovni prevoz i više.",
  keywords: ["taxi", "taxi prevoz", "naxi taxi", "taxi 24/7", "taxi do aerodroma", "poslovni taxi"],
  openGraph: {
    type: "website",
    locale: "sr_RS",
    url: siteUrl,
    siteName: "Naxi Taxi BB",
    title: "Naxi Taxi BB — Taxi prevoz 24/7",
    description: "Pouzdan taxi prevoz 24/7. Pozovite ili pošaljite poruku.",
    images: [{ url: `${siteUrl}/og-image.jpg`, width: 1200, height: 630 }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Naxi Taxi BB — Taxi prevoz 24/7",
    description: "Pouzdan taxi prevoz 24/7.",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true },
  },
  alternates: {
    canonical: siteUrl,
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "LocalBusiness",
      "@id": `${siteUrl}/#business`,
      name: "Naxi Taxi BB",
      description: "Pouzdan taxi prevoz 24/7",
      url: siteUrl,
      telephone: "+381XXXXXXXXX",
      email: "info@naxitaxibb.rs",
      address: {
        "@type": "PostalAddress",
        addressLocality: "Beograd",
        addressCountry: "RS",
      },
      openingHours: "Mo-Su 00:00-24:00",
      priceRange: "$$",
    },
    {
      "@type": "TaxiService",
      "@id": `${siteUrl}/#service`,
      name: "Naxi Taxi BB",
      provider: { "@id": `${siteUrl}/#business` },
      areaServed: "Beograd",
      availableChannel: {
        "@type": "ServiceChannel",
        servicePhone: { "@type": "ContactPoint", telephone: "+381XXXXXXXXX" },
      },
    },
  ],
};

const GA_ID = process.env.NEXT_PUBLIC_GA_ID;
const META_PIXEL_ID = process.env.NEXT_PUBLIC_META_PIXEL_ID;

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="sr">
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
        {/* eslint-disable-next-line @next/next/no-before-interactive-script-outside-document */}
        <script
          id="json-ld"
          type="application/ld+json"
          // biome-ignore lint: needed for JSON-LD
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        {children}

        {/* Google Analytics */}
        {GA_ID && (
          <>
            <Script
              src={`https://www.googletagmanager.com/gtag/js?id=${GA_ID}`}
              strategy="afterInteractive"
            />
            <Script id="ga" strategy="afterInteractive">
              {`window.dataLayer=window.dataLayer||[];function gtag(){dataLayer.push(arguments)}gtag('js',new Date());gtag('config','${GA_ID}');`}
            </Script>
          </>
        )}

        {/* Meta Pixel */}
        {META_PIXEL_ID && (
          <Script id="meta-pixel" strategy="afterInteractive">
            {`!function(f,b,e,v,n,t,s){if(f.fbq)return;n=f.fbq=function(){n.callMethod?n.callMethod.apply(n,arguments):n.queue.push(arguments)};if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';n.queue=[];t=b.createElement(e);t.async=!0;t.src=v;s=b.getElementsByTagName(e)[0];s.parentNode.insertBefore(t,s)}(window,document,'script','https://connect.facebook.net/en_US/fbevents.js');fbq('init','${META_PIXEL_ID}');fbq('track','PageView');`}
          </Script>
        )}
      </body>
    </html>
  );
}
