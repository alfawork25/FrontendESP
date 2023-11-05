import React, { useEffect } from "react";
import ReferenceProcess from "./ReferenceProcess";
import { useDispatch, useSelector } from "react-redux";
import { Init, addProcessRegistry, getProcessRegistryById, updateProcessRegistry } from "../../../features/ReferenceProcess/referenceProcessSlice";
import { useParams } from "react-router";





const ReferenceProcessContainer = () => {

    const state = useSelector(state => state.referenceProcess);
    const dispatch = useDispatch();
    const params = useParams();

    useEffect(() => {
        dispatch(Init());

        if(params.id) {
            dispatch(getProcessRegistryById(params.id));
        }

    },[])
    

    let sendDataHandler = (values) => {
     
        let execute = !state.id ? addProcessRegistry : updateProcessRegistry;
        
        dispatch(execute(values));
    }

    return <ReferenceProcess state={state} sendValues={sendDataHandler}/>
}

export default ReferenceProcessContainer;