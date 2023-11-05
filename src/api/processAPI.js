import axios from "axios";

const instance = axios.create({
    baseURL:"https://localhost:7198/api/Process/",
    headers: {
        'Content-Type': 'application/json'
    },

});
export const processAPI = {
    
    getFilteredSubjects(blockId) {
        return instance.get(`GetFilteredSubjects/${blockId}`).then(response => response.data);
    },
    getChecks(data) {
        return instance.post('GetChecks',data).then(response => response.data);
    },

    downLoadFile(data) {
        return instance.post('DownloadFile',data,{
            responseType:'arraybuffer'
        }).then(response => response);
    },
    getProcesses() {
        return instance.get('GetProcesses').then(response => response.data);
    },
    addProcess(data) {
        return instance.post('AddProcess',data).then(response => response.data);
    },
    getProcessById(id){
        return instance.get(`GetProcessById/${id}`).then(response => response.data);
    },
    updateProcess(data){
        return instance.put('UpdateProcess',data).then(response => response.data);
    },
    deleteProcess(id){
        return instance.delete(`DeleteProcess/${id}`).then(response => response.data);
    }
}

