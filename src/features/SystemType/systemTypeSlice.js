import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { checkAPI } from "../../api/checkAPI";

const initialState = {
    id:0,
    code:'',
    name:'',

    systemTypes:[],
    isLoading:false,
    redirect:false
}



export const getSystemTypeById = createAsyncThunk('systemType/getSytemTypeById',async (payload,{ rejectWithValue, dispatch }) => {
    dispatch(isLoading(true));
    const response = await checkAPI.getSystemTypeById(payload);
    dispatch(setState(response.body))

    dispatch(isLoading(false));
}) 

export const getSystemTypes = createAsyncThunk('systemType/getSystemTypes', async (payload, { rejectWithValue, dispatch }) => {

    dispatch(reset());
    dispatch(isLoading(true));
    dispatch(setRedirect(false));
    const response = await checkAPI.getSystemTypes();
    if(response.body != null) {
        dispatch(setSystemTypes(response.body));
    }
    
    dispatch(isLoading(false));
})

export const saveSystemType = createAsyncThunk('systemType/saveSystemType', async (payload,{ rejectWithValue, dispatch } ) => {
    
    await checkAPI.saveSystemType(payload);  
    dispatch(setRedirect(true));  
})

export const deleteSystemType = createAsyncThunk('systemType/deleteSystemType', async (payload, { rejectWithValue, dispatch}) => {
    
    await checkAPI.deleteSystemType(payload);
    dispatch(deleteSystemTypeFromList(payload));
    dispatch(setRedirect(true));
})



export const systemTypeSlice = createSlice({
    name:'systemType',
    initialState,
    reducers:{
        setState(state,action){
            state.id = action.payload.id;
            state.code = action.payload.code;
            state.name = action.payload.name;  
        },
        setSystemTypes(state,action) {
            state.systemTypes = action.payload;
        },
        deleteSystemTypeFromList(state,action) {
            state.systemTypes = state.systemTypes.filter(x => x.id !== action.payload);
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

export const { setState, setSystemTypes,reset,deleteSystemTypeFromList,setRedirect, isLoading } = systemTypeSlice.actions;

export default systemTypeSlice.reducer;