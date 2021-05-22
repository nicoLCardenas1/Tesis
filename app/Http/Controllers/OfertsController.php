<?php

namespace App\Http\Controllers;

use App\Ofert;
use App\Universidad;
use Illuminate\Http\Request;

class OfertsController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        return response()->json(Ofert::orderBy('id', 'desc')->get(), 200);
    }

    /**
     * Show the form for creating a new resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function create()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
        //recibir los valores del front
        $user_id = $request->input('user_id');
        $acreditado = $request->input('acreditado');
        $caracterAcademico = $request->input('caracterAcademico');
        $jornada = $request->input('jornada');
        $metodologia = $request->input('metodologia');
        $nombrePrograma = $request->input('nombrePrograma');
        $numeroSemestres = $request->input('numeroSemestres');
        $sector = $request->input('sector');
        $snies = $request->input('snies');
        $ies = $request->input('ies');
        $nombre_ies = $request->input('nombreIes');
        $ubicacion = $request->input('ubicacion');

        //meterlos en el modelo de laravel
        $ofert = new Ofert();
        $ofert->user_id = $user_id;
        $ofert->codigo_ies = $ies;
        $ofert->codigo_snies = $snies;
        $ofert->nombre_ies = $nombre_ies;
        $ofert->nombre_programa = $nombrePrograma;
        $ofert->sector_academico = $sector;
        $ofert->caracter_academico = $caracterAcademico;
        $ofert->acreditado = $acreditado;
        $ofert->ubicacion = $ubicacion;
        $ofert->jornada = $jornada;
        $ofert->numero_semestres = $numeroSemestres;
        $ofert->metodologia = $metodologia;

        //hacer el guardado
        if ($ofert->save()) {
            $response = [
                'status' => 1,
                'offer' => $ofert,
                'message' => 'Guardado exitoso',
            ];
        } else {
            $response = [
                'status' => 0,
                'ofert' => 0,
                'message' => 'Error de guardado',
            ];
        }

        //devolver la respuesta del proceso al front
        return response()->json($response, 200);
    }

    /**
     * Display the specified resource.
     *
     * @param  \App\Oferts  $oferts
     * @return \Illuminate\Http\Response
     */
    public function show($id)
    {
        $offer = Ofert::find($id);
        return response()->json(Ofert::find($id), 200);
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  \App\Oferts  $oferts
     * @return \Illuminate\Http\Response
     */
    public function edit(Ofert $oferts)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \App\Oferts  $oferts
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request)
    {
        //recibir los valores del front
        $id = $request->input('idoffer');
        $user_id = $request->input('user_id');
        $acreditado = $request->input('acreditado');
        $caracterAcademico = $request->input('caracterAcademico');
        $jornada = $request->input('jornada');
        $metodologia = $request->input('metodologia');
        $nombrePrograma = $request->input('nombrePrograma');
        $numeroSemestres = $request->input('numeroSemestres');
        $sector = $request->input('sector');
        $snies = $request->input('snies');
        $ies = $request->input('ies');
        $nombre_ies = $request->input('nombreIes');
        $ubicacion = $request->input('ubicacion');

        //Buscar la oferta con eloquent
        $ofert = Ofert::find($id);
        $ofert->user_id = $user_id;
        $ofert->codigo_ies = $ies;
        $ofert->codigo_snies = $snies;
        $ofert->nombre_ies = $nombre_ies;
        $ofert->nombre_programa = $nombrePrograma;
        $ofert->sector_academico = $sector;
        $ofert->caracter_academico = $caracterAcademico;
        $ofert->acreditado = $acreditado;
        $ofert->ubicacion = $ubicacion;
        $ofert->jornada = $jornada;
        $ofert->numero_semestres = $numeroSemestres;
        $ofert->metodologia = $metodologia;

        //hacer el guardado
        if ($ofert->update()) {
            $response = [
                'status' => 1,
                'offer' => $ofert,
                'message' => 'Actualización exitosa',
            ];
        } else {
            $response = [
                'status' => 0,
                'ofert' => 0,
                'message' => 'Error de guardado',
            ];
        }

        //devolver la respuesta del proceso al front
        return response()->json($response, 200);
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\Oferts  $oferts
     * @return \Illuminate\Http\Response
     */
    public function destroy(Ofert $oferts)
    {
        //
    }


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
