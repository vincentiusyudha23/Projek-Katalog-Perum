import React from 'react'
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import BoxInfoComp from '@/Components/BoxInfoComp'
import CarouselComp from '@/Components/CarouselComp'
import { Head } from '@inertiajs/react';
import FullScreenComp from '@/Components/FullScreenComp';

const ShowData = (props) => {
    const fakeUrl = props.perumahan.url_maps?.replace(/width="(800|600)" height="(600|450)"/g, 'width="100%" height="100%"')
    return (
        <AuthenticatedLayout
            user={props.auth.user}
            title="Data Preview"
        >
            <Head title={props.perumahan.nama} />
            <div className='w-full overflow-scroll overflow-x-hidden max-h-[90vh] min-h-[88vh] bg-base-200' style={{
                backgroundImage: `url(${props.ziggy.url}/storage/fotoUtama/${props.perumahan.highlightPhoto})`,
                backgroundSize: 'cover',
                backgroundPosition: 'fixed',
                backgroundPositionY: '-200px'
            }}>
                <div className='w-full h-[50vh] flex flex-col justify-center items-center' style={{ backgroundColor: 'rgba(0,0,0,0.55)' }}>
                    <h1 className='text-white m-0 text-4xl'>Perumahan</h1>
                    <h1 className='text-white m-0 capitalize text-5xl text-center'>{props.perumahan.nama}</h1>
                </div>
                <div className='w-full px-2 bg-base-100 flex flex-col md:flex-row flex-wrap'>
                    <div className='md:w-2/4 w-full sm:px-5 flex flex-col items-center justify-center flex-grow-0 pt-10'>
                        <div className='w-full sm:p-5 md:p-0'>
                            <FullScreenComp videoUrl={props.videoUrl} imageUrl={props.perumahan.foto_perumahan} />
                        </div>
                    </div>
                    <div className='md:w-2/4 sm:px-5 w-full flex flex-col items-center pt-7 flex-grow-0'>
                        <BoxInfoComp title={"Nama Perumahan"} content={props.perumahan.nama} />
                        <BoxInfoComp title={"Nama Pengambang"} content={props.perumahan.nama_pengembang} />
                        <BoxInfoComp title={"Lokasi"} content={`Desa. ${props.perumahan.kelurahan}, Kec. ${props.perumahan.kecamatan}, Kab. Pesawaran`} />
                        <BoxInfoComp title={"Luas Lahan Perumahan"} content={props.perumahan.luas_lahan_perumahan + " M"} ifSup={<sup>2</sup>} />
                        <BoxInfoComp title={"Jumlah Rumah"} content={`${props.perumahan.jumlah_rumah} Unit`} />
                        <BoxInfoComp title={"Luas PSU"} content={props.perumahan.luas_PSU + " M"} ifSup={<sup>2</sup>} />
                        <BoxInfoComp title={"TPU"} content={props.perumahan.tpu} />
                        <BoxInfoComp title={"Tahun Berdiri"} content={props.perumahan.tahun_berdiri} />
                        <div className='w-full md:h-full h-[20vh]  p-0 mb-5'>
                            <label className='label'>
                                <span className='labal-text'>Rincian PSU</span>
                            </label>
                            <div dangerouslySetInnerHTML={{ __html: props.perumahan.rincian_psu }} className='border-2 rounded-md p-2 min-h-[20vh]'>
                            </div>
                        </div>
                    </div>
                    <div className='w-full flex flex-col my-5'>
                        <div className='w-full md:p-5 p-3'>
                            <h1 className='text-2xl md:text-3xl  text-center sm:text-start sm:px-10 my-1 sm:my-5'>Lokasi Perumahan</h1>
                            <div className='w-full flex justify-center items-center'>
                                <div className='w-[100%] md:w-[75%] h-[40vw]'
                                    dangerouslySetInnerHTML={{ __html: fakeUrl }}
                                >

                                </div>
                            </div>
                        </div>
                        <div className='w-full md:p-5 p-2 flex flex-col justify-center items-center'>
                            <div className='w-full'>
                                <h1 className='text-2xl md:text-3xl text-center sm:text-start px-10 my-1 sm:my-5'>SitePlan</h1>
                            </div>
                            <div className='w-full md:w-[65%] min-h-max md:p-10 flex items-center justify-center'>
                                <CarouselComp image={props.perumahan.foto_siteplan} ziggy={props.ziggy.url} storage="fotositeplan" />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    )
}

export default ShowData