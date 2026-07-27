import { DefaultInput } from "../DefaultInput"
import { DefaultButton } from "../DefaultButton"
import { Cycles } from "../Cycles"
import { PlayCircleIcon, StopCircleIcon } from "lucide-react"
import { useRef } from "react"
import type { TaskModel } from "../../models/TaskModel"
import { useTaskContext } from "../../contexts/TaskContext/useTaskContext"
import { getNextCycle } from "../../utils/getNextCycle"
import { getNextCycleType } from "../../utils/getNextCycleType"
import { TaskActionTypes } from "../../contexts/TaskContext/taskActions"
import { Tips } from "../Tips"

export function MainForm() {
	const { state, dispatch } = useTaskContext() 

	// useState para quando quiser o valor em tempo real, pois faz a renderização do componente a cada alteração do valor
	// const { taskName, setTaskName } = useState('') 
	const taskNameInput = useRef<HTMLInputElement>(null)

	// Ciclos
	const nextCycle = getNextCycle(state.currentCycle)
	const nextCycleType = getNextCycleType(nextCycle)	 

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
			duration: state.config[nextCycleType],
			type: nextCycleType
		}

		dispatch({type: TaskActionTypes.START_TASK, payload: newTask})

	}

	function handleInterruptTask() {
		dispatch({type: TaskActionTypes.INTERRUPT_TASK})
	}

	return (
		<form onSubmit={handleCreateNewTask} className='form' action="">
			<div className="formRow">
				<DefaultInput 
					labelText="task" 
					type="text" 
					id="meuInput" 
					placeholder="Ex.: Estudar"
					// value={taskName}
					// onChange={e => setTaskName(e.target.value)}
					ref={taskNameInput}
					disabled={!!state.activeTask}
				/>                
			</div>
			
			<div className="formRow">
				<Tips />
			</div>
			
			{state.currentCycle > 0 && (
				<div className="formRow">
					<Cycles />
				</div>
			)}
			
			<div className="formRow">
				{!state.activeTask && (
					<DefaultButton 
						type='submit' 
						aria-label='Iniciar nova tarefa' 
						title='Iniciar nova tarefa' 
						key='botao_submit'
						icon={<PlayCircleIcon/>} />   
				)}  
				
				{!!state.activeTask && (
					<DefaultButton 
						type='button' 
						aria-label='Interromper tarefa' 
						title='Interromper tarefa' 
						key='botao_interrupt'
						color='red'
						onClick={handleInterruptTask}
						icon={<StopCircleIcon/>} />  
				)}               
			</div>
		</form>
	)
}