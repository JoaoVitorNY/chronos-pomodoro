import { SaveIcon } from "lucide-react";
import { Container } from "../../components/Container";
import { DefaultButton } from "../../components/DefaultButton";
import { DefaultInput } from "../../components/DefaultInput";
import { Heading } from "../../components/Heading";
import { MainTemplate } from "../../templates/MainTemplate";
import { useRef } from "react";
import { useTaskContext } from "../../contexts/TaskContext/useTaskContext";
import { showMessage } from "../../adapters/showMessage";
import { TaskActionTypes } from "../../contexts/TaskContext/taskActions";

export function Settings() {
    const { state, dispatch } = useTaskContext()
    console.log('state.config', state.config)

    const workTimeInput = useRef<HTMLInputElement>(null)
    const shortBreakTimeInput = useRef<HTMLInputElement>(null)
    const longBreakTimeInput = useRef<HTMLInputElement>(null)

    function handleSaveSettings(event: React.SubmitEvent<HTMLFormElement>) {
        event.preventDefault()
        showMessage.dismiss()

        const formErrors = []

        const workTime = Number(workTimeInput.current?.value)
        const shortBreakTime = Number(shortBreakTimeInput.current?.value)
        const longBreakTime = Number(longBreakTimeInput.current?.value)

        if (isNaN(workTime) || isNaN(shortBreakTime) || isNaN(longBreakTime)) {
            formErrors.push('Digite um número válido para os campos!')
        }

        if (workTime < 1 || workTime > 99) {
            formErrors.push('Digite um valor entre 1 e 99 para o tempo de foco.')
        }

        if (shortBreakTime < 1 || shortBreakTime > 30) {
            formErrors.push('Digite um valor entre 1 e 30 para o tempo de descanso curto.')
        }

        if (longBreakTime < 1 || longBreakTime > 60) {
            formErrors.push('Digite um valor entre 1 e 60 para o tempo de descanso longo.')
        }

        if (formErrors.length > 0) {
            formErrors.forEach(error => {
                showMessage.error(error)
            })
            return
        }
        
        dispatch({ 
            type: TaskActionTypes.CHANGE_SETTINGS, 
            payload: { 
                workTime, 
                shortBreakTime, 
                longBreakTime 
            } 
        })

        showMessage.success('Configurações salvas com sucesso!')
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
                            type='number'
                        />
                    </div>
                    <div className='formRow'>
                        <DefaultInput 
                            id='shortBreakTime' 
                            labelText='Descanso Curto' 
                            ref={shortBreakTimeInput}
                            defaultValue={state.config.shortBreakTime}
                            type='number'
                        />
                    </div>
                    <div className='formRow'>
                        <DefaultInput 
                            id='longBreakTime' 
                            labelText='Descanso Longo' 
                            ref={longBreakTimeInput}
                            defaultValue={state.config.longBreakTime}
                            type='number'
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