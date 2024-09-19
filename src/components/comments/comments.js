import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { selectAllComments, selectPost } from "../../features/gatherPostComments/gatherPostCommentsSlice";
import { getPostComments } from "../../features/gatherPostComments/gatherPostCommentsSlice";
import styles from './comments.module.css';
import { useLocation } from "react-router-dom";
import { makeClickableLinks, determineSelfText } from "../post/postFormatting";
import { LuArrowBigUp, LuArrowBigDown } from "react-icons/lu";
import { FaRegCommentAlt } from "react-icons/fa";
import snoovatar  from '../../resources/images/snoovatar.png'


const PostComments = () => {

    const dispatch = useDispatch();
    const allComments = useSelector(selectAllComments);
    const post = useSelector(selectPost);
    //const text = makeClickableLinks(post.selftext)
    const [text, setText] = useState(null);
    
    useEffect(() => {
        console.log(post.selftext)
        if (post.selftext) {
            const selftext = determineSelfText(post.selftext)
            setText(selftext)
        }
        
    }, [post.selftext])


    console.log(allComments)

    const determineThumbnail = (thumbnail) => {
        if(thumbnail) {
            const imageUrl = post.preview.images[0].source.url;
            const decodedUrl = imageUrl.replace(/&amp;/g, '&');
            const backgroundStyle = {
                backgroundImage: `url(${decodedUrl}`,
                filter: 'blur',
            }
            return (
                <>
                    <div className={styles.thumbnailContainer}  >
                        <div className={styles.blurBackground} style={backgroundStyle}></div>
                        <div className={styles.thumbnail} >
                            <img src={decodedUrl} className={styles.thumbnailImg} ></img>
                        </div>
                    </div>
                </>
            )
        } else {
            return null;
        }
    }
    const thumbnail = determineThumbnail(post.preview)
    
    

    return (
        <>
            <div className={styles.container} >
                <div className={styles.postContainer}>
                    <div className={styles.userContainer} >
                        <div>
                            <img className={styles.subredditPicture} src={snoovatar}/>
                        </div>
                        <div className={styles.subreddit_user} >
                            <h3>{post.subreddit_name_prefixed}</h3>
                            <h4>u/{post.author}</h4>
                        </div>
                    </div>
                    <h3 className={styles.title} >{post.title}</h3>
                    <div className={styles.selftext} >{text}</div>
                    {thumbnail}
                    
                    <div className={styles.postData} >
                        <div className={styles.ups} >
                            <LuArrowBigUp className={styles.arrow} />
                            <p className={styles.data} >{post.ups}</p>
                        </div>                          
                        <a className={styles.comments} >
                            <FaRegCommentAlt className={styles.comment} />
                            <p className={styles.data} >{post.num_comments}</p>
                        </a>               
                    </div>
                </div>
                <div className={styles.allCommentsContainer}>
                {allComments.map((comment) => {
                    return (                   
                            <div className={styles.commentContainer}>
                                <h3 className={styles.author}>{comment.data.author}</h3>
                                <div className={styles.body}>{comment.data.body}</div>
                                <div className={styles.postData} >
                                    <div className={styles.commentUps}>
                                    <LuArrowBigUp className={styles.commentArrow} />
                                    <p className={styles.data} >{comment.data.ups}</p>
                                    </div>
                                    <div className={styles.commentDowns} ><LuArrowBigDown className={styles.commentArrow} /></div>
                                </div>
                            </div>                   
                    )
                })}
                </div>
            </div>
        </>
    )
};

export default PostComments;