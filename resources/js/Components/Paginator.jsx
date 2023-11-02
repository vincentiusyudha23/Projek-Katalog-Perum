import React from 'react'

const Paginator = ({ totalPosts, postsPerPage, setCurrentPage, currentPage }) => {
    let pages = [];

    for (let i = 1; i <= Math.ceil(totalPosts / postsPerPage); i++) {
        pages.push(i)
    }

    return (
        <div className="join flex flex-wrap gap-2">
            {currentPage === 1 ? (<button onClick={() => setCurrentPage(currentPage - 1)} disabled className="join-item btn btn-outline">«</button>) : (<button onClick={() => setCurrentPage(currentPage - 1)} className="join-item btn btn-outline">«</button>)}
            {pages.map((page, idx) => {
                return <button onClick={() => setCurrentPage(page)} className={`join-item btn ${page == currentPage ? 'btn-neutral' : 'btn-outline'}`} key={idx}>{page}</button>
            })}
            {currentPage === pages.length ?
                (<button className="join-item btn btn-outline" disabled>»</button>)
                : (<button onClick={() => setCurrentPage(currentPage + 1)} className="join-item btn btn-outline">»</button>)}
        </div>
    )
}
export default Paginator