// import localFont from "next/font/local";
import "./globals.css";
import { Poppins, Roboto } from "next/font/google";
import { cn } from "@/lib/utils";
import Header from "@/components/header";
import Footer from "@/components/footer";

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-poppins",
});

const roboto = Roboto({
  subsets: ["latin"],
  weight: ["400", "500", "700"],
  variable: "--font-roboto",
});

// const geistSans = localFont({
//   src: "./fonts/GeistVF.woff",
//   variable: "--font-geist-sans",
//   weight: "100 900",
// });

// const geistMono = localFont({
//   src: "./fonts/GeistMonoVF.woff",
//   variable: "--font-geist-mono",
//   weight: "100 900",
// });

export const metadata = {
  title: "Elovate.GG",
  description: "Elevate your League of Legends gameplay with advanced statistics and analysis",
  metadataBase: new URL("https://elovate.gg"),
  openGraph: {
    title: "Elovate",
    description: "Elevate your League of Legends gameplay with advanced statistics and analysis",
    url: "https://elovate.gg",
    siteName: "Elovate",
    images: [
      {
        url: "/assets/elovate_hero.png",
        width: 1200,
        height: 630,
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Elovate",
    description: "Elevate your League of Legends gameplay with advanced statistics and analysis",
    images: ["/assets/elovate_hero.png"],
  },
  icons: {
    icon: "/favicon.ico",
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className="min-h-screen">
      <body className={cn(`${poppins.variable} ${roboto.variable} antialiased min-h-screen flex flex-col`)}>
        <Header />
        <main className="flex-1">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
