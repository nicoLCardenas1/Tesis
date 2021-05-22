<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class Universidad extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('universidad', function (Blueprint $table) {
            $table->id();
            $table->string('urlFoto');
            $table->string('nombreIes');
            $table->string('descripcion');
            $table->string('ubicacion');
            $table->string('urlPagina');
            $table->string('idUser');
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
