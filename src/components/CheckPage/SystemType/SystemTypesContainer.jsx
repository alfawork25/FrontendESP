import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router";
import { getSystemTypes } from "../../../features/SystemType/systemTypeSlice";
import SystemTypes from "./SystemTypes";


export const SystemTypesContainer = () => {

    const state = useSelector(state => state.systemType);
    
    const dispatch = useDispatch();
    const navigate = useNavigate();

    useEffect(() => {
        dispatch(getSystemTypes());
    },[])

    function goToSystemType(url) {
        navigate(url);
    }

    
    return <SystemTypes state={state} goToSystemType={goToSystemType} />
}


export default SystemTypesContainer;