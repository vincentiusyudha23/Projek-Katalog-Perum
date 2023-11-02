<?php

namespace App\Models;

use App\Models\perumahan;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory;

class FotoSiteplan extends Model
{
    use HasFactory;
    protected $table = "foto_siteplans";
    protected $fillable = ['id_perumahan','url_foto'];
    protected $primaryKey = 'id_foto';

     public function perumahan()
    {
        return $this->belongsTo(perumahan::class,'id_perumahan','id_perumahan');
    }
}
