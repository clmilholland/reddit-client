import React, {useEffect} from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getSubreddits, selectSubreddits } from './subredditsSlice';

const GatherSubreddits = () => {
    const dispatch = useDispatch();
    //const subreddits = useSelector(selectSubreddits);

    useEffect(() => {
        dispatch(getSubreddits());
    },[])

    //console.log(subreddits);

    return (
        <>
            <div></div>
        </>
    );

};


export default GatherSubreddits;