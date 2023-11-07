<?php

namespace App\Http\Controllers;

use Inertia\Inertia;
use App\Models\perumahan;
use App\Models\FotoSiteplan;
use Illuminate\Http\Request;
use App\Models\FotoPerumahan;
use App\Exports\ExportDataPerumahan;
use Illuminate\Support\Facades\File;
use Maatwebsite\Excel\Facades\Excel;
use Illuminate\Support\Facades\Cache;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Facades\Redirect;
use Illuminate\Support\Facades\Response;
use App\Http\Resources\PerumahanCollection;

class AdminController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(Request $request)
    {
        
        $perumahan = new PerumahanCollection(perumahan::orderBy('updated_at','desc')->get());
        $perumahanresult = new PerumahanCollection(perumahan::all());
        $fetchSearch = $request->input('fetchSearch');
        

        if(!empty($fetchSearch)){
            $perumahan = new PerumahanCollection(perumahan::where('nama','like','%'.$fetchSearch.'%')->paginate());
        }

        return Inertia::render('Dashboard',[
            'perumahan'=>$perumahan,
            'perumahanresult'=>$perumahanresult,
        ]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        return Inertia::render('Profile/CreateData',[
            'status' => session('status')
        ]);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {   
        $perumahan = new perumahan();
        $perumahan->nama = $request->nama;
        $perumahan->kelurahan =$request->kelurahan;
        $perumahan->kecamatan =$request->kecamatan;
        $perumahan->nama_pengembang =$request->nama_pengembang;
        $perumahan->luas_lahan_perumahan =$request->luas_lahan_perumahan;
        $perumahan->jumlah_rumah =$request->jumlah_rumah;
        $perumahan->luas_PSU =$request->luas_psu;
        $perumahan->tahun_berdiri =$request->tahun_berdiri;
        $perumahan->tpu =$request->tpu;
        $perumahan->rincian_psu =$request->rincian_psu;
        $perumahan->url_maps = $request->url_maps;

        if($request->hasFile('highlightPhoto')){
            $request->validate([
                'highlightPhoto'=>'required|file|image|mimes:jpeg,jpg,png'
            ]);
            $file = $request->file('highlightPhoto');
            $fileName = date('ymdhis').'.'.$file->getClientOriginalExtension();
            $file->storeAs('public/fotoUtama',$fileName);
            $perumahan->highlightPhoto = $fileName;
        }

        if($request->hasFile('videoperumahan')){
            $request->validate([
                'videoperumahan'=>'required|file|mimes:mp4,mkv,3gp,mov'
            ]);
            $file = $request->file('videoperumahan');
            $fileName = date('ymdhis').'.'.$file->getClientOriginalExtension();
            $file->storeAs('public/videoperumahan',$fileName);
            $perumahan->videoperumahan = $fileName;
        } 
        $perumahan->save();
        return Redirect::route('createdata')->with('message','Berhasil Membuat Data Baru');
    }

    /**
     * Display the specified resource.
     */
    public function show(Request $request)
    {   
        $perumahan = perumahan::orderBy('updated_at','desc')
        ->with('foto_perumahan')
        ->with('foto_siteplan')->get();
        $perumahanresult = new PerumahanCollection(perumahan::all());
        $fetchSearch = $request->input('fetchSearch');

        if(!empty($fetchSearch)){
            $perumahan = perumahan::where('nama','like','%'.$fetchSearch.'%')
            ->with('foto_perumahan')
            ->with('foto_siteplan')->get();
        }

        return Inertia::render('Profile/EditData',[
            'perumahan'=>$perumahan,
            'perumahanresult'=>$perumahanresult,
        ]);
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit($nama)
    {
        $perumahan = perumahan::where('nama',$nama)
            ->with('foto_perumahan')
            ->with('foto_siteplan')
            ->first();
        $videoUrl = Storage::url('videoperumahan/'.$perumahan->videoperumahan);

        return Inertia::render('Profile/FormEditData',[
            'perumahan'=> $perumahan,
            'videoUrl'=>$videoUrl
        ]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, string $id_perumahan)
    {   
        $data = perumahan::where('id_perumahan',$id_perumahan)->first();
        if($request->hasFile('highlightPhoto')){
            Storage::delete('public/fotoUtama/'.$data->highlightPhoto);
            $request->validate([
                'highlightPhoto'=>'required|file|image|mimes:jpeg,jpg,png'
            ]);
            $file = $request->file('highlightPhoto');
            $fileName = date('ymdhis').'.'.$file->getClientOriginalExtension();
            $file->storeAs('public/fotoUtama',$fileName);
            perumahan::where('id_perumahan',$id_perumahan)->update([
                'highlightPhoto'=>$fileName
            ]);
        }
        if($request->hasFile('videoperumahan')){
            Storage::delete('public/videoperumahan/'.$data->videoperumahan);
            $request->validate([
                'videoperumahan'=>'required|file|mimes:mp4,mkv,3gp,mov'
            ]);
            $file = $request->file('videoperumahan');
            $fileName = date('ymdhis').'.'.$file->getClientOriginalExtension();
            $file->storeAs('public/videoperumahan',$fileName);
            perumahan::where('id_perumahan',$id_perumahan)->update([
                'videoperumahan'=>$fileName
            ]);
        } 
        perumahan::where('id_perumahan',$id_perumahan)->update([
            'nama'=>$request->nama,
            'kelurahan'=>$request->kelurahan,
            'kecamatan'=>$request->kecamatan,
            'nama_pengembang'=>$request->nama_pengembang,
            'luas_lahan_perumahan'=>$request->luas_lahan_perumahan,
            'jumlah_rumah'=>$request->jumlah_rumah,
            'luas_PSU'=>$request->luas_PSU,
            'tpu'=>$request->tpu,
            'tahun_berdiri'=>$request->tahun_berdiri,
            'rincian_psu'=>$request->rincian_psu,
            'url_maps'=>$request->url_maps,
            'easting'=>$request->easting,
            'northing'=>$request->northing
        ]);
        return Redirect::route('editdata')->with('message','Berhasil Memperbarui '.$data->nama);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        $perumahan = perumahan::where('id_perumahan',$id)
        ->with('foto_perumahan')
        ->with('foto_siteplan')
        ->first();
        Storage::delete('public/fotoUtama/'.$perumahan->highlightPhoto);
        Storage::delete('public/videoperumahan/'.$perumahan->videoperumahan);

        if(!empty($perumahan->foto_perumahan)&&!empty($perumahan->foto_siteplan)){
            foreach ($perumahan->foto_perumahan as $foto){
                Storage::delete('public/fotoperumahan/'.$foto->url_foto);
            }
            foreach ($perumahan->foto_siteplan as $foto){
                Storage::delete('public/fotositeplan/'.$foto->url_foto);
            }
            $perumahan->delete();
        } elseif(!empty($perumahan->foto_perumahan)){
            foreach ($perumahan->foto_perumahan as $foto){
                Storage::delete('public/fotoperumahan/'.$foto->url_foto);
            }
            $perumahan->delete();
        } elseif (!empty($perumahan->foto_siteplan)){
            foreach ($perumahan->foto_siteplan as $foto){
                Storage::delete('public/fotositeplan/'.$foto->url_foto);
            }
            $perumahan->delete();
        } else {
            $perumahan->delete();
        }
            
        // $perumahan->delete();
        return Redirect::route('editdata')->with('message','Berhasil Menghapus'.' '.$perumahan->nama);
    }

    public function deleteimageperumahan(string $id){
        $foto = FotoPerumahan::where('id_foto',$id)->first();
        Storage::delete('public/fotoperumahan/'.$foto->url_foto);
        $foto->delete();
    }
    public function deleteimagesiteplan(string $id){
        $foto = FotoSiteplan::where('id_foto',$id)->first();
        Storage::delete('public/fotositeplan/'.$foto->url_foto);
        $foto->delete();
    }
    public function AddImagePerumahan(Request $request){
        $files = $request->file('addimage');
        foreach ($files as $file) {
            $fileName = uniqid().'.'.$file->getClientOriginalExtension();
            $file->storeAs('public/fotoperumahan',$fileName);
            $saveFile = new FotoPerumahan();
            $saveFile->url_foto = $fileName;
            $saveFile->id_perumahan = $request->id_perumahan;
            $saveFile->save();
        }

        return redirect()->back()->with('message','Berhasil Menambahkan Foto');
    }
    public function AddImageSiteplan(Request $request){
        $files = $request->file('addimage');
        foreach ($files as $file) {
            $fileName = uniqid().'.'.$file->getClientOriginalExtension();
            $file->storeAs('public/fotositeplan',$fileName);
            $saveFile = new FotoSiteplan();
            $saveFile->url_foto = $fileName;
            $saveFile->id_perumahan = $request->id_perumahan;
            $saveFile->save();
        }

        return redirect()->back()->with('message','Berhasil Menambahkan Siteplan');
    }

    public function PreviewData($nama){
        $perumahan = perumahan::where('nama',$nama)
                            ->with('foto_perumahan')
                            ->with('foto_siteplan')
                            ->first();
        $videoURL = Storage::url('videoperumahan'.'/'.$perumahan->videoperumahan);
        
        return Inertia::render('Profile/ShowData',[
            'perumahan'=>$perumahan,
            'videoUrl'=>$videoURL
        ]);
    }

    public function ExportData(){
        return Excel::download(new ExportDataPerumahan, 'Data Perumahan.xlsx');
    }


}
