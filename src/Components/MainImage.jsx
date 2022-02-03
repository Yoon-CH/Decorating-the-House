import React from 'react';
import styled from 'styled-components';

function MainImage({ currentId, setCurrentId, product }) {
  return (
    <>
      <ImageBox onClick={() => setCurrentId(0)}>
        <Img key={product.id} src={product.imageUrl} alt="집꾸미기" />
        {product.productList.map(product => (
          <ProductImageBox
            key={product.productId}
            top={product.pointX}
            left={product.pointY}
          >
            {currentId === product.productId ? (
              <CloseIcon
                src="//cdn.ggumim.co.kr/storage/20211029145330GwwumnWNSs.png"
                alt="집꾸미기 취소"
                onClick={() => setCurrentId(0)}
              />
            ) : (
              <Icon
                src=" //cdn.ggumim.co.kr/storage/20211029145238AlZrQ41xtg.png"
                alt="집꾸미기 돋보기"
                onClick={event => {
                  event.stopPropagation();
                  setCurrentId(product.productId);
                }}
              />
            )}
            {currentId === product.productId && (
              <ProductDetail onClick={() => alert('서비스 준비중입니다.')}>
                <DetailImage src={product.imageUrl} />
                <ProductSection>
                  {product.productName}
                  <ProductPrice>
                    {product.discountRate > 0 ? (
                      <DisCountRate>
                        {product.discountRate}
                        <span>%</span>
                      </DisCountRate>
                    ) : (
                      <Expectation>예상가</Expectation>
                    )}
                    {product.priceDiscount
                      .toString()
                      .replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
                  </ProductPrice>
                </ProductSection>
              </ProductDetail>
            )}
          </ProductImageBox>
        ))}
      </ImageBox>
    </>
  );
}

export default MainImage;

const CloseIcon = styled.img`
  width: 32px;
  height: 32px;
  z-index: 999;
  cursor: pointer;
`;

const Icon = styled.img`
  width: 32px;
  height: 32px;
  z-index: 999;
  cursor: pointer;
`;

const Img = styled.img`
  width: 100%;
  cursor: pointer;
`;

const ImageBox = styled.div`
  display: inline-block;
  position: relative;
  width: 45%;
`;

const ProductImageBox = styled.div`
  position: absolute;
  top: ${props => props.top * 1.2}px;
  left: ${props => props.left * 1.3}px;
`;

const Expectation = styled.div`
  margin-right: 4px;
  line-height: 11px;
  font-size: 11px;
  font-weight: bold;
  color: #898f94;
`;

const DisCountRate = styled.div`
  margin-right: 4px;
  line-height: 16px;
  font-size: 16px;
  font-weight: bold;
  color: #ff585d;
`;

const ProductSection = styled.div`
  display: flex;
  flex-direction: column;
`;

const ProductPrice = styled.div`
  display: flex;
  align-items: center;
  margin-top: 20px;
  line-height: 16px;
  font-size: 16px;
  font-weight: bold;
  color: #181d1f;
`;

const DetailImage = styled.img`
  flex-shrink: 0;
  width: 70px;
  height: 70px;
  margin-right: 8px;
  background-size: cover;
  background-position: center;
  border-radius: 4px;
`;

const ProductDetail = styled.div`
  display: flex;
  align-items: center;
  position: absolute;
  padding: 5px;
  width: 220px;
  height: 86px;
  z-index: 9999;
  background-color: rgba(255, 255, 255, 0.95);
  border-radius: 7px;
  -webkit-box-shadow: 3px 3px 8px 0 rgb(0 0 0 / 20%);
  box-shadow: 3px 3px 8px 0 rgb(0 0 0 / 20%);
  font-size: 14px;
  cursor: pointer;
`;
