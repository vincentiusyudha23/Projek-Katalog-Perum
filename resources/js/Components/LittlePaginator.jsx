import React from 'react'


const LittlePaginator = ({ totalPosts, postsPerPage, setCurrentPage, currentPage }) => {
    let pages = [];

    for (let i = 1; i <= Math.ceil(totalPosts / postsPerPage); i++) {
        pages.push(i)
    }

    return (
        <div className='flex items-center flex-wrap'>
            Page
            {
                pages.map((page, idx) => {
                    return <div className='flex flex-row' key={idx} onClick={() => setCurrentPage(page)}>
                        <h1 className={`mx-2 hover:cursor-pointer hover:bg-base-content hover:text-base-100 hover:px-2 hover:rounded-sm ${page == currentPage ? 'bg-base-content text-base-100 px-2 rounded-sm' : ''}`}>
                            {page}
                        </h1>
                        <h1>/</h1>
                    </div>
                })
            }
        </div>
    )
}

export default LittlePaginator