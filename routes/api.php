<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/

Route::middleware('auth:api')->get('/user', function (Request $request) {
    return $request->user();
});


Route::get('postulados/{id}', 'FavoriteController@postuados');
Route::get('favorites/{id}', 'FavoriteController@show');
Route::post('save/favorite', 'FavoriteController@store');
Route::post('save/ofert', 'OfertsController@store');
Route::post('update/ofert', 'OfertsController@update');
Route::get('oferts', 'OfertsController@index');
Route::get('offer/{id}', 'OfertsController@show');
Route::put('universidad', 'OfertsController@updateUniversidad');
Route::get('universidad-user/{id}', 'OfertsController@getUniversidadIdUser');
Route::get('universidad/{id}', 'OfertsController@getUniversidadId');
Route::post('snies', 'OfertsController@snies');
