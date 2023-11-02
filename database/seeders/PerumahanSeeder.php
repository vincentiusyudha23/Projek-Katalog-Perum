<?php

namespace Database\Seeders;

use App\Models\perumahan;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;

class PerumahanSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        perumahan::factory(5)->create();
        // DB::table('perumahans')->insert([
        //     'nama'=>'Kampung Cendikia 5',
        //     'kelurahan'=>'bagelan',
        //     'kecamatan'=>'gedong tataan',
        //     'nama_pengembang'=>'PT. Sebathin Cendikia Karya',
        //     'luas_lahan_perumahan'=>'4075',
        //     'jumlah_rumah'=>'32',
        //     'luas_PSU'=>'1222.5',
        //     'tpu'=>' ',
        //     'tahun_berdiri'=>'2017',
        //     'rincian_psu'=>'',
        //     'highlightPhoto'=>'https://picsum.photos/seed/img1/1920/1080',
        //     'created_at'=>date('Y-m-d H-i-s'),
        //     'updated_at'=>date('Y-m-d H-i-s')
        // ]);

        
    }
}
