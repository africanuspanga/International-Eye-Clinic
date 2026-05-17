import type { Metadata, Viewport } from "next";
import { Poppins, Merriweather } from "next/font/google";
import "./globals.css";
import {
  OrganizationJsonLd,
  LocalBusinessJsonLd,
  WebsiteJsonLd,
} from "@/components/StructuredData";
import { Analytics } from "@/components/Analytics";

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  style: ["normal", "italic"],
  variable: "--font-poppins",
  display: "swap",
});

const merriweather = Merriweather({
  subsets: ["latin"],
  weight: ["300", "400", "700", "900"],
  style: ["normal", "italic"],
  variable: "--font-merriweather",
  display: "swap",
});

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#ffffff",
};

export const metadata: Metadata = {
  metadataBase: new URL("https://www.internationaleyehospital.com"),
  title: {
    default: "International Eye Hospital | World-Class Eye Care in Tanzania",
    template: "%s | International Eye Hospital",
  },
  description:
    "International Eye Hospital in Dar es Salaam offers advanced eye care — cataract surgery, retina treatment, glaucoma, and more. Internationally trained ophthalmologists since 2014.",
  keywords: [
    "eye hospital Tanzania",
    "eye specialist Dar es Salaam",
    "cataract surgery Tanzania",
    "retina specialist Tanzania",
    "International Eye Hospital",
    "glaucoma treatment Tanzania",
    "cornea transplant Tanzania",
    "eye examination Dar es Salaam",
    "ophthalmologist Tanzania",
    "eye clinic Dar es Salaam",
    "eye surgery Tanzania",
    "optometrist Dar es Salaam",
    "diabetic retinopathy Tanzania",
    "keratoconus treatment Tanzania",
    "LASIK Tanzania",
  ],
  authors: [{ name: "International Eye Hospital" }],
  creator: "International Eye Hospital",
  publisher: "International Eye Hospital",
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  openGraph: {
    title: "International Eye Hospital | Dar es Salaam, Tanzania",
    description:
      "Advanced eye care with internationally trained specialists. Book your appointment today.",
    type: "website",
    locale: "en_TZ",
    url: "https://www.internationaleyehospital.com",
    siteName: "International Eye Hospital",
    images: [
      {
        url: "/images/hero/slide-1.jpeg",
        width: 1200,
        height: 630,
        alt: "International Eye Hospital - Advanced eye care in Dar es Salaam, Tanzania",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "International Eye Hospital | Dar es Salaam, Tanzania",
    description:
      "Advanced eye care with internationally trained specialists. Book your appointment today.",
    images: ["/images/hero/slide-1.jpeg"],
  },
  alternates: {
    canonical: "https://www.internationaleyehospital.com",
  },
  verification: {
    // Replace with your real Google Search Console verification code
    // google: "your-real-verification-code",
  },
  icons: {
    icon: "/icon.png",
    apple: "/icon.png",
  },
  manifest: "/manifest.json",
  other: {
    "msapplication-TileColor": "#ffffff",
    "contact:phone": "+255 784 104 300",
    "contact:email": "info@eye.co.tz",
  },
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html
      lang="en"
      className={`${poppins.variable} ${merriweather.variable} h-full`}
    >
      <head>
        <OrganizationJsonLd />
        <LocalBusinessJsonLd />
        <WebsiteJsonLd />
      </head>
      <body
        style={{ fontFamily: "'Poppins', system-ui, sans-serif" }}
        className="antialiased min-h-full flex flex-col"
      >
        {children}
        <Analytics />
      </body>
    </html>
  );
}
