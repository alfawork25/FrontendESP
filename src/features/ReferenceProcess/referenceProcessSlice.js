import { createAsyncThunk,createSlice} from "@reduxjs/toolkit";
import { checkAPI } from "../../api/checkAPI";


const initialState = {
     
     id:0,
     name:'',
     systemCode:'',
     processFirstLevel:'',
     processSecondLevel:'',
     processCodeThirdLevel:'',
     processNameThirdLevel:'',
     processesRegistry:[],
     systemBlocks:[],
     processFirstLevels:[],
     processSecondLevels:[],
     statuses:[],
     isLoading:true
}




export const Init = createAsyncThunk('processRegistry', async (payload, { rejectWithValue, dispatch}) => {


    let systemBlocks = await checkAPI.getSystemBlocks();
    let processFirstLevels = await checkAPI.getProcessFirstLevels();
    let processSecondLevels = await checkAPI.getProcessTwoLevels();
    
    dispatch(setBase({
        systemBlocks:systemBlocks.body || [],
        processFirstLevels:processFirstLevels.body || [],
        processSecondLevels:processSecondLevels.body || []
    }))
  

})
export const getProcessRegistryById = createAsyncThunk('processRegistry/GetProcessRegistryId', async (payload,{ rejectWithValue, dispatch }) =>{
   
    dispatch(isLoading(true));
    const response = await checkAPI.getProcessRegistryById(payload);

    dispatch(setValues(response.body));
    dispatch(isLoading(false));
})


export const getProcessesRegistry = createAsyncThunk('processRegistry/GetProcessesRegstry', async (_, { rejectWithValue, dispatch }) => {
   
    dispatch(reset());
    dispatch(isLoading(true));
    const response = await checkAPI.getProcessesRegistry();
    let registry = response.body;

    let result = []
    if(registry) {

        for (const process of registry) {
     
            let obj = {
                id:process.id,
             
            }
            
            if(process.systemBlock) {
                obj.systemCode = process.systemBlock.code;
                obj.systemName = process.systemBlock.name;
            }

            if(process.processOneLevel){
                obj.processFirstLevelCode = process.processOneLevel.code;
                obj.processFirstLevelName = process.processOneLevel.name;
            }

            if(process.processTwoLevel){
                obj.processTwoLevelCode = process.processTwoLevel.code;
                obj.processTwoLevelName = process.processTwoLevel.name;
            }
            obj.processThirdLevelName = process.processNameThirdLevel;
            obj.processThirdLevelCode =process.processCodeThirdLevel;
            obj.processReferenceUniqueName = process.processReferenceUniqueName;
            obj.processName = process.processName;
            result.push(obj);

        }
        
    
    }
   
    dispatch(setProcessesRegistry(result));
    dispatch(isLoading(false));
}); 


export const addProcessRegistry = createAsyncThunk("processRegistry/AddProcessRegistry",async (payload,{rejectWithValue, dispatch }) => {
    
 
    let response = await checkAPI.addProcessRegistry(payload);
   
    let process = {
        id:response.body,
    }
    
    dispatch(setId(process.id));
    console.log(process.id);
})

export const updateProcessRegistry = createAsyncThunk("processRegistry/UpdateProcessRegistry", async (payload, { rejectWithValue, dispatch }) => {
    
    await checkAPI.updateProcessRegistry(payload);

})

export const deleteProcessRegistry = createAsyncThunk("processRegistry/DeleteProcessRegistry", async (payload, { rejectWithValue, dispatch }) => {
    
    dispatch(deleteProcessesRegistryFromList(payload));
    await checkAPI.deleteProcessRegistry(payload);

})

export const referenceProcessSlice = createSlice({
    name:"processRegistry",
    initialState,
    reducers:{
        setValues(state,action) {
            state.id = action.payload.id;
           
            if(action.payload.systemBlock){
                state.systemCode = action.payload.systemBlock.id;
            }   
            if(action.payload.processOneLevel) {
                state.processFirstLevel = action.payload.processOneLevel.id;
            }         
            if(action.payload.processTwoLevel) {
                state.processSecondLevel = action.payload.processTwoLevel.id;
            }
            if(action.payload.processCodeThirdLevel) {
                state.processCodeThirdLevel = action.payload.processCodeThirdLevel;
            }
            if(action.payload.processNameThirdLevel) {
                state.processNameThirdLevel = action.payload.processNameThirdLevel;
            }
            

        },
        setProcessesRegistry(state,action) {
            if(action.payload != null) {
                state.processesRegistry = action.payload
            }
        },
        deleteProcessesRegistryFromList(state,action){
            state.processesRegistry = state.processesRegistry.filter(x => x.id !== action.payload);
        },
        isLoading(state,action) {
            state.isLoading = action.payload;
        },
        setBase(state,action) {
            state.systemBlocks = action.payload.systemBlocks;
            state.processFirstLevels = action.payload.processFirstLevels;
            state.processSecondLevels = action.payload.processSecondLevels;
        },
        setId(state,action) {
            state.id = action.payload;
        },
        reset() {
            return initialState;
        }
    }
})

export const { setProcessesRegistry,deleteProcessesRegistryFromList,setId,setValues,setBase,isLoading,reset  } = referenceProcessSlice.actions;

export default referenceProcessSlice.reducer;