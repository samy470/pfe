'use client';
import { memo, useState, useCallback, useRef, useEffect } from "react";
import { useRouter, usePathname } from "next/navigation";
import { useDispatch, useSelector } from "react-redux";
import Link from "next/link";
import { setSearchQuery } from "../../redux/shopSlice";
import { setLanguage } from "../../redux/languageSlice";
import { logout } from "../../redux/authSlice";
import { RootState } from "../../redux/store";
import { t, Language } from "../../lib/i18n";
import type { AppDispatch } from "../../redux/store";
import { Settings, User, LogOut, Globe, Bell, ChevronDown, Zap } from "lucide-react";
import styles from "./NavBar.module.css";

const NavBar = memo(function NavBar() {
  const dispatch = useDispatch<AppDispatch>();
  const [query, setQuery] = useState("");
  const [menuOpen, setMenuOpen] = useState(false);
  const pathname = usePathname();
  const router = useRouter();
  const adminDropdownRef = useRef<HTMLDivElement>(null);
  const [adminDropdownOpen, setAdminDropdownOpen] = useState(false);
  const [publisherDropdownOpen, setPublisherDropdownOpen] = useState(false);
  const [customerDropdownOpen, setCustomerDropdownOpen] = useState(false);
  const [userDropdownOpen, setUserDropdownOpen] = useState(false);
  const publisherDropdownRef = useRef<HTMLDivElement>(null);
  const customerDropdownRef = useRef<HTMLDivElement>(null);
  const userDropdownRef = useRef<HTMLDivElement>(null);

  const lang = useSelector((state: RootState) => state.language.lang);
  const { role, isLoggedIn, username } = useSelector((state: RootState) => state.auth);

  const handleLogout = useCallback(() => {
    dispatch(logout());
    localStorage.removeItem("username");
    localStorage.removeItem("token");
    router.push("/Login");
  }, [dispatch, router]);

  const handleLangChange = useCallback(
    (newLang: Language) => {
      dispatch(setLanguage(newLang));
      setMenuOpen(false);
    },
    [dispatch]
  );

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const target = event.target as Node;
      if (adminDropdownRef.current && !adminDropdownRef.current.contains(target)) setAdminDropdownOpen(false);
      if (publisherDropdownRef.current && !publisherDropdownRef.current.contains(target)) setPublisherDropdownOpen(false);
      if (customerDropdownRef.current && !customerDropdownRef.current.contains(target)) setCustomerDropdownOpen(false);
      if (userDropdownRef.current && !userDropdownRef.current.contains(target)) setUserDropdownOpen(false);
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const isAdmin = role === "admin";
  const isPublisher = role === "publisher";
  const isCustomer = role === "customer";

  if (pathname === "/Login" || pathname === "/Registration" || pathname === "/Shop") return null;

  const langLabels: Record<Language, string> = { en: "EN", fr: "FR", ar: "عر" };

  return (
    <nav className={styles.navbar} dir={lang === "ar" ? "rtl" : "ltr"}>
      <div className={styles.inner}>
        <Link href="/" className={styles.logo} onClick={() => setMenuOpen(false)}>
          <span className={styles.logoIcon}><Zap size={22} fill="currentColor" /></span>
          <span>{t(lang, "PlatformName")}</span>
        </Link>
        <button
          className={styles.hamburger}
          onClick={() => setMenuOpen((o) => !o)}
          aria-label="Toggle menu"
          aria-expanded={menuOpen}
        >
          <span className={`${styles.bar} ${menuOpen ? styles.barOpen1 : ""}`} />
          <span className={`${styles.bar} ${menuOpen ? styles.barOpen2 : ""}`} />
          <span className={`${styles.bar} ${menuOpen ? styles.barOpen3 : ""}`} />
        </button>

        <div className={`${styles.menu} ${menuOpen ? styles.menuOpen : ""}`}>
          <div className={styles.navLinks}>
            <Link href="/" className={styles.navLink} onClick={() => setMenuOpen(false)}>
              {t(lang, "home")}
            </Link>
            <Link href="/Shop" className={styles.navLink} onClick={() => setMenuOpen(false)}>
               {t(lang, "shop")}
            </Link>
            <Link href="/Contact" className={styles.navLink} onClick={() => setMenuOpen(false)}>
              {t(lang, "contact")}
            </Link>
            <Link href="/Appointment" className={styles.navLink} onClick={() => setMenuOpen(false)}>
              {t(lang, "serviceRequest")}
            </Link>
            {isAdmin && (
              <div className={styles.dropdownWrapper} ref={adminDropdownRef}>
                <button
                  className={`${styles.navLink} ${styles.roleLink} ${styles.dropdownToggle}`}
                  onClick={() => setAdminDropdownOpen(!adminDropdownOpen)}
                >
                  {t(lang, "adminConsole")} {adminDropdownOpen ? '▴' : '▾'}
                </button>
                {adminDropdownOpen && (
                  <div className={styles.dropdownMenu}>
                    <Link href="/admin/games" className={styles.dropdownItem} onClick={() => { setAdminDropdownOpen(false); setMenuOpen(false); }}>
                      {t(lang, "inventoryManagement")}
                    </Link>
                    <Link href="/admin/audit" className={styles.dropdownItem} onClick={() => { setAdminDropdownOpen(false); setMenuOpen(false); }}>
                      {t(lang, "auditLog")}
                    </Link>
                    <Link href="/admin/pricing" className={styles.dropdownItem} onClick={() => { setAdminDropdownOpen(false); setMenuOpen(false); }}>
                      {t(lang, "pricingSettings")}
                    </Link>
                  </div>
                )}
              </div>
            )}

            {isPublisher && (
              <div className={styles.dropdownWrapper} ref={publisherDropdownRef}>
                <button
                  className={`${styles.navLink} ${styles.roleLink} ${styles.dropdownToggle}`}
                  onClick={() => setPublisherDropdownOpen(!publisherDropdownOpen)}
                >
                  {t(lang, "providerPortal")} {publisherDropdownOpen ? '▴' : '▾'}
                </button>
                {publisherDropdownOpen && (
                  <div className={styles.dropdownMenu}>
                    <Link href="/publisher/my-games" className={styles.dropdownItem} onClick={() => { setPublisherDropdownOpen(false); setMenuOpen(false); }}>
                      {t(lang, "myGames")}
                    </Link>
                    <Link href="/publisher/analytics" className={styles.dropdownItem} onClick={() => { setPublisherDropdownOpen(false); setMenuOpen(false); }}>
                      {t(lang, "analytics")}
                    </Link>
                    <Link href="/publisher/settings" className={styles.dropdownItem} onClick={() => { setPublisherDropdownOpen(false); setMenuOpen(false); }}>
                      {t(lang, "settings")}
                    </Link>
                  </div>
                )}
              </div>
            )}

            {isCustomer && (
              <div className={styles.dropdownWrapper} ref={customerDropdownRef}>
                <button
                  className={`${styles.navLink} ${styles.roleLink} ${styles.dropdownToggle}`}
                  onClick={() => setCustomerDropdownOpen(!customerDropdownOpen)}
                >
                  {t(lang, "clientPortal")} {customerDropdownOpen ? '▴' : '▾'}
                </button>
                {customerDropdownOpen && (
                  <div className={styles.dropdownMenu}>
                    <Link href="/customer/purchases" className={styles.dropdownItem} onClick={() => { setCustomerDropdownOpen(false); setMenuOpen(false); }}>
                      {t(lang, "myPurchases")}
                    </Link>
                    <Link href="/customer/wishlist" className={styles.dropdownItem} onClick={() => { setCustomerDropdownOpen(false); setMenuOpen(false); }}>
                      {t(lang, "myWishlist")}
                    </Link>
                  </div>
                )}
              </div>
            )}
          </div>

          <div className={styles.rightSection}>
            {pathname === "/Shop" && (
              <div className={styles.searchBox}>
                <input
                  type="search"
                  placeholder={t(lang, "searchPlaceholder")}
                  className={styles.searchInput}
                  value={query}
                  onChange={(e) => {
                    setQuery(e.target.value);
                    dispatch(setSearchQuery(e.target.value));
                  }}
                />
                <button
                  onClick={() => dispatch(setSearchQuery(query))}
                  className={styles.searchBtn}
                  aria-label="Search"
                >
                  🔍
                </button>
              </div>
            )}

            <div className={styles.langSwitcher}>
              {(["en", "fr", "ar"] as Language[]).map((l) => (
                <button
                  key={l}
                  onClick={() => handleLangChange(l)}
                  className={`${styles.langBtn} ${lang === l ? styles.langActive : ""}`}
                  aria-label={`Switch to ${l}`}
                >
                  {langLabels[l]}
                </button>
              ))}
            </div>

            {isLoggedIn ? (
              <div className={styles.userCluster}>
                <Link href="/Settings" className={styles.iconBtn} title="System Settings">
                  <Settings size={18} />
                </Link>
                <div className={styles.notificationBtn} title="Notifications">
                  <Bell size={18} />
                </div>
                <div className={styles.userDropdownWrapper} ref={userDropdownRef}>
                  <button 
                    className={styles.userProfileBtn} 
                    onClick={() => setUserDropdownOpen(!userDropdownOpen)}
                  >
                    <div className={styles.avatarMini}>
                      <User size={16} />
                    </div>
                    <span className={styles.usernameText}>{username}</span>
                    <ChevronDown size={14} className={`${styles.chevron} ${userDropdownOpen ? styles.chevronRotated : ''}`} />
                  </button>
                  
                  {userDropdownOpen && (
                    <div className={styles.userDropdownMenu}>
                      <div className={styles.dropdownHeader}>
                        <p className={styles.roleLabel}>{role}</p>
                      </div>
                      <Link 
                        href={role === 'admin' ? '/admin/profile' : role === 'publisher' ? '/publisher/profile' : '/customer/profile'}
                        className={styles.dropdownLink} 
                        onClick={() => setUserDropdownOpen(false)}
                      >
                        <User size={14} /> {t(lang, "viewProfile")}
                      </Link>
                      <Link href="/Settings" className={styles.dropdownLink} onClick={() => setUserDropdownOpen(false)}>
                        <Settings size={14} /> {t(lang, "preferences")}
                      </Link>
                      <div className={styles.divider} />
                      <button onClick={handleLogout} className={styles.logoutAction}>
                        <LogOut size={14} /> {t(lang, "logout")}
                      </button>
                    </div>
                  )}
                </div>
              </div>
            ) : (
              <div className={styles.authGroup}>
                <Link href="/Login" className={styles.signInBtn} onClick={() => setMenuOpen(false)}>
                  {t(lang, "signIn")}
                </Link>
                <Link href="/Registration" className={styles.registerBtn} onClick={() => setMenuOpen(false)}>
                  {t(lang, "register")}
                </Link>
              </div>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
});

export default NavBar;
