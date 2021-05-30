<?php

namespace App\Http\Controllers;

use App\Programa;
use Illuminate\Http\Request;

class ProgramaController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index($id = null)
    {
        // if ($id == null) {
        //     $response = Ofert::orderBy('id', 'desc')->get();
        // } else {
        //     $response = Ofert::where('user_id', $id)->orderBy('id', 'desc')->get();
        // }
        // return response()->json($response, 200);
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
        $data = $request->input('Programas');
        $count = 0;

        foreach ($data as $programa) {
            $newPrograma = new Programa();

            $newPrograma->codigo_ies = $programa['CÓDIGO_INSTITUCIÓN_PADRE'] ?? '';
            $newPrograma->codigo_snies = $programa['CÓDIGO_SNIES_DEL_PROGRAMA'] ?? '';
            $newPrograma->nombre_programa = $programa['NOMBRE_DEL_PROGRAMA'] ?? '';
            $newPrograma->titulo_otorgado = $programa['TITULO_OTORGADO'] ?? '';
            $newPrograma->reconocimiento = $programa['RECONOCIMIENTO_DEL_MINISTERIO'] ?? '';
            $newPrograma->area_conocimiento = $programa['ÁREA_DE_CONOCIMIENTO'] ?? '';
            $newPrograma->nivel_academico = $programa['NIVEL_ACADÉMICO'] ?? '';
            $newPrograma->modalidad = $programa['MODALIDAD'] ?? '';
            $newPrograma->numero_creditos = $programa['NÚMERO_CRÉDITOS'] ?? '';
            $newPrograma->numero_semestres = $programa['NÚMERO_PERIODOS_DE_DURACIÓN'] ?? '';
            $newPrograma->departamento = $programa['DEPARTAMENTO_OFERTA_PROGRAMA'] ?? '';
            $newPrograma->municipio = $programa['MUNICIPIO_OFERTA_PROGRAMA'] ?? '';
            $newPrograma->precio = $programa['COSTO_MATRÍCULA_ESTUD_NUEVOS'] ?? '';

            if ($newPrograma->save()) {
                $count++;
            }
        }
        return response()->json(["count" => $count], 200);
    }

    /**
     * Display the specified resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function show($id)
    {
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function edit()
    {
        //
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request)
    {
    }
    /**
     * 
     */
    public function delete($id)
    {
    }

    /**
     * Remove the specified resource from storage.
     *
     * @return \Illuminate\Http\Response
     */
    public function destroy()
    {
        //
    }
}
