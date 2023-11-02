<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('foto_perumahans', function (Blueprint $table) {
            $table->id('id_foto');
            $table->string('url_foto')->nullable();
            $table->timestamps();
            $table->foreignId('id_perumahan')->references('id_perumahan')->on('perumahans')->cascadeOnDelete();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('foto_perumahans');
    }
};
