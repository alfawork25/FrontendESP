import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router";
import { getSystemBlocks } from "../../../features/SystemBlock/systemBlockSlice";
import SystemBlocks from "./SystemBlocks";



export const SystemBlocksContainer = () => {

    const state = useSelector(state => state.systemBlock);
    
    const dispatch = useDispatch();
    const navigate = useNavigate();

    useEffect(() => {
        dispatch(getSystemBlocks());
    },[])

    function goToSystemBlock(url) {
        navigate(url);
    }

    
    return <SystemBlocks state={state} goToSystemBlock={goToSystemBlock} />
}


export default SystemBlocksContainer;