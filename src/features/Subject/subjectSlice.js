import { createAsyncThunk,createSlice} from "@reduxjs/toolkit";
import { checkAPI } from "../../api/checkAPI";


const initialState = {
     id:0,
     subject:'',
     checkBlocks:[],
     subjects:[],
     redirectFlag:false,
     isLoading:true
}





export const getSubjectById = createAsyncThunk('subject/GetSubjectById', async (payload,{ rejectWithValue, dispatch }) =>{
   
    dispatch(isLoading(true));
    const response = await checkAPI.getSubjectTypeById(payload);
    dispatch(setData(response.body));
    dispatch(isLoading(false));
})


export const getSubjects = createAsyncThunk('subject/GetSubjects', async (_, { rejectWithValue, dispatch }) => {
    dispatch(reset());
    dispatch(setRedirectFlag(false));
    dispatch(isLoading(true));
    const response = await checkAPI.getSubjectTypes();
    dispatch(setSubjects(response.body));
    dispatch(isLoading(false));
}); 


export const addSubject = createAsyncThunk("subject/AddSubject",async (payload,{rejectWithValue, dispatch }) => {
    dispatch(setRedirectFlag(false));
    await checkAPI.addSubjectType(payload);
    dispatch(setRedirectFlag(true));
})

export const updateSubject = createAsyncThunk("subject/UpdateSubject", async (payload, { rejectWithValue, dispatch }) => {
    
    dispatch(setRedirectFlag(false));
    await checkAPI.updateSubjectType(payload);
    dispatch(setRedirectFlag(true));

})

export const deleteSubject = createAsyncThunk("subject/DeleteSubject", async (payload, { rejectWithValue, dispatch }) => {
    
    await checkAPI.deleteSubjectType(payload);
    dispatch(deleteSubjectFromList(payload));
})

export const subjectSlice = createSlice({
    name:"subject",
    initialState,
    reducers:{
        setData(state,action) {
            state.id = action.payload.id;
            state.subject = action.payload.name;
            state.checkBlocks = action.payload.checkBlocks;
        },
        setSubjects(state,action) {
            if(action.payload != null) {
                state.subjects = action.payload
            }
        },
        deleteSubjectFromList(state,action){
            state.subjects = state.subjects.filter(x => x.id !== action.payload);
        },
        setRedirectFlag(state,action) {
            state.redirectFlag = action.payload;
        },
        isLoading(state,action) {
            state.isLoading = action.payload;
        },
        reset() {
            return initialState;
        }
    }
})

export const { setSubjects,deleteSubjectFromList,setData, setRedirectFlag,isLoading,reset  } = subjectSlice.actions;

export default subjectSlice.reducer;