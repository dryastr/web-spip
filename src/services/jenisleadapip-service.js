import axios from "./config";

const jenisleadspipService = {};

jenisleadspipService.getJenis = async (params = {}) => {
    try{
        const response = await axios.get("/api/v1/ref/jenis-leadspip", {params});
        return response.data.data;
    } catch (e) {
        return {};
    }
};

// kategoririsiko.delete = async (id = null) => {
//     try{
//         const response = await axios.delete("/api/v1/ref/kategori-risiko/" + id);
//         return response;
//     } catch (e) {
//         return {};
//     }
// };

// kategoririsiko.store = async body => {
//     try {
//       const response = await axios.post('/api/v1/ref/kategori-risiko', body)
  
//       return response
//     } catch (e) {
//       return e.response
//     }
// }

// kategoririsiko.update = async (id, body) => {
//     try {
//       const response = await axios.put('/api/v1/ref/kategori-risiko/' + id, body)
  
//       return response
//     } catch (e) {
//       return e.response
//     }
// }

// kategoririsiko.show = async (id = null) => {
//     try{
//         const response = await axios.get("/api/v1/ref/kategori-risiko/" + id);
//         return response.data.data;
//     } catch (e) {
//         return {};
//     }
// };

export default jenisleadspipService;