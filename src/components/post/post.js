import React, { useReducer } from "react";
import DOMPurify from 'dompurify';
import snoovatar from '../../resources/images/snoovatar.png'
import './post.css';
import { LuArrowBigUp, LuArrowBigDown } from "react-icons/lu";
import { FaRegCommentAlt } from "react-icons/fa";

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
    

    const determineSelfText = () => {
        if (post.data.selftext !== '') {
            return <p dangerouslySetInnerHTML={{ __html: text}} className="text" ></p>;
        } 
    }
    const selfText = determineSelfText();
    
    
    
    const determineThumbnail = (thumbnail) => {
        if(thumbnail) {
            const imageUrl = post.data.preview.images[0].source.url;
            const decodedUrl = imageUrl.replace(/&amp;/g, '&');
            const backgroundStyle = {
                backgroundImage: `url(${decodedUrl}`,
                filter: 'blur',
            }
            return (
                <>
                    <div className="thumbnailContainer"  >
                        <div className="blurBackground" style={backgroundStyle}></div>
                        <div className="thumbnail" >
                            <img src={decodedUrl} className="thumbnailImg" ></img>
                        </div>
                    </div>
                </>
            )
        } else {
            return null;
        }
    }
    const thumbnail = determineThumbnail(post.data?.preview)


    const determineUserProfile = () => {
        let i = 0;
        for ( i ; i < userProfile.length; i++) {
            if (userProfile[i].name === post.data.author) {
                if (userProfile[i].snoovatar_img === "") {
                    return (
                        <>
                            <img className="userProfilePic" src={snoovatar}></img>
                            <h3 className="userProfileName" >u/{userProfile[i].name}</h3>
                        </>
                    )
                } else {
                    return (
                        <>
                            <img className="userProfilePic" src={userProfile[i].snoovatar_img}></img>
                            <h3 className="userProfileName" >u/{userProfile[i].name}</h3>
                        </>
                    )
                }
            }      
        }
        return <p>no match</p>
    }
    const displayUser = determineUserProfile();
    


    return (
        <div className="postContainer" >
            <div className="user" >{displayUser}</div>
            <h3 className="title" >{post.data.title}</h3>
            <div>{selfText}</div>
            {thumbnail}
            <div className="postData" >
                <div className="ups" >
                    <LuArrowBigUp className="arrow" />
                    <p className="data" >{post.data.ups}</p>
                </div>               
                <div className="comments" >
                    <FaRegCommentAlt className="comment" />
                    <p className="data" >{post.data.num_comments}</p>
                </div>
            </div>
        </div>
    )
}

export default Post;