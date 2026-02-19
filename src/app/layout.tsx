'use client'

import "./globals.css";
import Login from "@/components/login/Login";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {

    const handleLogin = () => {
    console.log("User logged in");
  };
  return (
    <html lang="en">
      <body>
        <Login onLogin={handleLogin} />
        {children}
      </body>
    </html>
  );
}
