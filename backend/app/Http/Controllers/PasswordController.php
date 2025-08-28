<?php

namespace App\Http\Controllers;

use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Validator;
use Illuminate\Support\Str;

class PasswordController extends Controller
{
    public function sendResetLink(Request $request){

        $validator = Validator::make($request->all(),[
            'email' => 'required|string|email|exists:users,email'
        ]);

        if($validator->fails()){
            return response()->json($validator->errors());
        }

        $user = User::where('email',$request->email)->first();

        if(!$user){
            return response()->json(['message'=>'Email not found']);
        }

        $token = Str::random(60);

        //slanje tokena na mail...

        DB::table('password_reset_tokens')->updateOrInsert(
            ['email' => $request->email],
            [
                'token' => $token,
                'created_at' => now()
            ]
        );

        return response()->json(['message'=>'Reset link sent to your email.', 'token'=>$token]);
    }

    public function reset(Request $request){
        $validator = Validator::make($request->all(),[
            'email' => 'required|string|email|exists:users,email',
            'token' => 'required',
            'password' => 'required|string|min:10|confirmed'
        ]);

        if($validator->fails()){
            return response()->json($validator->errors());
        }

        $resetData = DB::table('password_reset_tokens')
            ->where('email',$request->email)
            ->where('token',$request->token)
            ->first();
        if(!$resetData){
            return response()->json(['message' => 'Invalid token or email']);
        }

        $user = User::where('email',$request->email)->first();
        if(!$user){
            return response()->json(['message' => 'User not found']);
        }

        $user->password = Hash::make($request->password);
        $user->save();

        DB::table('password_reset_tokens')
            ->where('email',$request->email)
            ->where('token',$request->token)
            ->delete();

        return response()->json(['message'=>'Password has been successfully reset']);
    }


}
