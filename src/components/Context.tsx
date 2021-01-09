/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useState, useEffect, createContext } from 'react'

interface ContextProps {
  children: React.ReactNode
}

interface ThemeState {
  theme: string,
  setTheme: React.Dispatch<React.SetStateAction<string>>
}

interface LangState {
  lang: string,
  setLang: React.Dispatch<React.SetStateAction<string>>
}

export const ThemeContext = createContext<ThemeState | null>(null)
export const LangContext = createContext<LangState | null>(null)

const Context = ({ children }: ContextProps): JSX.Element => {
  const lastTheme = window.localStorage.getItem('Theme')
  const lastLang = window.localStorage.getItem('Language')

  const [theme, setTheme] = useState(lastTheme ?? 'Light')
  const [lang, setLang] = useState(lastLang ?? 'en')

  useEffect(() => window.localStorage.setItem('Theme', theme), [theme])
  useEffect(() => window.localStorage.setItem('Language', lang), [lang])

  return (
    <ThemeContext.Provider value={{ theme, setTheme }}>
      <LangContext.Provider value={{ lang, setLang }}>
        <div id={theme}>{children}</div>
      </LangContext.Provider>
    </ThemeContext.Provider>
  )
}

export default Context
