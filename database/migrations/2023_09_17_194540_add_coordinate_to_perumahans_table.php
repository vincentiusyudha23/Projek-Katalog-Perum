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
        Schema::table('perumahans', function (Blueprint $table) {
            $table->integer('easting')->nullable();
            $table->integer('northing')->nullable();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('perumahans', function (Blueprint $table) {
            $table->dropColumn('easting');
            $table->dropColumn('northing');
        });
    }
};
