'use client';
import { memo, useState, useCallback } from "react";
import { useRouter, usePathname } from "next/navigation";
import Link from "next/link";
import { useDispatch, useSelector } from "react-redux";
import { setSearchQuery } from "../../redux/shopSlice";
import { setLanguage } from "../../redux/languageSlice";
import { logout } from "../../redux/authSlice";
import { RootState } from "../../redux/store";
import { t, Language } from "../../lib/i18n";
import type { AppDispatch } from "../../redux/store";
import styles from "./NavBar.module.css";

export default function NavBar() {
  const dispatch = useDispatch<AppDispatch>();
  const [query, setQuery] = useState("");
  const [menuOpen, setMenuOpen] = useState(false);
  const pathname = usePathname();
  const router = useRouter();

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

  if (pathname === "/Login" || pathname === "/Registration" || pathname === "/Shop" || pathname === "/Contact") return null;

  const isAdmin = role === "admin";
  const isPublisher = role === "publisher";
  const isCustomer = role === "customer";

  const langLabels: Record<Language, string> = { en: "EN", fr: "FR", ar: "عر" };

  return (
    <nav className={styles.navbar} dir={lang === "ar" ? "rtl" : "ltr"}>
      <div className={styles.inner}>
        {}
        <Link href="/" className={styles.logo} onClick={() => setMenuOpen(false)}>
          <span className={styles.logoIcon}></span>
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

        {}
        <div className={`${styles.menu} ${menuOpen ? styles.menuOpen : ""}`}>

          <div className={styles.navLinks}>
            <Link href="/" className={styles.navLink} onClick={() => setMenuOpen(false)}>
              {t(lang, "home")}
            </Link>
            <Link href="/Shop" className={styles.navLink} onClick={() => setMenuOpen(false)}>
              {t(lang, "shop")}
            </Link>
            <Link href="/Contact" className={styles.navLink} onClick={() => setMenuOpen(false)}>
              Contact
            </Link>
            {isAdmin && (
              <>
                <Link href="/dashboard" className={`${styles.navLink} ${styles.roleLink}`} onClick={() => setMenuOpen(false)}>
                  {t(lang, "dashboard")}
                </Link>
                <Link href="/admin/games" className={`${styles.navLink} ${styles.roleLink}`} onClick={() => setMenuOpen(false)}>
                  {t(lang, "manageGames")}
                </Link>
                <Link href="/admin/users" className={`${styles.navLink} ${styles.roleLink}`} onClick={() => setMenuOpen(false)}>
                  {t(lang, "manageUsers")}
                </Link>
                <Link href="/admin/audit" className={`${styles.navLink} ${styles.roleLink}`} onClick={() => setMenuOpen(false)}>
                  Audit Trail
                </Link>
                <Link href="/admin/pricing" className={`${styles.navLink} ${styles.roleLink}`} onClick={() => setMenuOpen(false)}>
                  Pricing Engine
                </Link>
              </>
            )}
            {isPublisher && (
              <>
                <Link href="/publisher/my-games" className={`${styles.navLink} ${styles.roleLink}`} onClick={() => setMenuOpen(false)}>
                  {t(lang, "myGames")}
                </Link>
                <Link href="/publisher/publish" className={`${styles.navLink} ${styles.roleLink}`} onClick={() => setMenuOpen(false)}>
                  {t(lang, "publishGame")}
                </Link>
              </>
            )}

            {}
            {isCustomer && (
              <>
                <Link href="/customer/purchases" className={`${styles.navLink} ${styles.roleLink}`} onClick={() => setMenuOpen(false)}>
                  {t(lang, "myPurchases")}
                </Link>
                <Link href="/customer/wishlist" className={`${styles.navLink} ${styles.roleLink}`} onClick={() => setMenuOpen(false)}>
                  {t(lang, "wishlist")}
                </Link>
              </>
            )}
          </div>

          {}
          <div className={styles.rightSection}>
            {}
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

            {}
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

            {}
            {isLoggedIn ? (
              <div className={styles.authGroup}>
                {role && <span className={`${styles.roleBadge} ${styles[`role_${role}`]}`}>{role}</span>}
                {username && <span className={styles.usernameLabel}>{username}</span>}
                <button onClick={handleLogout} className={styles.logoutBtn}>
                  {t(lang, "logout")}
                </button>
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
}