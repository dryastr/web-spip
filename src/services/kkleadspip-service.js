import axios from "./config";

const kkleadserviceService = {};

kkleadserviceService.getKk = async (params = {}) => {
    try{
        const response = await axios.get("/api/v1/ref/kk-lead-spip", {params});
        return response.data.data;
    } catch (e) {
        return {};
    }
};

kkleadserviceService.delete = async (id = null) => {
    try{
        const response = await axios.delete("/api/v1/ref/kk-lead-spip/" + id);
        return response;
    } catch (e) {
        return {};
    }
};

kkleadserviceService.store = async body => {
    try {
      const response = await axios.post('/api/v1/ref/kk-lead-spip', body)
  
      return response
    } catch (e) {
      return e.response
    }
}

kkleadserviceService.update = async (id, body) => {
    try {
      const response = await axios.put('/api/v1/ref/kk-lead-spip/' + id, body)
  
      return response
    } catch (e) {
      return e.response
    }
}

kkleadserviceService.show = async (id = null) => {
    try{
        const response = await axios.get("/api/v1/ref/kk-lead-spip/" + id);
        return response.data.data;
    } catch (e) {
        return {};
    }
};

export default kkleadserviceService;