<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class TaskResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @return array<string, mixed>
     */


    public function toArray(Request $request)
    {
        return[
            'id'=>$this->resource->id,
            'name'=>$this->resource->name,
            'description'=>$this->resource->description,
            'due_date'=>$this->resource->due_date,
            'category'=>new CategoryResource($this->resource->category),
            'status'=>$this->resource->status,
            'priority'=>$this->resource->priority,
            'user'=>new UserResource($this->resource->user),
        ];
    }
}

