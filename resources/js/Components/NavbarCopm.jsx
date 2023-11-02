import React, { useState, useEffect } from 'react'
import { Link } from '@inertiajs/react';
import MenuIcon from '@mui/icons-material/Menu';



const NavbarCopm = () => {
    const [isNavbarFixed, setIsNavbarFixed] = useState(false);
    const [openMenuNavigasi, setOpenMenuNavigasi] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            const scrollTop = window.scrollY;
            if (scrollTop > 10) {
                setIsNavbarFixed(true);
            } else {
                setIsNavbarFixed(false);
            }
        };

        window.addEventListener('scroll', handleScroll);

        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    }, []);

    const handleOpenMenuNavigasi = () => {
        setOpenMenuNavigasi(!openMenuNavigasi);
    }
    return (
        <>
            <div className={isNavbarFixed ? 'hidden-nav navbar' : 'navbar'}>
                <img src='Lambang.png' className='img-lambang' alt='lambang.png' />
                <div className='w-48 flex justify-between navigasi'>
                    <Link href={route('homepage')}>
                        <h5 className='text-white'>Home</h5>
                    </Link>
                    <Link href={route('katalogpage')}>
                        <h5 className='text-white'>Katalog</h5>
                    </Link>
                    <Link href='#'>
                        <h5 className='text-white'>About Us</h5>
                    </Link>
                </div>
                <div className="menu-navigasi">
                    <MenuIcon onClick={handleOpenMenuNavigasi} />
                </div>
            </div>
            {openMenuNavigasi && (
                <div className='open-menu-navigasi'>
                    <Link href={route('homepage')}>
                        <h5 >Home</h5>
                    </Link>
                    <Link href={route('katalogpage')}>
                        <h5>Katalog</h5>
                    </Link>
                    <Link href='#'>
                        <h5>About Us</h5>
                    </Link>
                </div>
            )}
        </>
    )
}

export default NavbarCopm