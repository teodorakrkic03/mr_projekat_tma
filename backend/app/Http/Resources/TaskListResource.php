<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class TaskListResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @return array<string, mixed>
     */

    
    public function toArray(Request $request): array
    {
        return [
            'id'   => $this->id,
            'name' => $this->name,
            'user_id' => $this->user_id,
            'tasks' => $this->tasks->map(function ($task) {
                return [
                    'task_list_id' => $this->id,
                    'task_id' => $task->id,
                    'num' => $task->pivot->num,
                    'task' => new TaskResource($task),
                ];
            }),
        ];
    }
}

