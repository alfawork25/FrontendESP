import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { checkAPI } from "../../api/checkAPI";

const initialState = {
    id:0,
    code:'',
    name:'',

    systemBlocks:[],
    isLoading:false,
    redirect:false
}



export const getSystemBlockById = createAsyncThunk('systemBlock/getSytemBlocksById',async (payload,{ rejectWithValue, dispatch }) => {
    dispatch(isLoading(true));
    
    const response = await checkAPI.getSystemBlockById(payload);
    dispatch(setState(response.body))

    dispatch(isLoading(false));
}) 

export const getSystemBlocks = createAsyncThunk('systemBlock/getSystemBlocks', async (payload, { rejectWithValue, dispatch }) => {

    dispatch(reset());
    dispatch(isLoading(true));
    dispatch(setRedirect(false));
    const response = await checkAPI.getSystemBlocks();
    
    if(response.body != null) {
        dispatch(setSystemBlocks(response.body));
    }   
    dispatch(isLoading(false));

})

export const saveSystemBlock = createAsyncThunk('systemBlock/saveSystemBlock', async (payload,{ rejectWithValue, dispatch } ) => {
    
    await checkAPI.saveSystemBlock(payload);
    dispatch(setRedirect(true));   
})

export const deleteSystemBlock = createAsyncThunk('systemBlock/deleteSystemBlock', async (payload, { rejectWithValue, dispatch}) => {
    await checkAPI.deleteSystemBlock(payload);
    dispatch(deleteSystemBlockFromList(payload));
    dispatch(setRedirect(true));
})



export const systemBlockSlice = createSlice({
    name:'systemBlock',
    initialState,
    reducers:{
        setState(state,action){
            state.id = action.payload.id;
            state.code = action.payload.code;
            state.name = action.payload.name;  
        },
        setSystemBlocks(state,action) {
            state.systemBlocks = action.payload;
        },
        deleteSystemBlockFromList(state,action) {
            state.systemBlocks = state.systemBlocks.filter(x => x.id !== action.payload);
        },
        setRedirect(state,action) {
            state.redirect = action.payload;
        },
        reset() {
            return initialState;
        },
        isLoading(state,action) {
            state.isLoading = action.payload;
        } 
    }

})

export const { setState, setSystemBlocks,reset,deleteSystemBlockFromList, setRedirect, isLoading } = systemBlockSlice.actions;

export default systemBlockSlice.reducer;