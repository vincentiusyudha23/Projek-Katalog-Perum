<?php

namespace App\Imports;

use App\Models\perumahan;
use Maatwebsite\Excel\Concerns\ToModel;

class DataPerumahanImport implements ToModel
{
    /**
    * @param array $row
    *
    * @return \Illuminate\Database\Eloquent\Model|null
    */
    public function model(array $row)
    {
        // dd($row);
        return new perumahan([
            'nama'=>$row[0],
            'kelurahan'=>$row[1],
            'kecamatan'=>$row[2],
            'nama_pengembang'=>$row[3],
            'luas_lahan_perumahan'=>$row[4],
            'jumlah_rumah'=>$row[5],
            'luas_PSU'=>$row[6],
            'tahun_berdiri'=>$row[7],
            'tpu'=>$row[8],
        ]);
    }
}
