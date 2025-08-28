<?php

namespace App\Http\Controllers;

use App\Http\Resources\UserResource;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Validator;
use Illuminate\Validation\Rule;

class UserController extends Controller
{
    public function index()
    {
        $users = User::all();
        return UserResource::collection($users);
    }

    public function show()
    {
        $user = Auth::user();
        if(is_null($user)){
            return response()->json('Error');
        }
        return response()->json($user);
    }

    public function update(Request $request, $id = null)
    {
        $current_user = Auth::user();
        if($current_user->role === 'admin' && $id){
            $user = User::findOrFail($id);
        }else{
            $user = User::findOrFail($current_user->id);
        }

        $validate = Validator::make($request->all(),[
            'first_name'=>'required|regex:/[A-Z][a-z]+/|max:255',
            'last_name'=>'required|regex:/[A-Z][a-z]+/|max:255',
            'email'=>['required','string','email',Rule::unique('users')->ignore($user->id)],
            'username'=>['required','string','max:255',Rule::unique('users')->ignore($user->id)],
            'is_verified' => 'boolean'
        ]);

        if($validate->fails()){
            return response()->json($validate->errors());
        }

        $user->first_name = $request->first_name;
        $user->last_name = $request->last_name;
        $user->username = $request->username;
        $user->email = $request->email;
        $user->is_verified = $request->is_verified;

        $user->save();

        return response()->json(['message'=>'User updated successfully!',
                                 'user' =>  new UserResource($user)]);
    }

    public function destroy($id=null)
    {
        $current_user = Auth::user();
        if($current_user->role === 'admin' && $id){
            $user = User::findOrFail($id);
        }else{
            $user = User::findOrFail($current_user->id);
        }
       
        $user->delete();
        return response()->json(['message' => 'User has been deleted']);
    }
}
