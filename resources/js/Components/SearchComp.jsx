import React from 'react'

const SearchComp = ({ handleGet, ...props }) => {
    const handleKeySearch = (event) => {
        if (event.key === 'Enter') {
            handleGet();
        }
    }
    return (
        <div className='mx-2'>
            <div className="form-control">
                <div className="input-group">
                    <input className="input input-bordered" onKeyPress={handleKeySearch} {...props} />
                    <button className="btn btn-square" onClick={handleGet}>
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" /></svg>
                    </button>
                </div>
            </div>
        </div>
    )
}

export default SearchComp