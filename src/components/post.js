import React, { useReducer } from "react";
import DOMPurify from 'dompurify';
import snoovatar from '../resources/images/snoovatar.png'

const Post = ({post, userProfile}) => {

    
    function makeClickableLinks (text) {
        const cleanedText = text.replace(/[\[\]\(\)\*]/g, '');
        const urlRegex = /(https?:\/\/[^\s]+)/g;
        const html = cleanedText.replace(urlRegex, (url) => {
            return ` <a href="${url}" target="_blank" rel="noopener noreferrer">${url}</a> `;
        });
        return DOMPurify.sanitize(html)
    };
    const text = makeClickableLinks(post.data.selftext);
    
    
    const determineThumbnail = (thumbnail) => {
        if(thumbnail !== 'self') {
            return <img src={post.data.thumbnail}></img>
        } else {
            return null;
        }
    }
    const thumbnail = determineThumbnail(post.data.thumbnail)


    const determineUserProfile = () => {
        let i = 0;
        for ( i ; i < userProfile.length; i++) {
            if (userProfile[i].name === post.data.author) {
                if (userProfile[i].snoovatar_img === "") {
                    return (
                        <>
                            <img src={snoovatar}></img>
                            <h2>{userProfile[i].name}</h2>
                        </>
                    )
                } else {
                    return (
                        <>
                            <img src={userProfile[i].snoovatar_img}></img>
                            <h2>{userProfile[i].name}</h2>
                        </>
                    )
                }
            }      
        }
        return <p>no match</p>
    }
    const displayUser = determineUserProfile();
    


    return (
        <div>
            <div>{displayUser}</div>
            <div>{thumbnail}</div>
            <p dangerouslySetInnerHTML={{ __html: text}}></p>
        </div>
    )
}

export default Post;