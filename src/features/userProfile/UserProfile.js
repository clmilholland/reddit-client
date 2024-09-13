import React, {useEffect} from "react";
import { useDispatch, useSelector } from "react-redux";
import { loadUserProfile, selectAllUsers } from "./userProfileSlice";
import PostList from "../../components/postList";

const UserProfile = ({userProfile}) => {
   return (
    <>
        <img src={userProfile.snoovatar_img}></img>
        <h3>{userProfile.subreddit.display_name}</h3>
    </>
   );   
}

export default UserProfile;