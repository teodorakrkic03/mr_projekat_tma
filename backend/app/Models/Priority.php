<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Priority extends Model
{

    public $timestamps = false;

    public function task(){
        return $this->hasMany(Task::class);
    }
}
