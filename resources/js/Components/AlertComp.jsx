import React from 'react'

const AlertComp = ({ children }) => {
    return (
        <div className="alert alert-success z-50 fixed w-2/4 right-3 top-20 animate-[notif_0.5s_ease-in-out]">
            <svg xmlns="http://www.w3.org/2000/svg" className="stroke-current shrink-0 h-6 w-6" fill="none" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
            {children}
        </div>
    )
}

export default AlertComp