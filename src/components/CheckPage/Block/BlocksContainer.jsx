import React from "react";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { deleteBlock, getBlocks } from "../../../features/Block/blockSlice";
import Blocks from "./Blocks";


export const BlocksContainer = () => {
    
    const dispatch = useDispatch();
    const state = useSelector(state => state.block);
    useEffect(() => {
        dispatch(getBlocks());
    },[]);
    
    function deleteBlockById(id) {
        dispatch(deleteBlock(id));
    }

    return <Blocks state={state} deleteBlockById={deleteBlockById} />
}


export default BlocksContainer;