import { Noto_Sans_SC, Geist, Geist_Mono } from "next/font/google";

const notoSansSC = Noto_Sans_SC({
    variable: "--font-noto-sans-sc",
    subsets: ["latin"]
});

const geistSans = Geist({
    variable: "--font-geist-sans",
    subsets: ["latin"]
});

const geistMono = Geist_Mono({
    variable: "--font-geist-mono",
    subsets: ["latin"]
});

export { notoSansSC, geistSans, geistMono };
