'use client';
import "./globals.css";
import { Provider, useSelector, useDispatch } from 'react-redux';
import store, { RootState } from '@/redux/store';
import NavBar from "@/components/navbar/NavBar";
import SilkBlueBackground from "@/components/SilkBlueBackground";
import { useEffect } from "react";
import { usePathname } from "next/navigation";
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function AppShell({ children }: { children: React.ReactNode }) {
  const dir = useSelector((state: RootState) => state.language.dir);
  const lang = useSelector((state: RootState) => state.language.lang);
  const dispatch = useDispatch<any>();
  const pathname = usePathname();

  useEffect(() => {
    document.documentElement.setAttribute('dir', dir);
    document.documentElement.setAttribute('lang', lang);
  }, [dir, lang]);

  useEffect(() => {
    const username = localStorage.getItem('username');
    const role = localStorage.getItem('role') as 'admin' | 'publisher' | 'customer' | null;
    if (username && role) {
      dispatch({ type: 'auth/setUser', payload: { username, role } });
    }
  }, [dispatch]);

  const isImmersive = pathname === "/" || pathname === "/Shop" || pathname === "/Login" || pathname === "/Registration" || pathname === "/Contact";

  const isAdminOrProfile = pathname.startsWith('/admin') || pathname.includes('/profile') || pathname.startsWith('/publisher');

  return (
    <>
      <SilkBlueBackground />
      <NavBar />
      <div className="relative z-10" style={{ paddingTop: isImmersive ? '0px' : '64px' }}>
        {children}
      </div>
      <ToastContainer
        position="bottom-right"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop
        closeOnClick
        rtl={lang === 'ar'}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="dark"
      />
    </>
  );
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="bg-background">
        <Provider store={store}>
          <AppShell>{children}</AppShell>
        </Provider>
      </body>
    </html>
  );
}
