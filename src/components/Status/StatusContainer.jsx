import React, { useEffect } from "react";
import Status from "./Status";
import { useParams } from "react-router";
import { useDispatch, useSelector } from "react-redux";
import { addStatus, getStatusById, updateStatus } from "../../features/Status/statusSlice";



const StatusContainer = () => {

    const state = useSelector(state => state.status)
    
    const dispatch = useDispatch();
    const params = useParams();

    function sendData(values) {

        let execute = state.id ? updateStatus : addStatus;
        
        dispatch(execute(values));

    }

    useEffect(() => {
        
        if(params.id) {
            dispatch(getStatusById(params.id));
        }
        
    },[])
    
    return <Status state={state} sendData={sendData}/>
}

export default StatusContainer;