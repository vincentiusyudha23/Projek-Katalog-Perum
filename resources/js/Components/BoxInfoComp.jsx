const BoxInfoComp = ({ title, content, ifSup }) => {
    return (
        <div className='w-full flex flex-col items-center my-1 sm:my-2'>
            <label className="label w-full p-0 px-2">
                <span className="label-text text-sm">{title}</span>
            </label>
            <div className='border-b-2 px-5 text-md sm:text-base font-bold input-bordered w-full flex items-center capitalize'>
                {content !== null ? (
                    <>
                        {content}
                    </>
                ) : (<span>-</span>)}
                {ifSup}
            </div>
        </div>
    )
}
export default BoxInfoComp