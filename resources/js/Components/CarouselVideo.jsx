import React from 'react'
import { useState } from 'react'
import { AiOutlineLeft, AiOutlineRight } from 'react-icons/ai'
import { BsFullscreen, BsFullscreenExit } from 'react-icons/bs'
import Modal from './Modal'

const FullScreenView = ({ children: full }) => {

    return <>
        <div className='w-full h-screen fixed bg-black/50 top-0 left-0 flex justify-center items-center transition ease-out duration-500'>
            <div className='max-w-6xl h-[80vh] fixed overflow-hidden flex justify-center items-center'>
                {full}
            </div>
        </div>
    </>
}


const CarouselVideo = ({ children: slides, siteplan = false }) => {
    const [curr, setCurr] = useState(0)
    const [show, setSHow] = useState(false)
    const [fullview, setFullView] = useState(false)

    const prev = () => {
        setCurr((curr) => (curr === 0 ? slides.length - 1 : curr - 1))
    }
    const next = () => {
        setCurr((curr) => (curr === slides.length - 1 ? 0 : curr + 1))
    }


    return (
        <div className={`overflow-hidden relative bg-black ${siteplan ? 'w-full md:w-[65%] md:h-[45vw]' : ''} ${show ? 'hidden' : ''}`}>
            <div className={`flex transition-transform ease-out duration-500 ${siteplan ? ' md:h-[45vw] w-full h-96' : ''}`} style={{ transform: `translateX(-${curr * 100}%)` }}>
                {slides}
            </div>
            <div className='absolute inset-0 flex items-center justify-between p-4'>
                <button onClick={prev} className='p-1 rounded-full shadow bg-base-100/80 text-context hover:bg-base-100 hover:scale-90'>
                    <AiOutlineLeft size={30} />
                </button>
                <button onClick={next} className='p-1 rounded-full shadow bg-base-100/80 text-context hover:bg-base-100 hover:scale-90'>
                    <AiOutlineRight size={30} />
                </button>
                <div className='absolute p-2 top-0 right-0'>
                    <button className='p-2 rounded shadow bg-base-100/90' onClick={() => setSHow(!show)}>
                        <BsFullscreen size={22} />
                    </button>
                </div>
            </div>
            <div className='absolute bottom-4 right-0 left-0'>
                <div className='flex items-center justify-center gap-2'>
                    {slides.map((_, i) => (
                        <div key={i} className={`transition-all w-3 h-3 bg-white rounded-full ${curr === i ? "p-2" : "bg-opacity-50"}`}></div>
                    ))}
                </div>
            </div>
            <Modal show={show} closeable={show} maxWidth='2xl' bgColor='bg-black'>
                <div className={`flex transition-transform ease-out duration-500 ${siteplan ? 'h-[40vw]' : ''}`} style={{ transform: `translateX(-${curr * 100}%)` }}>
                    {slides}
                </div>
                <div className='absolute inset-0 flex items-center justify-between p-4'>
                    <button onClick={prev} className='p-1 rounded-full shadow bg-base-100/80 text-context hover:bg-base-100 hover:scale-90'>
                        <AiOutlineLeft size={30} />
                    </button>
                    <button onClick={next} className='p-1 rounded-full shadow bg-base-100/80 text-context hover:bg-base-100 hover:scale-90'>
                        <AiOutlineRight size={30} />
                    </button>
                    <div className='absolute p-2 top-0 right-0'>
                        <button className='p-2 rounded shadow bg-base-100/90' onClick={() => setSHow(!show)}>
                            <BsFullscreenExit size={22} />
                        </button>
                    </div>
                </div>
                <div className='absolute bottom-4 right-0 left-0'>
                    <div className='flex items-center justify-center gap-2'>
                        {slides.map((_, i) => (
                            <div key={i} className={`transition-all w-3 h-3 bg-white rounded-full ${curr === i ? "p-2" : "bg-opacity-50"}`}></div>
                        ))}
                    </div>
                </div>
            </Modal>
        </div>
    )
}

export default CarouselVideo