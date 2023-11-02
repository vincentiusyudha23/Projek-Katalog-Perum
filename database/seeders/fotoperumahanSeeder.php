<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;

class fotoperumahanSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        DB::table('foto_perumahans')->insert([
            'id_perumahan'=>1,
            'url_foto'=>'https://picsum.photos/seed/img1/1920/1080',
            'created_at'=>date('Y-m-d H-i-s'),
            'updated_at'=>date('Y-m-d H-i-s')
        ]);
        DB::table('foto_perumahans')->insert([
            'id_perumahan'=>1,
            'url_foto'=>'https://picsum.photos/seed/img2/1920/1080',
            'created_at'=>date('Y-m-d H-i-s'),
            'updated_at'=>date('Y-m-d H-i-s')
        ]);
        DB::table('foto_perumahans')->insert([
            'id_perumahan'=>1,
            'url_foto'=>'https://picsum.photos/seed/img3/1920/1080',
            'created_at'=>date('Y-m-d H-i-s'),
            'updated_at'=>date('Y-m-d H-i-s')
        ]);
        DB::table('foto_perumahans')->insert([
            'id_perumahan'=>2,
            'url_foto'=>'https://picsum.photos/seed/img3/1920/1080',
            'created_at'=>date('Y-m-d H-i-s'),
            'updated_at'=>date('Y-m-d H-i-s')
        ]);
    }
}
