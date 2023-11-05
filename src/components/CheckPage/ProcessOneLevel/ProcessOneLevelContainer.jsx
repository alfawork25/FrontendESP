import React, { useEffect } from "react";
import ProcessOneLevel from "./ProcessOneLevel";
import { useDispatch, useSelector } from "react-redux";
import { Navigate, useParams } from "react-router";
import { addProcessFirstLevel, deleteFirstProcessLevel, getProcessOneLevelById, updateProcessFirstLevel } from "../../../features/ProcessOneLevel/processOneLevel";





const ProcessOneLevelContainer = () => {

    const state = useSelector(state => state.processOneLevel);
    
    const dispatch = useDispatch();
    const params =  useParams();
    

    useEffect(() => {
        
        if(params.id) {
            dispatch(getProcessOneLevelById(params.id));
        }
    },[])

    function sendData(data) {
        let execute = !state.id ? addProcessFirstLevel : updateProcessFirstLevel;
        
        dispatch(execute(data));
    }
    
    function deleteProcessOneLevelHandler() {
        
        if(!params.id){
            return;
        }
    
        dispatch(deleteFirstProcessLevel(params.id));
    }

    if(state.redirect) {
        return <Navigate to={'/processOneLevels'} />
    }

    return <ProcessOneLevel state={state} deleteProcessOneLevel={deleteProcessOneLevelHandler} sendData={sendData} />
    

}

export default ProcessOneLevelContainer;