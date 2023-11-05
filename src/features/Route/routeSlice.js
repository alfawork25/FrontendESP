import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { checkAPI } from "../../api/checkAPI";

const initialState = {
    id:0,
    code:'',
    name:'',
  
    checkCodes:[],
    checkProhibitions:[],
    routes:[],
    prohibitionCodes:[],
    popup:false,
    isLoading:false,  
}



export const getCheckCodes = createAsyncThunk('route/GetCheckCodes', async (payload, { rejectWithValue, dispatch }) => {


    const response = await checkAPI.getCheckCodes();

    if(!response.body) return;
    dispatch(setCheckCodes(response.body));

});

export const getRouteById = createAsyncThunk('route/GetRouteById', async (payload, { rejectWithValue, dispatch }) => {
  

    dispatch(isLoading(true));
    const response = await checkAPI.getRouteById(payload);
    if(!response.body) return;
    let checkProhibitions = response.body.checkCodes;
    for (const checkCode of checkProhibitions) {
               checkCode.prohibitionCodes = checkCode.prohibitionCodes.filter(x => response.body.prohibitionCodes.find(p => p.id === x.id));
    }
    for (const checkProhibition of checkProhibitions) {
        dispatch(addCheckProhibition(checkProhibition));
    }
    dispatch(setState(response.body));
    dispatch(getCheckCodes(response.body.hasPin));
    dispatch(isLoading(false));


});

export const getRoutes = createAsyncThunk('route/GetRoutes',async (payload, { rejectWithValue, dispatch }) => {

    dispatch(isLoading(true));
    dispatch(reset());
    const response = await checkAPI.getRoutes();
    if(!response.body) return;

    let value = response.body.map(x => (
        {
            ...x,
            prohibitionCodes:x.prohibitionCodes.join(),
            checkCodes:x.checkCodes.join()
        }
    ));
    dispatch(setRoutes(value));
    dispatch(isLoading(false));

});


export const saveRoute = createAsyncThunk('route/SaveRoute', async (payload,{ rejectWithValue, dispatch }) => {

    dispatch(isLoading(true));
    const response = await checkAPI.saveRoute(payload);
    if(!response.body) return;
    dispatch(getRouteById(response.body.id));
    dispatch(isLoading(false));

});

export const deleteRoute = createAsyncThunk('route/DeleteRoute',async(payload, { rejectWithValue, dispatch }) => {

    await checkAPI.deleteRoute(payload);
    dispatch(deleteRouteFromDataGrid(payload));
    
});


export const setProhibtionCodesToRoute = createAsyncThunk('route/getCheckCodeById', async (payload, { rejectWithValue, dispatch }) => {

    const response = await checkAPI.getCheckCodeById(payload);
    if(!response.body) return;
    dispatch(setProhibtionCodes(response.body.prohibitionCodes));

});

export const routeSlice = createSlice({
    name:'route',
    initialState,
    reducers:{
        setState(state,action){
            state.id = action.payload.id;
            state.code = action.payload.code;
            state.name = action.payload.name;
        },
        setCheckCodes(state,action) {
            state.checkCodes = action.payload;
        },
        setProhibtionCodes(state,action) {
            state.prohibitionCodes = action.payload;
        },
        setPopup(state,action){
            state.popup = action.payload;
        },
        setRoutes(state,action){
            state.routes = action.payload;
        },
        deleteRouteFromDataGrid(state,action) {
            state.routes = state.routes.filter(x => x.id !== action.payload);
        },
        
        addCheckProhibition(state,action) {
            if(state.checkProhibitions.filter(x => x.id === action.payload.id).length !== 0) return;
            state.checkProhibitions.push(action.payload);
        },
        deleteCheckProhibition(state,action){
            state.checkProhibitions = state.checkProhibitions.filter(x => x.id !== action.payload);
        },
        updateCheckProhibitions(state,action) {
            let checkProhibitions = [...state.checkProhibitions];
            let index = checkProhibitions.findIndex(x => x.id === action.payload.id);
            checkProhibitions[index].prohibitionCodes = state.checkCodes.find(x => x.id === action.payload.id).prohibitionCodes.filter(x => action.payload.prohibitionCodes.includes(x.id));
            state.checkProhibitions = checkProhibitions;
        },
        reset() {
            return initialState;
        },
        isLoading(state,action) {
            state.isLoading = action.payload;
        } 
    }

})

export const { setState,setCheckCodes,setRoutes,setPopup, deleteRouteFromDataGrid,setProhibtionCodes,addCheckProhibition,deleteCheckProhibition,updateCheckProhibitions, reset, isLoading } = routeSlice.actions;

export default routeSlice.reducer;