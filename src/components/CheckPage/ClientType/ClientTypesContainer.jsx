import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router";
import { getClientTypes } from "../../../features/ClientType/clientTypeSlice";
import ClientTypes from "./ClientTypes";


export const ClientTypesContainer = () => {

    const state = useSelector(state => state.clientType);
    
    const dispatch = useDispatch();
    const navigate = useNavigate();

    useEffect(() => {
        dispatch(getClientTypes());
    },[])

    function goToClientType(url) {
        navigate(url);
    }


    return <ClientTypes state={state} goToClientType={goToClientType} />
}


export default ClientTypesContainer;