import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export type Language = "en" | "fr" | "ar";

interface LanguageState {
    lang: Language;
    dir: "ltr" | "rtl";
}

const initialState: LanguageState = {
    lang: "en",
    dir: "ltr",
};

const languageSlice = createSlice({
    name: "language",
    initialState,
    reducers: {
        setLanguage: (state, action: PayloadAction<Language>) => {
            state.lang = action.payload;
            state.dir = action.payload === "ar" ? "rtl" : "ltr";
        },
    },
});

export const { setLanguage } = languageSlice.actions;
export default languageSlice.reducer;
