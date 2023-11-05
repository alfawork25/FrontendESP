import axios from "axios";

const instance = axios.create({
    baseURL:"https://localhost:7198/api/Revision/",
    headers: {
        'Content-Type': 'application/json'
    },

});
export const revisionAPI = {
    
    getRevisions(param) {

        return instance.get(`GetRevisions?processId=${param}`).then(response => response.data);
    },
    addRevision(data) {
        return instance.post('AddRevision',data).then(response => response.data);
    },
    getRevisionById(id){
        return instance.get(`GetRevisionById/${id}`).then(response => response.data);
    },
    updateRevision(data){
        return instance.put('UpdateRevision',data).then(response => response.data);
    },
    deleteRevision(id){
        return instance.delete(`DeleteRevision/${id}`).then(response => response.data);
    }
}

