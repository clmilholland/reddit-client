import React from "react";
import Searchbar from "../searchbar/searchbar";
import './header.css';


const Header = () => {

    

    return (
        <div className='headerContainer'>
            <a className='redditAnchorContainer'>
                <img src={require('../../resources/images/reddit-icon-new-2023-logo-3F12137D65-seeklogo.com.png')} alt='reddit logo' className='redditLogo'/>
                <a className='redditAnchor'>Reddit</a>
            </a>
            <Searchbar />
        </div>
    )


};

export default Header;