import { DefaultInput } from "../DefaultInput"
import { DefaultButton } from "../DefaultButton"
import { Cycles } from "../Cycles"
import { PlayCircleIcon } from "lucide-react"
import { useRef } from "react"

export function MainForm() {
	// useState para quando quiser o valor em tempo real, pois faz a renderização do componente a cada alteração do valor
	// const { taskName, setTaskName } = useState('') 
	const taskNameInput = useRef<HTMLInputElement>(null)

	function handleCreateNewTask(event: React.SubmitEvent<HTMLFormElement>) {
		event.preventDefault()
	}

	return (
		<form onSubmit={handleCreateNewTask} className='form' action="">
			<div className="formRow">
				<DefaultInput labelText="task" type="text" id="meuInput" placeholder="Digite algo"
					// value={taskName}
					// onChange={e => setTaskName(e.target.value)}
					ref={taskNameInput}
				/>                
			</div>
			
			<div className="formRow">
				<p>Proximo intervalo é de 25min</p>                    
			</div>
			
			<div className="formRow">
				<Cycles />
			</div>
			
			<div className="formRow">
				<DefaultButton icon={<PlayCircleIcon/>} />                  
			</div>
		</form>
	)
}