import { Link } from '@inertiajs/react'
import React from 'react'

const PrevImage = ({ title, ImageUrl, storage, ziggy }) => {
    return (
        <>
            <h1>{title}</h1>
            <div className='w-full h-[30vh] border border-base-content rounded-lg overflow-y-scroll flex flex-wrap gap-3 p-3'>
                {ImageUrl.length ? (
                    <>
                        {ImageUrl.map((item, idx) => (
                            <div key={idx} className="relative w-28 h-24">
                                <img src={`${ziggy}/storage/${storage}/${item.url_foto}`} className='w-full h-full object-cover' alt={item.url_foto} />
                                <Link
                                    href={`/admin/delete${storage}/${item.id_foto}`}
                                    method='delete'
                                    as='button'
                                    className="bg-red-500 -top-2 -right-1 w-6 h-6 flex justify-center items-center rounded-full text-white absolute border-2 border-base-100"
                                ><span>X</span></Link>
                            </div>
                        ))}
                    </>
                ) : (
                    <div className='w-full flex justify-center p-5'>
                        <h1>Belum Ada Gambar</h1>
                    </div>
                )}
            </div >
        </>
    )
}

export default PrevImage