import React from "react";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { deleteCheckCode, getCheckCodes } from "../../../features/CheckCode/checkCodeSlice";
import CheckCodes from "./CheckCodes";


export const CheckCodesContainer = () => {
    
    const dispatch = useDispatch();
    const state = useSelector(state => state.checkCode);    
    useEffect(() => {
        dispatch(getCheckCodes());
    },[])
        

    function deleteCheckCodeById(id) {
        dispatch(deleteCheckCode(id));
    }
    
    return <CheckCodes state={state} deleteCheckCodeById={deleteCheckCodeById} />


} 


export default CheckCodesContainer;