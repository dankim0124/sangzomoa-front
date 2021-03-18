import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { API } from "aws-amplify";

import { Table, Checkbox, Modal } from "antd";

const columns = [
  {
    title: "회사명",
    dataIndex: "company",
    key: "company",
    render: (text) => <a>{text}</a>,
  },
  {
    title: "서비스명",
    dataIndex: "service",
    key: "service",
  },
  {
    title: "사이트",
    dataIndex: "siteLink",
    key: "siteLink",
    render: (text) => <a>{"사이트 바로가기"}</a>,
  },
  {
    title: "자세히보기",
    key: "detail",
    dataIndex: "item",
    render: (item) => (
      <Link to={{ pathname: "/serviceDetail/" + item.SK, item: item }}>
        상품정보
      </Link>
    ),
  },
  {
    title: "비교하기",
    key: "productSK",
    dataIndex: "handleCheckBox",
    render: (handleCheckBox) => (
      <Checkbox
        onClick={() => handleCheckBox.handleClick(handleCheckBox.productSK)}
      />
    ),
  },
  {
    title: "구매 예정",
    key: "compareButton",
    dataIndex: "productSK",
    render: (SK) => <Checkbox />,
  },
];

const CompareList = ({ compareList }) => {
  const [compareData, setCompareData] = useState();
  const [checkBoxList, setCheckBoxList] = useState([]);

  const addCheckList = (productSK) => {
    const added = [...checkBoxList, productSK];
    console.log(added);
    setCheckBoxList(added);
    console.log(checkBoxList);
  };

  const deleteCheckList = (productSK) => {
    let filtered = checkBoxList.filter((element) => element !== productSK);
    setCheckBoxList(filtered);
  };

  useEffect(() => {
    setTableData(compareList);
  }, [compareList]);

  const handleCheckBoxClick = (productSK) => {
    console.log(checkBoxList, productSK);
    if (checkBoxList.includes(productSK)) {
      deleteCheckList(productSK);
    } else {
      addCheckList(productSK);
    }
  
  };

  const setTableData = async (compareList) => {
    const result = [];
    let i = 0;
    for (const dataSK of compareList) {
      let datum = await API.post("sanzo_backend", "/querySKBeginsWith", {
        body: {
          PK: "funeralSevice",
          SK: dataSK,
        },
      });

      datum = datum.Items[0];

      result.push({
        key: i,
        company: datum.company_name,
        service: datum.product_name,
        siteLink: datum.product_url,
        productSK: datum.SK,
        item: datum,
        handleCheckBox: {
          handleClick: handleCheckBoxClick,
          productSK: datum.SK,
        },
      });
      i = i + 1;
    }

    console.log(result);
    setCompareData(result);
  };

  useEffect(() => {
    console.log(compareList);
  }, [compareList]);

  if (compareData) {
    return <Table columns={columns} dataSource={compareData} />;
  } else {
    return <></>;
  }
};

export default CompareList;
