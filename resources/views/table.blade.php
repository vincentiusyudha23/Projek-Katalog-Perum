<table>
    <thead>
    <tr>
        <th>No.</th>
        <th>Nama Perumahan</th>
        <th>Desa</th>
        <th>Kecamatan</th>
        <th>Nama Pengembang</th>
        <th>Luas Lahan Perumahan</th>
        <th>Jumlah Rumah</th>
        <th>Luas PSU</th>
        <th>Rincian PSU</th>
        <th>TPU</th>
        <th>Tahun Berdiri</th>
    </tr>
    </thead>
    <tbody>
        @php
        $no=1;
        @endphp
    @foreach($data as $item =>$value)
        <tr>
            <td>{{ $no++ }}</td>
            <td>{{ $value['nama'] }}</td>
            <td>{{ $value['kelurahan'] }}</td>
            <td>{{ $value['kecamatan'] }}</td>
            <td>{{ $value['nama_pengembang'] }}</td>
            <td>{{ $value['luas_lahan_perumahan'] }}</td>
            <td>{{ $value['jumlah_rumah'] }}</td>
            <td>{{ $value['luas_PSU'] }}</td>
            <td>{{ strip_tags($value['rincian_psu'])}}</td>
            <td>{{ $value['tpu'] }}</td>
            <td>{{ $value['tahun_berdiri'] }}</td>
        </tr>
    @endforeach
    </tbody>
</table>