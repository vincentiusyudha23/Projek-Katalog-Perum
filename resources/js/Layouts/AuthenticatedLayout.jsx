import { useState, useEffect } from 'react';
import Dropdown from '@/Components/Dropdown';
import NavLink from '@/Components/NavLink';
import Lambang from '/public/lambang.png';
import { BiExit } from 'react-icons/bi';
import { AiOutlineMenu, AiOutlineUser, AiOutlineAppstore, AiOutlinePlusCircle, AiOutlineEdit } from 'react-icons/ai';



export default function Authenticated({ user, title, children }) {
    const [theme, setTheme] = useState(localStorage.getItem("theme") ? localStorage.getItem("theme") : 'light');
    const [opensidebar, setOpenSideBar] = useState(false);
    const [openMobileSideBar, setOpenMobileSideBar] = useState(false);


    useEffect(() => {
        localStorage.setItem("theme", theme);
        const localTheme = localStorage.getItem("theme");
        document.querySelector("html").setAttribute("data-theme", localTheme)

        const handleResize = () => {
            if (window.innerWidth < 850) {
                setOpenSideBar(false)
            }
        }
        window.addEventListener('resize', handleResize);
        handleResize();

        return () => {
            window.removeEventListener('resize', handleResize);
        };
    }, [theme]);

    const handleToggle = (e) => {
        if (e.target.checked) {
            setTheme("dark");
        } else {
            setTheme("light");
        }
    }

    const handleOpenMobileSideBar = () => {
        setOpenMobileSideBar(!openMobileSideBar);
    }



    return (
        <div className="bg-base-100 max-w-full max-h-screen flex">
            {/* Box Kiri */}
            <div className={`sm:block sm:sticky z-50 sm:z-0 ${openMobileSideBar ? 'left-0' : '-left-96'} fixed bg-base-100 h-screen transition-width border-r border-base-200 shadow-md ${opensidebar ? 'w-1/5 ' : 'w-[100px]'}`}>
                <div className={opensidebar ? 'w-full flex justify-end px-5 py-2' : 'w-full flex justify-center py-2'}>
                    <button className='hidden sm:flex btn btn-sm btn-square' onClick={() => setOpenSideBar(!opensidebar)}>
                        {opensidebar ? (
                            <BiExit size={20} className='rotate-180' />
                        ) : (
                            <AiOutlineMenu size={20} />
                        )}
                    </button>
                    {openMobileSideBar !== false && (
                        <button className='btn btn-sm btn-square' onClick={() => setOpenMobileSideBar(!openMobileSideBar)}>
                            <AiOutlineMenu size={20} />
                        </button>
                    )}
                </div>
                <div className='w-full flex flex-col justify-center items-center'>
                    <img src={Lambang} alt='lambang.png' className={`py-2 transition-width ${opensidebar ? 'w-12' : 'w-9'}`} />
                    {opensidebar ? (
                        <span className='mb-2 font-semibold text-center text-sm'>Katalog Perumahan Digital</span>
                    ) : (
                        null
                    )}
                </div>
                <div className='w-full flex flex-col justify-center items-center'>
                    <NavLink href={route('dashboard')} active={route().current('dashboard')} className={opensidebar ? '' : ' flex-col items-center'}>
                        <AiOutlineAppstore size={20} className='mx-1' />
                        <span className={opensidebar ? 'capitalize mx-3 text-xs lg:text-base' : 'text-xs capitalize'}>Dashboard</span>
                    </NavLink>
                    <NavLink href={route('createdata')} active={route().current('createdata')} className={opensidebar ? '' : ' flex-col items-center'}>
                        <AiOutlinePlusCircle size={20} className='mx-1' />
                        <span className={opensidebar ? 'capitalize mx-3 text-xs lg:text-base' : 'text-xs capitalize'}>Create Data</span>
                    </NavLink>
                    <NavLink href={route('editdata')} active={route().current('editdata')} className={opensidebar ? '' : ' flex-col items-center'}>
                        <AiOutlineEdit size={20} className='mx-1' />
                        <span className={opensidebar ? 'capitalize mx-3 text-xs lg:text-base' : 'text-xs capitalize text-center'}>
                            Edit Data
                            {opensidebar ? (<span> Perumahan</span>) : (null)}
                        </span>
                    </NavLink>
                </div>
            </div>
            {/* Box Kanan */}
            <div className={opensidebar ? 'w-4/5 transition-width max-h-screen' : 'w-full max-h-screen transition-width'}>
                <div className='w-full h-[10vh] bg-base-100 p-5 flex justify-between items-center shadow-md'>
                    <div className='flex items-center'>
                        <button className='btn btn-square btn-ghost mr-3 sm:hidden' onClick={handleOpenMobileSideBar}>
                            <AiOutlineMenu size={20} />
                        </button>
                        <h1>{title}</h1>
                    </div>
                    <div className='flex'>
                        <div className="sm:flex items-center">
                            <div className="relative">
                                <Dropdown>
                                    <Dropdown.Trigger>
                                        <span className="inline-flex rounded-md">
                                            <button
                                                type="button"
                                                className="btn btn-ghost text-md capitalize transition ease-in-out duration-150 flex items-center"
                                            >
                                                <AiOutlineUser size={18} />
                                                <span className='hidden sm:block'>
                                                    {user.name}
                                                </span>
                                                <svg
                                                    className="ml-2 -mr-0.5 h-4 w-4"
                                                    xmlns="http://www.w3.org/2000/svg"
                                                    viewBox="0 0 20 20"
                                                    fill="currentColor"
                                                >
                                                    <path
                                                        fillRule="evenodd"
                                                        d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                                                        clipRule="evenodd"
                                                    />
                                                </svg>
                                            </button>
                                        </span>
                                    </Dropdown.Trigger>
                                    <Dropdown.Content>
                                        <Dropdown.Link href={route('profile.edit')}>Profile</Dropdown.Link>
                                        <Dropdown.Link href={route('logout')} method="post" as="button">
                                            Log Out
                                        </Dropdown.Link>
                                    </Dropdown.Content>
                                </Dropdown>
                            </div>
                        </div>
                        <label className="swap swap-rotate mx-5">
                            <input type="checkbox" className='hidden' onChange={handleToggle} checked={theme === "light" ? false : true} />
                            <svg className="swap-on fill-current w-6 h-6" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path d="M5.64,17l-.71.71a1,1,0,0,0,0,1.41,1,1,0,0,0,1.41,0l.71-.71A1,1,0,0,0,5.64,17ZM5,12a1,1,0,0,0-1-1H3a1,1,0,0,0,0,2H4A1,1,0,0,0,5,12Zm7-7a1,1,0,0,0,1-1V3a1,1,0,0,0-2,0V4A1,1,0,0,0,12,5ZM5.64,7.05a1,1,0,0,0,.7.29,1,1,0,0,0,.71-.29,1,1,0,0,0,0-1.41l-.71-.71A1,1,0,0,0,4.93,6.34Zm12,.29a1,1,0,0,0,.7-.29l.71-.71a1,1,0,1,0-1.41-1.41L17,5.64a1,1,0,0,0,0,1.41A1,1,0,0,0,17.66,7.34ZM21,11H20a1,1,0,0,0,0,2h1a1,1,0,0,0,0-2Zm-9,8a1,1,0,0,0-1,1v1a1,1,0,0,0,2,0V20A1,1,0,0,0,12,19ZM18.36,17A1,1,0,0,0,17,18.36l.71.71a1,1,0,0,0,1.41,0,1,1,0,0,0,0-1.41ZM12,6.5A5.5,5.5,0,1,0,17.5,12,5.51,5.51,0,0,0,12,6.5Zm0,9A3.5,3.5,0,1,1,15.5,12,3.5,3.5,0,0,1,12,15.5Z" /></svg>
                            <svg className="swap-off fill-current w-6 h-6" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path d="M21.64,13a1,1,0,0,0-1.05-.14,8.05,8.05,0,0,1-3.37.73A8.15,8.15,0,0,1,9.08,5.49a8.59,8.59,0,0,1,.25-2A1,1,0,0,0,8,2.36,10.14,10.14,0,1,0,22,14.05,1,1,0,0,0,21.64,13Zm-9.5,6.69A8.14,8.14,0,0,1,7.08,5.22v.27A10.15,10.15,0,0,0,17.22,15.63a9.79,9.79,0,0,0,2.1-.22A8.11,8.11,0,0,1,12.14,19.73Z" /></svg>
                        </label>
                    </div>
                </div>
                <main >{children}</main>
            </div>
        </div>
    );
}
