import React, { useState } from 'react'
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, router, useForm } from '@inertiajs/react';
import TextInput from '@/Components/TextInput';
import InputLabel from '@/Components/InputLabel';
import DropDragFile from '@/Components/DropDragFile';
import DropDragOneFile from '@/Components/DropDragOneFile';

import { AiOutlinePlusCircle, AiFillDelete } from 'react-icons/ai';
import PrevImage from '@/Components/PrevImage';
import Modal from '@/Components/Modal';
import AlertComp from '@/Components/AlertComp';
import { useEffect } from 'react';
import ReactQuill, { Quill } from 'react-quill';




const FormEditData = (props) => {
    const [getAddImage, setAddImage] = useState([]);
    const [isNotif, setNotif] = useState(false);
    const [fotosementara, setFotosementara] = useState(props.perumahan.highlightPhoto);
    const [show, setShow] = useState(false);
    const [selectedValue, setSelectedValue] = useState('');
    const [text, setText] = useState('')
    var toolbarOptions = [
        ['bold', 'italic', 'underline', 'strike'],        // toggled buttons
        // ['blockquote', 'code-block'],

        // [{ 'header': 1 }, { 'header': 2 }],               // custom button values
        [{ 'list': 'ordered' }, { 'list': 'bullet' }],
        [{ 'script': 'sub' }, { 'script': 'super' }],      // superscript/subscript
        [{ 'indent': '-1' }, { 'indent': '+1' }],          // outdent/indent
        // [{ 'direction': 'rtl' }],                         // text direction

        [{ 'size': ['small', false, 'large', 'huge'] }],  // custom dropdown
        // [{ 'header': [1, 2, 3, 4, 5, 6, false] }],
        [{ 'align': [] }],

        ['clean']                                         // remove formatting button
    ];

    const module = {
        toolbar: toolbarOptions
    }



    const { data, setData, post } = useForm({
        nama: props.perumahan.nama,
        kelurahan: props.perumahan.kelurahan,
        kecamatan: props.perumahan.kecamatan,
        nama_pengembang: props.perumahan.nama_pengembang,
        luas_lahan_perumahan: props.perumahan.luas_lahan_perumahan,
        jumlah_rumah: props.perumahan.jumlah_rumah,
        luas_PSU: props.perumahan.luas_PSU,
        tpu: props.perumahan.tpu || "",
        tahun_berdiri: props.perumahan.tahun_berdiri || "",
        rincian_psu: props.perumahan.rincian_psu || "",
        url_maps: props.perumahan.url_maps,
        easting: props.perumahan.easting,
        northing: props.perumahan.northing,
        videoperumahan: null,
        highlightPhoto: null,
    });



    const submit = (e) => {
        e.preventDefault();

        post(route('editperumahan.update', { id_perumahan: props.perumahan.id_perumahan }));
        setNotif(true);
        if (props.flash.message !== null) {
            setTimeout(() => {
                setNotif(false);
            }, 3000)
        }
    }

    const handleKeyPress = (event) => {
        if (event.key === "Enter") {
            submit(event)
        }
    }

    const handleDeleteImage = () => {
        setFotosementara('');
    }


    const handleCloseModal = () => {
        setShow(!show);
        setFotoPerumahan([]);
    }

    const handleRincianPsu = (value) => {
        setData('rincian_psu', value);
        setText(value);
    }

    const handleSaveVideo = (e) => {
        const file = e.target.files[0]

        if (file && file.size > 20971520) {
            alert('Video terlalu besar, maksimal 20 MB (file size: ' + (file.size / 1048576).toFixed(2) + ' MB)')
            e.target.value = '';
        } else {
            setData('videoperumahan', file)
        }
    }

    useEffect(() => {
        if (data.rincian_psu) {
            setText(data.rincian_psu)
        }
    }, [data.rincian_psu])


    const handleSaveImage = () => {
        if (selectedValue === 'option1') {
            const formData = new FormData();
            getAddImage.forEach((file) => formData.append('addimage[]', file));
            formData.append('id_perumahan', props.perumahan.id_perumahan);

            router.post(route('editImage.perumahan'), formData);
            setAddImage([]);
            setShow(!show);
            setNotif(true);
            if (props.flash.message !== null) {
                setTimeout(() => {
                    setNotif(false);
                }, 3000)
            }

        } else if (selectedValue === 'option2') {
            const formData = new FormData();
            getAddImage.forEach((file) => formData.append('addimage[]', file));
            formData.append('id_perumahan', props.perumahan.id_perumahan);

            router.post(route('editImage.siteplan'), formData);
            setAddImage([]);
            setShow(!show);
            setNotif(true);
            if (props.flash.message !== null) {
                setTimeout(() => {
                    setNotif(false);
                }, 3000)
            }
        } else {
            setAddImage([]);
            setShow(!show);
        }

    }
    return (
        <AuthenticatedLayout
            user={props.auth.user}
            title={`Edit ${props.perumahan.nama}`}
        >
            <Head title={`Edit ${props.perumahan.nama}`} />
            <div className='py-5 px-1 overflow-scroll overflow-x-hidden max-h-[90vh] bg-base-200'>
                {props.flash.message && isNotif === true ? (
                    <AlertComp>
                        <span>
                            {props.flash.message}
                        </span>
                    </AlertComp>
                ) : (null)}
                <form className='pt-3 p-5 w-full' onSubmit={submit} onKeyPress={handleKeyPress}>
                    <div className='p-4 sm:p-8 bg-base-100 shadow sm:rounded-lg'>
                        <div className='w-full'>
                            <span className='text-base mb-5'>Edit Perumahan</span>
                            <p className='text-lg'>{props.perumahan.nama}</p>
                        </div>
                        <div className='w-full flex flex-col-reverse xl:flex-row'>
                            <div className='w-full xl:w-[60%] pt-3'>
                                <div className='flex flex-col mb-2'>
                                    <InputLabel htmlFor="nama" value="Nama Perumahan" />
                                    <TextInput
                                        id="nama"
                                        className="mt-1 block w-full input-sm"
                                        value={data.nama}
                                        onChange={(e) => setData('nama', e.target.value)}
                                    />
                                </div>
                                <div className='flex flex-wrap gap-4 mb-2'>
                                    <div className='flex flex-col w-[48.5%] flex-grow'>
                                        <InputLabel htmlFor="kelurahan" value="Desa" />
                                        <TextInput
                                            id="kelurahan"
                                            className="mt-1 block w-full input-sm"
                                            value={data.kelurahan}
                                            onChange={(e) => setData('kelurahan', e.target.value)}
                                        />
                                    </div>
                                    <div className='flex flex-col w-[48.5%] flex-grow'>
                                        <InputLabel htmlFor="kecamatan" value="kecamatan" />
                                        <TextInput
                                            id="kecamatan"
                                            className="mt-1 block w-full input-sm"
                                            value={data.kecamatan}
                                            onChange={(e) => setData('kecamatan', e.target.value)}
                                        />
                                    </div>
                                </div>
                                <div className='flex flex-col mb-2'>
                                    <InputLabel htmlFor="nama_pengembang" value="Nama Pengembang" />
                                    <TextInput
                                        id="nama_pengembang"
                                        className="mt-1 block w-full input-sm"
                                        value={data.nama_pengembang}
                                        onChange={(e) => setData('nama_pengembang', e.target.value)}
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
                                            value={data.luas_lahan_perumahan}
                                            onChange={(e) => setData('luas_lahan_perumahan', e.target.value)}
                                        />
                                    </div>
                                    <div className='flex flex-col w-[48.5%] flex-grow'>
                                        <InputLabel htmlFor="jumlah_rumah" value="Jumlah Rumah (Unit)" />
                                        <TextInput
                                            id="jumlah_rumah"
                                            type="number"
                                            className="mt-1 block w-full input-sm"
                                            value={data.jumlah_rumah}
                                            onChange={(e) => setData('jumlah_rumah', e.target.value)}
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
                                            value={data.luas_PSU}
                                            onChange={(e) => setData('luas_PSU', e.target.value)}
                                        />
                                    </div>
                                    <div className='flex flex-col w-[48.5%] flex-grow'>
                                        <InputLabel htmlFor="tahun_berdiri" value="Tahun Berdiri" />
                                        <TextInput
                                            id="tahun_berdiri"
                                            type="number"
                                            className="mt-1 block w-full input-sm"
                                            value={data.tahun_berdiri}
                                            onChange={(e) => setData('tahun_berdiri', e.target.value)}
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
                                            value={data.url_maps}
                                            onChange={(e) => setData('url_maps', e.target.value)}
                                        />
                                    </div>
                                </div>
                                <div className='flex flex-col mb-2'>
                                    <InputLabel htmlFor="tpu" value="TPU" />
                                    <TextInput
                                        id="tpu"
                                        className="mt-1 block w-full input-sm"
                                        value={data.tpu}
                                        onChange={(e) => setData('tpu', e.target.value)}
                                    />
                                </div>
                                <div className='mb-2'>
                                    <InputLabel value="Video Perumahan" />
                                    <input
                                        type="file"
                                        accept='video/*'
                                        className="file-input border border-base-content w-full file-input-md"
                                        onChange={handleSaveVideo} />
                                </div>
                                <div className='w-full relative'>
                                    <label className='label'>
                                        <span className='label-text'>Rincian PSU</span>
                                    </label>
                                    <ReactQuill
                                        value={text}
                                        onChange={handleRincianPsu}
                                        modules={module}
                                        theme='snow'
                                        placeholder='Rincian PSU...'
                                    />
                                </div>
                            </div>
                            <div className='w-full xl:w-[40%] p-2 md:pt-5 mb-8 lg:mb-0 flex flex-col sm:flex-row lg:flex-col items-center'>
                                <div className='w-full px-2'>
                                    <h1 className='flex w-full md:w-2/4 xl:w-full text-center xl:text-start'>Foto Utama</h1>
                                    <div className='w-full xl:w-full sm:h-[25vw] flex flex-col items-center p-0 border border-base-content rounded-lg '>
                                        {fotosementara ? (
                                            <img src={`${props.ziggy.url}/storage/fotoUtama/${props.perumahan.highlightPhoto}`} alt={props.perumahan.nama} className='w-full h-full rounded-lg relative z-0' />
                                        ) : (
                                            <DropDragOneFile
                                                className="w-[100%] h-full"
                                                files={data.highlightPhoto}
                                                setFiles={setData}
                                                name="highlightPhoto"
                                            />
                                        )}
                                    </div>
                                    {fotosementara && (
                                        <div className='w-full flex justify-end'>
                                            <h1 className='hover:text-gray-300' onClick={handleDeleteImage}>Hapus Foto</h1>
                                        </div>
                                    )}
                                </div>
                                <div className='w-full h-full'>
                                    <h1>Video Perumahan</h1>
                                    <div className='w-full h-full'>
                                        <video muted controls className='w-full max-h-full'>
                                            <source src={props.videoUrl} type='video/mp4' />
                                        </video>
                                    </div>
                                </div>
                            </div>
                        </div>

                    </div>
                    <div className='bg-base-100 rounded-lg shadow w-full p-5 justify-center items-center mt-5'>
                        <div className='w-full flex justify-end'>
                            <span className='btn btn-md btn-error' onClick={() => setShow(!show)}>
                                <AiOutlinePlusCircle size={20} /> Add Image
                            </span>
                        </div>
                        <div className='w-full flex flex-col md:flex-row'>
                            <div className='w-full md:w-2/4 p-2'>
                                <PrevImage
                                    title="Preview Foto"
                                    ImageUrl={props.perumahan.foto_perumahan}
                                    ziggy={props.ziggy.url}
                                    storage="fotoperumahan"

                                />
                            </div>
                            <div className='w-full md:w-2/4 p-2'>
                                <PrevImage
                                    title="Preview SitePlan"
                                    ImageUrl={props.perumahan.foto_siteplan}
                                    ziggy={props.ziggy.url}
                                    storage="fotositeplan"
                                />
                            </div>
                        </div>
                        <div className='w-full flex items-center justify-end mt-10'>
                            <button className='btn btn-success' type='submit'>Save</button>
                        </div>
                    </div>
                </form>
                <Modal show={show} closeable={show}>
                    <div className='w-full p-5'>
                        <div className='w-full flex justify-end'>
                            <span className='btn btn-ghost bg-red-500 text-base-300 btn-circle btn-sm' onClick={handleCloseModal}>X</span>
                        </div>
                        <div className='w-full'>
                            <h1 className='pl-1'>Add Image For:</h1>
                            <select className="select select-bordered w-full max-w-xs mt-1" value={selectedValue} onChange={(e) => setSelectedValue(e.target.value)}>
                                <option>Select This...</option>
                                <option value="option1">Foto Perumahan</option>
                                <option value="option2">SitePlan</option>
                            </select>
                        </div>
                        <div className='w-full h-[40vh] mt-5'>
                            <DropDragFile
                                className="w-full h-2/4 border-2 border-dashed border-indigo-600 rounded-lg flex justify-center items-center text-sm"
                                files={getAddImage}
                                setFiles={setAddImage}
                            />
                        </div>
                        <div className='w-full flex justify-center mt-5'>
                            <span className='btn btn-sm btn-success capitalize' onClick={handleSaveImage}> <AiOutlinePlusCircle size={20} /> Add Image</span>
                        </div>
                    </div>
                </Modal>
            </div>

        </AuthenticatedLayout>
    )
}

export default FormEditData