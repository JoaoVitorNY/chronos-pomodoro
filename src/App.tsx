import { Heading } from './components/Heading'

import './styles/theme.css'
import './styles/global.css'
import { TimerIcon } from 'lucide-react'

export function App() {

    return (
    <>
        <Heading>Hello World!
            <button>
                <TimerIcon />
            </button>
        </Heading>
        <p>Welcome to my React app!</p>
    </>
    )    
}   


