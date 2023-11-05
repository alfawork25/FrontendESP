import React, { useEffect } from "react";
import Modification from "./Modification";
import { useDispatch, useSelector } from "react-redux";
import { addRevision, deleteRevision, getRevisionById, getRevisions, reset, updateRevision } from "../../features/Revision/revisionSlice";




const ModificationContainer = (props) => {

    let tempData = JSON.parse(localStorage.getItem("data"));
    const state = useSelector(state => state.revision);

    const dispatch = useDispatch();

    function sendDataHandler(values) {
        
        let request = {
            id:state.id,
            processId:tempData.id,
            ...values
        };
  
        let execute = !state.id ? addRevision : updateRevision;
        dispatch(reset());
        dispatch(execute(request));
        
    }

    function deleteRevisionHandler(id) {
        dispatch(deleteRevision(id))
    }

    function getRevisionByIdHandler(id) {
        dispatch(getRevisionById(id))
    }
    function resetState() {
        dispatch(reset())
    }
    useEffect(() => {
        dispatch(getRevisions(tempData.id))
    },[])

    return <Modification sendData={sendDataHandler} getRevisionByIdHandler={getRevisionByIdHandler} resetState={resetState} deleteRevision={deleteRevisionHandler} state={state} tempData={tempData}  />
}

export default ModificationContainer;