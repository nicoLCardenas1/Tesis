<?php

namespace App\Http\Controllers;

use App\Universidad;
use Illuminate\Http\Request;

class UniversidadController extends Controller
{

    /**
     * 
     */
    public function updateUniversidad(Request $request)
    {
        $universidad = $find = Universidad::where('idUser', '=', $request->input('idUser'))->first();
        if (!isset($find)) {
            $universidad = new Universidad();
        }
        $universidad->urlFoto = $request->input('urlFoto');
        $universidad->nombreIes = $request->input('nombreIes');
        $universidad->descripcion = $request->input('descripcion');
        $universidad->ubicacion = $request->input('ubicacion');
        $universidad->urlPagina = $request->input('urlPagina');
        $universidad->idUser = $request->input('idUser');
        $universidad->sector = $request->input('sector');
        $universidad->caracterAcademico = $request->input('caracterAcademico');

        //hacer el guardado
        if (!isset($find) ? $universidad->save() : $universidad->update()) {
            $response = [
                'status' => 1,
                'universidad' => $universidad,
                'message' => 'Guardado exitoso',
            ];
        } else {
            $response = [
                'status' => 0,
                'universidad' => 0,
                'message' => 'Error de guardado',
            ];
        }

        //devolver la respuesta del proceso al front
        return response()->json($response, 200);
    }

    /**
     * 
     */
    public function getUniversidadIdUser($idUser)
    {
        return response()->json(Universidad::where("idUser", $idUser)->first(), 200);
    }

    /**
     * 
     */
    public function getUniversidadId($id)
    {
        return response()->json(Universidad::where("nombreIes", $id)->first(), 200);
    }
}
