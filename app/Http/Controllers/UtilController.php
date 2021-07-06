<?php

namespace App\Http\Controllers;

use App\Mail\Informacion;
use App\Ofert;
use App\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Mail;

class UtilController extends Controller
{
    /**
     * Enviar un correo con un mensaje establecido.
     */
    public function correo(Request $request)
    {
        $data = $request->all();
        $asunto= "Información " . $data["programa"] . " - " . $data["universidad"];
        Mail::to($data["correo"])->send(new Informacion($data["mensaje"],$asunto));

        return response()->json([], 200);
    }

    /**
     * De acuerdo a 'ids' envia un correo de una oferta a un usuario.
     */
    public function correoPlan(Request $request)
    {
        $data = $request->all();

        $offer = Ofert::where("id", $data["offer_id"])->first();
        $user = User::where("id", $data["user_id"])->first();

        Mail::to($user["email"])->send(new Informacion($offer["nombre_programa"]));
        return response()->json([], 200);
    }
}
