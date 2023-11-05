import React, { useEffect } from "react";
import ProcessTwoLevel from "./ProcessTwoLevel";
import { useDispatch, useSelector } from "react-redux";
import { Navigate, useParams } from "react-router";
import { addProcessTwoLevel,deleteProcessTwoLevel,getProcessTwoLevelById, updateProcessSecondLevel } from "../../../features/ProcessTwoLevel/ProcessTwoLevel";






const ProcessTwoLevelContainer = () => {

    const state = useSelector(state => state.processTwoLevel);
    
    const dispatch = useDispatch();
    const params =  useParams();
    

    useEffect(() => {
        
        if(params.id) {
            dispatch(getProcessTwoLevelById(params.id));
        }
    },[])

    function sendData(data) {
        let execute = !state.id ? addProcessTwoLevel : updateProcessSecondLevel;
        
        dispatch(execute(data));
    }
    
    function deleteProcessTwoLevelHandler() {
        
        if(!params.id){
            return;
        }
    
        dispatch(deleteProcessTwoLevel(params.id));
    }

    if(state.redirect) {
        return <Navigate to={'/processSecondLevels'} />
    }

    return <ProcessTwoLevel state={state} deleteProcessTwoLevel={deleteProcessTwoLevelHandler} sendData={sendData} />
    

}

export default ProcessTwoLevelContainer;