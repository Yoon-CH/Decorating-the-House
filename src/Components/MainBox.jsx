import React, { useState, useEffect } from 'react';
import axios from 'axios';
import styled from 'styled-components';

function MainBox() {
  const [users, setUsers] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [currentId, setCurrentId] = useState(0);

  const fetchUsers = async () => {
    try {
      setError(null);
      setUsers(null);
      setLoading(true);
      const response = await axios.get(
        'https://cdn.ggumim.co.kr/test/image_product_link.json'
      );
      setUsers(response.data);
    } catch (e) {
      setError(e);
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  if (loading) return <Message>로딩중..</Message>;
  if (error) return <Message>에러가 발생했습니다</Message>;
  if (!users) return null;

  return (
    <>
      <ImageBox onClick={() => setCurrentId(0)}>
        <Img key={users.id} src={users.imageUrl} alt="집꾸미기" />
        {users.productList.map(product => (
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
      <ProductListBox>
        {users.productList.map(product => (
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

export default MainBox;

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

const DisCountBox = styled.div`
  position: absolute;
  text-align: center;
  background-image: url('https:cdn.ggumim.co.kr/storage/20211117191419RW6JS6bjRm.png');
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

const ProductImageBox = styled.div`
  position: absolute;
  top: ${props => props.top * 1.2}px;
  left: ${props => props.left * 1.3}px;
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

const Message = styled.div`
  text-align: center;
  margin-top: 50px;
`;
