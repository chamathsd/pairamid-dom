import React, { useState } from 'react'
import logo from '../../assets/pairamid-logo.png';
import { Link, useRouteMatch } from "react-router-dom";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faUserFriends, faBalanceScale, faHistory, faCog, faCalendarAlt, faBars } from '@fortawesome/free-solid-svg-icons'

const ListIconLink = ({path, icon, text}) => {
    return (
        <Link to={path}>
            <li className='text-gray my-2 lg:mx-0 hover:text-green-icon hover:bg-gray-light lg:hover:bg-white'>
                <FontAwesomeIcon icon={icon} />
                <span className='ml-2'>{text}</span>
            </li>
        </Link>
    )
}

const Header = () => {
    const match = useRouteMatch()
    const [collapsed, setCollapsed] = useState(true)
    let classes = collapsed ? 'hidden' : 'block my-4'
    return (
        <div>
            <header className="p-4 border-gray-border border-b-2 lg:pt-12 lg:block lg:justify-center lg:h-screen lg:border-r-2 lg:border-b-0">
                <div className='flex items-center justify-between '>
                    <button className='focus:outline-none lg:hidden' onClick={(e)=> setCollapsed(!collapsed)}>
                        <FontAwesomeIcon icon={faBars} />
                    </button>

                    <Link to='/'>
                        <div className='lg:my-8'>
                            <img src={logo} alt='Paramid Logo' width="169" height="40" className="w-full max-w-logo lg:mt-8" />
                        </div>
                    </Link>

                    <Link to={match.url}>
                        <div className='focus:outline-none lg:hidden'>
                            <FontAwesomeIcon icon={faUserFriends} />
                        </div>
                    </Link>
                </div>

                <ul onClick={()=> setCollapsed(true)} className={`lg:block lg:text-base ${classes}`}>
                    <ListIconLink path={`${match.url}`} icon={faUserFriends} text='Today' />
                    <ListIconLink path={`${match.url}/frequency`} icon={faBalanceScale} text='Frequency' />
                    <ListIconLink path={`${match.url}/history`} icon={faHistory} text='History' />
                    <ListIconLink path={`${match.url}/settings`} icon={faCog} text='Settings' />
                    <ListIconLink path={`${match.url}/calendar`} icon={faCalendarAlt} text='Calendar' />
                </ul>
            </header>
        </div>
    )
}

export default Header;
