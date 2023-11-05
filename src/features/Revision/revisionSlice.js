import { createSlice,createAsyncThunk } from "@reduxjs/toolkit";
import { revisionAPI } from "../../api/revisionAPI";


const initialState = {
        revisions:[],
        id:0,
        
        revisionType:'',
        revisionName:'',
        primaryModification:'',
        current:'',
        startDate:'',
        status:'',
        processInfo:'',
        processCode:'',
        profile:'',
        rsOneCode:'',
        rsOneName:'',
        groupCode:'',
        checkCall:'',
        requestDate:'',
        directionDate:'',
        resultDate:'',
        endDate:'',
        note:'',
        approvedProfile:'',
        approvedProm:'',
        approvedWithNote:'',
        integrated:'',
        contactName:'',
        responsibleOKBP:'',
        subjects:'',
        responsibleTechnologist:'',
        isLoading:true
}

export const getRevisionById = createAsyncThunk("GetRevision/GetRevisionById ", async (payload, { rejectWithValue, dispatch }) => {
    
    dispatch(isLoading(true));
    const response = await revisionAPI.getRevisionById(payload);
    if(response.body) {
        dispatch(setValues(response.body));
    }

    dispatch(isLoading(false));

})


export const getRevisions = createAsyncThunk("revision/GetRevisions",async (param,{rejectWithValue, dispatch}) => {
   
    dispatch(reset());
    dispatch(isLoading(true));
    const response = await revisionAPI.getRevisions(param);
    dispatch(setRevisions(response.body));
    dispatch(isLoading(false));

})
export const addRevision = createAsyncThunk("revision/AddRevision",async (payload,{rejectWithValue, dispatch }) => {
    
    let response = await revisionAPI.addRevision(payload);
    if(!response.body) return;
    let revision = {
        ...payload,
        name:payload.modificationName,
        id:response.body
    }
    dispatch(addRevisionToList(revision));
   
})

export const updateRevision = createAsyncThunk("revision/UpdateRevision", async (payload, { rejectWithValue, dispatch }) => {
  
    
    await revisionAPI.updateRevision(payload);
    let revision = {
        id:payload.id,
        name:payload.modificationName,
    }
    dispatch(updateRevisionList(revision));
})

export const deleteRevision = createAsyncThunk("revision/DeleteCheckCode", async (payload, { rejectWithValue, dispatch }) => {
    
    await revisionAPI.deleteRevision(payload);
    dispatch(deleteRevisionFromList(payload));
    
})

export const revisionSlice = createSlice({
    name:"revision",
    initialState,
    
    reducers:{
        setValues(state,action) {
            state.id = action.payload.id;
            state.revisionName = action.payload.name;
            state.revisionType = action.payload.revisionType;
            state.primaryModification = action.payload.primaryModification;
            state.current = action.payload.current;
            state.startDate = action.payload.startDate;
            state.status = action.payload.status;
            state.processInfo = action.payload.processInfo;
            state.processCode = action.payload.processCode;
            state.profile = action.payload.profile;
            state.rsOneCode = action.payload.rsOneCode;
            state.rsOneName = action.payload.rsOneName;
            state.groupCode = action.payload.groupCode;
            state.checkCall = action.payload.checkCall;
            state.requestDate = action.payload.requestDate;
            state.directionDate = action.payload.directionDate;
            state.resultDate = action.payload.resultDate;
            state.endDate = action.payload.endDate;
            state.note = action.payload.note;
            state.approvedProfile = action.payload.approvedProfile;
            state.approvedProm = action.payload.approvedProm;
            state.approvedWithNote = action.payload.approvedWithNote;
            state.integrated = action.payload.integrated;
            state.contactName = action.payload.contactName;
            state.responsibleOKBP = action.payload.responsibleOKBP;
            state.responsibleTechnologist = action.payload.responsibleTechnologist;
        },
        setRevisions(state,action) {
            
            if(action.payload != null) {
                state.revisions = action.payload;
            } 
        },
        addRevisionToList(state,action){
            state.revisions.push(action.payload)
        },
        
        updateRevisionList(state,action) {
            let updateRevisionList = [...state.revisions];
            updateRevisionList[updateRevisionList.findIndex(z => z.id === action.payload.id)].name = action.payload.name;
            state.revisions = [...updateRevisionList];
        },
        deleteRevisionFromList(state,action){
            state.revisions = state.revisions.filter(x => x.id !== action.payload);
        },
        setRedirectFlag(state,action) {
            state.redirectFlag = action.payload;
        },
        isLoading(state,action) {
            state.isLoading = action.payload;
        },
        reset(state,action) {
            state.id=0;
            state.revisionType='';
            state.revisionName='';
            state.primaryModification='';
            state.current='';
            state.startDate='';
            state.status='';
            state.processInfo='';
            state.processCode='';
            state.profile='';
            state.rsOneCode='';
            state.rsOneName='';
            state.groupCode='';
            state.checkCall='';
            state.requestDate='';
            state.directionDate='';
            state.resultDate='';
            state.endDate='';
            state.note='';
            state.approvedProfile='';
            state.approvedProm='';
            state.approvedWithNote='';
            state.integrated='';
            state.contactName='';
            state.responsibleOKBP='';
            state.subjects='';
            state.responsibleTechnologist='';
        }
    
    }
})

export const { setValues, setRevisions,deleteRevisionFromList,addRevisionToList,updateRevisionList, setRedirectFlag, isLoading,reset } = revisionSlice.actions;

export default revisionSlice.reducer;