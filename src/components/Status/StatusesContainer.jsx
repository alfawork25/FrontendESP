import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getStatuses,deleteStatus } from "../../features/Status/statusSlice";
import Statuses from "./Statuses";





const StatusesContainer = () => {
 
    const state = useSelector(state => state.status);
    const dispatch = useDispatch();
    

    useEffect(() => {
        dispatch(getStatuses());
    },[])

    function deleteStatusById(id) {
        dispatch(deleteStatus(id));
    }

    return <Statuses state={state} deleteStatusById={deleteStatusById} />
}

export default StatusesContainer;