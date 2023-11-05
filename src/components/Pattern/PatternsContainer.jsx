import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import Patterns from "./Patterns";
import { deletePattern, getPatterns } from "../../features/Pattern/patternSlice";





const PatternsContainer = () => {
    
    const state = useSelector(state => state.pattern);
    const dispatch = useDispatch();
    
    useEffect(() => {

        dispatch(getPatterns());

    },[])

    function deletePatternById(id) {
        dispatch(deletePattern(id));
    }
    return <Patterns state={state} deletePatternById={deletePatternById} />
}

export default PatternsContainer;