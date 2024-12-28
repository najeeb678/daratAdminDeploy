import React, { useEffect, useState } from "react";
import ServicesTable from "@/_components/core/Services/Services";
import SubServices from "@/_components/core/Services/SubServices";
import { useRouter } from "next/router";

const Index = () => {
  const router = useRouter();
  const { sub_serviceId } = router.query; 
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Check if the router is ready and subServiceId is available
    if (router.isReady) {
      setIsLoading(false);
    }
  }, [router.isReady]);

  console.log('subServiceId', sub_serviceId);

  return (
    <>
      {isLoading ? (
        <div>Loading...</div> // You can replace this with a loading spinner or skeleton
      ) : (
        sub_serviceId ? <SubServices /> : <ServicesTable />
      )}
    </>
  );
};

export default Index;