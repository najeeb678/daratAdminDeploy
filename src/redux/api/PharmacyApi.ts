import api from "@/services/api";

export const getAllPharmacyProductsApi = async (params?: {
  search?: string;
  filter?: string;
}): Promise<any> => {
  const response = await api.get<any>("/items", { params });
  return response.data;
};

export const fetchProductByIdApi = async (id: any) => {
  const response = await api.get(`items/${id}`);
  return response.data;
};
export const deleteProductApi = async (id: any) => {
  const response = await api.delete(`items/${id}`);
  return response.data;
};
export const createCetegoryApi = async (data: any) => {
  const response = await api.post(`/categories`, data);
  return response.data;
};
export const createProductApi = async (data: any) => {
  const response = await api.post(`/items`, data);
  return response.data;
};
export const getAllCategoriesApi = async () => {
  const response = await api.get(`/categories`);
  return response;
};

export const upDateProductApi = ({ id, data }: { id: string; data: any }) => {
  return api.patch(`items/${id}`, data);
};
export const fetchCustomerShipmentDataApi = async (params?: {
  search?: string;
}): Promise<any> => {
  const response = await api.get<any>("/orders/data/all", { params });
  return response.data;
};
export const updateOrderStatusApi = async ({
  orderId,
  status,
}: {
  orderId: string;
  status: string;
}) => {
  const response = await api.post(`/orders/change-order-status`, {
    orderId,
    status,
  });
  return response.data;
};
