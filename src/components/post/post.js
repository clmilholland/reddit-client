import React, { useEffect, useState } from "react";
import snoovatar from '../../resources/images/snoovatar.png'
import './post.css';
import { LuArrowBigUp} from "react-icons/lu";
import { FaRegCommentAlt } from "react-icons/fa";
import { getPostComments } from "../../features/gatherPostComments/gatherPostCommentsSlice";
import { useDispatch, useSelector } from "react-redux";
import {Link} from "react-router-dom";
import { determineSelfText } from "./postFormatting";

const Post = ({post, userProfile}) => {
    const dispatch = useDispatch()
    const isPending = useSelector((state) => state.postComments.isPending)
    const hasError = useSelector((state) => state.postComments.hasError)
    
    const [text, setText] = useState(null);
    
    
    
    useEffect(() => {
        if (post.data.selftext) {
            const selftext = determineSelfText(post.data.selftext);
            setText(selftext);
        }
        
    }, [post.data.selftext])

    

    
    
    
    
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
                            <img src={decodedUrl} className="thumbnailImg" alt="post thumbnail" />
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
        for ( i ; i < userProfile?.length; i++) {
            if (userProfile?.[i].name === post.data.author) {
                if (userProfile[i].snoovatar_img === "") {
                    return (
                        <>
                            <img className="userProfilePic" src={snoovatar} alt="user profile icon"/> 
                            <h3 className="userProfileName" >u/{userProfile[i].name}</h3>
                        </>
                    )
                } else {
                    return (
                        <>
                            <img className="userProfilePic" src={userProfile[i].snoovatar_img} alt="user profile icon"/>
                            <h3 className="userProfileName" >u/{userProfile[i].name}</h3>
                        </>
                    )
                }
            }      
        }
        return <p>no match</p>
    }
    const displayUser = determineUserProfile();

    
    if (isPending) {
        return <div>Loading Comments...</div>
    }
    if (hasError) {
        return <div>Error loading comments...</div>
    }
    const loadComments = (event) => {
       
        
        dispatch(getPostComments(post.data.permalink))
        console.log(post.data)
       
    }
    


    return (
        <div className="postContainer" >
            <div className="user" >{displayUser}</div>
            <h4 className="title" >{post.data.title}</h4>
            {text}
            {thumbnail}
            <div className="postData" >
                <div className="ups" >
                    <LuArrowBigUp className="arrow" />
                    <p className="data" >{post.data.ups}</p>
                </div>    
                    
                <Link to='/comments'  className="comments" onClick={loadComments}  >
                    <FaRegCommentAlt className="comment" />
                    <p className="data" >{post.data.num_comments}</p>
                </Link>
               
                
            </div>
        </div>
    )
}


export default Post;