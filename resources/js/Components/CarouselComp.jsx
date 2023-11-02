import React, { useState } from 'react';
import { AiOutlineLeft, AiOutlineRight } from 'react-icons/ai'

const OpenImage = ({ imageURL, ...props }) => {
    return <div className='w-full h-screen fixed flex justify-center items-center top-0 left-0 z-20' style={{ backgroundColor: 'rgba(0,0,0,0.5)' }} {...props}>
        <div className='sm:w-[60%] max-h-[80vh] overflow-y-auto'>
            <img src={imageURL} className='w-full h-full' alt={imageURL} />
        </div>
    </div>
}

const ManyImage = ({ imageURL, handleImage, ziggy, storage }) => {
    const [slide, setSlide] = useState(0);
    const [isLoading, setIsLoading] = useState(true);


    const handleImageLoad = () => {
        setIsLoading(false);
    };

    const nextSlide = () => {
        setSlide(slide === imageURL.length - 1 ? 0 : slide + 1);
        // if (overlayPosition === -640) {
        //     setOverlayPosition(0)
        // } else {
        //     setOverlayPosition(overlayPosition - 160);
        // }
    };
    const prevSlide = () => {
        setSlide(slide === 0 ? imageURL.length - 1 : slide - 1);
        // if (overlayPosition == 0) {
        //     setOverlayPosition(-640);
        // } else {
        //     setOverlayPosition(overlayPosition + 160);
        // }
    };
    return <>
        {isLoading &&
            <div className='w-full h-52 sm:h-96 flex justify-center items-center'>
                <span className="loading loading-bars loading-lg"></span>
            </div>
        }
        <div className={isLoading ? 'hidden' : 'p-2 bg-base-content'}>
            <div className="relative flex justify-center items-center w-full min-h-[30vw]">
                <button className='p-1 rounded-full shadow bg-base-100/80 text-context hover:bg-base-100 hover:scale-90 relative left-14' onClick={prevSlide}>
                    <AiOutlineLeft size={30} />
                </button>
                {imageURL.map((item, idx) => (
                    <img src={`/storage/${storage}/${item.url_foto}`} key={idx} alt={item.url_foto + ".png"} onLoad={handleImageLoad} onClick={() => handleImage(`${ziggy}/storage/${storage}/${item.url_foto}`)} className={slide === idx ? "w-full m-0 cursor-pointer" : "w-full m-0 cursor-pointer hidden"} />
                ))}
                <button className='p-1 rounded-full shadow bg-base-100/80 text-context hover:bg-base-100 hover:scale-90 relative right-14' onClick={nextSlide}>
                    <AiOutlineRight size={30} />
                </button>
                <div className='absolute bottom-1 flex gap-1'>
                    {imageURL.map((_, i) => (
                        <div key={i} className={`transition-all w-3 h-3 bg-black/80 shadow-sm rounded-full ${slide === i ? 'p-2' : 'bg-black/30'}`}></div>
                    ))}
                </div>
            </div>
            {/* <div className='flex max-w-max overflow-scroll overflow-y-hidden '>
                <div className='flex gap-2 py-2'>
                    {imageURL.map((item, idx) => (
                        <img src={`${ziggy}/storage/${storage}/${item.url_foto}`} key={idx} alt={item.url_foto + ".png"} onLoad={handleImageLoad} onClick={() => handleImage(`${ziggy}/storage/${storage}/${item.url_foto}`)} className={slide === idx ? "w-40 h-24 cursor-pointer border-4 border-blue-700 " : "w-40 h-24 cursor-pointer"} />
                    ))}
                </div>
            </div> */}
        </div>
    </>

};

const OneImage = ({ imageURL, handleImage, ziggy, storage }) => {
    const [isLoading, setIsLoading] = useState(true);

    const handleImageLoad = () => {
        setIsLoading(false);
    };
    return <>
        {isLoading &&
            <div className='w-full h-52 sm:h-96 flex justify-center items-center'>
                <span className="loading loading-bars loading-lg"></span>
            </div>
        }
        {imageURL.map((item, idx) => {
            return <img key={idx} src={`${ziggy}/storage/${storage}/${item.url_foto}`} alt={item.url_foto} onLoad={handleImageLoad} className={isLoading ? 'hidden' : 'w-full m-0 cursor-pointer'} onClick={() => handleImage(`${ziggy}/storage/${storage}/${item.url_foto}`)} />
        })}
    </>
}


const CarouselComp = ({ image, ziggy, storage, videoURL }) => {
    const [getOpenImage, setOpenImage] = useState(false);
    const [getUrlImage, setUrlImage] = useState("");


    const handleOpenImage = (src) => {
        setUrlImage(src);
        setOpenImage(!getOpenImage);
    }
    return (
        <>{image.length ? (<>
            {
                image.length >= 2 ? (
                    <ManyImage imageURL={image} handleImage={handleOpenImage} ziggy={ziggy} storage={storage} />
                ) : (
                    <OneImage imageURL={image} handleImage={handleOpenImage} ziggy={ziggy} storage={storage} />
                )
            }
            {getOpenImage && (
                <OpenImage imageURL={getUrlImage} onClick={handleOpenImage} />
            )}
        </>
        ) : (
            <div className='border-2 w-full h-52 sm:h-[60vh] flex justify-center items-center'>
                <h1 className='text-2xl' >Tidak ada Foto</h1>
            </div>
        )}
        </>
    )
}
export default CarouselComp