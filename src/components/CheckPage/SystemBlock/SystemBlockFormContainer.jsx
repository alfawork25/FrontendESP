import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Navigate, useParams } from "react-router";
import { deleteSystemBlock, getSystemBlockById, saveSystemBlock } from "../../../features/SystemBlock/systemBlockSlice";
import SystemBlockForm from "./SystemBlockForm";


const SystemBlockFormContainer = () => {

    const state = useSelector(state => state.systemBlock);
    
    const dispatch = useDispatch();
    const params =  useParams();
    

    useEffect(() => {
        
        if(params.id) {
            dispatch(getSystemBlockById(params.id));
        }
    },[])

    function sendData(data) {
        dispatch(saveSystemBlock(data));
    }
    
    function deleteSystemBlockHandler() {
        
        if(!params.id){
            return;
        }
        
        dispatch(deleteSystemBlock(params.id));
    }

    if(state.redirect) {
        return <Navigate to={'/systemBlocks'} />
    }

    return state.isLoading ? <div>Загрузка...</div> : <SystemBlockForm state={state} sendData={sendData} deleteSystemBlockHandler={deleteSystemBlockHandler} />
}


export default SystemBlockFormContainer;