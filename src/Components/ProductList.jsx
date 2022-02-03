import React from 'react';
import styled from 'styled-components';

function ProductList({ currentId, setCurrentId, product }) {
  return (
    <>
      <ProductListBox>
        {product.productList.map(product => (
          <ProductDiv key={product.productId}>
            <ProductBox
              src={product.imageUrl}
              alt="집꾸미기 제품"
              productId={product.productId}
              currentId={currentId}
              onClick={() => {
                if (currentId === product.productId) {
                  setCurrentId(0);
                } else {
                  setCurrentId(product.productId);
                }
              }}
            />
            {product.discountRate > 0 && (
              <DisCountBox>
                {product.discountRate}
                <span>%</span>
              </DisCountBox>
            )}
          </ProductDiv>
        ))}
      </ProductListBox>
    </>
  );
}

export default ProductList;

const DisCountBox = styled.div`
  position: absolute;
  text-align: center;
  background-image: url('//cdn.ggumim.co.kr/storage/20211117191419RW6JS6bjRm.png');
  width: 24px;
  height: 28px;
  background-position: center center;
  background-repeat: no-repeat;
  background-size: contain;
  font-size: 11px;
  font-weight: bold;
  line-height: 25px;
  color: white;
  right: 5px;
  top: 1px;
  padding-left: 1px;
`;

const ProductBox = styled.img`
  width: 80px;
  height: 80px;
  border-radius: 16px;
  border: ${props =>
    props.currentId === props.productId
      ? '1px solid red'
      : '0.5px solid #aaafb9'};
`;

const ProductDiv = styled.div`
  position: relative;
  margin: 20px 6px;
  cursor: pointer;
`;

const ProductListBox = styled.div`
  display: inline-flex;
  justify-content: center;
`;
