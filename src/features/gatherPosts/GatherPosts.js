import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { selectAllPosts, loadAllPosts } from "./gatherPostsSlice";
import Post from "../../components/post";
import { loadUserProfile, selectAllUsers } from "../userProfile/userProfileSlice";
import { searchInput } from "../../components/searchbar/searchbarSlice";

const GatherPosts = () => {
    const dispatch = useDispatch();
    const userPosts = useSelector(selectAllPosts);
    const isPending = useSelector((state) => state.gatherPosts.isPending)
    const hasError = useSelector((state) => state.gatherPosts.hasError)
    const userProfiles = useSelector(selectAllUsers)
    const usernames = [];
    const searchbar = useSelector(searchInput)
    console.log(searchbar)

    useEffect(() => {
        dispatch(loadAllPosts(searchbar));
    },[searchbar]);

    
    useEffect(() => {
        userPosts.map((user) => usernames.push(user.data.author))
        usernames.map((username) => dispatch(loadUserProfile(username)))
    },[userPosts]);

    if (isPending) {
        return <div>Loading posts...</div>
    }
    if (hasError) {
        <div>Error loading posts... Please try again</div>
    }
    if (!userPosts || userPosts.length === 0) {
        return <div>No posts available.</div>; // Handle the case when posts are empty
    }
   
    

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

