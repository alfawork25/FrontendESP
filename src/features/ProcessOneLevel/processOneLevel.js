import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { checkAPI } from "../../api/checkAPI";

const initialState = {
    id:0,
    code:'',
    name:'',

    processOneLevels:[],
    isLoading:false,
    redirect:false
}



export const getProcessOneLevelById = createAsyncThunk('processOneLevel/getProcessOneLevelById',async (payload,{ rejectWithValue, dispatch }) => {
    
    dispatch(isLoading(true));
    const response = await checkAPI.getProcessFirstLevelById(payload);
    dispatch(setState(response.body))

    dispatch(isLoading(false));
}) 

export const getProcessOneLevels = createAsyncThunk('processOneLevel/getProcessOneLevels', async (payload, { rejectWithValue, dispatch }) => {

    dispatch(reset());
    dispatch(isLoading(true));
    dispatch(setRedirect(false));
    const response = await checkAPI.getProcessFirstLevels();
    if(response.body != null) {
        dispatch(setProcessOneLevels(response.body));
    }
    
    dispatch(isLoading(false));
})

export const addProcessFirstLevel = createAsyncThunk("processOneLevel/AddProcessOneLevel",async (payload,{rejectWithValue, dispatch }) => {
    
     await checkAPI.addProcessFirstLevel(payload);

    dispatch(setRedirect(true));

})

export const updateProcessFirstLevel = createAsyncThunk("processOneLevel/UpdateProcessOneLevel", async (payload, { rejectWithValue, dispatch }) => {
    dispatch(setRedirect(false))
    await checkAPI.updateProcessFirstLevel(payload);
    dispatch(setRedirect(true));
})



export const deleteFirstProcessLevel = createAsyncThunk('processFirstLevel/deleteFirstProcessLevel', async (payload, { rejectWithValue, dispatch}) => {
    
    await checkAPI.deleteProcessFirstLevel(payload);
    dispatch(deleteProcessFirstLevelFromList(payload));
    dispatch(setRedirect(true));
})



export const processOneLevelSlice = createSlice({
    name:'processOneLevel',
    initialState,
    reducers:{
        setState(state,action){
            state.id = action.payload.id;
            state.code = action.payload.code;
            state.name = action.payload.name;  
        },
        setProcessOneLevels(state,action) {
            state.processOneLevels = action.payload;
        },
        deleteProcessFirstLevelFromList(state,action) {
            state.processOneLevels = state.processOneLevels.filter(x => x.id !== action.payload);
        },
        setRedirect(state,action) {
            state.redirect = action.payload
        },
        reset() {
            return initialState;
        },
        isLoading(state,action) {
            state.isLoading = action.payload;
        } 
    }

})

export const { setState, setProcessOneLevels,reset,deleteProcessFirstLevelFromList,setRedirect, isLoading } = processOneLevelSlice.actions;

export default processOneLevelSlice.reducer;