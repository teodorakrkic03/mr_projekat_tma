<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class CategoryResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @return array<string, mixed>
     */

    public static $wrap = 'category';

    public function toArray(Request $request): array
    {
        
        return[
            'id'=>$this->id,
            'name'=>$this->resource->name,
            'user'=>new UserResource($this->resource->user)
        ];
    }
}

