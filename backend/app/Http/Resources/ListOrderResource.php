<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class ListOrderResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @return array<string, mixed>
     */
    
    public function toArray(Request $request): array
    {
        return $this->tasks->map(function($task){
            return [
                'task_list_id' => $this->id,
                'task_id' => $task->id,
                'rb' => $task->pivot->num
            ];
        })->toArray();
    }
}

