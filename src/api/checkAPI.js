import axios from "axios";

const instance = axios.create({
    baseURL:"https://localhost:7198/api/Check/",
    headers: {
        'Content-Type': 'application/json'
    },

});


export const checkAPI = {
    
    getCheckCodes(isOnlyFreeCheckCodes = false) {
        return instance.get(`GetCheckCodes?isOnlyFreeCheckCodes=${isOnlyFreeCheckCodes}`).then(response => response.data);
    },
    
    getCheckCodeById(id) {
        return instance.get(`GetCheckCodeById/${id}`).then(response => response.data);
    },

    addCheckCode(data) {
        return instance.post("AddCheckCode",data);
    },
    
    updateCheckCode(checkCodeToUpdate) {
        return instance.put("UpdateCheckCode",checkCodeToUpdate);
    },
    deleteCheckCode(id) {
        return instance.delete(`DeleteCheckCode/${id}`);
    },



    getCheckBlocks() {
        return instance.get('GetCheckBlocks').then(response => response.data);
    },
    getCheckBlockById(id) {
        return instance.get(`GetCheckBlockById/${id}`).then(response => response.data);
    },
    addCheckBlock(data) {
        return instance.post("AddCheckBlock",data);
    },
    updateCheckBlock(checkBlockToUpdate) {
        return instance.put("UpdateCheckBlock",checkBlockToUpdate);
    },
    deleteCheckBlock(id) {
        return instance.delete(`DeleteCheckBlock/${id}`);
    },



    getBlocks() {
        return instance.get('GetBlocks').then(response => response.data);
    },
    getBlockById(id) {
        return instance.get(`GetBlockById/${id}`).then(response => response.data);
    },
    addBlock(data) {
        return instance.post("AddBlock",data);
    },
    updateBlock(blockToUpdate) {
        return instance.put("UpdateBlock",blockToUpdate);
    },
    deleteBlock(id) {
        return instance.delete(`DeleteBlock/${id}`);
    },


    getSubjectTypeById(id) {
        return instance.get(`GetSubjectTypeById/${id}`).then(response => response.data);
    },
    getSubjectTypes() {
        return instance.get('GetSubjectTypes').then(response => response.data);
    },
    addSubjectType(data) {
        return instance.post("AddSubjectType",data);
    },
    updateSubjectType(subjectTypeToUpdate) {
        return instance.put("UpdateSubjectType",subjectTypeToUpdate);
    },
    deleteSubjectType(id) {
        return instance.delete(`DeleteSubjectType/${id}`);
    },
    getProhibitionCodes(prohibitionCodeName) {
        return prohibitionCodeName ? instance.get(`GetProhibitionCodes?filter=${prohibitionCodeName}`).then(response => response.data) : 
                                     instance.get('GetProhibitionCodes').then(response => response.data);
    },
    addProhibitionCode(data) {
        return instance.post("AddProhibitionCode",data).then(response => response.data);
    },
    updateProhiitonCode(data) {
        return instance.put("UpdateProhibitionCode",data).then(response => response.data);
    },
    deleteProbitionCode(id) {
        return instance.delete(`DeleteProhibitionCode/${id}`)
    },

   
    getClientTypeById(id) {
        return instance.get(`GetClientTypeById/${id}`).then(response => response.data);
    },
    getClientTypes() {
        return instance.get('GetClientTypes').then(response => response.data);
    },
    saveClientType(data) {
        return instance.post(`SaveClientType`,data).then(response => response.data);
    },
    deleteClientType(id) {
        return instance.delete(`DeleteClientType/${id}`);
    },

    getSystemTypeById(id) {
        return instance.get(`GetSystemTypeById/${id}`).then(response => response.data);
    },
    getSystemTypes() {
        return instance.get('GetSystemTypes').then(response => response.data);
    },
    saveSystemType(data) {
        return instance.post(`SaveSystemType`,data).then(response => response.data);
    },
    deleteSystemType(id) {
        return instance.delete(`DeleteSystemType/${id}`);
    },

    
    getSystemBlockById(id) {
        return instance.get(`GetSystemBlockById/${id}`).then(response => response.data);
    },
    getSystemBlocks() {
        return instance.get('GetSystemBlocks').then(response => response.data);
    },
    saveSystemBlock(data) {
        return instance.post(`SaveSystemBlock`,data).then(response => response.data);
    },
    deleteSystemBlock(id) {
        return instance.delete(`DeleteSystemBlock/${id}`);
    },

    getRouteById(id) {
        return instance.get(`GetRouteById/${id}`).then(response => response.data);
    },
    getRoutes() {
        return instance.get('GetRoutes').then(response => response.data);
    },
    saveRoute(data) {
        return instance.post(`SaveRoute`,data).then(response => response.data);
    },
    deleteRoute(id) {
        return instance.delete(`DeleteRoute/${id}`);
    },

    getPatternById(id) {
        return instance.get(`GetPatternById/${id}`).then(response => response.data);
    },
    getPatterns() {
        return instance.get('GetPatterns').then(response => response.data);
    },
    addPattern(data) {
        return instance.post(`AddPattern`,data).then(response => response.data);
    },
    
    updatePattern(data) {
        return instance.put("UpdatePattern",data).then(response => response.data);
    },
    
    deletePattern(id) {
        return instance.delete(`DeletePattern/${id}`)
    },

    getStatusById(id) {
        return instance.get(`GetStatusById/${id}`).then(response => response.data);
    },
    getStatusList() {
        return instance.get('GetStatusList').then(response => response.data);
    },
    addStatus(data) {
        return instance.post(`AddStatus`,data).then(response => response.data);
    },
    
    updateStatus(data) {
        return instance.put("UpdateStatus",data).then(response => response.data);
    },
    
    deleteStatus(id) {
        return instance.delete(`DeleteStatus/${id}`)
    },

    getProcessFirstLevelById(id) {
        return instance.get(`GetProcessFirstLevelById/${id}`).then(response => response.data);
    },
    getProcessFirstLevels() {
        return instance.get('GetProcessFirstLevels').then(response => response.data);
    },
    addProcessFirstLevel(data) {
        return instance.post(`AddProcessFirstLevel`,data).then(response => response.data);
    },
    
    updateProcessFirstLevel(data) {
        return instance.put("UpdateProcessFirstLevel",data).then(response => response.data);
    },
    
    deleteProcessFirstLevel(id) {
        return instance.delete(`DeleteProcessFirstLevel/${id}`)
    },

    getProcessSecondLevelById(id) {
        return instance.get(`GetProcessTwoLevelById/${id}`).then(response => response.data);
    },
    getProcessTwoLevels() {
        return instance.get('GetProcessTwoLevels').then(response => response.data);
    },
    addProcessTwoLevel(data) {
        return instance.post(`AddProcessTwoLevel`,data).then(response => response.data);
    },
    
    updateProcessSecondLevel(data) {
        return instance.put("UpdateProcessSecondLevel",data).then(response => response.data);
    },
    
    deleteProcessTwoLevel(id) {
        return instance.delete(`DeleteProcessTwoLevel/${id}`)
    },

    getProcessRegistryById(id) {
        return instance.get(`GetProcessRegistryById/${id}`).then(response => response.data);
    },
    getProcessesRegistry() {
        return instance.get('GetProcessesRegistry').then(response => response.data);
    },
    addProcessRegistry(data) {
        return instance.post(`AddProcessRegistry`,data).then(response => response.data);
    },
    
    updateProcessRegistry(data) {
        return instance.put("UpdateProcessRegistry",data).then(response => response.data);
    },
    
    deleteProcessRegistry(id) {
        return instance.delete(`DeleteProcessRegistry/${id}`)
    },

}