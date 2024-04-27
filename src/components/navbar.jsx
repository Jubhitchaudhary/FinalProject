import './navbar.css'
import React from 'react';
import { Link } from 'react-router-dom';



const Nav = (props) => {
    return (
        <div className='Nav'>
            <div className='left'>
                <Link to='/'><span>Football Hub</span></Link>
            </div>
            <div className='right'>
                
                <Link to='/'>Home</Link>
                <Link to='/create'>Create New Post</Link>
            </div>
        </div>
    )   
}

export default Nav;
