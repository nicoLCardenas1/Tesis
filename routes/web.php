<?php

use Illuminate\Support\Facades\Route;
use Illuminate\Support\Facades\Auth;

use App\Mail\Informacion;
use Illuminate\Support\Facades\Mail;

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| contains the "web" middleware group. Now create something great!
|
*/

Route::get('/', function () {
    return view('auth/login');
});

Auth::routes();
Route::get('/register', 'Auth\RegisterController@showTemplate')->name('register');

Route::get('/home/{route1?}/{route2?}', 'HomeController@index')->name('home');
Route::get('/logout', 'HomeController@logout');

Route::get('Informacion1', function(){
$correo = new Informacion;

Mail::to('nicolcchacon@gmail.com')->send($correo);

return "Mensaje Enviado";
});


// Route::group(['prefix' => 'admin'], function () {
//     Voyager::routes();
// });
