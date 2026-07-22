import { DefaultInput } from "../DefaultInput"
import { DefaultButton } from "../DefaultButton"
import { Cycles } from "../Cycles"
import { PlayCircleIcon } from "lucide-react"
import { useRef } from "react"
import type { TaskModel } from "../../models/TaskModel"
import { useTaskContext } from "../../contexts/TaskContext/useTaskContext"

export function MainForm() {
	const { setState } = useTaskContext() 

	// useState para quando quiser o valor em tempo real, pois faz a renderização do componente a cada alteração do valor
	// const { taskName, setTaskName } = useState('') 
	const taskNameInput = useRef<HTMLInputElement>(null)

	function handleCreateNewTask(event: React.SubmitEvent<HTMLFormElement>) {
		event.preventDefault()

		if(taskNameInput.current === null) return

		const taskName = taskNameInput.current.value.trim()

		if(!taskName) {
			alert('Por favor, digite o nome da tarefa')
			return
		}

		const newTask: TaskModel = {
			id: Date.now().toString(),
			name: taskName,
			startDate: Date.now(),
			completeDate: null,
			interruptDate: null,
			duration: 1,
			type: 'workTime'
		}

		const secondsRemaining = newTask.duration * 60

		setState(prevState => {
			return {
				...prevState,
				config: { ...prevState.config },
				activeTask: newTask,
				currentCycle: 1, // conferir depois
				secondsRemaining, // conferir depois
				formattedSecondsRemaining: '00:00', // conferir depois
				tasks: [...prevState.tasks, newTask] 
			}
		})
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