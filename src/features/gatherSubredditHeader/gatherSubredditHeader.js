import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { gatherHeader, selectSubreddit } from "./gatherSubredditHeaderSlice";
import { searchInput } from "../../components/searchbar/searchbarSlice";
import styles from './subredditHeader.module.css'
import default_banner from '../../resources/images/default_banner.jpg'
import reddit_icon from '../../resources/images/reddit_icon.png'

const GatherHeader = () => {

    const dispatch = useDispatch();
    const searchParam = useSelector(searchInput)
    const subredditData = useSelector(selectSubreddit);
    const isPending = useSelector((state) => state.gatherHeader.isPending)
    const hasError = useSelector((state) => state.gatherHeader.hasError)

    
    console.log(searchParam)
    useEffect(() => {
        if (searchParam) {
            dispatch(gatherHeader(searchParam))
        }     
    },[dispatch, searchParam])

    console.log(subredditData)

    const determineBannerImage = (image) => {
        if (image) {
            const imageUrl = image;
            const decodedUrl = imageUrl.replace(/&amp;/g, '&');
            return decodedUrl;
        } else {
            return default_banner;
        }
    }
    const banner = determineBannerImage(subredditData.data?.banner_background_image)

    const determineCommunityIcon = (image) => {
        if (image) {
            const imageUrl = image;
            const decodedUrl = imageUrl.replace(/&amp;/g, '&');
            return decodedUrl
        } else {
            return reddit_icon;
        }
    }
    
    const communityIcon = determineCommunityIcon(subredditData.data?.icon_img ? subredditData.data?.icon_img : subredditData.data?.community_icon )
    

    if (isPending) {
        return <div>Loading posts...</div>
    }
    if (hasError) {
        <div>Error loading posts... Please try again</div>
    }

    return (
        <>
            <div className={styles.headerContainer}>
                <div className={styles.banner}>
                    <img src={banner} className={styles.bannerImage} alt="subreddit banner"/>
                </div>
                <div className={styles.icon_subredditContainer} >
                    <div className={styles.iconContainer}>
                        <img src={communityIcon} className={styles.iconImage} alt="community icon"/>
                    </div>
                    <div className={styles.subredditContainer}>
                        <h1 className={styles.subreddit} >{Object.keys(subredditData).length > 0 ? subredditData.data?.display_name_prefixed : 'r/Home'}</h1>
                    </div>
                </div>
            </div>
        </>
    )
}


export default GatherHeader;