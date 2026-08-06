import { SaveIcon } from "lucide-react";
import { Container } from "../../components/Container";
import { DefaultButton } from "../../components/DefaultButton";
import { DefaultInput } from "../../components/DefaultInput";
import { Heading } from "../../components/Heading";
import { MainTemplate } from "../../templates/MainTemplate";
import { useRef } from "react";
import { useTaskContext } from "../../contexts/TaskContext/useTaskContext";

export function Settings() {
    const { state } = useTaskContext()
    console.log('state.config', state.config)

    const workTimeInput = useRef<HTMLInputElement>(null)
    const shortBreakTimeInput = useRef<HTMLInputElement>(null)
    const longBreakTimeInput = useRef<HTMLInputElement>(null)

    function handleSaveSettings(event: React.SubmitEvent<HTMLFormElement>) {
        event.preventDefault()

        const workTime = workTimeInput.current?.value
        const shortBreakTime = shortBreakTimeInput.current?.value
        const longBreakTime = longBreakTimeInput.current?.value

        console.log('Salvar configurações', { workTime, shortBreakTime, longBreakTime })
    }

    return (
        <MainTemplate>
            <Container>
                <Heading>
                    Configurações
                </Heading>
            </Container>
            <Container>
                <p style={{ textAlign: 'center' }}>
                    Configure os minutos para as etapas do Pomodoro.
                </p>
            </Container>
            <Container>
                <form action='' onSubmit={handleSaveSettings} className='form'>
                    <div className='formRow'>
                        <DefaultInput 
                            id='workTime' 
                            labelText='Foco' 
                            ref={workTimeInput}
                            defaultValue={state.config.workTime}
                        />
                    </div>
                    <div className='formRow'>
                        <DefaultInput 
                            id='shortBreakTime' 
                            labelText='Descanso Curto' 
                            ref={shortBreakTimeInput}
                            defaultValue={state.config.shortBreakTime}
                        />
                    </div>
                    <div className='formRow'>
                        <DefaultInput 
                            id='longBreakTime' 
                            labelText='Descanso Longo' 
                            ref={longBreakTimeInput}
                            defaultValue={state.config.longBreakTime}
                        />
                    </div>
                    <div className='formRow'>
                        <DefaultButton 
                            icon={<SaveIcon />} 
                            aria-label="Salvar configurações" 
                            title='Salvar' 
                        />
                    </div>
                </form>
            </Container>
        </MainTemplate>
    )
}