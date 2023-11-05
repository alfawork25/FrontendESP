import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Navigate, useParams } from "react-router";
import { deleteSystemType, getSystemTypeById, saveSystemType } from "../../../features/SystemType/systemTypeSlice";
import SystemTypeForm from "./SystemTypeForm";


const SystemTypeFormContainer = () => {

    const state = useSelector(state => state.systemType);
    
    const dispatch = useDispatch();
    const params =  useParams();


    useEffect(() => {
        
        if(params.id) {
            dispatch(getSystemTypeById(params.id));
        }
    },[])

    function sendData(data) {
        dispatch(saveSystemType(data))
    }
    
    function deleteSystemTypeHandler() {
       
        if(!params.id){
            return;
        }
        
        dispatch(deleteSystemType(params.id));
    }

    if(state.redirect) {
        return <Navigate to={'/systemTypes'} />
    }

    return state.isLoading ? <div>Загрузка...</div> : <SystemTypeForm state={state}  sendData={sendData} deleteSystemTypeHandler={deleteSystemTypeHandler} />
}


export default SystemTypeFormContainer;