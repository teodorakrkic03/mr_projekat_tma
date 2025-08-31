import { Category } from "./category.model";

export interface Task {
    id:number;
    name:string;
    description?: string;
    due_date?: string;
    category?: Category;
    status: 'Not started' | 'Active' | 'Finished';
    priority: 'low' | 'medium' | 'high';
    user_id: number;
}