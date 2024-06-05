import axios from "./config";

const lokasiService = {};

lokasiService.getPagination = async (params = {}) => {
    try{
        const response = await axios.get("/api/v1/ref/lokasi", {params});
        return response.data.data;
    } catch (e) {
        return {};
    }
};

lokasiService.delete = async (id = null) => {
    try{
        const response = await axios.delete("/api/v1/ref/lokasi/" + id);
        return response;
    } catch (e) {
        return {};
    }
};

lokasiService.store = async body => {
    try {
      const response = await axios.post('/api/v1/ref/lokasi', body)
  
      return response
    } catch (e) {
      return e.response
    }
}

lokasiService.update = async (id, body) => {
    try {
      const response = await axios.put('/api/v1/ref/lokasi/' + id, body)
  
      return response
    } catch (e) {
      return e.response
    }
}

lokasiService.show = async (id = null) => {
    try{
        const response = await axios.get("/api/v1/ref/lokasi/" + id);
        return response.data.data;
    } catch (e) {
        return {};
    }
};

export default lokasiService;