import { createSlice,createAsyncThunk } from "@reduxjs/toolkit";
import { checkAPI } from "../../api/checkAPI";


const initialState = {
        blocks:[],
        id:0,
        name:'',
        isLoading:true,
        redirectFlag:false
}

export const getBlockById = createAsyncThunk("block/GetBlockById ", async (payload, { rejectWithValue, dispatch }) => {
    
    dispatch(isLoading(true));
    const request = await checkAPI.getBlockById(payload);
    dispatch(setDataToUpdate(request.body));
    dispatch(isLoading(false));

})


export const getBlocks = createAsyncThunk("block/GetBlocks",async (_,{rejectWithValue, dispatch}) => {
   
    dispatch(reset());
    dispatch(isLoading(true));
    const response = await checkAPI.getBlocks();
    dispatch(setBlocks(response.body));
    dispatch(isLoading(false));

})
export const addBlock = createAsyncThunk("block/AddBlock",async (payload,{rejectWithValue, dispatch }) => {
    
    dispatch(setRedirectFlag(false));
    await checkAPI.addBlock(payload);
    dispatch(setRedirectFlag(true));
    
})

export const updateBlock = createAsyncThunk("block/UpdateBlock", async (payload, { rejectWithValue, dispatch }) => {
    
    dispatch(setRedirectFlag(false));
    await checkAPI.updateBlock(payload);
    dispatch(setRedirectFlag(true));
    
})

export const deleteBlock = createAsyncThunk("block/DeleteCheckCode", async (payload, { rejectWithValue, dispatch }) => {
    
    await checkAPI.deleteBlock(payload);
    dispatch(deleteBlockFromList(payload));
    
})

export const blockSlice = createSlice({
    name:"block",
    initialState,
    
    reducers:{
        setDataToUpdate(state,action) {
            state.id = action.payload.id;
            state.name = action.payload.name;
        },
        setBlocks(state,action) {
            
            if(action.payload != null) {
                state.blocks = action.payload
            } 
        },
        deleteBlockFromList(state,action){
            state.blocks = state.blocks.filter(x => x.id !== action.payload);
        },
        setRedirectFlag(state,action) {
            state.redirectFlag = action.payload;
        },
        isLoading(state,action) {
            state.isLoading = action.payload;
        },
        reset() {
            return initialState
        }
    }
})

export const { setDataToUpdate, setBlocks,deleteBlockFromList, setRedirectFlag, isLoading,reset } = blockSlice.actions;

export default blockSlice.reducer;