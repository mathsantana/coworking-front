import React from "react";

import { Container, Title, ButtonContainer } from "./styles";
import CustomButton from "../CustomButton";

const TableHeader = ({ buttons, title }) => {
  return (
    <Container>
      <Title>{title}</Title>
      <ButtonContainer>
        {buttons.map((value) => {
          let [key, props] = value;
          return <CustomButton key={key} {...props} />;
        })}
      </ButtonContainer>
    </Container>
  );
};

export default TableHeader;
