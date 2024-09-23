import React, {useState, useEffect, useCallback} from "react";
import styles from './sideNav.module.css';
import { selectAllHistory } from "../../features/gatherPosts/gatherPostsSlice";
import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { loadAllPosts } from "../../features/gatherPosts/gatherPostsSlice";
import { gatherHeader } from "../../features/gatherSubredditHeader/gatherSubredditHeaderSlice";
import { HiHome, HiOutlineSparkles } from "react-icons/hi";
import { selectSubreddit } from "../../features/gatherSubredditHeader/gatherSubredditHeaderSlice";
import reddit_icon from '../../resources/images/reddit_icon.png'

const SideNav = () => {

    const dispatch = useDispatch();
    const history = useSelector(selectAllHistory);
    const subredditData = useSelector(selectSubreddit);
    const [historyList, setHistoryList] = useState([]);
    const [recentIcons, setRecentIcons] = useState([]);

    console.log(history)

    useEffect(() => {
        if (Array.isArray(history) && !historyList.includes(history)) {
            const list = history.slice(1)
            setHistoryList(list);  
        } else {
            setHistoryList([]);  
        }
    }, [history]);

    

    console.log(historyList)
    
    

    const handleClick = (subreddit) => {
        console.log(subreddit)
        dispatch(loadAllPosts(subreddit))
        dispatch(gatherHeader(subreddit))
    }

    const determineCommunityIcon = (image) => {
        if (image) {
            const imageUrl = image;
            const decodedUrl = imageUrl.replace(/&amp;/g, '&');
            return decodedUrl
        } else {
            return reddit_icon;
        }
    }

    console.log(subredditData)
    
    console.log(subredditData.data?.icon_img)
    useEffect(() => {
        if (history.length > 0) {

        
        const communityIcon = determineCommunityIcon(subredditData.data?.icon_img ? subredditData.data?.icon_img : subredditData.data?.community_icon )
            if (!recentIcons.includes(communityIcon)) {
                
                setRecentIcons((prev) => [...prev, communityIcon])
            }
            
         else {
            const communityIcon = determineCommunityIcon()
            if (!recentIcons.includes(communityIcon)) {
                setRecentIcons((prev) => [...prev, communityIcon])
            }
        }
        }
    },[subredditData])

    console.log(recentIcons)
    
    

    return (
        <>
            <div className={styles.sideNavContainer}>
                <div className={styles.homeContainer} >
                    <button type="button" onClick={() => handleClick()} ><HiHome className={styles.icon}/>Home</button>
                    <button type="button" onClick={() => handleClick('popular')} ><HiOutlineSparkles className={styles.icon}/>Popular</button>
                </div>
                <div className={styles.recentContainer} >
                    <h4>Recent</h4>
                    {historyList.length > 0 ? (
                        historyList.map((subreddit, index) => (
                            <div key={index} className={styles.recentButtonContainer} >
                                {console.log(index)}
                                <button type="button" onClick={() => handleClick(subreddit)}>
                                    <img className={styles.icon} src={recentIcons[index]} />
                                    r/{subreddit}
                                </button>
                            </div>
                        ))
                    ) : (
                        <div>
                            <h5>No history available</h5>
                        </div>
                    )}
                </div>
                <div className={styles.popularContainer}>
                    <h4>Popular Communities</h4>
                    <button type="button" onClick={() => handleClick('funny')} >
                        <img  className={styles.icon} src="https://a.thumbs.redditmedia.com/kIpBoUR8zJLMQlF8azhN-kSBsjVUidHjvZNLuHDONm8.png"/>
                        r/funny
                    </button>
                    <button type="button" onClick={() => handleClick('AskReddit')} >
                        <img  className={styles.icon} src="https://b.thumbs.redditmedia.com/LSHrisQApf1H5F8nWShTx3_KjTOMc3R_ss3kx3XAyXQ.png"/>
                        r/AskReddit
                    </button>
                    <button type="button" onClick={() => handleClick('gaming')} >
                        <img  className={styles.icon} src="https://b.thumbs.redditmedia.com/0PgZl68jAxA6T1BH6uvUQ5Bz1F1GrrJLCL8oi2Gz0Ak.png"/>
                        r/gaming
                    </button>
                    <button type="button" onClick={() => handleClick('worldnews')} >
                        <img  className={styles.icon} src="https://styles.redditmedia.com/t5_2qh13/styles/communityIcon_pldiwqvsyns91.png?width=256&s=1e3f0453042ba59e08945b2beab03f408a4135e4"/>
                        r/worldnews
                    </button>
                    <button type="button" onClick={() => handleClick('todayilearned')} >
                        <img  className={styles.icon} src="https://b.thumbs.redditmedia.com/B7IpR8P1mEsQIjdizK5x79s5aGfJUtKk3u2ksGZ9n2Q.png"/>
                        r/todayilearned
                    </button>
                </div>
            </div>
        </>
    )
};

export default SideNav