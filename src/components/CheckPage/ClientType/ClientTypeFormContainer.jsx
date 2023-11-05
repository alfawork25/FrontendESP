import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Navigate, useParams } from "react-router";
import { deleteClientType, getClientTypeById, getSubjects, saveClientType } from "../../../features/ClientType/clientTypeSlice";
import ClientTypeForm from "./ClientTypeForm";


const ClientTypeFormContainer = () => {

    const state = useSelector(state => state.clientType);
    
    const dispatch = useDispatch();
    const params =  useParams();

    
    useEffect(() => {
        
        dispatch(getSubjects());
        if(params.id) {
            dispatch(getClientTypeById(params.id));
        }
        
    },[])

    function sendData(data) {
        dispatch(saveClientType(data));
    }
    
    function deleteClientTypeHanlder() {
        
        if(!params.id){
            return;
        }
        
        dispatch(deleteClientType(params.id));
    }
    
    if(state.redirect) {
        return <Navigate to={'/clientTypes'} />
    }

    return state.isLoading ? <div>Загрузка...</div> : <ClientTypeForm state={state}  sendData={sendData} deleteClientTypeHanlder={deleteClientTypeHanlder} />
}


export default ClientTypeFormContainer;