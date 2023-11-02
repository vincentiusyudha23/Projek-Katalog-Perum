import { Link } from '@inertiajs/react';


export default function Guest({ children }) {
    return (
        <div className="min-h-screen bg-base-100 flex flex-col justify-center items-center px-3 sm:pt-0">
            <div className='flex flex-col justify-center items-center'>
                <Link href="/">
                    <img src='lambang.png' alt='lambang.png' className='w-16' />
                </Link>
                <h1 className='font-black'>
                    KATALOG PERUMAHAN DIGITAL
                </h1>
            </div>

            <div className="w-full border border-base-300 sm:max-w-md mt-6 px-6 py-4 bg-base-100 shadow-md overflow-hidden sm:rounded-lg flex flex-col">
                {children}
            </div>
        </div>
    );
}
