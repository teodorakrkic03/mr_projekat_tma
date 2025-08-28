<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class ListOrder extends Model
{
    protected $fillable = ['task_list_id','task_id','num'];
}
