import { createSlice,createAsyncThunk } from "@reduxjs/toolkit";
import { checkAPI } from "../../api/checkAPI";






const initialState = {
        id:0,
        script:'',
        testinfo:'',
        cases:'',
        connectionInformationToProduction:'',
        patterns:[],
        isLoading:true,
        redirectFlag:false
}

export const getPatternById = createAsyncThunk("pattern/GetPatternById ", async (payload, { rejectWithValue, dispatch }) => {
    
    dispatch(isLoading(true));
    const response = await checkAPI.getPatternById(payload);
    dispatch(setValues(response.body))
    dispatch(isLoading(false));

})


export const getPatterns = createAsyncThunk("pattern/GetPatterns",async (_,{rejectWithValue, dispatch}) => {
   
    dispatch(reset());
    dispatch(isLoading(true));
    const response = await checkAPI.getPatterns();
    dispatch(setPatterns(response.body));
    dispatch(isLoading(false));

})

export const addPattern = createAsyncThunk("pattern/AddPattern",async (payload,{rejectWithValue, dispatch }) => {
    
    let response = await checkAPI.addPattern(payload);

    if(response == null) return;
 
    let request = {
        ...payload,
        id:response.body,
    }
  
    dispatch(setValues(request));
    
})

export const updatePattern = createAsyncThunk("pattern/UpdatePattern", async (payload, { rejectWithValue, dispatch }) => {
    
    await checkAPI.updatePattern(payload);
    
})

export const deletePattern = createAsyncThunk("pattern/DeletePattern", async (payload, { rejectWithValue, dispatch }) => {
    dispatch(deletePatternFromList(payload));
   
    await checkAPI.deletePattern(payload);
   
})

export const patternSlice = createSlice({
    name:"pattern",
    
    initialState,
    
    reducers:{
        setValues(state,action) {
            let { id, script, testInfo, cases,connectionInformationToProduction } = action.payload;
            state.id = id;
            state.script = script;
            state.testinfo = testInfo;
            state.cases = cases;
            state.connectionInformationToProduction = connectionInformationToProduction;
        },
        setPatterns(state,action) {
            
            if(action.payload != null) {
                state.patterns = action.payload;
            } 
        },
        deletePatternFromList(state,action){
            state.patterns = state.patterns.filter(x => x.id !== action.payload);
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

export const { setValues, setPatterns,deletePatternFromList, setRedirectFlag, isLoading,reset } = patternSlice.actions;

export default patternSlice.reducer;