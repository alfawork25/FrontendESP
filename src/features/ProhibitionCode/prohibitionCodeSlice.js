import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { checkAPI } from "../../api/checkAPI";


const initialState = {
      prohibitonCodes:[],
      checkCodes:[],
      filteredProhibionCodes:[],
      isLoading:true
}


export const getProhibitionCodes = createAsyncThunk('prohibitionCode/GetProhibitionCodes',async (_,{ rejectWithValue, dispatch}) => {
   
    dispatch(isLoading(true));
    const response = await checkAPI.getProhibitionCodes();
    
    if(!response.body) return;
    
    let prohibitionCodes = response.body.map(code => ({...code,
        checkCode:code.checkCode.title,
        checkCodeName:code.checkCode.name,
        checkCodeActive:code.checkCode.isActive ? "Новый/нет ПИНа" : "Есть ПИН",
        prohibitionCodeIsActive:code.isActive ? "Активный" : "Истек",
        default:code.default
    }))

    dispatch(setProhibitionCodes(prohibitionCodes));
    dispatch(isLoading(false));
});

export const addProhibitionCode = createAsyncThunk('prohibitionCode/AddProhibitionCode', async (payload,{ rejectWithValue, dispatch }) => {
    
    const response = await checkAPI.addProhibitionCode(payload);
    
    let prohibitionCode = response.body;

    if(prohibitionCode !=null) {
        
        prohibitionCode = {
            ...prohibitionCode,
            checkCode:prohibitionCode.checkCode.title,
            checkCodeName:prohibitionCode.checkCode.name,
            default:prohibitionCode.default,
            checkCodeActive:prohibitionCode.checkCode.isActive ? "Новый/нет ПИНа" : "Есть ПИН",
            prohibitionCodeIsActive:prohibitionCode.isActive
        }
        dispatch(addProhibitionCodeToList(prohibitionCode));
    }
   

})

export const updateProhibitionCode = createAsyncThunk('prohibitionCode/DeleteProhibitionCode', async (payload,{ rejectWithValue, dispatch }) => {
    const response = await checkAPI.updateProhiitonCode(payload);

    if(response.body  == null){
        return;
    }
    
    dispatch(updateProhibitonCodeFromList(response.body));
})

export const deleteProhibitionCode = createAsyncThunk('prohibitionCode/DeleteProhibitionCode', async (payload,{ rejectWithValue, dispatch }) => {
 
    await checkAPI.deleteProbitionCode(payload);
    dispatch(deleteProhibitionFromList(payload));

})

export const getCheckCodesAPI = createAsyncThunk("prohibitionCode/GetCheckCodes",async (_ ,{ rejectWithValue, dispatch }) => {

    const response = await checkAPI.getCheckCodes()
    const checkCodes = response.body.map(x => ({id:x.id,name:x.name,isActive:x.isActive,title:x.title}));
    dispatch(getCheckCodes(checkCodes));

})
const prohibitionCodeSlice = createSlice({
    name:'prohibitionCode',
    initialState,
    reducers: {
        setProhibitionCodes(state,action) {
            if(action.payload != null) {
                state.prohibitonCodes = action.payload;
                state.filteredProhibionCodes = action.payload;
            }
        },

        filteProhibitonCodeByName(state,action){
            state.prohibitonCodes = state.filteredProhibionCodes.filter(x => x.name === action.payload);
        },
        filteProhibitonCodeByCheckCodeName(state,action){

            const prohibitionCode = [];

            let checkCodes = state.checkCodes.filter(x => x.name === action.payload);

            for (const checkCode of checkCodes) {
                
                let prohibitionCodeTocheckCode = state.filteredProhibionCodes.filter(x => x.checkCodeId === checkCode.id)
                
                if(checkCode) {
                    prohibitionCode.push(...prohibitionCodeTocheckCode);
                }
            }

            state.prohibitonCodes = prohibitionCode;
        },
        addProhibitionCodeToList(state,action) {
            state.prohibitonCodes.push(action.payload);
            state.filteredProhibionCodes.push(action.payload);
        },
        deleteProhibitionFromList(state,action) {
            state.prohibitonCodes = state.prohibitonCodes.filter(x => x.id !== action.payload);
            state.filteredProhibionCodes = state.prohibitonCodes.filter(x => x.id !== action.payload);
        },
        updateProhibitonCodeFromList(state,action) {
            state.prohibitonCodes.forEach(x => {
                if(x.id === action.payload.id) {
                    x.name = action.payload.name;
                    x.prohibitionCodeIsActive = action.payload.isActive;
                    x.default = action.payload.default;
                    x.startDate= action.payload.startDate;
                    x.endDate = action.payload.endDate;
                }
            })
        },
        
        getCheckCodes(state,action) {
            state.checkCodes = action.payload;
        },
        isLoading(state,action) {
            state.isLoading = action.payload;
        }
    }

})

export const { setProhibitionCodes,filteProhibitonCodeByName,filteProhibitonCodeByCheckCodeName, addProhibitionCodeToList,deleteProhibitionFromList,isLoading,getCheckCodes,updateProhibitonCodeFromList  } = prohibitionCodeSlice.actions

export default prohibitionCodeSlice.reducer;