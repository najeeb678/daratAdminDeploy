import api from "@/services/api";

export const createLoyaltyBenefitsApi = async (data: { loyaltyType: string; subServiceIds: string[], expiryDate: string}) => {
    const response = await api.post("loyalty/createLoyaltyPackage", data);
    return response.data;
  };


  export const getAllSubServicesApi = async () => {
    const response = await api.get("sub-services/");
    return response.data;
  };

  export const getLoyaltyPackagesApi = async () => {
    const response = await api.get("loyalty/getLoyaltyPackages");
    return response.data;
  };


  export const createDiscountsApi = async (data: { type: string; value: string }) => {
    const response = await api.post("discounts", data);
    return response.data;
  };


  export const getDiscountsApi = async () => {
    const response = await api.get("discounts");
    return response.data;
  };


  export const createGiftApi = async (data: { subServiceId: string}) => {
    const response = await api.post("gifts", data);
    return response.data;
  };

  export const getGiftApi = async () => {
    const response = await api.get("gifts" );

    return response.data;
  };

  

