import React from "react";
import Searchbar from "../searchbar/searchbar";
import './header.css';
import reddit_icon from '../../resources/images/reddit_icon.png'


const Header = () => {

    

    return (
        <div className='headerContainer'>
            <div className='redditAnchorContainer'>
                <img src={reddit_icon} alt='reddit logo' className='redditLogo'/>
                <p className='redditAnchor'>Reddit</p>
            </div>
            <Searchbar />
        </div>
    )


};

export default Header;