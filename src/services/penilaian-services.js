import axios from "./config";

const penilaianService = {};

penilaianService.getPagination = async (params = {}) => {
    try{
        const response = await axios.get("/api/v1/trans/penilaian", {params});
        return response.data.data;
    } catch (e) {
        return {};
    }
};

penilaianService.delete = async (id = null) => {
    try{
        const response = await axios.delete("/api/v1/trans/penilaian/" + id);
        return response;
    } catch (e) {
        return {};
    }
};

penilaianService.store = async body => {
    try {
      const response = await axios.post('/api/v1/trans/penilaian', body)
  
      return response
    } catch (e) {
      return e.response
    }
}

penilaianService.update = async (id, body) => {
    try {
      const response = await axios.put('/api/v1/trans/penilaian/' + id, body)
  
      return response
    } catch (e) {
      return e.response
    }
}

penilaianService.show = async (id = null) => {
    try{
        const response = await axios.get("/api/v1/trans/penilaian/" + id);
        return response.data.data;
    } catch (e) {
        return {};
    }
};

export default penilaianService;