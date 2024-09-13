import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { selectAllPosts, loadAllPosts } from "./postPreviewSlice";
import PostList from "../../components/postList";
import { loadUserProfile, selectAllUsers } from "../userProfile/userProfileSlice";
import UserProfile from "../userProfile/UserProfile";

const PostPreview = () => {
    const dispatch = useDispatch();
    const postPreview = useSelector(selectAllPosts);
    const userProfile = useSelector(selectAllUsers)

    

    useEffect(() => {
        dispatch(loadAllPosts());
    },[dispatch]);

    const usernames = ['AutoModerator', 'gh0stF4CE7', 'ego100trique', 'jawanda', 'instanote98', 'WingsOfReason', 'ClassicClarifier'];
    
    
    useEffect(() => {
         usernames.map((username) => dispatch(loadUserProfile(username)))
     }, [dispatch]);
    

    console.log(postPreview)
    console.log(usernames)
    console.log(userProfile)
    
    
    return (
        <>
            <div>
                
                <div>
                    {postPreview.map((post, index) => <PostList post={post} key={index} userProfile={userProfile}/>)}
                </div>
            </div>
        </>
    )

}

export default PostPreview;

