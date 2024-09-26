import { useTheme } from 'next-themes'
export default function ThemeSwitcher() {
    const { theme, setTheme } = useTheme()
    return (

        <button onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}>
            toggle
        </button>

    )
}