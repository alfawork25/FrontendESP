import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { deleteRoute, getRoutes } from "../../../features/Route/routeSlice";
import Routes from "./Routes";



const RoutesContainer = () => {
    
    const state = useSelector(state => state.route);

    const dispatch = useDispatch();


    useEffect(() => {
        dispatch(getRoutes());
    },[])


    
    function deleteRouteHandler(id){
        dispatch(deleteRoute(id));
    }
    
    return state.isLoading ? <div>Загрузка...</div> : <Routes state={state} deleteRouteHandler={deleteRouteHandler} />
}

export default RoutesContainer;