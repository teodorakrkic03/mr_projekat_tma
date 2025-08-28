<?php

namespace App\Http\Controllers;

use App\Http\Resources\TaskListResource;
use App\Models\TaskList;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Validator;

class TaskListController extends Controller
{
    public function index(Request $request)
    {
        $this->authorize('viewAny',TaskList::class);

        $user = Auth::user();
        $query = TaskList::where('user_id',$user->id);

        $perPage = (int) $request->query('per_page', 6);
        $tasks = $query->paginate($perPage);
     
        return response()->json([
            'task_lists' => TaskListResource::collection($tasks),
            'current_page' => $tasks -> currentPage(),
            'total' => $tasks -> total(),
            'last_page' => $tasks -> lastPage()
        ]); 
    }

    public function show($task_list_id)
    {
        $task_list = TaskList::find($task_list_id);
        if(!$task_list || ($task_list->user_id !== Auth::id())){
            return response()->json(['message'=>'Task list not found']);
        }
        return new TaskListResource($task_list);
    }

    public function store(Request $request)
    {
        $this->authorize('viewAny',TaskList::class);
        $validator = Validator::make($request->all(),[
            'name' => 'required|string|max:255',
        ]);

        if($validator->fails()){
            return response()->json($validator->errors());
        }

        $task_list = TaskList::create([
            'name' => $request->name,
            'user_id' => Auth::user()->id
        ]);

        return response()->json(['message'=>'Task list successfully created!', 
                                 'task_list' => new TaskListResource($task_list)]);
    }

    public function update(Request $request, $task_list_id)
    {
        $task_list = TaskList::find($task_list_id);
        $this->authorize('update',$task_list);
        $validator = Validator::make($request->all(),[
            'name' => 'required|string|max:255',
        ]);

        if($validator->fails()){
            return response()->json($validator->errors());
        }

        $task_list->name = $request->name;

        $task_list->save();

        return response()->json(['message'=>'Task list successfully updated!', 
                                 'task_list' => new TaskListResource($task_list)]);
    }

    public function destroy($task_list_id)
    {
        $task_list = TaskList::find($task_list_id);
        $this->authorize('delete',$task_list);
        if(!$task_list || Auth::id()!==$task_list->user_id){
            return response()->json(['message'=>'Error']);
        }
        $task_list->delete();
        return response()->json(['message'=>'Task list has been deleted']);
    }
}
