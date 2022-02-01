import React from 'react';
import ProductList from '../Components/ProductList';
import MainImage from '../Components/MainImage';
import styled from 'styled-components';

export const MainPage = () => {
  return (
    <MainSection>
      <ImageSection>
        <MainImage />
      </ImageSection>
      <ListSection>
        <ProductList />
      </ListSection>
    </MainSection>
  );
};

const ListSection = styled.article`
  display: flex;
  align-items: center;
  justify-content: center;
`;

const ImageSection = styled.article`
  display: flex;
  align-items: center;
  justify-content: center;
`;

const MainSection = styled.section`
  display: flex;
  flex-direction: column;
`;
