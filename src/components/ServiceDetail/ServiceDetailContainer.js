import React, { useEffect } from "react";
import styled from "styled-components";

import BasicInfo from "./BasicInfo";
import ManPowerInfo from "./ManPowerInfo";
import GoinInfo from "./GoinInfo";
import ClothInfo from "./ClothInfo";
import VihecleInfo from "./VihecleInfo";
import FlowerInfo from "./FlowerInfo";

const ServiceDetailContainer = ({ data }) => {
  useEffect(() => {
    console.log("data :", data);
    console.log("data.product_name", data.product_name);
    console.log("window.location ", window.location)
});
  return (
    <Container>
      <BasicInfo
        companyName={data.company_name}
        productName={data.product_name}
        price={data.price}
        mubinso={data["services"]["무빈소"]}
      />
      <ManPowerInfo services={data.services} />
      <GoinInfo services={data.services} />
      <ClothInfo services={data.services} />
      <VihecleInfo services={data.services} />
      <FlowerInfo services={data.services} />
    </Container>
  );
};

const Container = styled.div`
  width: 70vw;
  display: flex;
  flex-direction: column;
  alignitems: flex-start;
  justifycontent: center;
`;

export default ServiceDetailContainer;
