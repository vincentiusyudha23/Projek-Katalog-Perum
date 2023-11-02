import React from 'react'

const ResultsFilter = ({ results, setInput, setResult }) => {
    return (
        <div className='w-full flex justify-center'>
            <div className='w-10/12 flex bg-base-100 flex-col shadow-md rounded-lg max-h-72 overflow-y-scroll absolute'>
                {results.map((result, idx) => {
                    return <div key={idx} className='p-2 hover:bg-base-300 hover:cursor-pointer' onClick={(e) => { setInput(result); setResult([]) }}>{result}</div>
                })}
            </div>
        </div>
    )
}

export default ResultsFilter