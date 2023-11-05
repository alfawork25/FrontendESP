import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import { checkAPI } from "../../api/checkAPI"
import { processAPI } from "../../api/processAPI";


const initialState = {
    id:0,
    name:'',
    systemType:'',
    blockTechnologist:'',
    startDate:null,
    primaryConnectionStatus:'',
    startDateLastRevision:null,
    primaryDate:null,
    lastDateRevision:null,
    enrollments:[],
    count:0,
    lastRevisionStatus:'',
    statusDate:null,
    statusHistories:[],
    blocks:[],
    subjects:[],
    checkedSubjects:[],
    checks:[],
    checkCodes:[],
    prohibitionCodes:[],
    prohibitionCodesToCheck:[],
    clientTypes:[],
    clientId:'',
    processes:[],
    isLoading:false,
    systemTypes:[],
    systemCode:'',
}



export const getBlocksToProcess = createAsyncThunk('process/GetBlocks', async (_, { rejectWithValue, dispatch }) => {
    
    const response = await checkAPI.getBlocks();
    if(response.body == null) return; 
    
    dispatch(setBlocks(response.body));

}) 


export const getSubjects = createAsyncThunk('process/getSubjects', async (payload, { rejectWithValue, dispatch }) => {

    dispatch(setSubjects([]));
    const response = await checkAPI.getSubjectTypes();
    if(response.body == null) return; 
    response.body = response.body.map(x => ({id:x.id,name:x.name,checked:false}));
    dispatch(setSubjects(response.body));
   

});


export const getSystemTypes = createAsyncThunk('process/GetSystemTypes', async (payload, { rejectWithValue, dispatch }) => {
    const response = await checkAPI.getSystemTypes();
    if(response.body == null) return;
    dispatch(setSytemTypes(response.body.map(x => ({...x,name:`${x.code}-${x.name}`}))));
})

export const getClientTypes = createAsyncThunk('process/getClientTypes', async (payload, { rejectWithValue, dispatch }) => {

    dispatch(setClientTypes([]));
    const response = await checkAPI.getClientTypes();
    if(response.body == null) return; 
    dispatch(setClientTypes(response.body));
})

export const getChecks = createAsyncThunk('process/GetChecks', async (payload,{ rejectWithValue, dispatch,getState }) => {


    if(!payload) return;
    const response = await processAPI.getChecks(payload);
    if(response.body == null) return; 

    const checks = [...response.body];
  
    const { process } = getState();

    
    for (const iterator of checks) {
       
        let clients = new Map();
        for (const it of process.subjects.filter(x => payload.subjects.find(y => y.subjectId === x.id))) {
            clients.set(it.name,[]);
        }
        for (const checkCode of iterator.checkCodes) {
            for (const subject of checkCode.subjectTypes) {
                const key = `${subject.name}`;
                const clientInfo = {...checkCode, isNewClient: +checkCode.isActive};
        
                if (!clients.has(key)) {
                    clients.set(key, [clientInfo]);
                } else {
                    clients.get(key).push(clientInfo);
                }
                
            }
        } 
        let subjects = [];
    
        clients.forEach((value,key) => subjects.push({key,value}));
       
        checks[checks.findIndex(x => x.id === iterator.id)].subjects = subjects.map(x => 
        ({subjectName:x.key,
            value:[{validationCodes:[...x.value.filter(y => y.isActive === false).map(z => ({...z,newProhibitionCodes:[]}))],update:false,editable:false},
                   {validationCodes:[...x.value.filter(y => y.isActive === true).map(z => ({...z,newProhibitionCodes:[]}))],update:false,editable:false}]}))
        

    }
  
    dispatch(setChecks(checks));


})

export const downLoadFile = createAsyncThunk('process/DownLoad', async (payload, { rejectWithValue, dispatch }) => {

    let response = await processAPI.downLoadFile(payload);
    
    const blob = new Blob([response.data], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' });
          
     const url = window.URL.createObjectURL(blob);
     const link = document.createElement('a');
     link.href = url;
     const filename = 'Compliance.xlsx'
     link.setAttribute('download', filename);
     
     document.body.appendChild(link);
     link.click();
     document.body.removeChild(link);

});
export const getProcesses = createAsyncThunk('process/GetProcesses', async (payload,{ rejectWithValue, dispatch }) => {

    dispatch(reset());
    dispatch(isLoading(true))
     const response = await processAPI.getProcesses();
     let body = response.body;
    
     if(body === null) return;

     dispatch(setProcesses(body));
     dispatch(isLoading(false))
});

export const addProcess = createAsyncThunk('process/AddProcess', async (payload,{ rejectWithValue, dispatch }) => {
   
    let response = await processAPI.addProcess(payload);
    let process = {
        id:response.body,
       
    }
   
   dispatch(setId(process.id));
});


export const getProcessById = createAsyncThunk('process/GetProcessById', async (payload, { rejectWithValue, dispatch }) => {

    dispatch(isLoading(true));
    const response = await processAPI.getProcessById(payload);
    const body = response.body; 
    if(body == null) return;
  
    const checkBlocks = body.checks ? [...body.checks] : [];
   
    let processSubjectState = body.processSubjectState;
    
    let subjectTypes = body.subjectTypes; 


    for (const iterator of checkBlocks) {
       
        let clients = new Map();
        
        for (const it of subjectTypes) {
            clients.set(it.name,[]);
        }
      
        for (const checkCode of iterator.checkCodes) {
    
            for (const subject of checkCode.subjectTypes) {
             
                const key = `${subject.name}`;
                const clientInfo = {...checkCode, isNewClient: +checkCode.isActive};
                if (!clients.has(key)) {
                    clients.set(key, [clientInfo]);
                } else {
                    clients.get(key).push(clientInfo);
                }
            }
        } 
        
       
        let subjects = [];
        clients.forEach((value,key) => subjects.push({key,value}));

        subjectTypes.forEach(value => {
            if(!subjects.find(x => x.key === value.name)) {
                subjects.push({key:value.name,value:[]})
            }
         
        })
       
    
        checkBlocks[checkBlocks.findIndex(x => x.id === iterator.id)].subjects = subjects.map(x => 
        ({
        subjectName:x.key,
        value:[{validationCodes:[...x.value.filter(y => y.isActive === false).map(z => ({...z}))],update:true,editable:false},
               {validationCodes:[...x.value.filter(y => y.isActive === true).map(z => ({...z}))], update:true,editable:false}]}));   
    }
    
    
    
    
    for (const checkBlock of checkBlocks) {
        for (const code of checkBlock.subjects) {
            code.value[0].validationCodes = code.value[0].validationCodes.map(g => ({...g,newProhibitionCodes:g.prohibitionCodes.filter(w => body.prohibitionCodes.includes(w.id))}));
            code.value[1].validationCodes = code.value[1].validationCodes.map(g => ({...g,newProhibitionCodes:g.prohibitionCodes.filter(w => body.prohibitionCodes.includes(w.id))}));
        }
    }
 

    dispatch(initCheckedSubjects(processSubjectState));


    let process = {
        id:body.id,
        name:body.processName,
        systemCode:body.systemCode,

        startDate: body.startDate,
        enrollments: body.enrollments,
        primaryDate: body.primaryDate,
        count: body.count,
        startDateLastRevision: body.startDateLastRevision,
        lastDateRevision:body.lastDateRevision,
        statusDate: body.statusDate,
       // statusHistories:body.statusHistories.map(z => ({...z,date:`${z.date.slice(5,7)}.${z.date.slice(8,10)}.${z.date.slice(0,4)}`})),
        blockTechnologist:body.blockTechnologist,
        systemType:body.systemType ?  body.systemType.id : "",
        clientId:body.clientId ? body.clientId : ''
    }

    dispatch(setProcess(process))
    dispatch(setChecks(checkBlocks));
    dispatch(isLoading(false));
})


export const updateProcess = createAsyncThunk('process/UpdateProcess', async (payload, { rejectWithValue, dispatch } ) => {

    let response = await processAPI.updateProcess(payload);
    if(response == null) return null;

    dispatch(setBase(response.body));
   
})



export const processSlice = createSlice({

    name:'process',
    initialState,
    
    reducers: {
        setBlocks(state,action) {
            state.blocks = action.payload;
        },
        setSubjects(state,action) {
            state.subjects = action.payload;
        },
        setChecks(state,action) {
            state.checks = action.payload;
        },
        
        setCheckCodes(state,action) {
            state.checkCodes = action.payload;
        },
        setProhibitonCodes(state,action) {
            
            let prohibitionCodes = [];
            for (const check of state.checks) {
                let checkCode = check.checkCodes.find(x => x.id === action.payload);
                if(checkCode) prohibitionCodes = checkCode.prohibitionCodes.map(x => ({...x,checkId:check.id}));
            }
            state.prohibitionCodes = prohibitionCodes;

        },
        setClientTypes(state,action) {
            state.clientTypes = action.payload;
        },
        initCheckedSubjects(state,action) {
            state.checkedSubjects = action.payload;
        },
        deleteProhibitionCode(state,action) {
            state.prohibitionCodesToCheck = state.prohibitionCodesToCheck.filter(x => x.id !== action.payload);
        },
        deleteCheck(state,action) {
            state.checks = state.checks.filter(x => x.id !== action.payload);
        },
        addProhibitionCodeToCheck(state,action) {
            
            for (const item of state.prohibitionCodesToCheck) {
                if(item.id === action.payload.id) {
                    return;
                }
            }
            state.prohibitionCodesToCheck.push(action.payload);
        },
        setProcesses(state,action) {
            state.processes = action.payload;
        },
        setProcess(state,action) {
            state.id = action.payload.id;
            state.name = action.payload.name;
            state.startDate = action.payload.startDate;
            state.enrollments = action.payload.enrollments;
            state.primaryDate = action.payload.primaryDate;
            state.count = action.payload.count;
            state.startDateLastRevision = action.payload.startDateLastRevision;
            state.lastDateRevision = action.payload.lastDateRevision;
            state.statusDate = action.payload.statusDate;
            state.statusHistories = action.payload.statusHistories;
            state.blockTechnologist = action.payload.blockTechnologist;
            state.systemCode = action.payload.systemCode;
            state.systemType = action.payload.systemType;   
            state.clientId = action.payload.clientId;
           
        },
        setBase(state,action) {
            state.processes.forEach(x => {
                if(x.id === action.payload.id) {
                    x.startDate = action.payload.startDate;
                    x.enrollments = action.payload.enrollments;
                    x.primaryDate = action.payload.primaryDate;
                    x.count = action.payload.count;
                    x.startDateLastRevision = action.payload.startDateLastRevision;
                    x.lastDateRevision = action.payload.lastDateRevision;
                    x.statusDate = action.payload.statusDate;
                }
            })
        },
        isLoading(state,action) {
            state.isLoading = action.payload
        },
        setEditable(state,action) {
            
            let updatedChecks = [...state.checks];
            let selectedCheck = updatedChecks[updatedChecks.findIndex(x => x.id === action.payload.id)];
            let updateSubjects = selectedCheck.subjects[selectedCheck.subjects.findIndex(x => x.subjectName === action.payload.name)];

            if(updateSubjects && Object.keys(updateSubjects.value[action.payload.index]).length !== 0) {
                updateSubjects.value[action.payload.index].editable = action.payload.editable;
            }
            state.checks = [...updatedChecks];
        },
        setDefaultSubjects(state,action) {
            let updatedChecks = [...state.checks];

            for (const check of updatedChecks) {
                for (const subject of check.subjects) {
                    subject.value[0].editable = false;
                    subject.value[1].editable = false;
                }
            }
            state.checks = [...updatedChecks];
        },
        updateProhibitionCodes(state,action) {

            let updatedChecks = [...state.checks];
            let selectedCheck = updatedChecks[updatedChecks.findIndex(x => x.id === action.payload.id)];
            let updateSubjects = selectedCheck.subjects[selectedCheck.subjects.findIndex(x => x.subjectName === action.payload.name)];
            updateSubjects.value[action.payload.index].update = true;   
            updateSubjects.value[action.payload.index].validationCodes = updateSubjects.value[action.payload.index].validationCodes.map(x => ({...x,newProhibitionCodes:x.prohibitionCodes.filter(y => action.payload.value.includes(y.id))}))
            state.checks = [...updatedChecks];
        },
        setStepNumbers(state,action) {
            state.stepNumbers = action.payload;
        },
        setSytemTypes(state,action) {
            state.systemTypes = action.payload;
        },
        setStatusHistory(state,action) {
            state.statusHistories = [...action.payload];
        },
        setId(state,action) {
            state.id = action.payload;
        },
        
        reset() {
            return initialState;
        }
    }
})

export const { setBlocks,setSubjects,setClientTypes,
    setChecks,setId,
    deleteCheck,
    setCheckCodes,
    setProhibitonCodes,
    addProhibitionCodeToCheck,
    deleteProhibitionCode,initCheckedSubjects,
    setStepNumbers,
    setProcesses,
    setProcess,setEditable,setStatusHistory,
    updateProhibitionCodes,setDefaultSubjects,setBase,
    isLoading, reset,setSytemTypes,changeBase } = processSlice.actions;

export default processSlice.reducer;