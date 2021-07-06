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
Route::delete('favorite/{user}/{id}', 'FavoriteController@destroy');

Route::post('save/ofert', 'OfertsController@store');
Route::post('update/ofert', 'OfertsController@update');
Route::get('oferts/{id?}', 'OfertsController@index');
Route::get('offer/{id}', 'OfertsController@show');
Route::get('offer/name/{name}', 'OfertsController@relative');
Route::delete('offer/{id}', 'OfertsController@delete');

Route::put('universidad', 'UniversidadController@updateUniversidad');
Route::get('universidad-user/{id}', 'UniversidadController@getUniversidadIdUser');
Route::get('universidad/{id}', 'UniversidadController@getUniversidadId');

Route::post('snies', 'OfertsController@snies');

Route::post('programas', 'ProgramaController@store');
Route::get('programa/{snies}', 'ProgramaController@index');

Route::post('enviarCorreo', 'UtilController@correo');
Route::post('enviarCorreoPlan', 'UtilController@correoPlan');

/**
 * GET: /api/public/snies/{id} 'Busca un snies de acuerdo al id'
 * GET: /api/public/snies-search?nombre="" 'Busca un snies de acuerdo al nombre'
 * 
 * GET: /api/public/ies/{id} 'Busca un ies de acuerdo al id'
 * GET: /api/public/ies-search?nombre="" 'Busca un ies de acuerdo al nombre'
 * 
 */
Route::get('public/snies/{id}', 'ApiController@sniesByID');
Route::get('public/snies-search', 'ApiController@sniesSearch');

Route::get('public/ies/{id}', 'ApiController@iesByID');
Route::get('public/ies-search', 'ApiController@iesSearch');
