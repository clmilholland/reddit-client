import React from "react";
import { selectSubreddit } from "../gatherSubredditHeader/gatherSubredditHeaderSlice";
import { useSelector } from "react-redux";
import styles from './subredditDetails.module.css';

const GatherSubredditDetails = () => {
    const subredditData = useSelector(selectSubreddit);

    return (
        <>
            <div className={styles.detailsContainer} >
                <div className={styles.aboutContainer} >
                    <h5 className={styles.title} >{subredditData.data?.title}</h5>
                    <p className={styles.info} >{subredditData.data?.public_description}</p>
                </div>
                <div className={styles.membersContainer}>
                    <h3>{subredditData.data?.subscribers}</h3>
                    <p>Members</p>
                </div>
                <div className={styles.descriptionContainer} >
                    <h4>Rules</h4>
                    <p>{subredditData.data?.description}</p>
                </div>
            </div>
        </>
    )
}

export default GatherSubredditDetails;