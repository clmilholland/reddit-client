import React, {useState, useEffect, useCallback} from "react";
import './sideNav.css';
import { selectAllHistory } from "../../features/gatherPosts/gatherPostsSlice";
import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { loadAllPosts } from "../../features/gatherPosts/gatherPostsSlice";
import { gatherHeader } from "../../features/gatherSubredditHeader/gatherSubredditHeaderSlice";

const SideNav = () => {

    const dispatch = useDispatch();
    const history = useSelector(selectAllHistory);
    const [historyList, setHistoryList] = useState([]);

    console.log(history)

    useEffect(() => {
        if (Array.isArray(history) && !historyList.includes(history)) {
            setHistoryList(history);  
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

    return (
        <>
            <div className="sideNavContainer">
                <div>
                    <button type="button" onClick={() => handleClick()} >Home</button>
                    <button type="button" onClick={() => handleClick('popular')} >Popular</button>
                </div>
                <div>
                    <h4>Recent</h4>
                    {historyList.length > 0 ? (
                        historyList.map((subreddit, index) => (
                            <div key={index}>
                                <button type="button" onClick={() => handleClick(subreddit)}>
                                    {subreddit}
                                </button>
                            </div>
                        ))
                    ) : (
                        <div>
                            <h5>No history available</h5>
                        </div>
                    )}
                </div>
                <div>
                    <h4>Popular Communities</h4>
                </div>
            </div>
        </>
    )
};

export default SideNav