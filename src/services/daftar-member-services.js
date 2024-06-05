import axios from "./config";

const daftarMember = {};

daftarMember.delete = async (id) => {
    try{
        const response = await axios.delete("/api/v1/trans/penilaian/penilaian-daftar-user/" + id);
        
return response;
    } catch (e) {
        return {};
    }
};

daftarMember.store = async body => {
    try {
      const response = await axios.post('/api/v1/trans/penilaian/penilaian-daftar-user', body, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      })
  
      return response
    } catch (e) {
      return e.response
    }
}

daftarMember.show = async () => {
    try{
        const response = await axios.get("/api/v1/trans/penilaian/penilaian-daftar-user/");
        
return response.data.data;
    } catch (e) {
        return {};
    }
};
daftarMember.search = async (params = {}) => {
    try{
        const response = await axios.get("/api/v1/trans/penilaian/penilaian-daftar-user/search", { params });
        
return response.data.data;
    } catch (e) {
        return {};
    }
};

daftarMember.download = async (data) => {
    try{
        const response = await axios.get(`/api/v1/trans/penilaian/penilaian-daftar-user/${data.id}/download-surat-tugas`,
        {
            responseType: 'blob'
        });

        const blob = new Blob([response.data]);
        const link = document.createElement('a');
        link.href = window.URL.createObjectURL(blob);
        link.download = data.attachment.name
        link.click();
    }catch(e){
        console.error('Error downloading file:', e);
    }
}

export default daftarMember;