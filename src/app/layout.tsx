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
  title: "International Eye Hospital | World-Class Eye Care in Tanzania",
  description:
    "International Eye Hospital in Dar es Salaam offers advanced eye care — cataract surgery, LASIK, retina treatment, glaucoma, and more. Internationally trained ophthalmologists.",
  keywords: [
    "eye hospital Tanzania",
    "eye specialist Dar es Salaam",
    "LASIK Tanzania",
    "cataract surgery Tanzania",
    "retina specialist Tanzania",
    "International Eye Hospital",
  ],
  openGraph: {
    title: "International Eye Hospital | Dar es Salaam, Tanzania",
    description:
      "Advanced eye care with internationally trained specialists. Book your appointment today.",
    type: "website",
    locale: "en_TZ",
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
