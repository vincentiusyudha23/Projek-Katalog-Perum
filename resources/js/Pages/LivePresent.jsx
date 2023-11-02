import React, { useEffect, useState } from 'react'
import { Head, Link } from '@inertiajs/react'
import PlayArrowIcon from '@mui/icons-material/PlayArrow';
import PauseIcon from '@mui/icons-material/Pause';
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';

const LivePresent = (props) => {
    const [slide, setSlide] = useState(0);
    const [isPlaying, setIsPlaying] = useState(false);

    useEffect(() => {
        var intervalId;

        if (isPlaying) {
            intervalId = setInterval(() => {
                nextSlide();
            }, 7000);
        }

        return () => clearInterval(intervalId);
    });

    const handlePlay = () => {
        setIsPlaying(true);
    };
    const handlePause = () => {
        setIsPlaying(false);
    };

    const nextSlide = () => {
        setSlide(slide === props.perumahan.length - 1 ? 0 : slide + 1);
    };
    const prevSlide = () => {
        setSlide(slide === 0 ? props.perumahan.length - 1 : slide - 1);
    };
    return (
        <>
            <Head title="Live Present" />
            {props.perumahan.map((item, index) => (
                <div
                    className={slide === index ? "live" : "live live-hidden"}
                    key={index}
                >
                    <div className='w-full flex flex-row absolute -z-10'>
                        <div className='w-[60%] bg-slate-200 h-screen'>
                            <div className='w-full h-[60vh] p-1'>
                                <img src={`${props.ziggy.url}/storage/fotoperumahan/${item.foto_perumahan[0]?.url_foto}`} className='w-full h-full object-cover' />
                            </div>
                            <div className='w-full flex flex-row h-[40vh]'>
                                <img src={`${props.ziggy.url}/storage/fotoperumahan/${item.foto_perumahan[1]?.url_foto}`} className='w-1/2 h-full object-cover p-1' />
                                <img src={`${props.ziggy.url}/storage/fotoperumahan/${item.foto_perumahan[2]?.url_foto}`} className='w-1/2 h-full object-cover p-1' />
                            </div>
                        </div>
                        <div className='w-[40%] h-screen bg-slate-200'>
                            <div className='w-full h-[50vh]'>
                                <img src={`${props.ziggy.url}/storage/fotoperumahan/${item.foto_perumahan[3]?.url_foto}`} className='w-full h-full object-cover p-1' />
                            </div>
                            <div className='w-full h-[50vh]'>
                                <img src={`${props.ziggy.url}/storage/fotoperumahan/${item.foto_perumahan[4]?.url_foto}`} className='w-full h-full object-cover p-1' />
                            </div>
                        </div>
                    </div>
                    <div className='live-content'>
                        <div style={{ backgroundColor: 'rgba(0,0,0,0.2)' }} className='w-2/4 h-screen'>
                            <div className='text-title w-full flex flex-col justify-center h-screen'>
                                <h1>Perumahan</h1>
                                <h1>{item.nama}</h1>
                                <span>Kabupaten Pesawaran</span>
                            </div>
                        </div>
                        <div className='w-2/4 h-screen flex flex-col justify-center items-center' style={{ backgroundColor: 'rgba(0,0,0,0.2)' }}>
                            <div className='box-info-besar animasi-box-besar'>
                                <div className='bg-box-besar'></div>
                                <div className='box-1-besar font-black text-xl'>INFORMATION</div>
                                <div className='box-2-besar text-lg'>
                                    <div className='flex flex-col gap-3'>
                                        <p>Lokasi </p>
                                        <p>Nama Pengembang </p>
                                        <p>Luas Lahan Perumahan</p>
                                        <p>Jumlah Rumah</p>
                                        <p>Luas PSU (M
                                            <span>2</span>)
                                        </p>
                                        <p>TPU</p>
                                        <p>Tahun</p>
                                    </div>
                                    <div className='flex flex-col gap-3 ml-2'>
                                        <p>: Kel. {item.kelurahan}, Kec. {item.kecamatan}</p>
                                        <p>: {item.nama_pengembang}</p>
                                        <p>: {item.luas_lahan_perumahan} (M
                                            <span>2</span>)</p>
                                        <p>: {item.jumlah_rumah} (Unit)</p>
                                        <p>: {item.luas_PSU}</p>
                                        {item.tpu ? (<p>: {item.tpu}</p>) : (<p>: - </p>)}
                                        <p>: {item.tahun_berdiri}</p>

                                    </div>
                                </div>
                                <div className='px-3 flex justify-center flex-col text-center text-rincian'>
                                    <p className='font-bold'>RINCIAN PSU</p>
                                    {item.rincian_psu ? (<div dangerouslySetInnerHTML={{ __html: item.rincian_psu }}></div>) : (<p> - </p>)}
                                </div>
                            </div>
                            <div className='w-[400px] img-besar img-animasi-besar h-[285px] overflow-hidden'>
                                <img src={`${props.ziggy.url}/storage/fotositeplan/${item.foto_siteplan[0]?.url_foto}`} alt={item.nama} className='object-cover' />
                            </div>
                        </div>
                    </div>
                </div>
            ))}
            <div className='btn-liveContent mx-5 my-2' >
                <button className='btn btn-neutral mx-2 text-white' onClick={prevSlide}>
                    <ArrowBackIosNewIcon />
                </button>
                <button className='btn btn-neutral mx-2 text-white' onClick={handlePlay} disabled={isPlaying} >
                    <PlayArrowIcon />
                </button>
                <button className='btn btn-neutral mx-2 text-white' onClick={handlePause} disabled={!isPlaying}>
                    <PauseIcon />
                </button>
                <button className='btn btn-neutral mx-2 text-white' onClick={nextSlide}>
                    <ArrowForwardIosIcon />
                </button>
            </div>
            <Link href={route('homepage')}>
                <button className='btn btn-neutral mx-2 text-white tombol-exit'>
                    Exit
                </button>
            </Link>
        </>
    )
}

export default LivePresent