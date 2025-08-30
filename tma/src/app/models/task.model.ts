export interface Task {
    id:number;
    name:string;
    description?: string;
    due_date?: string;
    category?: any;
    status: 'Not started' | 'Active' | 'Finished';
    priority: 'low' | 'medium' | 'high';
    user_id: number;
}