<?php

namespace App\Models;

use App\Models\FotoSiteplan;
use App\Models\FotoPerumahan;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory;

class perumahan extends Model
{
    use HasFactory;
    protected $table = "perumahans";
    protected $fillable = ['nama','kelurahan','kecamatan','nama_pengembang','luas_lahan_perumahan','jumlah_rumah','luas_PSU','tpu','tahun_berdiri','rincian_psu','highlightPhoto'];
    protected $primaryKey = 'id_perumahan';

    public function foto_perumahan(){
        return $this->hasMany(FotoPerumahan::class,'id_perumahan','id_perumahan');
    }
    public function foto_siteplan(){
        return $this->hasMany(FotoSiteplan::class,'id_perumahan','id_perumahan');
    }

}
