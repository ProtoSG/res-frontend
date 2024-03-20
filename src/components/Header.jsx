import { FaUserLarge } from "react-icons/fa6";
import { GoHome } from "react-icons/go";
import { IoStatsChart } from "react-icons/io5";
import { RiLogoutBoxLine } from "react-icons/ri";
import { Link, useLocation } from 'react-router-dom';
import { logout } from '../services/login';

function SpanItem({icon, isSelected}) {
    return (
        <span className={`w-12 h-12 rounded-xl  flex justify-center items-center text-2xl group-hover:bg-primary-100 group-hover:text-primary-300
        ${isSelected ? 'bg-primary-100 text-primary-300' : 'bg-bg-200 text-text-200'}
        `}>{icon}</span>
    )

}

function ItemHeader({name, link, icon}) {

    const location = useLocation();
    const isSelected = location.pathname === `/${link}`;
    return (
        <li className='text-xl pb-6'>
            <Link to={`/${link}`} className='flex w-full items-center  hover:bg-primary-100 rounded-xl group'>
                <SpanItem isSelected={isSelected} icon={icon}/>
                <span className="hidden lg:block ml-4">{name}</span>
            </Link>
        </li>
    )
}

export default function Header({user}) {

    const logOut = () => {
        logout()
    }

return (
    <header className='h-[80dvh] w-20 lg:min-w-48 text-text-100 flex flex-col justify-between items-center   '>
        <div className='flex justify-center items-center flex-col'>
            <div className='w-20 h-20 bg-bg-200 rounded-full flex justify-center items-center text-4xl shadow-inner shadow-gray-600 '>
                <FaUserLarge />
            </div>
            <span className='font-semibold text-text-100 mt-4'>{user?.username}</span>
        </div>
        <nav className='lg:w-full'>
            <ul>
                <ItemHeader  name='Home' link='' icon={<GoHome/>} />
                <ItemHeader  name='Dashboard' link='dashboard' icon={<IoStatsChart/>}/>
            </ul>
        </nav>
        <a  href='/res-frontend/login' onClick={logOut} className='group flex items-center text-xl w-full hover:bg-primary-100 rounded-2xl '>
            <SpanItem icon={<RiLogoutBoxLine/>}/>
            <span className="hidden lg:block ml-4">Logout</span>
        </a>
    </header>
    )
}
