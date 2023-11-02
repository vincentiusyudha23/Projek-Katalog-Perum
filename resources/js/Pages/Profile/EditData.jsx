import React, { useState, useEffect } from "react";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head, Link, router } from "@inertiajs/react";
import { AiOutlineEdit, AiOutlineDelete, AiOutlineDownload } from "react-icons/ai";
import { BiShow } from "react-icons/bi";
import SearchComp from "@/Components/SearchComp";
import AlertComp from "@/Components/AlertComp";
import Paginator from "@/Components/Paginator";
import LittlePaginator from "@/Components/LittlePaginator";
import proj4 from 'proj4';




const EditData = (props) => {
    const [searchResult, setSearchResult] = useState([]);
    const [getSearch, setSearch] = useState("");
    const [currentPage, setCurrentPage] = useState(1);
    const [postPerPage, setPostPerPage] = useState(15);
    const [dataPerumahan, setDataPerumahan] = useState(props.perumahan);
    const [latLng, setLatLng] = useState([]);
    const [isnotif, setIsNotif] = useState(false);


    const lastPostIndex = currentPage * postPerPage;
    const firstPostIndex = lastPostIndex - postPerPage;
    const currentPosts = props.perumahan.slice(firstPostIndex, lastPostIndex);

    const utm48 = "+proj=utm +zone=48 +datum=WGS84 +units=m +south";

    const convertEastingNorthingToLatLng = (easting, northing) => {
        proj4.defs('EPSG:32648', utm48); // Mendefinisikan projeksi UTM 48
        const utmPoint = proj4('EPSG:32648', 'EPSG:4326', [easting, northing]); // Konversi koordinat Easting dan Northing ke latitude dan longitude
        return [utmPoint[1], ",", utmPoint[0]];
    };

    useEffect(() => {
        if (props.flash.message !== null) {
            setIsNotif(true);
            setTimeout(() => {
                setIsNotif(false);
            }, 3000);
        }
    }, []);


    const DataSearch = props.perumahanresult.data.map((item) => item.nama);
    const fetchSearch = (value) => {
        const resultSearch = DataSearch.filter((DataSearch) => {
            return (
                value && DataSearch && DataSearch.toLowerCase().includes(value)
            );
        });
        setSearchResult(resultSearch);
    };

    const handleSearch = (value) => {
        setSearch(value);
        fetchSearch(value);
    };
    const handleGetSearch = () => {
        router.visit(`/admin/editdata?fetchSearch=${getSearch}`);
        setSearch("");
    };
    const handleManyPerPage = (e) => {
        setPostPerPage(e.target.value)
        setCurrentPage(1)
    }

    return (
        <AuthenticatedLayout user={props.auth.user} title="Edit Data Table">
            <Head title="Edit Data Table" />
            <div className="py-5 px-5 overflow-scroll overflow-x-hidden max-h-[90vh] min-h-[88vh] bg-base-200">
                {props.flash.message && isnotif === true ? (
                    <AlertComp>
                        <span>{props.flash.message}</span>
                    </AlertComp>
                ) : null}
                <div className="w-full p-3 flex justify-center sm:justify-end mt-1 mb-3">
                    <div>
                        <SearchComp
                            placeholder="Search..."
                            type="text"
                            value={getSearch}
                            onChange={(e) => handleSearch(e.target.value)}
                            handleGet={handleGetSearch}
                        />
                        <div className="w-full flex justify-center">
                            <div className="w-64 flex bg-base-100 flex-col shadow-md rounded-lg max-h-72 overflow-y-scroll absolute z-10">
                                {searchResult.map((result, idx) => {
                                    return (
                                        <div
                                            key={idx}
                                            className="p-4 hover:bg-base-300 hover:cursor-pointer"
                                            onClick={(e) => {
                                                setSearch(result);
                                                setSearchResult([]);
                                                handleGetSearch()
                                            }}
                                        >
                                            {result}
                                        </div>
                                    );
                                })}
                            </div>
                        </div>
                    </div>
                    <div className="tooltip tooltip-bottom" data-tip="Download">
                        <a className="btn btn-ghost" href='/admin/exportdata'>
                            <AiOutlineDownload size={23} />
                        </a>
                    </div>
                </div>
                <div className="w-full flex justify-between my-1 sm:px-10 py-2 sm:scale-100 scale-95">
                    <LittlePaginator
                        totalPosts={dataPerumahan.length}
                        postsPerPage={postPerPage}
                        setCurrentPage={setCurrentPage}
                        currentPage={currentPage} />
                    <div>
                        <select className="select select-md select-bordered text-sm" value={postPerPage} onChange={handleManyPerPage}>
                            <option value="15">x15</option>
                            <option value="25">x25</option>
                            <option value="50">x50</option>
                        </select>
                    </div>
                </div>
                <table className="table border-2 border-base-300 shadow-lg">
                    {/* head */}
                    <thead>
                        <tr className="bg-base-100 text-base-content text-base">
                            <th className="text-center">No.</th>
                            <th>Nama Perumahan</th>
                            <th className="hidden md:table-cell">Desa</th>
                            <th className="hidden md:table-cell">Kecamatan</th>
                            <th className="hidden md:table-cell">Keterangan</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {currentPosts.map((item, idx) => (
                            <tr
                                key={idx}
                                className="odd:bg-base-200 even:bg-base-100"
                            >
                                <td className="text-center">
                                    {/* {item. ? (<span className="btn bg-green-500">{firstPostIndex + idx + 1}</span>) : (<span className="btn bg-red-500">{firstPostIndex + idx + 1}</span>)} */}
                                    {firstPostIndex + idx + 1}
                                </td>
                                <td className="text-base">
                                    {item.nama}
                                    <br />
                                    {/* {item.easting && item.northing ? (
                                        convertEastingNorthingToLatLng(item.easting, item.northing)
                                    ) : (null)} */}
                                </td>
                                <td className="hidden md:table-cell">
                                    {item.kelurahan}
                                </td>
                                <td className="hidden md:table-cell">
                                    {item.kecamatan}
                                </td>
                                <td className="hidden md:table-cell">
                                    {item.foto_siteplan.length ? (
                                        <span>Sudah Memiliki Foto</span>
                                    ) : (
                                        <span>Belum Memiliki Foto</span>
                                    )}
                                    {/* {item.easting && item.northing ? (
                                        convertEastingNorthingToLatLng(item.easting, item.northing)
                                    ) : (null)} */}
                                </td>
                                <td className="flex flex-col sm:flex-row">
                                    <div className="btn btn-md btn-info btn-square mx-1 my-1 sm:my-0 tooltip flex" data-tip="View">
                                        <Link
                                            href={route("dashboard.perumahan", {
                                                nama: item.nama,
                                            })}
                                            method="get"
                                        >
                                            <BiShow size={25} />
                                        </Link>
                                    </div>
                                    <div className="btn btn-md btn-success btn-square mx-1 my-1 sm:my-0 tooltip flex" data-tip="Edit">
                                        <Link
                                            href={route("editperumahan", {
                                                nama: item.nama,
                                            })}
                                            method="get"
                                        >
                                            <AiOutlineEdit size={25} />
                                        </Link>
                                    </div>
                                    <div className="btn btn-md btn-error btn-square mx-1 my-1 sm:my-0 tooltip flex" data-tip="Delete">
                                        <Link
                                            href={route("delete.data", {
                                                id: item.id_perumahan,
                                            })}
                                            // onClick={handleDelete}
                                            method="post"
                                            as="button"
                                        >
                                            <AiOutlineDelete size={25} />
                                        </Link>
                                    </div>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
                <div className="w-full flex mt-5 justify-center">
                    <Paginator totalPosts={dataPerumahan.length}
                        postsPerPage={postPerPage}
                        setCurrentPage={setCurrentPage}
                        currentPage={currentPage} />
                </div>
            </div>
        </AuthenticatedLayout>
    );
};

export default EditData;
