import { Head, router } from '@inertiajs/react';
import React, { useState } from 'react';
import FilterComp from '@/Components/FilterComp';
import CardComp from '@/Components/CardComp';
import TableComp from '@/Components/TableComp';
import ListIcon from '@mui/icons-material/List';
import ViewModuleIcon from '@mui/icons-material/ViewModule';
import NavbarSecond from '@/Components/NavbarSecond';
import SearchComp from '@/Components/SearchComp';
import LittlePaginator from '@/Components/LittlePaginator';
import Paginator from '@/Components/Paginator';


const KatalogPage = (props) => {
    const [getdisplayPerumahanData, setDisplayPerumahanData] = useState(props.perumahan);
    const [viewList, setviewlist] = useState(false);
    const [viewmodule, setviewmodule] = useState(true);
    const [openFilter, setOpenFilter] = useState(false);
    const [getfilterAZ, setFilterAZ] = useState(false);
    const [getfilterZA, setFilterZA] = useState(false);
    const [searchResult, setSearchResult] = useState([]);
    const [getSearch, setSearch] = useState("");
    const [currentPage, setCurrentPage] = useState(1);
    const [postPerPage, setPostPerPage] = useState(15);

    const lastPostIndex = currentPage * postPerPage;
    const firstPostIndex = lastPostIndex - postPerPage;
    const currentPosts = getdisplayPerumahanData.slice(firstPostIndex, lastPostIndex);


    const DataSearch = (props.perumahanresult.data.map((item) => (item.nama)));
    const fetchSearch = (value) => {
        const resultSearch = DataSearch.filter((DataSearch) => {
            return value && DataSearch && DataSearch.toLowerCase().includes(value);
        })
        setSearchResult(resultSearch);
    }

    const handleSearch = (value) => {
        setSearch(value);
        fetchSearch(value);
    }

    const handleViewList = () => {
        setviewlist(true);
        setviewmodule(false);
    }
    const handleViewModule = () => {
        setviewmodule(true);
        setviewlist(false);
    }
    const handleOpenFilter = () => {
        setOpenFilter(!openFilter);
    }
    const handleFilterAZ = () => {
        setFilterAZ(!getfilterAZ);
        setDisplayPerumahanData(props.filterAZ);
        setFilterZA(false);
        if (getfilterAZ === true) {
            setDisplayPerumahanData(props.perumahan);
        }
    }
    const handleFilterZA = () => {
        setFilterZA(!getfilterZA);
        setDisplayPerumahanData(props.filterZA);
        setFilterAZ(false);
        if (getfilterZA === true) {
            setDisplayPerumahanData(props.perumahan);
        }
    }

    const handleGetSearch = () => {
        router.visit(`/katalog?fetchSearch=${getSearch}`);
    }
    const handleManyPerPage = (e) => {
        setPostPerPage(e.target.value)
        setCurrentPage(1)
    }
    
    return (
        <>
            <div>
                <Head title='Katalog' />
                <div className='w-full mb-20'>
                    <NavbarSecond />
                    <div className='w-full flex flex-col sm:flex-row justify-end items-end mt-28 mb-3'>
                        <div>
                            <SearchComp
                                type={"text"}
                                placeholder={"Search..."}
                                value={getSearch}
                                onChange={(e) => handleSearch(e.target.value)}
                                handleGet={handleGetSearch}
                            />
                            <div className='w-full flex justify-center'>
                                <div className='w-64 flex bg-base-100 flex-col shadow-md rounded-lg max-h-72 overflow-y-scroll absolute z-10'>
                                    {searchResult.map((result, idx) => {
                                        return <div key={idx} className='p-4 hover:bg-base-300 hover:cursor-pointer' onClick={(e) => { setSearch(result); setSearchResult([]) }}>{result}</div>
                                    })}
                                </div>
                            </div>
                        </div>
                        <div className='flex flex-row my-2 sm:my-0'>
                            <button className='btn mx-2 btn-square' onClick={handleViewList}>
                                <ListIcon fontSize='medium' />
                            </button>
                            <button className='btn mx-2 btn-square' onClick={handleViewModule}>
                                <ViewModuleIcon />
                            </button>
                        </div>
                    </div>
                    <div className='w-full md:pl-80 my-2 flex flex-row justify-between items-center pr-5'>
                        <LittlePaginator
                            totalPosts={props.perumahan.length}
                            postsPerPage={postPerPage}
                            setCurrentPage={setCurrentPage}
                            currentPage={currentPage}
                        />
                        <select className="select select-bordered text-base" value={postPerPage} onChange={handleManyPerPage}>
                            <option value="15">x15</option>
                            <option value="25">x25</option>
                            <option value="50">x50</option>
                        </select>
                    </div>
                    <div className='w-full flex justify-center md:pl-72 p-2'>
                        {props.perumahan.length ? (
                            <>
                                <div className={viewmodule ? 'w-full flex flex-wrap gap-3 justify-center' : 'hidden'}>
                                    {props.perumahan.length <= 0 ? (
                                        <div>Tidak data yang sesuai</div>
                                    ) : (<CardComp perumahan={currentPosts} UrlImage={props.ziggy.url} UrlName="perumahanpage" />)}
                                </div>
                                {viewList && (
                                    <TableComp perumahan={currentPosts} firstPostindex={firstPostIndex} />
                                )}
                            </>
                        ) : (
                            <h1>Tidak Ada Data</h1>
                        )}
                    </div>
                    <div className='w-full md:pl-80 my-2 flex flex-row justify-center items-center pr-5'>
                        <Paginator
                            totalPosts={props.perumahan.length}
                            postsPerPage={postPerPage}
                            setCurrentPage={setCurrentPage}
                            currentPage={currentPage}
                        />
                    </div>
                </div>
                <div className='hidden md:block'>
                    <FilterComp
                        data={props.perumahanresult.data}
                        handleFilterAZ={handleFilterAZ}
                        getfilterAZ={getfilterAZ}
                        handleFilterZA={handleFilterZA}
                        getfilterZA={getfilterZA}
                        filterKelurahan={props.kelurahan}
                        filterKecamatan={props.kecamatan}
                        filterYears={props.years}
                    />
                </div>
                <div className='md:hidden h-screen fixed flex top-28 -left-3'>
                    <button className='btn btn-neutral txt-filter' onClick={handleOpenFilter}>
                        FILTER
                    </button>
                </div>
                {openFilter && (
                    <div>
                        <FilterComp
                            data={props.perumahanresult.data}
                            handleFilterAZ={handleFilterAZ}
                            getfilterAZ={getfilterAZ}
                            handleFilterZA={handleFilterZA}
                            getfilterZA={getfilterZA}
                            handleOpenFilter={handleOpenFilter}
                            filterKelurahan={props.kelurahan}
                            filterKecamatan={props.kecamatan}
                            filterYears={props.years}
                        />
                    </div>
                )}
            </div>
            <footer className='w-full bg-zinc-900 px-10 py-5 text-white text-xs fixed bottom-0 left-0'>
                <span>© Copyright 2023</span>
                <span className='mx-2 font-bold'>SITUS RESMI DINAS PERUMAHAN RAKYAT DAN KAWASAN PERMUKIMAN Kabupaten Pesawaran</span>
            </footer>
        </>
    )
}

export default KatalogPage