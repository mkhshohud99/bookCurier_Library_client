import React, { useContext, useState } from 'react';
import { Link } from 'react-router';
import { AuthContext } from '../provider/AuthProvider';
import { signOut } from 'firebase/auth';
import auth from '../firebase/firebase.config';

const Navbar = () => {

    const { user } = useContext(AuthContext);
    const [isCheked, setIsChecked] = useState(true)

    const handleLogOut = () => {
        signOut(auth)
    }
    const handleThemeColour = () => {
        setIsChecked(!isCheked)
        if (isCheked) {
            document.querySelector('html').setAttribute('data-theme', 'dark')
        } else {
            document.querySelector('html').setAttribute('data-theme', 'light')
        }

    }


    return (
        <div className="navbar bg-base-100 shadow-sm">
            <div className="navbar-start">
                <div className="dropdown">
                    <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"> <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h8m-8 6h16" /> </svg>
                    </div>
                    <ul
                        tabIndex="-1"
                        className="menu menu-sm dropdown-content bg-base-100 rounded-box z-1 mt-3 w-52 p-2 shadow">
                        <li><Link to={'/'}>Home</Link></li>
                    </ul>
                </div>
                <Link to={'/'} className="btn btn-ghost text-xl">Book Curier Library </Link>
            </div>
            <div className="navbar-center hidden lg:flex">
                <ul className="menu menu-horizontal px-1">
                    <li><Link to={'/'}>Home</Link></li>
                </ul>
            </div>
            <div className="navbar-end flex justify-end gap-2">
                {
                    user && <div className="navbar-end flex  gap-3">
                        <button className="btn"><Link to={'/dashboard'}>Dashboard</Link></button>
                        <button onClick={handleLogOut} className="btn"><Link to={'/'}>Log Out</Link></button>
                    </div>
                }
                {
                    !user && <div className="navbar-end">
                        <Link to={'/login'} className="btn">Login</Link>
                    </div>
                }
                <label className="toggle text-base-content">
                    <input type="checkbox" onClick={handleThemeColour} value="synthwave" className="theme-controller" />

                    <svg aria-label="sun" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><g strokeLinejoin="round" strokeLinecap="round" strokeWidth="2" fill="none" stroke="currentColor"><circle cx="12" cy="12" r="4"></circle><path d="M12 2v2"></path><path d="M12 20v2"></path><path d="m4.93 4.93 1.41 1.41"></path><path d="m17.66 17.66 1.41 1.41"></path><path d="M2 12h2"></path><path d="M20 12h2"></path><path d="m6.34 17.66-1.41 1.41"></path><path d="m19.07 4.93-1.41 1.41"></path></g></svg>

                    <svg aria-label="moon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><g strokeLinejoin="round" strokeLinecap="round" strokeWidth="2" fill="none" stroke="currentColor"><path d="M12 3a6 6 0 0 0 9 9 9 9 0 1 1-9-9Z"></path></g></svg>

                </label>
            </div>
        </div>
    );
};

export default Navbar;