import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { checkAPI } from "../../api/checkAPI";

const initialState = {
    id:0,
    code:'',
    name:'',

    processTwoLevels:[],
    isLoading:false,
    redirect:false
}



export const getProcessTwoLevelById = createAsyncThunk('processTwoLevel/getProcessTwoLevelById',async (payload,{ rejectWithValue, dispatch }) => {
    
    dispatch(isLoading(true));
    const response = await checkAPI.getProcessSecondLevelById(payload);
    dispatch(setState(response.body))

    dispatch(isLoading(false));
}) 

export const getProcessTwoLevels = createAsyncThunk('processTwoLevel/getProcessTwoLevels', async (payload, { rejectWithValue, dispatch }) => {

    dispatch(reset());
    dispatch(isLoading(true));
    dispatch(setRedirect(false));
    const response = await checkAPI.getProcessTwoLevels();
 
    if(response.body != null) {
        dispatch(setProcessTwoLevels(response.body));
    }
    
    dispatch(isLoading(false));
})

export const addProcessTwoLevel = createAsyncThunk("processTwoLevel/AddProcessTwoLevel",async (payload,{rejectWithValue, dispatch }) => {
    
     await checkAPI.addProcessTwoLevel(payload);

    dispatch(setRedirect(true));

})

export const updateProcessSecondLevel = createAsyncThunk("processTwoLevel/UpdateProcessSecondLevel", async (payload, { rejectWithValue, dispatch }) => {
    setRedirect(setRedirect(false))
    await checkAPI.updateProcessSecondLevel(payload);
    setRedirect(setRedirect(true));
})



export const deleteProcessTwoLevel = createAsyncThunk('processTwoLevel/deleteTwoProcessLevel', async (payload, { rejectWithValue, dispatch}) => {
    
    await checkAPI.deleteProcessTwoLevel(payload);
    dispatch(deleteProcessTwoLevelFromList(payload));
    dispatch(setRedirect(true));
})



export const processTwoLevelSlice = createSlice({
    name:'processTwoLevel',
    
    initialState,
    reducers:{
        setState(state,action){
            state.id = action.payload.id;
            state.code = action.payload.code;
            state.name = action.payload.name;  
        },
        setProcessTwoLevels(state,action) {
            state.processTwoLevels = action.payload;
        },
        deleteProcessTwoLevelFromList(state,action) {
            state.processTwoLevels = state.processTwoLevels.filter(x => x.id !== action.payload);
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

export const { setState, setProcessTwoLevels,reset,deleteProcessTwoLevelFromList,setRedirect, isLoading } = processTwoLevelSlice.actions;

export default processTwoLevelSlice.reducer;