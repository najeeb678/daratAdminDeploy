import ProductsTable from "@/_components/core/Pharmacy/Products/ProductsTable";
import { getAllPharmacyProducts } from "@/redux/slices/PharmacySlice";
import { AppDispatch } from "@/redux/store";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

const Products = () => {
  const dispatch = useDispatch<AppDispatch>();
  const allPharmacyProducts = useSelector(
    (state: any) => state.pharmacy.allPharmacyProductsData
  );
  const loading = useSelector(
    (state: any) => state.pharmacy.loadingPharmacyProductsData
  );

  useEffect(() => {
    dispatch(getAllPharmacyProducts({ search: "", filter: "" }));
  }, [dispatch]);
  return (
    <div>
      <ProductsTable productsData={allPharmacyProducts} loading={loading} />
    </div>
  );
};

export default Products;
