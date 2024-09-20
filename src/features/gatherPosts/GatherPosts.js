import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { selectAllPosts, loadAllPosts } from "./gatherPostsSlice";
import Post from "../../components/post/post";
import { loadUserProfile, selectAllUsers } from "../userProfile/userProfileSlice";
import { searchInput } from "../../components/searchbar/searchbarSlice";
import './gatherPosts.css';
import GatherHeader from "../gatherSubredditHeader/gatherSubredditHeader";
import GatherSubredditDetails from "../gatherSubredditDetails/gatherSubredditDetails";


const GatherPosts = () => {
    const dispatch = useDispatch();
    const userPosts = useSelector(selectAllPosts);
    const isPending = useSelector((state) => state.gatherPosts.isPending)
    const hasError = useSelector((state) => state.gatherPosts.hasError)
    const userProfiles = useSelector(selectAllUsers)
    const [usernames, setUsernames] = useState([]);
    const searchbar = useSelector(searchInput)
    console.log(searchbar)

    useEffect(() => {
        dispatch(loadAllPosts(searchbar));
    },[searchbar, dispatch]);

    
    useEffect(() => {
        if (userPosts.length > 0) {
            const newNames = userPosts.map((user) => user.data.author);
            setUsernames(newNames);  // Update the state with the new usernames
        }
    }, [userPosts]);

    // Dispatch loadUserProfile for each username
    useEffect(() => {
        usernames.forEach((username) => {
            dispatch(loadUserProfile(username));
        });
    }, [usernames, dispatch]);

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
            <GatherHeader />
            <div className="allPostsContainer" >
                {userPosts.map((post, index) => (
                    <Post 
                        post={post} 
                        key={index} 
                        userProfile={userProfiles}
                    />
                ))}
            </div> 
            <GatherSubredditDetails />          
        </>
    )
}

export default GatherPosts;

