import api from "@/services/api";

export const getAllsubServicesApi = async (params?: {
  search?: string;
  filter?: string;
}): Promise<any> => {
  const response = await api.get<any>("/sub-services", { params });
  return response.data;
};
export const getAllServicesApi = async (params?: {
  search?: string;
  filter?: string;
}): Promise<any> => {
  const response = await api.get<any>("/services", { params });
  return response.data;
};
export const getDoctorsofSubServiceApi = async (id: any) => {
  const response = await api.post(`/schedule/doctorsOfASubService/${id}`);
  return response.data; 
};

export const getAllsubServicesOfASubServiceApi = async (id: any) => {
  console.log("id", id);
  const response = await api.post(`/sub-services/service/${id.id}`);
  return response.data; 
};


export const createServicesApi = async (data: any) => {
  const response = await api.post(`/services/`, data);
  return response.data; 
};

export const deleteServiceApi = async (id: any) => {
  console.log('id1', id)
  const response = await api.delete(`/services/${id.ID}`);
  return response.data; 
};


export const createSubServicesApi = async (data: any) => {
  const response = await api.post(`/sub-services/`, data);
  return response.data; 
};

export const updateServicesApi = async (data: any) => {
  const { id, ...body } = data; 
  const response = await api.put(`/services/${id}`, body); 
  return response.data;
};



export const updateSubServicesApi = async (data: any) => {
  const { id, ...body } = data; 
  const response = await api.put(`/sub-services/${data.id}`, body );
  return response.data; 
};

export const deleteSubServiceApi = async (id: any) => {
  const response = await api.delete(`/sub-services/${id.ID}`);
  return response.data; 
};

export const updateSubServiceStatusApi = async (data: any) => {
  const response = await api.post(`/sub-services/update/status`, data);
  return response.data; 
};

export const updateServiceStatusApi = async (data: any) => {
  const response = await api.post(`/services/update/status`, data);
  return response.data; 
};

