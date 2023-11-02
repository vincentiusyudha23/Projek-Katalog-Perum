import React from 'react'
import Lambang from '/resources/asset/lambang.png';

const FooterComp = () => {
    return (
        <div className='w-full bg-zinc-800 flex flex-col md:flex-row p-3 justify-between'>
            <div className='md:w-2/3 w-full p-5 flex flex-row text-white justify-center items-center'>
                <img src={Lambang} alt='lambang.png' className='w-16 h-20' />
                <div className='text-xs flex flex-col justify-center mx-2'>
                    <h1>KATALOG PERUMAHAN DIGITAL</h1>
                    <h1>DINAS PERUMAHAN RAKYAT DAN KAWASAN PERMUKIMAN</h1>
                    <h1>KABUPATEN PESAWARAN</h1>
                </div>
            </div>
            <div className='p-5 text-white flex flex-col sm:flex-row justify-center items-center'>
                <div className='mx-5 my-3 sm:m-0'>
                    <h1>
                        Komplek Perkantoran Pemerintah Kabupaten Pesawaran Jl. Raya Kedondong, Way Layap Kec. Gedong Tataan Kabupaten Pesawaran Provinsi Lampung Indonesia Kode Pos 35366
                    </h1>
                </div>
                <iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2741.675444209223!2d105.07005514920833!3d-5.401478226340942!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x2e40d2faa57b82c9%3A0xa2e20a27d53166e4!2sDinas%20PU%20Perumahan%20dan%20Permukiman!5e0!3m2!1sid!2sid!4v1693980944903!5m2!1sid!2sid" className='sm:w-[450px] sm:h-[250px] w-full h-[50vw] border-0' allowFullScreen="" loading="lazy" referrerPolicy="no-referrer-when-downgrade"></iframe>
            </div>
        </div>
    )
}

export default FooterComp