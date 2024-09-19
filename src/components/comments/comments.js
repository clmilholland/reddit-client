import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { selectAllComments } from "../../features/gatherPostComments/gatherPostCommentsSlice";
import { getPostComments } from "../../features/gatherPostComments/gatherPostCommentsSlice";
import './comments.css';
import { useLocation } from "react-router-dom";


const PostComments = () => {

    const dispatch = useDispatch();
    const allComments = useSelector(selectAllComments);
    const listComments = []
    

    console.log(allComments)
    
    

    return (
        <>
            <div className="allCommentsContainer">
            {allComments.map((comment) => {
                return (                   
                        <div className="commentContainer">
                            <h3 className="author">{comment.data.author}</h3>
                            <div className="body">{comment.data.body}</div>
                        </div>                   
                )
            })}
            </div>
        </>
    )
};

export default PostComments;