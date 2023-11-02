import { useState, useEffect } from "react";
import BoxInfoComp from "./BoxInfoComp"

const DroneContent = ({ data }) => {
    const [transisitext1, setTransisiText1] = useState(false);
    const [transisitext2, setTransisiText2] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            const scrollTop1 = window.scrollY;
            if (scrollTop1 > 900) {
                setTransisiText1(true);
            } else {
                setTransisiText1(false);
            }
            const scrollTop2 = window.scrollY;
            if (scrollTop2 > 1150) {
                setTransisiText2(true);
            } else {
                setTransisiText2(false);
            }
        };

        window.addEventListener('scroll', handleScroll);

        return () => {
            window.removeEventListener('scroll', handleScroll)
        };
    }, []);

    return (
        <div className="w-full px-8 py-4">
            <div className={`w-full flex flex-row fade-in-section ${transisitext1 ? 'is-visible' : ''}`}>
                <div className="w-1/2 flex justify-center items-center py-3">
                    <video muted loop autoPlay className="w-[85%]">
                        <source src={`${data.ziggy.url}${data.video1}`} type="video/mp4" />
                    </video>
                </div>
                <div className="w-1/2 p-3 flex flex-col justify-center items-center">
                    <h1 className="text-4xl">Pesawaran Residence</h1>
                    <h2>Desa Kurungan Nyawa dan Negeri Sakti - Kecamatan Gedong Tataan</h2>
                    <h2>Kabupaten Pesawaran</h2>
                </div>
            </div>
            <div className={`w-full flex flex-row fade-in-section ${transisitext2 ? 'is-visible' : ''}`}>
                <div className="w-1/2 p-3 flex flex-col justify-center items-center">
                    <h1 className="text-4xl">Grand Paramount</h1>
                    <h2>Desa Kurungan Nyawa - Kecamatan Gedong Tataan</h2>
                    <h2>Kabupaten Pesawaran</h2>
                </div>
                <div className="w-1/2 flex justify-center py-3 items-center">
                    <video muted loop autoPlay className="w-[85%]">
                        <source src={`${data.ziggy.url}${data.video2}`} type="video/mp4" />
                    </video>
                </div>
            </div>
        </div>
    )
}

export default DroneContent