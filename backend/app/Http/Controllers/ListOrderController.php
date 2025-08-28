<?php

namespace App\Http\Controllers;

use App\Http\Resources\ListOrderResource;
use App\Models\TaskList;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Validator;

class ListOrderController extends Controller
{
    public function index(){

        $user = Auth::user();
        $lists = TaskList::where('user_id',$user->id)
                        ->with(['tasks' => function($query){
                            $query->orderBy('num');
                        }] )
                        ->get();
        return ListOrderResource::collection($lists);
        
    }

    public function show($id){

        $user = Auth::user();
        $list = TaskList::where('id',$id)
                        ->where('user_id',$user->id)
                        ->with(['tasks' => function($query){
                            $query->orderBy('num');
                        }])
                        ->first();
        
        if(!$list){
            return response()->json(['message' => 'List not found']);
        }

        return new ListOrderResource($list);

    }

    public function addTask(Request $request){
        
        $validator = Validator::make($request->all(),[
            'task_list_id' => 'required|exists:task_lists,id',
            'task_id' => 'required|exists:tasks,id'
        ]);

        if($validator->fails()){
            return response()->json($validator->errors());
        }

        $list = TaskList::findOrFail($request->task_list_id);
        $this -> authorize('update',$list);

        $maxNum = $list->tasks()->max('num') ?? 0;
        
        DB::table('list_order')->insert([
            'task_list_id' => $request->task_list_id,
            'task_id' => $request->task_id,
            'num' => $maxNum+1
        ]);

        return response()->json(['message' => 'Task added to the list']);
    }

    public function removeTask($task_list_id,$task_id){

        $list = TaskList::findOrFail($task_list_id);
        $this->authorize('update',$list);

        if(!$list->tasks()->where('task_id',$task_id)->exists()){
            return response()->json(['message'=>'Task not found']);
        }

        DB::table('list_order')
            ->where('task_list_id',$task_list_id)
            ->where('task_id',$task_id)
            ->delete();
        
        return response()->json(['message'=>'Task removed from the list']);
    }
}
