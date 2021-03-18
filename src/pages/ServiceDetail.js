import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { Button, Modal, Rate } from "antd";
import { API } from "aws-amplify";

import NavDivider from "../Materials/NavDivider";
import Text from "../Materials/Text";
import ServiceDetailContainer from "../components/ServiceDetail/ServiceDetailContainer";
import { useAuthState } from "../lib/authLib";

const ServiceDetail = (props) => {
  const { match, service, location } = props;
  const [modalVisible, setModalVisible] = useState(false);
  const context = useAuthState();

  const closeModal = () => {
    setModalVisible(false);
  };

  const showModal = () => {
    if (context.user) {
      setModalVisible(true);
    } else {
      alert("로그인 부터 하셈");
    }
  };

  const addCheckList = async (e) => {
    e.preventDefault();

    const param = {
      email: context.user,
      productSK: location.item.SK,
      type: "funeralService",
    };

    const result = await API.post("sanzo_backend", "/addCompareList", {
      body: param,
    });

    alert(JSON.stringify(param));
  };

  return (
    <>
      <NavDivider />
      <Container>
        <PageTitle size={"title"}>상품 상세</PageTitle>
        <>
          <Button onClick={(e) => addCheckList(e)}>체크리스트에 추가</Button>
          <Button onClick={showModal}>상품평가</Button>
        </>
        <ServiceDetailContainer data={location.item} />
      </Container>
      <Modal
        visible={modalVisible}
        onCancel={closeModal}
        cancelButtonProps={{ style: { display: "none" } }}
        onOk={closeModal}
        centered
        title={`${location.item.company_name} ${location.item.product_name} 평가하기`}
        closeIcon={null}
      >
        <UserRate userEmail={context.user} itemId={location.item.SK} />
      </Modal>
    </>
  );
};

const UserRate = ({ userEmail, itemId }) => {
  const [rate, setRate] = useState(3);

  const submitRate = async (e) => {
    e.preventDefault();
    const param = {
      rate: rate,
      email: userEmail,
      productSK: itemId,
    };
    console.log(param);
    const result = await API.post("sanzo_backend", "/rateProduct", {
      body: param,
    });

    alert("평가되었습니다.");
  };

  return (
    <RateRow>
      <Rate onChange={(v) => setRate(v)} value={rate} />
      <Button onClick={(e) => submitRate(e)}>평가 제출</Button>
    </RateRow>
  );
};

const Container = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justifycontent: center;
  padding: 80px 50px 0px 50px;
`;

const RateRow = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
`;

const PageTitle = styled(Text)`
  margin-top: 50px;
`;

export default ServiceDetail;
