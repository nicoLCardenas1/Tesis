<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateOfertsTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('oferts', function (Blueprint $table) {
            $table->id();
            $table->integer('user_id');
            $table->string('codigo_ies');
            $table->string('codigo_snies');
            $table->string('nombre_ies');
            $table->string('nombre_programa');
            $table->string('sector_academico');
            $table->string('caracter_academico');
            $table->string('acreditado');
            $table->string('ubicacion');
            $table->string('jornada');
            $table->string('numero_semestres');
            $table->string('metodologia');
            $table->string('titulo_otorgado');
            $table->string('nivel_academico');
            $table->string('precio');
            $table->string('descripcion');
            $table->string('pagina_admision');
            $table->string('pagina_plan');
            $table->string('url_programa');
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
        Schema::dropIfExists('oferts');
    }
}
