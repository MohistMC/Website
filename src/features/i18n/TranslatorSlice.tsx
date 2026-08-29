import { AppState } from '@/util/redux/Store'
import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { locales } from '@/i18n/Language'
import enTranslation from '@/i18n/translations/en'

// Use this interface for languages that are not yet fully translated (fallback to English, so it will never return undefined for any valid translation key)
export type PartialLocaleState = Omit<LocaleState, 'strings'> & {
    strings?: Partial<LocaleState['strings']>
}

export interface LocaleState {
    name: string
    locale: string
    strings: Record<StringKey, string>
}

export type StringKey = keyof typeof enTranslation.strings

const initialState: LocaleState = locales.current

export const translatorSlice = createSlice({
    name: 'translations',
    initialState,
    reducers: {
        setLocale: (state, action: PayloadAction<LocaleState>) => {
            return action.payload
        },
    },
})

export const { setLocale } = translatorSlice.actions

// Other code such as selectors can use the imported `RootState` type
export const selectTranslations = (state: AppState) => state.translator.strings

export const selectLocale = (state: AppState) => state.translator.locale

export const selectTranslationsByString = (
    state: AppState,
): Record<string, string> => state.translator.strings

export default translatorSlice.reducer
