import React from "react";

import Text from "../../Materials/Text";

const Header = ({ email }) => {
  return (
    <Text size={"title"} fontWeight={"bold"}>
      {`${email}`}님 마이페이지
    </Text>
  );
};

export default Header;
