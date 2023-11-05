import { createAsyncThunk,createSlice} from "@reduxjs/toolkit";
import { checkAPI } from "../../api/checkAPI";


const initialState = {
     
     id:0,
     name:'',
     code:'',
     statuses:[],
     isLoading:true
}





export const getStatusById = createAsyncThunk('status/GetStatusById', async (payload,{ rejectWithValue, dispatch }) =>{
   
    dispatch(isLoading(true));
    const response = await checkAPI.getStatusById(payload);
 
    dispatch(setValues(response.body));
    dispatch(isLoading(false));
})


export const getStatuses = createAsyncThunk('status/GetStatuses', async (_, { rejectWithValue, dispatch }) => {
   
    dispatch(reset());
    dispatch(isLoading(true));
    const response = await checkAPI.getStatusList();

    dispatch(setStatuses(response.body));
    dispatch(isLoading(false));
}); 


export const addStatus = createAsyncThunk("status/AddStatus",async (payload,{rejectWithValue, dispatch }) => {
    

    let response = await checkAPI.addStatus(payload);

    if(response == null) return;
    
    dispatch(setValues(response.body));

})

export const updateStatus = createAsyncThunk("status/UpdateStauts", async (payload, { rejectWithValue, dispatch }) => {
    
    await checkAPI.updateStatus(payload);

})

export const deleteStatus = createAsyncThunk("status/DeleteStatus", async (payload, { rejectWithValue, dispatch }) => {
    
    dispatch(deleteStatusFromList(payload));
    await checkAPI.deleteStatus(payload);

})

export const statusSlice = createSlice({
    name:"status",
    initialState,
    reducers:{
        setValues(state,action) {
            state.id = action.payload.id;
            state.code = action.payload.code;
            state.name = action.payload.name;
        },
        setStatuses(state,action) {
            if(action.payload != null) {
                state.statuses = action.payload
            }
        },
        deleteStatusFromList(state,action){
            state.statuses = state.statuses.filter(x => x.id !== action.payload);
        },
        isLoading(state,action) {
            state.isLoading = action.payload;
        },
        reset() {
            return initialState;
        }
    }
})

export const { setStatuses,deleteStatusFromList,setValues,isLoading,reset  } = statusSlice.actions;

export default statusSlice.reducer;