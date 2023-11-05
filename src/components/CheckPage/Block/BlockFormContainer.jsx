import { useFormik } from "formik";
import React, { useEffect } from "react";

import { useDispatch, useSelector } from "react-redux";
import { Navigate, useParams } from "react-router";
import { addBlock, getBlockById, updateBlock } from "../../../features/Block/blockSlice";
import BlockForm from "./BlockForm";


const BlockFormContainer = ({edit}) => {
    
    const dispatch = useDispatch();
    const params = useParams();
    const state = useSelector(state => state.block);

    const formik = useFormik({
        initialValues:{
            name:""
        }});

    if(edit){
        useEffect(() => {
            dispatch(getBlockById(params.id));  
        },[])

        formik.initialValues.name = state.name;
    }

    function sendData(data) {

        const request = { 
            id:state.id,
            ...data
         }

        if(edit) {
            dispatch(updateBlock(request));
        }
        else {
            dispatch(addBlock(request));
        }
        
    }

    if(state.redirectFlag) {
        return <Navigate to={"/blocks"} />
    }
    return state.isLoading ? <div>Загрузка...</div> : <BlockForm categories={state.categories} sendData={sendData} formik={formik}/>
}


export default BlockFormContainer;