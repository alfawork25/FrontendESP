import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { checkAPI } from "../../api/checkAPI";

const initialState = {
    id:0,
    code:'',
    name:'',

    clientTypes:[],
    subjects:[],
    subjectItems:[],
    isLoading:false,
    redirect:false
}



export const getClientTypeById = createAsyncThunk('clientType/getClientTypeById',async (payload,{ rejectWithValue, dispatch }) => {
    
    dispatch(isLoading(true));
    const response = await checkAPI.getClientTypeById(payload);
    dispatch(setState(response.body))
    dispatch(isLoading(false));
}) 

export const getClientTypes = createAsyncThunk('clientType/getClientTypes', async (payload, { rejectWithValue, dispatch }) => {

    dispatch(reset());
    dispatch(isLoading(true));
    const response = await checkAPI.getClientTypes();
    if(response.body != null) {
        dispatch(setClientTypes(response.body));
    }
    dispatch(isLoading(false));
    
})

export const saveClientType = createAsyncThunk('clientType/saveClientType', async (payload,{ rejectWithValue, dispatch } ) => {
    
    await checkAPI.saveClientType(payload);    
    dispatch(setRedirect(true));

})


export const deleteClientType = createAsyncThunk('clientType/deleteClientType', async (payload, { rejectWithValue, dispatch}) => {
    
    await checkAPI.deleteClientType(payload);
    dispatch(deleteClientTypeFromList(payload));
    dispatch(setRedirect(true));
})

export const getSubjects = createAsyncThunk('clientType/getSubjects', async (payload, { rejectWithValue, dispatch }) => {

    dispatch(setSubjects([]));
    const response = await checkAPI.getSubjectTypes();
    if(response.body == null) return; 
    dispatch(setSubjects(response.body));
   
})



export const clientTypeSlice = createSlice({
    name:'clientType',
    initialState,
    reducers:{
        setState(state,action){
       
            state.id = action.payload.id;
            state.code = action.payload.code;
            state.name = action.payload.name;
            state.subjects = action.payload.subjectTypes.map(x => x.id);  
        },
        setClientTypes(state,action) {
            state.clientTypes = action.payload;
        },
        reset() {
            return initialState;
        },
        deleteClientTypeFromList(state,action){
            state.clientTypes = state.clientTypes.filter(x => x.id !== action.payload)
        },
        setSubjects(state,action){
            state.subjectItems = action.payload;
        },
        setRedirect(state,action) {
            state.redirect = action.payload;
        },
        isLoading(state,action) {
            state.isLoading = action.payload;
        } 
    }

})

export const { setState, setClientTypes,reset,deleteClientTypeFromList,setSubjects, setRedirect, isLoading } = clientTypeSlice.actions;

export default clientTypeSlice.reducer;