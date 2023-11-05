import React, { useEffect } from "react";
import Pattern from "./Pattern";
import { useDispatch, useSelector } from "react-redux";
import { addPattern, getPatternById, updatePattern } from "../../features/Pattern/patternSlice";
import { useParams } from "react-router";




const PatternContainer = () => {

    const state = useSelector(state => state.pattern)
    
    const dispatch = useDispatch();
    const params = useParams();

    function sendData(values) {

        let execute = state.id ? updatePattern : addPattern;
        
        dispatch(execute(values));

    }

    useEffect(() => {
        
        if(params.id) {
            dispatch(getPatternById(params.id))
        }
        
    },[])

    return <Pattern state={state} sendData={sendData} />
}
export default PatternContainer;