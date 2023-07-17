import Header from "./components/header/header";
import Footer from "./components/footer/footer";

import classNames from "classnames";
import localFont from "next/font/local";
import { Roboto } from "next/font/google";
import { StoreProvider } from "../redux/StoreProvider";

import "./globals.css";

const roboto = Roboto({
  weight: ["400", "500", "700"],
  style: ["normal", "italic"],
  subsets: ["latin"],
  variable: "--roboto",
});

const SFProText = localFont({
  src: [
    {
      path: "../../public/fonts/SFProText-Regular.ttf",
      weight: "400",
      style: "normal",
    },
    {
      path: "../../public/fonts/SFProText-RegularItalic.ttf",
      weight: "400",
      style: "italic",
    },
    {
      path: "../../public/fonts/SFProText-Semibold.ttf",
      weight: "600",
      style: "normal",
    },
  ],
  variable: "--sf-pro-text",
});

export const metadata = {
  title: "Билетопоиск",
  description: "",
};

export default function Home({ children } : { children: React.ReactNode}) {
  return (
    <html lang="en">
      <body className={classNames(roboto.variable, SFProText.variable)}>
        <StoreProvider>
          <Header />
          {children}
          <div id="portals" />
          <div id="modals" />
          <Footer />
        </StoreProvider>
      </body>
    </html>
  );
}
