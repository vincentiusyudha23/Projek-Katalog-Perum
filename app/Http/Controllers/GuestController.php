<?php

namespace App\Http\Controllers;

use Inertia\Inertia;
use App\Models\perumahan;
use Illuminate\Http\Request;
use App\Models\FotoPerumahan;
use Illuminate\Support\Facades\DB;
use App\Imports\DataPerumahanImport;
use Maatwebsite\Excel\Facades\Excel;
use Illuminate\Support\Facades\Storage;
use App\Http\Resources\PerumahanCollection;

class GuestController extends Controller
{
    public function home(){
        $perumahan = perumahan::with('foto_siteplan')->get();
        $dataPerumahan = new PerumahanCollection(perumahan::orderBy('updated_at','desc')->take(20)->get());
        $videopesawaran =  Storage::url('VideoPesawaran1.mp4');
        return Inertia::render('HomePage',[
            'perumahan'=>$perumahan,
            'dataperumahan'=>$dataPerumahan,
            'videopesawaran'=>$videopesawaran,
        ]);
    }
    public function livepresent(){
        $perumahan = perumahan::orderBy('updated_at','desc')->with('foto_siteplan')->with('foto_perumahan')->get();
        return Inertia::render('LivePresent',[
            'perumahan'=>$perumahan,
        ]);
    }
    public function katalogpage(Request $request){
        $kelurahan = $request->input('kelurahan');
        $kecamatan = $request->input('kecamatan');
        $fetchSearch = $request->input('fetchSearch');
        $years = $request->input('years');

        $perumahanQuery = perumahan::orderBy('updated_at','desc');
        if(!empty($kelurahan) && !empty($kecamatan) && !empty($years)){
            $perumahanQuery->where('kelurahan', $kelurahan)
                            ->where('kecamatan', $kecamatan)
                            ->where('tahun_berdiri',$years);
        } elseif (!empty($kelurahan) && !empty($kecamatan)) {
            $perumahanQuery->where('kelurahan', $kelurahan)
                            ->where('kecamatan', $kecamatan);
        } elseif (!empty($kelurahan) && !empty($years)) {
            $perumahanQuery->where('kelurahan', $kelurahan)
                            ->where('tahun_berdiri', $years);
        } elseif (!empty($years) && !empty($kecamatan)) {
            $perumahanQuery->where('tahun_berdiri', $years)
                            ->where('kecamatan', $kecamatan);
        } elseif (!empty($kelurahan)) {
            $perumahanQuery->where('kelurahan', $kelurahan);
        } elseif (!empty($kecamatan)) {
            $perumahanQuery->where('kecamatan', $kecamatan);
        } elseif (!empty($years)) {
            $perumahanQuery->where('tahun_berdiri', $years);
        } elseif (!empty($fetchSearch)){
            $perumahanQuery->where('nama','like','%'.$fetchSearch.'%');
        }

        $perumahan = $perumahanQuery->get();

        $perumahanresult = new PerumahanCollection(perumahan::all());
        $filterPerumahanAZ = perumahan::orderBy('nama','asc')->get();
        $filterPerumahanZA = perumahan::orderBy('nama','desc')->get();
        return Inertia::render('KatalogPage',[
            'perumahan'=>$perumahan,
            'perumahanresult'=>$perumahanresult,
            'kelurahan'=>$kelurahan,
            'kecamatan'=>$kecamatan,
            'years'=>$years,
            'filterAZ'=>$filterPerumahanAZ,
            'filterZA'=>$filterPerumahanZA,
        ]);
    }
    

    public function show(Perumahan $perumahan, Request $request, $nama){

        $perumahan = perumahan::where('nama',$nama)
                    ->with('foto_perumahan')
                    ->with('foto_siteplan')
                    ->first();
        $videoUrl = Storage::url('videoperumahan/'.$perumahan->videoperumahan);

        return Inertia::render('PerumahanPage',[
            'perumahan'=>$perumahan,
            'videoUrl'=>$videoUrl
        ]);
    }
}
