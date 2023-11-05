import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router";
import { getProcesses } from "../../features/Process/processSlice";
import Processes from "./Processes";



const ProcessesContainer = () => {

    const state = useSelector(state => state.process);

    const dispatch = useDispatch();
    const navigate = useNavigate();
    useEffect(() => {
        dispatch(getProcesses());
    },[])

    function goToProcessCard(url) {
        navigate(url);
    }

   
    return <Processes state={state} goToProcessCard={goToProcessCard} />
}

export default ProcessesContainer;