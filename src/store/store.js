import { configureStore } from "@reduxjs/toolkit"
import blockSlice from "../features/Block/blockSlice"
import checkBlockSlice from "../features/CheckBlock/checkBlockSlice"
import checkCodeSlice from "../features/CheckCode/checkCodeSlice"
import clientTypeSlice from "../features/ClientType/clientTypeSlice"
import processSlice from "../features/Process/processSlice"
import prohibitionCodeSlice from "../features/ProhibitionCode/prohibitionCodeSlice"
import routeSlice from "../features/Route/routeSlice"
import subjectSlice from "../features/Subject/subjectSlice"
import systemBlockSlice from "../features/SystemBlock/systemBlockSlice"
import systemTypeSlice from "../features/SystemType/systemTypeSlice"
import patternSlice  from "../features/Pattern/patternSlice"
import statusSlice from "../features/Status/statusSlice"
import processOneLevelSlice from "../features/ProcessOneLevel/processOneLevel"
import processTwoLevelSlice  from "../features/ProcessTwoLevel/ProcessTwoLevel"
import referenceProcessSlice from "../features/ReferenceProcess/referenceProcessSlice"
import revisionSlice from "../features/Revision/revisionSlice"

export const store = configureStore({
    reducer:{
        process:processSlice,
        checkBlock:checkBlockSlice,
        checkCode:checkCodeSlice,
        prohibitionCode:prohibitionCodeSlice,
        subject:subjectSlice,
        block:blockSlice,
        clientType:clientTypeSlice,
        systemType:systemTypeSlice,
        systemBlock:systemBlockSlice,
        
        route:routeSlice,
        pattern:patternSlice,
        status:statusSlice,
        processOneLevel:processOneLevelSlice,
        processTwoLevel:processTwoLevelSlice,
        referenceProcess:referenceProcessSlice,
        revision:revisionSlice
    }
})