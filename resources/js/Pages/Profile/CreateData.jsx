import React, { useState } from 'react'
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, router, useForm } from '@inertiajs/react';
import TextInput from '@/Components/TextInput';
import InputLabel from '@/Components/InputLabel';
import DropDragFile from '@/Components/DropDragFile';
import DropDragOneFile from '@/Components/DropDragOneFile';
import AlertComp from '@/Components/AlertComp';
import ReactQuill from 'react-quill';

const CreateData = (props) => {
    const [getnamaperumahan, setNamaPerumahan] = useState('');
    const [getkelurahan, setKelurahan] = useState('');
    const [getkecamatan, setKecamatan] = useState('');
    const [getnamapengembang, setNamaPengembang] = useState('');
    const [getluaslahanperumahan, setLuasLahanPerumahan] = useState('');
    const [getjumlahrumah, setJumlahRumah] = useState('');
    const [getluaspsu, setLuasPSU] = useState('');
    const [gettpu, setTPU] = useState('');
    const [gettahunberdiri, setTahunBerdiri] = useState('');
    const [getrincianpsu, setRincianPSU] = useState('');
    const [gethighlightphoto, setHighLightPhoto] = useState(null);
    const [getvideoperumahan, setVideoPerumahan] = useState(null);
    const [isNotif, setNotif] = useState(false);
    const [geturlmaps, setUrlMaps] = useState('');
    var toolbarOptions = [
        ['bold', 'italic', 'underline', 'strike'],
        [{ 'list': 'ordered' }, { 'list': 'bullet' }],
        [{ 'script': 'sub' }, { 'script': 'super' }],      // superscript/subscript
        [{ 'indent': '-1' }, { 'indent': '+1' }],
        [{ 'size': ['small', false, 'large', 'huge'] }],
        [{ 'align': [] }],
        ['clean']
    ]

    const module = {
        toolbar: toolbarOptions
    }

    const handleSaveData = async (e) => {
        e.preventDefault()
        const formData = new FormData();
        formData.append('highlightPhoto', gethighlightphoto);
        formData.append('nama', getnamaperumahan);
        formData.append('kelurahan', getkelurahan);
        formData.append('kecamatan', getkecamatan);
        formData.append('nama_pengembang', getnamapengembang);
        formData.append('luas_lahan_perumahan', getluaslahanperumahan);
        formData.append('jumlah_rumah', getjumlahrumah);
        formData.append('luas_psu', getluaspsu);
        formData.append('tpu', gettpu);
        formData.append('tahun_berdiri', gettahunberdiri);
        formData.append('rincian_psu', getrincianpsu);
        formData.append('url_maps', geturlmaps);
        formData.append('videoperumahan', getvideoperumahan)


        router.post('/admin/createdata', formData);
        setNamaPerumahan('');
        setKelurahan('');
        setKecamatan('');
        setNamaPengembang('');
        setLuasLahanPerumahan('');
        setLuasPSU('');
        setJumlahRumah('');
        setTPU('');
        setTahunBerdiri('');
        setUrlMaps('');
        setRincianPSU('');
        setHighLightPhoto(null);
        setNotif(true);
        if (props.flash.message !== null) {
            setTimeout(() => {
                setNotif(false);
            }, 3000)
        }
    }


    return (
        <AuthenticatedLayout
            user={props.auth.user}
            title="Create New Data"
        >
            <Head title="Create Data" />
            <div className='py-5 px-1 overflow-scroll overflow-x-hidden max-h-[90vh] bg-base-200'>
                {props.flash.message !== null && isNotif === true ? (
                    <AlertComp>
                        <span>
                            {props.flash.message}
                        </span>
                    </AlertComp>
                ) : (null)}
                <form className='pt-3 p-5 w-full' onSubmit={handleSaveData}>
                    <div className='p-4 sm:p-8 bg-base-100 shadow sm:rounded-lg'>
                        <div className='w-full'>
                            <h1 className='text-xl mb-5'>Create New Data</h1>
                        </div>
                        <div className='w-full flex flex-col-reverse lg:flex-row'>
                            <div className='w-full lg:w-[55%] pt-20 md:pt-2'>
                                <div className='flex flex-col mb-2'>
                                    <InputLabel htmlFor="nama" value="Nama Perumahan" />
                                    <TextInput
                                        id="nama"
                                        className="mt-1 block w-full input-sm"
                                        value={getnamaperumahan}
                                        required
                                        onChange={(e) => setNamaPerumahan(e.target.value)}

                                    />
                                </div>
                                <div className='flex flex-wrap gap-4 mb-2'>
                                    <div className='flex flex-col w-[48.5%] flex-grow'>
                                        <InputLabel htmlFor="kelurahan" value="Desa" />
                                        <TextInput
                                            id="kelurahan"
                                            className="mt-1 block w-full input-sm"
                                            value={getkelurahan}
                                            required
                                            onChange={(e) => setKelurahan(e.target.value)}
                                        />
                                    </div>
                                    <div className='flex flex-col w-[48.5%] flex-grow'>
                                        <InputLabel htmlFor="kecamatan" value="kecamatan" />
                                        <TextInput
                                            id="kecamatan"
                                            className="mt-1 block w-full input-sm"
                                            value={getkecamatan}
                                            required
                                            onChange={(e) => setKecamatan(e.target.value)}
                                        />
                                    </div>
                                </div>
                                <div className='flex flex-col mb-2'>
                                    <InputLabel htmlFor="nama_pengembang" value="Nama Pengembang" />
                                    <TextInput
                                        id="nama_pengembang"
                                        className="mt-1 block w-full input-sm"
                                        value={getnamapengembang}
                                        required
                                        onChange={(e) => setNamaPengembang(e.target.value)}
                                    />
                                </div>
                                <div className='flex flex-wrap gap-4 mb-2'>
                                    <div className='flex flex-col w-[48.5%] flex-grow'>
                                        <InputLabel htmlFor="luas_lahan_perumahan">
                                            Luas Lahan Perumahan (M<sup>2</sup>)
                                        </InputLabel>
                                        <TextInput
                                            id="luas_lahan_perumahan"
                                            type="number"
                                            className="mt-1 block w-full input-sm"
                                            value={getluaslahanperumahan}
                                            required
                                            onChange={(e) => setLuasLahanPerumahan(e.target.value)}
                                        />
                                    </div>
                                    <div className='flex flex-col w-[48.5%] flex-grow'>
                                        <InputLabel htmlFor="jumlah_rumah" value="Jumlah Rumah (Unit)" />
                                        <TextInput
                                            id="jumlah_rumah"
                                            type="number"
                                            className="mt-1 block w-full input-sm"
                                            value={getjumlahrumah}
                                            required
                                            onChange={(e) => setJumlahRumah(e.target.value)}
                                        />
                                    </div>
                                </div>
                                <div className='flex flex-wrap gap-4 mb-2'>
                                    <div className='flex flex-col w-[48.5%] flex-grow'>
                                        <InputLabel htmlFor="luas_psu">
                                            Luas PSU (M<sup>2</sup>)
                                        </InputLabel>
                                        <TextInput
                                            id="luas_psu"
                                            type="number"
                                            className="mt-1 block w-full input-sm"
                                            value={getluaspsu}
                                            required
                                            onChange={(e) => setLuasPSU(e.target.value)}
                                        />
                                    </div>
                                    <div className='flex flex-col w-[48.5%] flex-grow'>
                                        <InputLabel htmlFor="tahun_berdiri" value="Tahun Berdiri" />
                                        <TextInput
                                            id="tahun_berdiri"
                                            type="number"
                                            className="mt-1 block w-full input-sm"
                                            value={gettahunberdiri}
                                            onChange={(e) => setTahunBerdiri(e.target.value)}
                                        />
                                    </div>
                                </div>
                                <div className='flex flex-wrap gap-4 mb-2'>
                                    <div className='flex flex-col w-[48.5%] flex-grow'>
                                        <InputLabel htmlFor="urlmaps" value="Url Maps" />
                                        <TextInput
                                            id="urlmaps"
                                            type="text"
                                            className="mt-1 block w-full input-sm"
                                            value={geturlmaps}
                                            onChange={(e) => setUrlMaps(e.target.value)}
                                        />
                                    </div>
                                </div>
                                <div className='flex flex-col mb-2'>
                                    <InputLabel htmlFor="tpu" value="TPU" />
                                    <TextInput
                                        id="tpu"
                                        className="mt-1 block w-full input-sm"
                                        value={gettpu}
                                        onChange={(e) => setTPU(e.target.value)}
                                    />
                                </div>
                            </div>
                            <div className='w-full lg:w-[45%] p-2 h-[50vw] md:h-[30vw] lg:h-[55vh] mb-3 lg:mb-0 md:flex flex-col justify-center items-center lg:items-start'>
                                <h1>Foto Utama</h1>
                                <div className='w-full md:w-2/4 lg:w-full h-full flex flex-col items-center p-0 border border-base-content rounded-lg '>
                                    <DropDragOneFile
                                        className="w-full h-full"
                                        files={gethighlightphoto}
                                        setFiles={setHighLightPhoto}
                                    />
                                </div>
                                <div className='w-full'>
                                    <InputLabel value="Video Perumahan" />
                                    <input
                                        type='file'
                                        accept='video/*'
                                        className='file-input border border-base-content w-full file-input-md'
                                        onChange={(e) => setVideoPerumahan(e.target.files[0])}
                                    />
                                </div>
                            </div>
                        </div>
                        <div className='w-full mt-5'>
                            <label className='label'>
                                <span className='label-text'>Rincian PSU</span>
                            </label>
                            <ReactQuill
                                theme='snow'
                                modules={module}
                                placeholder='Rincian PSU...'
                                value={getrincianpsu}
                                onChange={setRincianPSU}
                            />
                            {/* <textarea
                                className="textarea textarea-bordered border-base-content h-[30vh] w-full"
                                placeholder="Rincian Psu..."
                                value={getrincianpsu}
                                onChange={(e) => setRincianPSU(e.target.value)}
                            ></textarea> */}
                        </div>
                        <div className='w-full flex items-center justify-end mt-5'>
                            <button className='btn btn-accent text-white' type='submit'>Save</button>
                        </div>
                    </div>
                </form>
            </div>
        </AuthenticatedLayout>
    )
}

export default CreateData