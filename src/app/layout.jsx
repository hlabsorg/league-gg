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
  title: "League GG",
  description: "League of Legends Statistics and Analysis",
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
