import axios from "./config";

const jenisSasaran = {};

jenisSasaran.getPagination = async (params = {}) => {
    try{
        const response = await axios.get("api/v1/ref/jenis-sasaran", {params});
        return response.data.data;
    } catch (e) {
        return {};
    }
};

jenisSasaran.delete = async (id = null) => {
    try{
        const response = await axios.delete("/api/v1/ref/jenis-sasaran/" + id);
        return response;
    } catch (e) {
        return {};
    }
};

jenisSasaran.store = async body => {
    try {
      const response = await axios.post('/api/v1/ref/jenis-sasaran', body)
  
      return response
    } catch (e) {
      return e.response
    }
}

jenisSasaran.update = async (id, body) => {
    try {
      const response = await axios.put('/api/v1/ref/jenis-sasaran/' + id, body)
  
      return response
    } catch (e) {
      return e.response
    }
}

jenisSasaran.show = async (id = null) => {
    try{
        const response = await axios.get("/api/v1/ref/jenis-sasaran/" + id);
        return response.data.data;
    } catch (e) {
        return {};
    }
};

export default jenisSasaran;