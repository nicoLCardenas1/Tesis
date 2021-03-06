<?php

namespace App\Http\Controllers;

use App\Ofert;
use App\Universidad;
use Illuminate\Http\Request;
use App\Snies;

class OfertsController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index($id = null)
    {
        if ($id == null) {
            $response = Ofert::orderBy('id', 'desc')->get();
        } else {
            $response = Ofert::where('user_id', $id)->orderBy('id', 'desc')->get();
        }
        return response()->json($response, 200);
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

        $universidad = Universidad::where('nombreIes', $nombre_ies)->get();
        if (count($universidad) <= 0) {
            return [
                'status' => 0,
                'ofert' => 0,
                'message' => 'Para guardar una oferta, primero debe ingresar el perfil de la universidad.',
            ];
        }

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
        $ofert->titulo_otorgado = $request->input('titulo');
        $ofert->nivel_academico = $request->input('nivelAcademico');
        $ofert->precio = $request->input('precio');
        $ofert->descripcion = $request->input('descripcion') ?? '';
        $ofert->pagina_admision = $request->input('paginaAdmision') ?? '';
        $ofert->pagina_plan = $request->input('paginaPlan') ?? '';
        $ofert->url_programa = $request->input('urlPrograma') ?? '';


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
        return response()->json($offer, 200);
    }

    public function relative($name)
    {
        $offers = Ofert::where("nombre_programa", "LIKE", "%$name%")->offset(0)->limit(10)->get();
        return response()->json($offers, 200);
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
        $ofert->titulo_otorgado = $request->input('titulo');
        $ofert->nivel_academico = $request->input('nivelAcademico');
        $ofert->precio = $request->input('precio');
        $ofert->descripcion = $request->input('descripcion') ?? '';
        $ofert->pagina_admision = $request->input('paginaAdmision') ?? '';
        $ofert->pagina_plan = $request->input('paginaPlan') ?? '';
        $ofert->url_programa = $request->input('urlPrograma') ?? '';


        //hacer el guardado
        if ($ofert->update()) {
            $response = [
                'status' => 1,
                'offer' => $ofert,
                'message' => 'Actualizaci??n exitosa',
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
     * 
     */
    public function snies(Request $request)
    {
        $data = $request->input('data');
        $count = 0;

        foreach ($data as $snies) {
            $newSnies = new Snies();
            $newSnies->id_snies = $snies["idSnies"];
            $newSnies->name = $snies["name"];
            if ($newSnies->save()) {
                $count++;
            }
        }
        return response()->json(["count" => $count], 200);
    }

    /**
     * 
     */
    public function delete($id)
    {
        $status = false;
        if (Ofert::where('id', $id)->delete()) {
            $status = true;
        }

        return response()->json($status, 200);
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
}
