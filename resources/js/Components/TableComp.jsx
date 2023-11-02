import { Link } from "@inertiajs/react"

const TabelData = (perumahan, firstPostIndex) => {

    return (
        <div className="overflow-x-auto w-11/12">
            <table className="table">
                {/* head */}
                <thead>
                    <tr>
                        <th className="text-center">No.</th>
                        <th>Nama Perumahan</th>
                        <th className="hidden md:table-cell">Kelurahan</th>
                        <th className="hidden md:table-cell">Kecamatan</th>
                        <th className="hidden md:table-cell">Tahun Beridiri</th>
                        <th>Action</th>
                    </tr>
                </thead>
                <tbody>
                    {perumahan.map((item, idx) => (
                        <tr key={idx} className="odd:bg-base-200 even:bg-base-100">
                            <th className="text-center">{firstPostIndex + idx + 1}</th>
                            <td>{item.nama}</td>
                            <td className="hidden md:table-cell">{item.kelurahan}</td>
                            <td className="hidden md:table-cell">{item.kecamatan}</td>
                            <td className="hidden md:table-cell">{item.tahun_berdiri}</td>
                            <td>
                                <Link href={route('perumahanpage', { nama: item.nama })} method="get">
                                    <button className="btn btn-sm btn-neutral">
                                        Detail
                                    </button>
                                </Link>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    )
}

const NoData = () => {
    return <div className="w-full flex justify-center items-center">
        <h1 >Tidak Ada Data</h1>
    </div>
}

const TableComp = ({ perumahan, firstPostindex }) => {
    return !perumahan ? NoData() : TabelData(perumahan, firstPostindex)
}

export default TableComp