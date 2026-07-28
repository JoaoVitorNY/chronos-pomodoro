import { useEffect, useReducer } from "react";
import { initialTaskState } from "./initialTaskState";
import { TaskContext } from "./TaskContext";
import { taskReducer } from "./taskReducer";
import { TimerWorkerManager } from "../../workers/timerWorkerManager";

type TaskContextProviderProps = {
    children: React.ReactNode
}

export function TaskContextProvider({ children }: TaskContextProviderProps) {
    const [state, dispatch] = useReducer(taskReducer, initialTaskState)

    const worker = TimerWorkerManager.getInstance()

    worker.onmessage((event: MessageEvent) => {
        const countDownSeconds = event.data 
        console.log(event.data)

        if(countDownSeconds <= 0) {
            worker.terminate()
        }
    })

    useEffect(() => {
        if(!state.activeTask) {
            console.log('Worker terminado por falta de activeTask')
            worker.terminate()
        }

        worker.postMessage(state)
    }, [worker, state])

    return (
        <TaskContext.Provider value={{ state, dispatch }}>
            {children}
        </TaskContext.Provider>
    )
}