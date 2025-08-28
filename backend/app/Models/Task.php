<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Task extends Model
{
    use HasFactory;

    public $timestamps = false;

    protected $fillable = [
        'name',
        'description',
        'due_date',
        'category_id',
        'status',
        'priority',
        'user_id'
    ];

    public function user(){
        return $this->belongsTo(User::class);
    }

    public function status(){
        return $this->belongsTo(Status::class);
    }

    public function priority(){
        return $this->belongsTo(Priority::class);
    }

    public function category(){
        return $this->belongsTo(Category::class);
    }

    public function task_list(){
        return $this->belongsToMany(TaskList::class, 'list_order','task_id','task_list_id')->withPivot('num');
    }

}

