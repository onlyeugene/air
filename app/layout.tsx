import type { Metadata } from "next";
import "./globals.css";

import { Nunito } from 'next/font/google'
import Navbar from "./components/navbar/navbar";

//modals
import RegisterModal from "./components/modals/register-modal";
import LoginModal from "./components/modals/login-modal";


import { Toaster } from "react-hot-toast";
import getCurrenUser from "./actions/get-current-user";
import RentModal from "./components/modals/rent-modal";
import SearchModal from "./components/modals/search-modal";
// import LoginModal from "./components/modals/login";

export const metadata: Metadata = {
  title: "Airbnb",
  description: "Airbnb clone",
};

const font = Nunito({
  subsets: ['latin']
})

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const currentUser = await getCurrenUser()
  return (
    <html lang="en">
      <body
        className={font.className}
      >
        <Toaster />
        <RentModal />
        <LoginModal />
        <RegisterModal />
        <SearchModal />
        <Navbar currentUser={currentUser}/>
        <div className="pb-20 pt-28">
        {children}
        </div>
      </body>
    </html>
  );
}
