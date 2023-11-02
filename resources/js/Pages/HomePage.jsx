import { Head, Link } from '@inertiajs/react';
import React, { useState, useEffect, useRef } from 'react';
import NavbarSecond from '@/Components/NavbarSecond';
import { AiFillPlayCircle, AiOutlineArrowRight } from 'react-icons/ai';
import Thumbnail from '/resources/asset/thumbnail.jpg';
import FooterComp from '@/Components/FooterComp';
import CardComp from '@/Components/CardComp';


const HomePage = (props) => {
    const [transisitext, setTransisiText] = useState(false);
    const [openvideo, setOpenVideo] = useState(false);
    const sectionRef = useRef(null);

    useEffect(() => {
        const handleScroll = () => {
            const scrollTop = window.scrollY;
            if (scrollTop > 150) {
                setTransisiText(true);
            } else {
                setTransisiText(false);
            }
        };

        window.addEventListener('scroll', handleScroll);

        return () => {
            window.removeEventListener('scroll', handleScroll)
        };
    }, []);

    const handleOpenVideo = () => {
        setOpenVideo(!openvideo);
    }

    const handleSectionClick = () => {
        if (sectionRef.current) {
            sectionRef.current.scrollIntoView({ behavior: 'smooth' });
        }
    }
    return (
        <div>
            <Head title='Katalog Digital Perumahan' />
            <div className='bg-video'>
                <video autoPlay muted loop>
                    <source src='storage/VideoPesawaran.mp4' type='video/mp4' />
                </video>
            </div>
            {/* <NavbarComp /> */}
            <NavbarSecond user={props.auth.user}>
                <span onClick={handleSectionClick} className='hover:cursor-pointer hover:text-gray-300'>
                    About Us
                </span>
            </NavbarSecond>
            <div className='bg-home w-full h-screen flex justify-center items-center flex-col  text-center'>
                <p className='text-5xl font-bold text-white'>KATALOG DIGITAL PERUMAHAN</p>
                <p className='text-3xl text-white'>Kabupaten Pesawaran</p>
                <button className="btn btn-outline border border-slate-100 text-slate-100 my-5" onClick={handleSectionClick}>About US</button>
            </div>
            <div>
                <div className='content bg-base-100' ref={sectionRef}>
                    <div className='content-1' >
                        <div className={`fade-in-section w-full flex justify-center items-center ${transisitext ? 'is-visible' : ''}`}>
                            <div className='bg-videocontent md:w-[50%] w-full md:h-[27.5vw] h-full'>
                                <AiFillPlayCircle className='sm:w-20 sm:h-20 w-16 h-16 hover:cursor-pointer hover:scale-110' onClick={handleOpenVideo} />
                            </div>
                            <div className='video md:w-[50%] w-full'>
                                <img src={Thumbnail} type="video/mp4" />
                            </div>
                        </div>
                        {openvideo && (
                            <div className='open-video'>
                                <div className='w-full h-screen absolute bg-open-video' onClick={handleOpenVideo}></div>
                                <video className='open-video-content' autoPlay={openvideo} controls>
                                    <source src='storage/VideoPesawaran.mp4' type="video/mp4" />
                                </video>
                            </div>
                        )}
                    </div>
                    <div className={`fade-in-section content-2 px-3 ${transisitext ? ' is-visible' : ''}`}>
                        <p className='text-3xl my-2 px-5 md:px-14'>Kabupaten Pesawaran</p>
                        <p className='text-sm sm:text-base text-justify px-5 md:px-10'>
                            Kabupaten Pesawaran adalah salah satu kabupaten yang berada di Provinsi Lampung,
                            tepat bersebelahan dengan kota Bandar Lampung, dengan pusat pemerintahan berada di
                            kecamatan Gedong Tataan. Secara administratif luas wilayah yang dimiliki Kabupaten
                            Pesawaran adalah 1173,77 KM2 dan dibagi menjadi 11 kecamatan, Kabupaten ini sendiri
                            ini pun dimpimpin oleh seorang Bupati. Kabupaten Pesawaran memiliki lokasi yang sangat strategis, dimana letaknya sangatlah dekat dengan Kota Bandar Lampung, karena letaknya yang sangat strategis tersebut, serta adanya dukungan pemerintah daerah, membuat pertumbuhan pembangunan perumahan di Pesawaran begitu pesat, sampai saat ini sudah lebih dari 80 pengembang perumahan yang berinvestasi di Kabupaten Pesawaran yang tersebar di beberapa kecamatan, yang pastinya akan terus bertambang seiring waktu, bahkan sampai saat ini perumahan-perumahan yang berada di Kabupaten Pesawaran masih menjadi incaran bagi masyarakat untuk keperluan tempat tinggal maupun untuk investasi jangka panjang, tidak terkecuali bagi para pengembang perumahan yang ingin berinvestasi di Kabupaten Pesawaran. Tidak hanya dari segi permukiman rakyat, Kabupaten Pesawaran sangatlah kaya akan potensi-potensi didalamnya, seperti di bidang pariwisata dan pertanian, dimana sudah menjadi ciri khasnya, banyak tempat dan hasil bumi dari bidang tersebut yang sudah sangat terkenal, dan dikenal berasal dari Kabupaten Pesawaran.
                        </p>
                    </div>
                </div>
                <div className='bg-base-100 flex py-5 overflow-hidden '>
                    <div className='animasi-slide'>
                        {props.perumahan ? props.perumahan.map((item, idx) => {
                            return (
                                <div key={idx} >
                                    <div style={{
                                        backgroundImage: `${item.highlightPhoto ? `url("${props.ziggy.url}/storage/fotoUtama/${item.highlightPhoto}")` : '#'}`,
                                        width: '600px',
                                        height: '350px',
                                        backgroundRepeat: 'no-repeat',
                                        backgroundSize: 'cover',
                                        color: 'white'
                                    }}
                                        className='foto-berjalan flex'
                                    >
                                        <div className='w-2/4 h-full pl-2 flex flex-col justify-center items-start' style={{ backgroundColor: 'rgba(0,0,0,0.5)' }}>
                                            <h1 className='text-2xl text-white'>Perumahan</h1>
                                            <h1 className='text-3xl font-bold text-white'>{item.nama}</h1>
                                            <h1 className='text-xl text-white'>Kabupaten Pesawaran</h1>
                                        </div>
                                        <div className='w-2/4 flex flex-col justify-center items-center' style={{ backgroundColor: 'rgba(0,0,0,0.5)' }}>
                                            <div className='w-full h-2/4'>
                                                <div className='box-info'>
                                                    <div className='bg-box'></div>
                                                    <div className='box-content box-1'>INFORMATION</div>
                                                    <div className='box-content box-2'>
                                                        <div className='judul text-xs'>
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
                                                        <div className='isian text-xs'>
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
                                                    <div className='px-3 flex justify-center flex-col text-center text-rincian-kecil'>
                                                        <p className='font-bold'>RINCIAN PSU</p>
                                                        {item.rincian_psu ? (<div className='text-sm' dangerouslySetInnerHTML={{ __html: item.rincian_psu }}></div>) : (<p> - </p>)}
                                                    </div>
                                                </div>
                                            </div>
                                            <div className='w-full h-2/4 flex justify-center items-center'>
                                                {item.foto_siteplan[0] ? (<img src={`${props.ziggy.url}/storage/fotositeplan/${item.foto_siteplan[0]?.url_foto}`} className='w-44' />) : (null)}
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            )
                        }) :
                            <>
                                <h1>Tidak Ada Data</h1>
                            </>
                        }
                    </div>
                    <div className='bg-btn-slider'>
                        <Link href={route('livepresent')}>
                            <button className="btn btn-neutral text-white">
                                View Live Present
                            </button>
                        </Link>
                    </div>
                </div>
                <div className='w-full flex sm:flex-row flex-col flex-wrap gap-5 flex-shrink justify-center py-3 px-5 sm:px-0 bg-base-100'>
                    <CardComp perumahan={props.dataperumahan.data} UrlImage={props.ziggy.url} UrlName="perumahanpage" />
                </div>
                <div className='w-full flex justify-end bg-base-100 p-10'>
                    <Link className='btn btn-outline capitalize' href={route('katalogpage')}>
                        Lihat Semua Perumahan <AiOutlineArrowRight size={20} />
                    </Link>
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

export default HomePage