<?php

namespace App\Http\Controllers;

use App\Universidad;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class HomeController extends Controller
{
    /**
     * Create a new controller instance.
     *
     * @return void
     */
    public function __construct()
    {
        $this->middleware('auth');
    }

    /**
     * Show the application dashboard.
     *
     * @return \Illuminate\Contracts\Support\Renderable
     */
    public function index()
    {
        $idUser = Auth::user()->id;
        $universidad = Universidad::where('idUser', $idUser)->first();
        return view('home', ['universidad' => $universidad]);
    }

    public function logout(Request $request)
    {
        \Auth::logout();
        return redirect('/login');
    }
}
