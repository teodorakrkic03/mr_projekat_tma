<?php

namespace App\Http\Controllers;

use App\Http\Resources\CategoryResource;
use App\Models\Category;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Validator;

class CategoryController extends Controller
{
    public function index() {
        $categories = Category::where('user_id', Auth::id())->get();
        return CategoryResource::collection($categories);
    }

    public function store(Request $request){
        $validator = Validator::make($request->all(),[
            'name' => 'required|string|max:255',
            'tag' => 'required|string|max:10'
        ]);

        if($validator->fails()){
            return response()->json($validator->errors());
        }

        $category = Category::create([
            'name' => $request->name,
            'tag' => $request->tag,
            'user_id' => Auth::user()->id
        ]);

        return response()->json(['message'=>'Category successfully created!', 
                                'category' => new CategoryResource($category)]);
    }

    public function destroy($id){
        $category = Category::find($id);
        if(!$category || Auth::id()!==$category->user_id){
            return response()->json(['message'=>'Error']);
        }
        $category->delete();
        return response()->json(['message'=>'Category has been deleted']);
    }
}
