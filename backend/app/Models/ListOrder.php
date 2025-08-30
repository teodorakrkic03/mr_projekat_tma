<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class ListOrder extends Model
{
    protected $fillable = ['task_list_id','task_id','num'];

    public function task()
    {
        return $this->belongsTo(Task::class);
    }

    public function taskList()
    {
        return $this->belongsTo(TaskList::class, 'task_list_id');
    }
}
