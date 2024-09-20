import React from "react";
import { selectSubreddit } from "../gatherSubredditHeader/gatherSubredditHeaderSlice";
import { useSelector } from "react-redux";
import styles from './subredditDetails.module.css';

const GatherSubredditDetails = () => {
    const subredditData = useSelector(selectSubreddit);
    console.log(subredditData)

    if (Object.keys(subredditData).length > 0) {
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
    } else {
        return (
            <>
                <div className={styles.detailsContainer} >
                    <div className={styles.aboutContainer} >
                        <h5 className={styles.title} >Reddit Homepage</h5>
                        <p className={styles.info} >
                            This is a mini version of reddit built using React and the Redux library
                        </p>
                    </div>
                    <div className={styles.membersContainer}>
                        <h3>1</h3>
                        <p>Member AKA: Me</p>
                    </div>
                    <div className={styles.descriptionContainer} >
                        <h4>Rules</h4>
                        <p>
                            Due to the limit set by Reddit on fetching data from their API, 
                            this app can quickly return a 429 ERROR by reaching that limit. 
                            Please use the features on this app at a slow rate to prevent a 429 ERROR.
                        </p>
                    </div>
                </div>
            </>
        )
    }
    
}

export default GatherSubredditDetails;