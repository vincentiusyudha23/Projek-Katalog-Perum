import React from 'react'
import { useRef } from 'react';
import { useEffect } from 'react';
import { useState } from 'react'
import { AiOutlineLeft, AiOutlineRight } from 'react-icons/ai'

const FoundData = ({ videoUrl = '1234.mp4', imageUrl }) => {
    const [slide, setSlide] = useState(0);
    const videoRef = useRef(null);
    const ArrayImage = [];

    ArrayImage.push(videoUrl)
    imageUrl.map((item) => ArrayImage.push(item.url_foto))

    const nextSlide = () => {
        setSlide(slide === ArrayImage.length - 1 ? 0 : slide + 1);
        if (videoRef.current) {
            videoRef.current.pause();
        };
    }

    const prevSlide = () => {
        setSlide(slide === 0 ? ArrayImage.length - 1 : slide - 1);
        if (videoRef.current) {
            videoRef.current.pause();
        };
    }

    return (
        <>
            {ArrayImage.map((item, idx) => (
                <div key={idx} className={`flex justify-center items-center ${slide === idx ? 'w-full' : 'hidden'}`}>
                    {
                        item.endsWith('.mp4') ? (
                            <video muted controls ref={videoRef}>
                                <source src={item} type='video/mp4' />
                            </video>
                        ) : (
                            <img src={`/storage/fotoperumahan/${item}`} className='object-cover w-full rounded-md' />
                        )
                    }
                </div>
            ))}

            <button onClick={prevSlide} className='absolute z-10 bg-base-100/80 left-2 p-1 rounded-full hover:bg-base-200 hover:scale-90'>
                <AiOutlineLeft size={30} />
            </button>
            <button onClick={nextSlide} className='absolute z-10 bg-base-100/80 right-2 p-1 rounded-full hover:bg-base-200 hover:scale-90'>
                <AiOutlineRight size={30} />
            </button>
            <div className='w-full absolute z-10 bottom-1.5 flex justify-center gap-1'>
                {ArrayImage.map((_, i) => (
                    <div key={i} className={`transition-all w-3 h-3 bg-white rounded-full ${slide === i ? 'p-2' : 'bg-opacity-50'}`}></div>
                ))}
            </div>
        </>
    )
}

const FullScreenComp = ({ videoUrl, imageUrl }) => {
    return (
        <div className='w-full h-[60vw] md:max-h-[30vw] flex bg-black rounded-md justify-center items-center relative'>
            {videoUrl && imageUrl ? (
                <FoundData videoUrl={videoUrl} imageUrl={imageUrl} />
            ) : (
                <h1 className='text-white/60'>Data Not Found</h1>
            )}
        </div>
    )
}

export default FullScreenComp