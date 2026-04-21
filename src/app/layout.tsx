import type { Metadata } from "next";
import { Poppins, Merriweather } from "next/font/google";
import "./globals.css";

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

export const metadata: Metadata = {
  metadataBase: new URL("https://www.internationaleyehospital.com"),
  title: {
    default: "International Eye Hospital | World-Class Eye Care in Tanzania",
    template: "%s | International Eye Hospital",
  },
  description:
    "International Eye Hospital in Dar es Salaam offers advanced eye care — cataract surgery, LASIK, retina treatment, glaucoma, and more. Internationally trained ophthalmologists since 2014.",
  keywords: [
    "eye hospital Tanzania",
    "eye specialist Dar es Salaam",
    "LASIK Tanzania",
    "cataract surgery Tanzania",
    "retina specialist Tanzania",
    "International Eye Hospital",
    "glaucoma treatment Tanzania",
    "cornea transplant Tanzania",
    "eye examination Dar es Salaam",
    "ophthalmologist Tanzania",
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
  },
  twitter: {
    card: "summary_large_image",
    title: "International Eye Hospital | Dar es Salaam, Tanzania",
    description:
      "Advanced eye care with internationally trained specialists. Book your appointment today.",
  },
  alternates: {
    canonical: "https://www.internationaleyehospital.com",
  },
  verification: {
    google: "google-site-verification-code",
  },
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className={`${poppins.variable} ${merriweather.variable} h-full`}>
      <body style={{ fontFamily: "'Poppins', system-ui, sans-serif" }} className="antialiased min-h-full flex flex-col">
        {children}
      </body>
    </html>
  );
}
