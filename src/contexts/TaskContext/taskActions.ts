// useReducer <- hook do React que recebe um reducer e um estado inicial
// reducer <- funcao que recebe o estado atual e uma acao, e retorna um novo estado
// state <- estado atual
// action <- acao disparada, geralmente é um objeto com type e payload(opcional)
// type <- tipo da acao, geralmente uma string (pode ser um enum, constante, etc)
// payload <- dados extras enviados junto com a action, se necessario para atualizar o estado

import type { TaskModel } from "../../models/TaskModel"

export enum TaskActionTypes {
    START_TASK = 'START_TASK',
    INTERRUPT_TASK = 'INTERRUPT_TASK',
    RESET_STATE = 'RESET_STATE'
}

export type TaskActionWithPayload = {
    type: TaskActionTypes.START_TASK, 
    payload: TaskModel
}

export type TaskActionWithoutPayload = | {
    type: TaskActionTypes.RESET_STATE,
} | {
    type: TaskActionTypes.INTERRUPT_TASK,
}

export type TaskActionModel = TaskActionWithPayload | TaskActionWithoutPayload