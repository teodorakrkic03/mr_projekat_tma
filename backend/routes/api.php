<?php

use App\Http\Controllers\API\AuthController;
use App\Http\Controllers\CategoryController;
use App\Http\Controllers\ListOrderController;
use App\Http\Controllers\PasswordController;
use App\Http\Controllers\TaskController;
use App\Http\Controllers\TaskListController;
use App\Http\Controllers\UserController;
use App\Models\Priority;
use App\Models\Status;
use Illuminate\Support\Facades\Route;

//prikaz dostupnih statusa
Route::get('statuses', function(){
    $statuses = Status::all();
    return response()->json($statuses);
});

//prikaz dostupnih prioriteta
Route::get('priorities', function(){
    $priorities = Priority::all();
    return response()->json($priorities);
});

Route::post('register',[AuthController::class,'register']);
Route::post('login',[AuthController::class,'login']);

Route::group(['middleware'=> ['auth:sanctum']], function(){
    //rute za prikaz, azuriranje i brisanje korisnika
    Route::get('user', [UserController::class,'show']);
    Route::put('user',[UserController::class,'update']);
    Route::delete('user',[UserController::class,'destroy']);

    //ruta za filtriranje zadataka
    Route::post('tasks/filter',[TaskController::class,'filter']);
    //rute za rad za zadacima
    Route::resource('tasks',TaskController::class)->only(['index','show','store','update','destroy']);

    //rute za prikazivanje listi, dodavanje i brisanje zadatka iz liste
    Route::get('lists',[ListOrderController::class,'index']);
    Route::get('lists/{id}',[ListOrderController::class,'show']);
    Route::post('lists',[ListOrderController::class,'addTask']);
    Route::delete('lists/{task_list_id}/{task_id}',[ListOrderController::class,'removeTask']);

    //rute za rad sa listama zadataka
    Route::get('task_lists',[TaskListController::class,'index']);
    Route::get('task_lists/{id}',[TaskListController::class,'show']);
    Route::post('task_lists',[TaskListController::class,'store']);
    Route::put('task_lists/{id}',[TaskListController::class,'update']);
    Route::delete('task_lists/{id}',[TaskListController::class,'destroy']);

    //rute za kategorije
    Route::get('categories', [CategoryController::class, 'index']);
    Route::post('categories', [CategoryController::class, 'store']);
    Route::delete('categories/{id}',[CategoryController::class, 'destroy']);

    //logout
    Route::post('logout', [AuthController::class,'logout']);
});