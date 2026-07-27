import { useTaskContext } from "../../contexts/TaskContext/useTaskContext"
import { getNextCycle } from "../../utils/getNextCycle"
import { getNextCycleType } from "../../utils/getNextCycleType"

export function Tips() {
    const { state } = useTaskContext() 
    const nextCycle = getNextCycle(state.currentCycle)
    const nextCycleType = getNextCycleType(nextCycle) 

    // Tips
    const tipsForActiveTask = {
        workTime: <span>Foque por <strong>{state.config.workTime} min</strong></span>,
        shortBreakTime: <span>Descanse por <strong>{state.config.shortBreakTime} min</strong></span>,
        longBreakTime: <span>Descanso longo de <strong>{state.config.longBreakTime} min</strong></span>
    }

    const tipsForNoActiveTask = {
        workTime: <span>Próximo ciclo é de <strong>{state.config.workTime} min</strong></span>,
        shortBreakTime: <span>Próximo ciclo é de <strong>{state.config.shortBreakTime} min</strong></span>,
        longBreakTime: <span>Próximo ciclo é de <strong>{state.config.longBreakTime}min</strong></span>
    }

    return (
        <>
            {!!state.activeTask && tipsForActiveTask[state.activeTask.type]}
			{!state.activeTask && tipsForNoActiveTask[nextCycleType]}      
        </>
    )
}
