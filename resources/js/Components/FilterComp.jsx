import React, { useState } from 'react'
import Autocomplete from './AutoComplete';
import CloseIcon from '@mui/icons-material/Close';
import { router } from '@inertiajs/react';
import ResultsFilter from './ResultsFilter';



const FilterComp = ({ data, handleFilterAZ, getfilterAZ, handleFilterZA, getfilterZA, handleOpenFilter, filterKelurahan, filterKecamatan, filterYears }) => {
    const [results1, setResults1] = useState([]);
    const [results2, setResults2] = useState([]);
    const [results3, setResults3] = useState([]);
    const [inputKelurahan, setInputKelurahan] = useState("");
    const [inputKecamatan, setInputKecamatan] = useState("");
    const [inputYears, setInputYears] = useState("");
    const KelurahanData = [...new Set((data.map((item) => (item.kelurahan))))];
    const KeCamatanData = [...new Set((data.map((item) => (item.kecamatan))))];
    const years = [];

    for (let year = 1900; year <= 2099; year++) {
        years.push(year);
    }

    const fetchKelurahan = (value) => {
        const resultsfilter = KelurahanData.filter((KelurahanData) => {
            return value && KelurahanData && KelurahanData.toLowerCase().includes(value);
        })
        setResults1(resultsfilter);
    }
    const fetchKecamatan = (value) => {
        const resultsfilter = KeCamatanData.filter((KeCamatanData) => {
            return value && KeCamatanData && KeCamatanData.toLowerCase().includes(value);
        })
        setResults2(resultsfilter);
    }
    const fetchYears = (value) => {
        const resultsfilter = years.filter((years) => {
            return value && years && years.toString().includes(value);
        })
        setResults3(resultsfilter);
    }

    const handleYears = (value) => {
        setInputYears(value);
        fetchYears(value);
    }

    const handleKelurahan = (value) => {
        setInputKelurahan(value);
        fetchKelurahan(value);
    }
    const handleKecamatan = (value) => {
        setInputKecamatan(value);
        fetchKecamatan(value);
    }

    const handleClearFilter = () => {
        setInputKelurahan("");
        setInputKecamatan("");
        router.visit('/katalog');
    }

    const handleSearchFilter = () => {
        router.visit(`/katalog?kelurahan=${inputKelurahan}&kecamatan=${inputKecamatan}&years=${inputYears}`);
    }
    return (
        <div className='fixed top-0 left-0 justify-center items-center flex-col flex bg-base-100 border-r border-base-300 w-full h-screen md:w-72 animasi-filter' >
            <div className='flex w-full justify-center'>
                <h1>Short By</h1>
                <div className='absolute md:hidden hover:cursor-pointer right-0'>
                    <CloseIcon className='mx-3' onClick={handleOpenFilter} />
                </div>
            </div>
            <div className='w-full flex px-10 py-2'>
                <div className="form-control">
                    <label className="label cursor-pointer">
                        <input type="checkbox" className="checkbox" checked={getfilterAZ} onChange={handleFilterAZ} />
                        <span className="label-text mx-2" >Nama A-Z</span>
                    </label>
                    <label className="label cursor-pointer">
                        <input type="checkbox" className="checkbox" checked={getfilterZA} onChange={handleFilterZA} />
                        <span className="label-text mx-2">Nama Z-A</span>
                    </label>
                </div>
            </div>
            <div className='flex w-full justify-center'>
                <h1>Filter</h1>
            </div>
            <div className='w-full items-center'>
                <Autocomplete
                    title={"Desa"}
                    type={"text"}
                    value={inputKelurahan}
                    onChange={(e) => handleKelurahan(e.target.value)}
                    placeholder={filterKelurahan}
                />
                <ResultsFilter results={results1} setInput={setInputKelurahan} setResult={setResults1} />
            </div>
            <div className='w-full items-center'>
                <Autocomplete
                    title={"Kecamatan"}
                    type={"text"}
                    value={inputKecamatan}
                    onChange={(e) => handleKecamatan(e.target.value)}
                    placeholder={filterKecamatan}
                />
                <ResultsFilter results={results2} setInput={setInputKecamatan} setResult={setResults2} />
            </div>
            <div className='w-full items-center'>
                <Autocomplete
                    title={"Tahun Berdiri"}
                    type={"number"}
                    value={inputYears}
                    onChange={(e) => handleYears(e.target.value)}
                    placeholder={filterYears}
                />
                <ResultsFilter results={results3} setInput={setInputYears} setResult={setResults3} />
            </div>
            <div className='w-full flex justify-end py-5 px-6'>
                <span className='flex justify-center items-center mx-2 text-sm hover:cursor-pointer hover:text-gray-400' onClick={handleClearFilter}>Lepas Filter</span>
                <button className="btn" onClick={handleSearchFilter}>search</button>
            </div>
        </div>
    )
}

export default FilterComp