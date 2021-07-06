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
        $asunto = "Información " . $data["programa"] . " - " . $data["universidad"];
        Mail::to($data["correo"])->send(new Informacion($data["mensaje"], $asunto, "Información de programa"));

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
        $mensaje = "Hola $user->name<br>Este es el plan de estudio para el programa $offer->nombre_programa en $offer->nombre_ies<br> <a href='$offer->pagina_url'>Plan de estudio</a>";

        Mail::to($user["email"])->send(new Informacion($mensaje, "Plan de estudio '$offer->nombre_programa' en  $offer->nombre_ies", "Información plan de estudio"));
        return response()->json([], 200);
    }
}
