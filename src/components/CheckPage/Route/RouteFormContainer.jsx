import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router";
import { addCheckProhibition, deleteCheckProhibition, getCheckCodes, getRouteById, saveRoute, setPopup, setProhibtionCodesToRoute, updateCheckProhibitions } from "../../../features/Route/routeSlice";
import RouteForm from "./RouteForm";


const RouteFormContainer = () => {

    const dispatch = useDispatch();
    const state = useSelector(state => state.route);
   
    const params = useParams();
    const navigate = useNavigate();

    function checkCodeValueChanged(setFieldValue,value) {
        value = value ? value.id : 0;
        setFieldValue('checkCodeId',value);
        dispatch(setProhibtionCodesToRoute(value));
    }


    useEffect(() => {
        if(params.id) {
            dispatch(getRouteById(params.id));
        }else {
            dispatch(getCheckCodes());
        }
    },[])


    function refresh() {
        if(params.id) {
            navigate('/route');
        }
        window.location.reload();
    }

    function sendData(values) {
        
        let data = {
            ...values,
            checkCodeIds:[],
            prohibitionCodeIds:[]
        }
        
        for (const item of state.checkProhibitions) {
                data.checkCodeIds.push(item.id);
                for (const prohibitionCode of item.prohibitionCodes) {
                    data.prohibitionCodeIds.push(prohibitionCode.id);
                }
        }

        dispatch(saveRoute(data));
    }
    
    function setPopupHandler(popup) {
        dispatch(setPopup(popup));
    }

    function addCheckProhibitionHandler(values){
        const data =  {
            ...state.checkCodes.find(x => x.id === values.checkCodeId),
            prohibitionCodes:state.prohibitionCodes.filter(x => values.prohibitionCodeIds.includes(x.id))
        };
        
        if(!values.checkCodeId) return;

        dispatch(addCheckProhibition(data));
    }

    function deleteCheckProhibitionHandler(id){
        
        dispatch(deleteCheckProhibition(id));
    }

    
    function updateCheckProhibitionsHandler(checkProhibitionId,prohibitionCodes) {
        
        dispatch(updateCheckProhibitions({id:checkProhibitionId,prohibitionCodes}));
    }

    return state.isLoading ? <div>Загрузка...</div> :
            <RouteForm 
            state={state} 
            setPopupHandler={setPopupHandler} 
            sendData={sendData} 
            checkCodeValueChanged={checkCodeValueChanged}
            addCheckProhibitionHandler={addCheckProhibitionHandler}
            deleteCheckProhibitionHandler={deleteCheckProhibitionHandler}
            updateCheckProhibitionsHandler={updateCheckProhibitionsHandler}
            refresh={refresh}
            />

}

export default RouteFormContainer;