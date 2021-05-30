<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class Programas extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('programas', function (Blueprint $table) {
            $table->id();
            $table->string('codigo_ies');
            $table->string('codigo_snies');
            $table->string('nombre_programa', 255);
            $table->string('titulo_otorgado', 255);
            $table->string('reconocimiento');
            $table->string('area_conocimiento');
            $table->string('nivel_academico');
            $table->string('modalidad');
            $table->string('numero_creditos');
            $table->string('numero_semestres');
            $table->string('departamento');
            $table->string('municipio');
            $table->string('precio');
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        //
    }
}
