<?php

namespace App\Http\Controllers;

use App\Http\Resources\TaskResource;
use App\Models\Task;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Facades\Validator;
use Illuminate\Validation\Rule;

class TaskController extends Controller
{
    public function index(Request $request)
    {
        
        $user = Auth::user();
        
        $search = $request->query('search');
        $perPage = (int) $request->query('per_page', 9);

        $query = Task::where('user_id',$user->id);
        if($search){
            $query->where('name','like',"%{$search}%");
        }

        $tasks = $query->paginate($perPage);
        
        return response()->json([
            'tasks' => TaskResource::collection($tasks),
            'current_page' => $tasks -> currentPage(),
            'total' => $tasks -> total(),
            'last_page' => $tasks -> lastPage()
        ]);   
    }

    public function create()
    {
        //
    }

    public function store(Request $request)
    {
        $this->authorize('create', Task::class);

        $validator = Validator::make($request->all(),[
            'name' => 'required|string|max:255',
            'description' => 'string|max:255|nullable',
            'due_date' => 'date|after:today|nullable',
            'category_id' => 'nullable',
            'status' => ['required',Rule::in(['Not started','Active','Finished'])],
            'priority' => ['required',Rule::in(['low','medium','high'])]
        ]);

        if($validator->fails()){
            return response()->json($validator->errors());
        }

        $task = Task::create([
            'name' => $request->name,
            'description' => $request->description,
            'due_date' => $request->due_date,
            'category_id' => $request->category_id,
            'status' => $request->status,
            'priority' => $request->priority,
            'user_id' => Auth::user()->id
        ]);

        return response()->json(['message'=>'Task successfully created!', 
                                'task' => new TaskResource($task)]);
    }

    public function show(Task $task)
    {
        if($task->user_id !== Auth::id()){
            return response()->json(['message'=>'Task not found']);
        }
        return new TaskResource($task);
    }

    public function filter(Request $request){

        $validator = Validator::make($request->all(),[
            'status' => Rule::in(['Not started','Active','Finished']),
            'priority' => Rule::in(['low','medium','high']),
            'category_id' => 'exists:categories,id'
        ]);

        if($validator->fails()){
            return response()->json($validator->errors());
        }

        $query = Task::where('user_id', Auth::user()->id);

        if($request->has('status')){
            $query->where('status',$request->status);
        }

        if($request->has('priority')){
            $query->where('priority',$request->priority);
        }

        if($request->has('category_id')){
            $query->where('category_id',$request->category_id);
        }

        $perPage = (int) $request->query('per_page', 9);
        $tasks = $query->paginate($perPage);
        return response()->json([
            'tasks' => TaskResource::collection($tasks),
            'current_page' => $tasks -> currentPage(),
            'total' => $tasks -> total(),
            'last_page' => $tasks -> lastPage()
        ]);  
    }

    public function edit(Task $task)
    {
        //
    }

    public function update(Request $request, Task $task)
    {
        $this->authorize('update',$task);

        $validator = Validator::make($request->all(),[
            'name' => 'required|string|max:255',
            'description' => 'string|max:255|nullable',
            'due_date' => 'date|after:today|nullable',
            'category_id' => 'nullable',
            'status' => ['required',Rule::in(['Not started','Active','Finished'])],
            'priority' => ['required',Rule::in(['low','medium','high'])],
        ]);

        if($validator->fails()){
            return response()->json($validator->errors());
        }

        $task->name = $request->name;
        $task->description = $request->description;
        $task->due_date = $request->due_date;
        $task->category_id = $request->category_id;
        $task->status = $request->status;
        $task->priority = $request->priority;

        $task->save();

        return response()->json(['message'=>'Task successfully updated!', 
                                'task' => new TaskResource($task)]);
    }

    public function destroy(Task $task)
    {
        $task->delete();
        return response()->json(['message'=>'Task has been deleted']);
    }

    
}
