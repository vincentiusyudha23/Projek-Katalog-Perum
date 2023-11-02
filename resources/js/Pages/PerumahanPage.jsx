import BoxInfoComp from '@/Components/BoxInfoComp'
import CarouselComp from '@/Components/CarouselComp'
import NavbarSecond from '@/Components/NavbarSecond'
import { Head } from '@inertiajs/react'
import React, { useState } from 'react'
import FooterComp from '@/Components/FooterComp';
import MapsView from '@/Components/MapsView'
import MapsUrlView from '@/Components/MapsUrlView'
import CarouselVideo from '@/Components/CarouselVideo'
import FullScreenComp from '@/Components/FullScreenComp'
import ReactQuill from 'react-quill'




const PerumahanPage = (props) => {
    const [video, setVideo] = useState('')
    const [originalUrl, setOriginalUrl] = useState(props.perumahan.url_maps)
    const fakeUrl = originalUrl.replace(/width="(800|600)" height="(600|450)"/g, 'width="100%" height="100%"')

    return (
        <div className='w-full h-screen'>
            <Head title={`Perumahan ${props.perumahan.nama}`} />
            <NavbarSecond />
            <img src={`${props.ziggy.url}/storage/fotoUtama/${props.perumahan.highlightPhoto}`} alt={props.perumahan.nama} className='object-cover w-full h-screen fixed -z-10 top-0' />
            <div className='w-full h-[50vh] flex flex-col justify-center items-center pt-24' style={{ backgroundColor: 'rgba(0,0,0,0.55)' }}>
                <h1 className='text-white m-0 text-2xl sm:text-4xl'>Perumahan</h1>
                <h1 className='text-white m-0 capitalize text-3xl sm:text-5xl text-center'>{props.perumahan.nama}</h1>
            </div>
            <div className='w-full px-10 bg-base-100 flex flex-col md:flex-row flex-wrap'>
                <div className='md:w-2/4 w-full sm:px-5 flex flex-col items-center justify-center flex-grow-0 pt-10'>
                    <div className='w-full sm:p-5 md:p-0'>
                        <FullScreenComp videoUrl={props.videoUrl} imageUrl={props.perumahan.foto_perumahan} />
                    </div>
                </div>
                <div className='md:w-2/4 sm:px-5 w-full flex flex-col justify-start items-center flex-grow-0 pt-10 md:pr-5'>
                    <BoxInfoComp title={"Nama Perumahan"} content={props.perumahan.nama} />
                    <BoxInfoComp title={"Nama Pengambang"} content={props.perumahan.nama_pengembang} />
                    <BoxInfoComp title={"Lokasi"} content={`Desa. ${props.perumahan.kelurahan}, Kec. ${props.perumahan.kecamatan}, Kab. Pesawaran`} />
                    <BoxInfoComp title={"Luas Lahan Perumahan"} content={props.perumahan.luas_lahan_perumahan + " M"} ifSup={<sup>2</sup>} />
                    <BoxInfoComp title={"Jumlah Rumah"} content={`${props.perumahan.jumlah_rumah} Unit`} />
                    <BoxInfoComp title={"Luas PSU"} content={props.perumahan.luas_PSU + " M"} ifSup={<sup>2</sup>} />
                    <BoxInfoComp title={"TPU"} content={props.perumahan.tpu} />
                    <BoxInfoComp title={"Tahun Berdiri"} content={props.perumahan.tahun_berdiri} />
                    <div className='w-full p-3 bg-base-100'>
                        <label className='label'>
                            <span className='labal-text'>Rincian PSU</span>
                        </label>
                        <div dangerouslySetInnerHTML={{ __html: props.perumahan.rincian_psu }} className='border-2 rounded-md p-2 min-h-[20vh]'>
                        </div>
                        {/* <textarea className="textarea textarea-bordered w-full text-base textarea-md font-black h-[30vh] md:h-[25vh]" placeholder={props.perumahan.rincian_psu} readOnly></textarea> */}
                    </div>
                </div>
                <div className='w-full flex flex-col my-5'>
                    <div className='w-full md:p-5 p-3'>
                        <h1 className='text-2xl md:text-3xl  text-center sm:text-start sm:px-10 my-1 sm:my-5'>Lokasi Perumahan</h1>
                        <div className='w-full flex items-center justify-center'>
                            <div
                                className='md:w-[75%] h-[40vw] w-full'
                                dangerouslySetInnerHTML={{ __html: fakeUrl }}
                            >
                            </div>
                        </div>
                    </div>
                    <div className='w-full md:p-5 p-3 flex flex-col justify-center items-center'>
                        <div className='w-full'>
                            <h1 className='text-2xl md:text-3xl text-center sm:text-start px-10 my-1 sm:my-5'>SitePlan</h1>
                        </div>
                        <div className='w-full md:w-[65%] min-h-max md:p-10 flex items-center justify-center'>
                            <CarouselComp image={props.perumahan.foto_siteplan} ziggy={props.ziggy.url} storage="fotositeplan" />
                        </div>
                    </div>
                </div>
            </div>
            <FooterComp />
            <div className='w-full bg-zinc-900 px-10 py-5 text-white text-xs'>
                <span>© Copyright 2023</span>
                <span className='mx-2 font-bold'>SITUS RESMI DINAS PERUMAHAN RAKYAT DAN KAWASAN PERMUKIMAN Kabupaten Pesawaran</span>
            </div>
        </div>
    )
}

export default PerumahanPage