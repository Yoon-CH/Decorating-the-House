import React, { useState, useEffect } from 'react';
import axios from 'axios';
import styled from 'styled-components';

function MainBox() {
  const [users, setUsers] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

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
      <ImageBox>
        <Img key={users.id} src={users.imageUrl} alt="집꾸미기" />
        {users.productList.map(user => (
          <Icon
            key={user.productId}
            src=" //cdn.ggumim.co.kr/storage/20211029145238AlZrQ41xtg.png"
            alt="집꾸미기 돋보기"
            top={user.pointX}
            left={user.pointY}
          />
        ))}
      </ImageBox>
      <ProductListBox>
        {users.productList.map(user => (
          <ProductDiv key={user.productId}>
            <ProductBox
              key={user.productId}
              src={user.imageUrl}
              alt="집꾸미기 제품"
            />
            {user.discountRate > 0 && (
              <Div>
                {user.discountRate}
                <span>%</span>
              </Div>
            )}
          </ProductDiv>
        ))}
      </ProductListBox>
    </>
  );
}

export default MainBox;

const Div = styled.div`
  position: absolute;
  text-align: center;
  background-image: url(//cdn.ggumim.co.kr/storage/20211117191419RW6JS6bjRm.png);
  width: 24px;
  height: 28px;
  background-position: center center;
  background-repeat: no-repeat;
  background-size: contain;
  font-size: 11px;
  font-weight: bold;
  line-height: 25px;
  color: white;
  right: 6px;
  top: 1px;
  padding-left: 1px;
`;

const ProductBox = styled.img`
  width: 80px;
  height: 80px;
  border-radius: 16px;
  border: 0.5px solid #aaafb9;
`;

const ProductDiv = styled.div`
  position: relative;
  margin: 20px 6px;
`;

const ProductListBox = styled.div`
  display: inline-flex;
  justify-content: center;
`;

const Icon = styled.img`
  position: absolute;
  width: 32px;
  height: 32px;
`;

const Img = styled.img`
  position: relative;
  width: 45%;
`;

const ImageBox = styled.div`
  display: contents;
`;

const Message = styled.div`
  text-align: center;
  margin-top: 50px;
`;
