import CardComp from '@/Components/CardComp';
import LittlePaginator from '@/Components/LittlePaginator';
import Paginator from '@/Components/Paginator';
import SearchComp from '@/Components/SearchComp';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, router } from '@inertiajs/react';
import { useState } from 'react';

export default function Dashboard(props) {
    const [searchResult, setSearchResult] = useState([]);
    const [getSearch, setSearch] = useState('');
    const [currentPage, setCurrentPage] = useState(1);
    const [postPerPage, setPostPerPage] = useState(15);

    const lastPostIndex = currentPage * postPerPage;
    const firstPostIndex = lastPostIndex - postPerPage;
    const currentPosts = props.perumahan.data.slice(firstPostIndex, lastPostIndex);

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
    const handleGetSearch = () => {
        router.visit(`/admin/dashboard?fetchSearch=${getSearch}`)
        setSearch('');
    }
    const handleManyPerPage = (e) => {
        setPostPerPage(e.target.value)
        setCurrentPage(1)
    }

    return (
        <AuthenticatedLayout
            user={props.auth.user}
            title="Dashboard"
        >
            <Head title="Dashboard" />

            <div className='py-5 px-1 overflow-scroll overflow-x-hidden max-h-[90vh] bg-base-200'>

                <div className='w-full p-3 flex justify-end'>
                    <div>
                        <SearchComp
                            placeholder="Search..."
                            type="text"
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
                </div>
                <div className='w-full flex justify-between my-1 px-10'>
                    <LittlePaginator
                        totalPosts={props.perumahan.data.length}
                        postsPerPage={postPerPage}
                        setCurrentPage={setCurrentPage}
                        currentPage={currentPage}
                    />
                    <div>
                        <select className="select select-bordered text-base" value={postPerPage} onChange={handleManyPerPage}>
                            <option value="15">x15</option>
                            <option value="25">x25</option>
                            <option value="50">x50</option>
                        </select>
                    </div>
                </div>
                <div className='flex justify-center flex-col  sm:flex-row sm:flex-wrap sm:items-stretch items-center gap-4 p-4'>
                    <CardComp perumahan={currentPosts} UrlImage={props.ziggy.url} UrlName="dashboard.perumahan" />
                </div>
                <div className='w-full flex justify-center my-3'>
                    <Paginator
                        totalPosts={props.perumahan.data.length}
                        postsPerPage={postPerPage}
                        setCurrentPage={setCurrentPage}
                        currentPage={currentPage}
                    />
                </div>
            </div>

        </AuthenticatedLayout>
    );
}
