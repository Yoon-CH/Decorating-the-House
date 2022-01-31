import React, { useState, useEffect } from 'react';
import { ProductList } from '../Components/ProductList';
import axios from 'axios';
import styled from 'styled-components';

export const MainPage = () => {
  const [users, setUsers] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchUsers = async () => {
    try {
      // 요청이 시작 할 때에는 error 와 users 를 초기화하고
      setError(null);
      setUsers(null);
      // loading 상태를 true 로 바꿉니다.
      setLoading(true);
      const data = await axios.get(
        'https://cdn.ggumim.co.kr/test/image_product_link.json'
      );
      setUsers(data); // 데이터는 response.data 안에 들어있습니다.
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
    <MainSection>
      <ImageSection>
        <Img
          src="//cdn.ggumim.co.kr/cache/star/1000/2022011017094316oRcWeb8R.jpeg"
          id="star_image_id_89776"
        />
      </ImageSection>
      <ListSection>
        <ProductList />
      </ListSection>
    </MainSection>
  );
};

const Message = styled.div`
  text-align: center;
`;

const Img = styled.img`
  margin-top: 50px;
  width: 60%;
`;

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
