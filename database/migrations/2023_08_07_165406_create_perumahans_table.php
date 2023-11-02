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
        Schema::create('perumahans', function (Blueprint $table) {
            $table->id('id_perumahan');
            $table->string('nama');
            $table->string('kelurahan');
            $table->string('kecamatan');
            $table->string('nama_pengembang');
            $table->integer('luas_lahan_perumahan');
            $table->integer('jumlah_rumah');
            $table->decimal('luas_PSU',8,2);
            $table->string('tpu')->nullable();
            $table->string('tahun_berdiri')->nullable();
            $table->text('rincian_psu')->nullable();
            $table->string('highlightPhoto')->nullable();
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('perumahans');
    }
};
