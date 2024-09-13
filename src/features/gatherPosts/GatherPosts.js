import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { selectAllPosts, loadAllPosts } from "./gatherPostsSlice";
import Post from "../../components/post";
import { loadUserProfile, selectAllUsers } from "../userProfile/userProfileSlice";


const GatherPosts = () => {
    const dispatch = useDispatch();
    const userPosts = useSelector(selectAllPosts);
    const userProfiles = useSelector(selectAllUsers)
    const usernames = ['AutoModerator', 'gh0stF4CE7', 'ego100trique', 'jawanda', 'instanote98', 'WingsOfReason', 'ClassicClarifier'];

    useEffect(() => {
        dispatch(loadAllPosts());
    },[dispatch]);

    
    useEffect(() => {
         usernames.map((username) => dispatch(loadUserProfile(username)))
    }, [dispatch]);
    

    console.log(userPosts)
    console.log(usernames)
    console.log(userProfiles)
    
    
    return (
        <>           
            <div>
                {userPosts.map((post, index) => (
                    <Post 
                        post={post} 
                        key={index} 
                        userProfile={userProfiles}
                    />
                ))}
            </div>           
        </>
    )
}

export default GatherPosts;

