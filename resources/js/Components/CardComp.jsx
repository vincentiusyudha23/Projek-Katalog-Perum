import { Link } from "@inertiajs/react"
import { useState } from "react"


const DataPerumahan = (perumahan, urlimage, UrlName) => {
    const [isLoading, setIsLoading] = useState(true);

    const handleLoading = () => {
        setIsLoading(false);
    }
    return perumahan.map((item, idx) => {
        return <Link key={idx} href={route(UrlName, { nama: item.nama })} method="get" as="button" className="card w-full bg-base-100 sm:w-72 h-[45vh] shadow-xl hover:cursor-pointer hover:scale-105">
            {isLoading &&
                <div className="card w-full h-60 flex justify-center items-center">
                    <span className="loading loading-bars loading-md"></span>
                </div>
            }
            <div className={isLoading ? 'hidden' : 'block rounded-lg'}>
                <figure className="w-full h-40 object-cover">
                    {item.highlightPhoto ? (
                        <img src={`${urlimage}/storage/fotoUtama/${item.highlightPhoto}`} alt={item.nama + ".Png"} onLoad={handleLoading} />
                    ) : (
                        <div className="w-full text-center">
                            <span>Tidak Memiliki Foto</span>
                        </div>
                    )}
                </figure>
                <div className="card-body gap-0 justify-between flex h-[25vh]">
                    <h2 className="card-title text-sm font-medium">
                        Perumahan
                    </h2>
                    <p className="text-start text-lg font-bold">{item.nama}</p>
                    <div className="card-actions justify-end">
                        <div className="badge badge-outline badge-sm">
                            <span>
                                {item.kelurahan}
                            </span>
                        </div>
                        <div className="badge badge-outline badge-sm">
                            <span>
                                {item.kecamatan}
                            </span>
                        </div>
                        <div className="badge badge-outline badge-sm">
                            <span>
                                {item.tahun_berdiri}
                            </span>
                        </div>
                    </div>
                </div>
            </div>
        </Link>

    })
}
const NoData = () => {
    return <div className="w-full flex justify-center items-center">
        <h1 >Tidak Ada Data</h1>
    </div>
}


const CardComp = ({ perumahan, UrlImage, UrlName }) => {
    return !perumahan ? NoData() : DataPerumahan(perumahan, UrlImage, UrlName)
}
export default CardComp