<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class TaskList extends Model
{
    use HasFactory;

    public $timestamps = false;

    protected $fillable = [
        'name',
        'user_id'
    ];

    public function user(){
        return $this->belongsTo(User::class);
    }

    public function tasks(){
        return $this->belongsToMany(Task::class,'list_order','task_list_id','task_id')->withPivot('num')->orderBy('num');
    }

    public function listOrders()
    {
        return $this->hasMany(ListOrder::class, 'task_list_id');
    }

}