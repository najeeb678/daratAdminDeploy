import api from "@/services/api";

// Upload Image API
export const uploadImageApi = async (imageData: FormData) => {
  try {
    const response = await api.post("image/upload/single", imageData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });

    return response.data;
  } catch (error) {
    console.error("Error uploading image:", error);
    throw new Error("Failed to upload image");
  }
};

// Submit Doctor API
export const submitDoctorApi = async (doctorData: any) => {
  const response = await api.post("doctor", doctorData);
  return response.data; // Return the API response for the doctor form submission
};
export const getAllDoctorsApi = async (
  params?: { search?: string; filter?: string }
): Promise<any> => {
  const response = await api.get<any>("/doctor", { params });
  return response.data;
};
export const getAllServicesApi = async (): Promise<any> => {
  const response = await api.get<any>("/services");

  return response.data;
};
export const fetchDoctorByIdApi = async (id: any) => {
  const response = await api.get(`doctor/${id}`);
  return response.data; 
};
export const upDateDoctorApi = ({ id, data }: { id: string; data: any }) => {
  return api.patch(`doctor/${id}`, data); 
};

export const deleteDoctorApi = async (id: any) => {
  const response = await api.delete(`doctor/${id}`);
  return response.data; 
};