import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { deleteCheckBlock, getCheckBlocks } from "../../../features/CheckBlock/checkBlockSlice";
import CheckBlocks from "./CheckBlocks";

export const CheckBlocksContainer = () => {
    
    const dispatch = useDispatch();
    const state = useSelector(state => state.checkBlock);
    
    
    useEffect(() => {
        dispatch(getCheckBlocks());
    },[]);

    
    function deleteCheckBlockById(id){
        dispatch(deleteCheckBlock(id));
    }

    return <CheckBlocks state={state} deleteCheckBlockById={deleteCheckBlockById}  />
}


export default CheckBlocksContainer;