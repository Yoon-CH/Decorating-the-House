import React from 'react';
import MainBox from '../Components/MainBox';
import styled from 'styled-components';

export const MainPage = () => {
  return (
    <MainSection>
      <ProductSection>
        <MainBox />
      </ProductSection>
    </MainSection>
  );
};

const ProductSection = styled.article`
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
`;

const MainSection = styled.section`
  display: flex;
  flex-direction: column;
`;
