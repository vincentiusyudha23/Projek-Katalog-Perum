import { Link } from '@inertiajs/react';

export default function NavLink({ active = false, className = '', children, ...props }) {
    return (
        <Link
            {...props}
            className={`w-4/5 flex h-10 items-center justify-center rounded-xl my-2 ${active ? 'btn-neutral' : 'bg-base-200 hover:bg-base-300 focus:bg-base-300'} ${className}`}>
            {children}
        </Link>
    );
}
