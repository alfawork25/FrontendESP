import React, { useEffect } from "react";
import CheckCodeForm from "./CheckCodeForm";
import { useDispatch, useSelector } from "react-redux";
import {  useFormik } from "formik";
import { addCheckCode,getCheckCodeById, updateCheckCode } from "../../../features/CheckCode/checkCodeSlice";
import { Navigate,useParams } from "react-router";

const CheckCodeFormContainer = ({edit}) => {

    const params = useParams();
    const dispatch = useDispatch();
    const state = useSelector(state => state.checkCode);
   

    function sendData(data) {
    
        const request  =  {
            Id:state.Id,
            Name:data.code,
            Title:data.title,
            IsActive:data.status
        }

        if(edit) {
            dispatch(updateCheckCode(request));
        }
        else {
            dispatch(addCheckCode(request))
        }
        
    }

    const formik = useFormik({
        initialValues:{
            code:"",
            title:"",
            status:"",
            prohibitionCode:""
        }
    });

  
    if(edit) {
        
        useEffect(() => {
            dispatch(getCheckCodeById(params.id));
        },[params.id])

        formik.initialValues.title = state.Title;
        formik.initialValues.code = state.Name;
        formik.initialValues.status =  state.IsActive;

    }   
  
    if(state.redirectFlag) {
        return <Navigate to={"/checkCodes"} />
    }
    
    return state.isLoading ? (<div>Загрузка...</div>) : <CheckCodeForm 
                                                    state={state}
                                                    sendData={sendData}
                                                    formik={formik} />
}

export default CheckCodeFormContainer;