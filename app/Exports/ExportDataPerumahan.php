<?php

namespace App\Exports;

use App\Models\perumahan;
use Illuminate\Contracts\View\View;
use Maatwebsite\Excel\Concerns\FromView;

class ExportDataPerumahan implements FromView
{
    /**
    * @return \Illuminate\Support\Collection
    */
    public function view():View
    {
        $data = perumahan::orderBy('nama','asc')->get();
        return view('table',['data'=>$data]);
    }
}
