import React from "react";
import Searchbar from "../searchbar/searchbar";
import './header.css';
import reddit_icon from '../../resources/images/reddit_icon.png'


const Header = () => {

    

    return (
        <div className='headerContainer'>
            <a className='redditAnchorContainer'>
                <img src={reddit_icon} alt='reddit logo' className='redditLogo'/>
                <a className='redditAnchor'>Reddit</a>
            </a>
            <Searchbar />
        </div>
    )


};

export default Header;