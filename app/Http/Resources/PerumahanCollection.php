<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\ResourceCollection;

class PerumahanCollection extends ResourceCollection
{
    /**
     * Transform the resource collection into an array.
     *
     * @return array<int|string, mixed>
     */
    public function toArray(Request $request): array
    {
        return [
            'data'=>$this->collection->map(function ($perumahan){
                return [
                    'kelurahan'=>$perumahan->kelurahan,
                    'kecamatan'=>$perumahan->kecamatan,
                    'nama'=>$perumahan->nama,
                    'tahun_berdiri'=>$perumahan->tahun_berdiri,
                    'highlightPhoto'=>$perumahan->highlightPhoto
                ];
            }),
        ];
    }
}
