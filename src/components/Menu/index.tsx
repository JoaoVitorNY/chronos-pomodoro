import { HouseIcon, HistoryIcon, SettingsIcon, SunIcon } from 'lucide-react'
import styles from './styles.module.css'
import { useState, useEffect } from 'react'

type AvailableThemes = 'dark' | 'light'

export function Menu() {
    const [theme, setTheme] = useState<AvailableThemes>('dark')

    function handleThemeChange(event: React.MouseEvent<HTMLAnchorElement, MouseEvent>) {
        event.preventDefault()

        setTheme(prevTheme => {
            const nextTheme = prevTheme === 'dark' ?  'light': 'dark'
            return nextTheme
        }) 
    }

    useEffect(() => {
        document.documentElement.setAttribute('data-theme', theme)

        return () => {
            console.log('Esse componente vai ser atualizado')
        }
    }, [theme]) // Executa apenas quando o valor de theme mudar

    return (
        <nav className={styles.menu}>
            <h1>{theme}</h1>
            <a 
                href="#" 
                className={styles.menuLink} 
                aria-label="Ir para a Home"
                title="Ir para a Home"
            >
                <HouseIcon />
            </a>
            <a 
                href="#" 
                className={styles.menuLink} 
                aria-label="Ver histórico"
                title="Ver histórico"
            >
                <HistoryIcon />
            </a>
            <a 
                href="#" 
                className={styles.menuLink}
                aria-label="Configurações"
                title="Configurações"
            >
                <SettingsIcon />
            </a>
            <a 
                href="#" 
                className={styles.menuLink}
                aria-label="Mudar Tema"
                title="Mudar Tema"
                onClick={handleThemeChange}
            >
                <SunIcon />
            </a>
        </nav>

    )
}