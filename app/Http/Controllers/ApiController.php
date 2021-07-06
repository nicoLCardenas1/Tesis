<?php

namespace App\Http\Controllers;

use App\Mail\Informacion;
use App\Ofert;
use App\Programa;
use App\Snies;
use App\Universidad;
use App\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Mail;

class ApiController extends Controller
{
    public function sniesByID(Request $request, $id = null)
    {
        if (!isset($id)) {
            return response()->json([], 401);
        }
        $programa = Programa::where("codigo_snies", $id)->first();
        return response()->json($programa, 200);
    }

    public function sniesSearch(Request $request)
    {
        $nombre = $request->input('nombre');
    }

    public function iesByID(Request $request, $id = null)
    {
        if (!isset($id)) {
            return response()->json([], 401);
        }
        $snies = Snies::where("id_snies", $id)->first();

        if (!isset($snies)) {
            return response()->json([], 200);
        }

        $universidad = Universidad::where('nombreIes', 'LIKE', "%$snies->name%")->first();


        return response()->json($universidad, 200);
    }

    public function iesSearch(Request $request)
    {
        $nombre = $request->input('nombre');
    }
}
