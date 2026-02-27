export type Language = "en" | "fr" | "ar";

export const translations: Record<Language, Record<string, string>> = {
    en: {

        home: "Home",
        shop: "Shop",
        logout: "Logout",
        language: "Language",
        signIn: "Sign In",
        register: "Register",
        search: "Search",
        searchPlaceholder: "Search games...",
        dashboard: "Dashboard",
        manageGames: "Manage Games",
        manageUsers: "Manage Users",
        myGames: "My Games",
        publishGame: "Publish Game",
        myPurchases: "My Purchases",
        wishlist: "Wishlist",

        login: "Login",
        username: "Username",
        password: "Password",
        showPassword: "Show Password",
        noAccount: "Don't have an account?",
        registerHere: "Register here",

        register2: "Register",
        email: "Email",
        accountType: "Account Type",
        selectRole: "-- Select Role --",
        customer: "Customer",
        publisher: "Publisher",
        confirmPassword: "Confirm Password",
        createAccount: "Create Account",
        alreadyAccount: "Already have an account?",

        findUs: "Find Us",
        ourLocation: "Our Location",
        address: "Hydra, Algiers, Algeria",

        platformName: "GameVault",
        heroSubtitle: "Discover. Play. Dominate.",
    },
    fr: {

        home: "Accueil",
        shop: "Boutique",
        logout: "Déconnexion",
        language: "Langue",
        signIn: "Connexion",
        register: "S'inscrire",
        search: "Rechercher",
        searchPlaceholder: "Rechercher des jeux...",
        dashboard: "Tableau de bord",
        manageGames: "Gérer les jeux",
        manageUsers: "Gérer les utilisateurs",
        myGames: "Mes jeux",
        publishGame: "Publier un jeu",
        myPurchases: "Mes achats",
        wishlist: "Liste de souhaits",

        login: "Connexion",
        username: "Nom d'utilisateur",
        password: "Mot de passe",
        showPassword: "Afficher le mot de passe",
        noAccount: "Vous n'avez pas de compte ?",
        registerHere: "Inscrivez-vous ici",

        register2: "Inscription",
        email: "E-mail",
        accountType: "Type de compte",
        selectRole: "-- Sélectionner un rôle --",
        customer: "Client",
        publisher: "Éditeur",
        confirmPassword: "Confirmer le mot de passe",
        createAccount: "Créer un compte",
        alreadyAccount: "Vous avez déjà un compte ?",

        findUs: "Nous trouver",
        ourLocation: "Notre emplacement",
        address: "Hydra, Alger, Algérie",

        platformName: "GameVault",
        heroSubtitle: "Découvrez. Jouez. Dominez.",
    },
    ar: {

        home: "الرئيسية",
        shop: "المتجر",
        logout: "تسجيل الخروج",
        language: "اللغة",
        signIn: "تسجيل الدخول",
        register: "إنشاء حساب",
        search: "بحث",
        searchPlaceholder: "ابحث عن الألعاب...",
        dashboard: "لوحة التحكم",
        manageGames: "إدارة الألعاب",
        manageUsers: "إدارة المستخدمين",
        myGames: "ألعابي",
        publishGame: "نشر لعبة",
        myPurchases: "مشترياتي",
        wishlist: "قائمة الرغبات",

        login: "تسجيل الدخول",
        username: "اسم المستخدم",
        password: "كلمة المرور",
        showPassword: "إظهار كلمة المرور",
        noAccount: "ليس لديك حساب؟",
        registerHere: "سجّل هنا",

        register2: "إنشاء حساب",
        email: "البريد الإلكتروني",
        accountType: "نوع الحساب",
        selectRole: "-- اختر الدور --",
        customer: "عميل",
        publisher: "ناشر",
        confirmPassword: "تأكيد كلمة المرور",
        createAccount: "إنشاء حساب",
        alreadyAccount: "لديك حساب بالفعل؟",

        findUs: "جِدنا",
        ourLocation: "موقعنا",
        address: "حيدرة، الجزائر العاصمة",

        platformName: "GameVault",
        heroSubtitle: "اكتشف. العب. تفوّق.",
    },
};

export function t(lang: Language, key: string): string {
    return translations[lang]?.[key] ?? translations["en"]?.[key] ?? key;
}
