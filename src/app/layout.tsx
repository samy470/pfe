'use client'
import "./globals.css";
import { Provider } from 'react-redux';
import store from '@/redux/store';
import NavBar from "@/components/navbar/NavBar";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark">
      <body className="bg-background">
        <Provider store={store}>
        <NavBar onLogout={() => console.log("logged out")}/>
        {children}
        </Provider>
      </body>
    </html>
  );
}
