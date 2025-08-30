import { Task } from "./task.model";

export interface List{
    id:number;
    name:string;
    user_id:number;
    tasks: TaskInList[];
}

export interface TaskInList {
    task_list_id: number;
    task_id: number;
    num: number;
    task: Task;
}