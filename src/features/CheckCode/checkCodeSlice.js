import { createSlice,createAsyncThunk } from "@reduxjs/toolkit";
import { checkAPI } from "../../api/checkAPI";


const initialState = {
    prohibitionCodes:[],
    filteredProhibitionCode:[],
    Id:0,
    Name:"",
    Title:"",
    IsActive:false,
    checkCodes:[],
    isLoading:false,
    redirectFlag:false
}



export const getCheckCodeById = createAsyncThunk('checkCode/GetCheckCodeById', async (payload,{ rejectWithValue, dispatch }) =>{
    
    const request = await checkAPI.getCheckCodeById(payload);
    dispatch(setData(request.body));
    dispatch(isLoading(false));
})

export const getCheckCodes = createAsyncThunk('checkCode/GetCheckCodes', async (_,{rejectWithValue, dispatch}) => {
    
    dispatch(reset());
    dispatch(isLoading(true));
    const response = await checkAPI.getCheckCodes();
    dispatch(setCheckCodes(response.body));
    dispatch(isLoading(false));
})

export const addCheckCode = createAsyncThunk("checkCode/AddCheckCode",async (payload,{rejectWithValue, dispatch }) => {
    
    dispatch(setRedirectFlag(false));
    await checkAPI.addCheckCode(payload);
    dispatch(setRedirectFlag(true));
})

export const updateCheckCode = createAsyncThunk("checkCode/UpdateCheckCode", async (payload, { rejectWithValue, dispatch }) => {
    
    dispatch(setRedirectFlag(false));
    await checkAPI.updateCheckCode(payload);
    dispatch(setRedirectFlag(true));
})

export const deleteCheckCode = createAsyncThunk("checkCode/DeleteCheckCode", async (payload, { rejectWithValue, dispatch }) => {
    
    await checkAPI.deleteCheckCode(payload);
    dispatch(deleteCheckCodeFromList(payload));
})


export const checkCodeSlice = createSlice({
    name:"checkCode",
    initialState,
    reducers:{
        
        setData:(state,action) => {
            state.Id = action.payload.id;
            state.Name = action.payload.name;
            state.Title = action.payload.title;
            state.IsActive = action.payload.isActive;
            state.prohibitionCodes = action.payload.prohibitionCodes;
        },
        isLoading(state,action) {
            state.isLoading = action.payload;
        },
        setCheckCodes(state,action) {
            
            if(action.payload !=null) {
                state.checkCodes = action.payload
            }
        },
        deleteCheckCodeFromList(state,action) {
            state.checkCodes = state.checkCodes.filter(x => x.id !== action.payload);
        },
        setProhibitionCodes(state,action) {
            state.prohibitionCodes = action.payload;
        },
        setRedirectFlag(state,action) {
            state.redirectFlag = action.payload;
        },
        reset() {
            return initialState;
        }
    }
})

export const { setData,isLoading,setCheckCodes,deleteCheckCodeFromList,setRedirectFlag,reset} = checkCodeSlice.actions;

export default checkCodeSlice.reducer;