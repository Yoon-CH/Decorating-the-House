import React, { useState, useEffect } from 'react';
import axios from 'axios';
import styled from 'styled-components';

function MainImage() {
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
      <Img key={users.id} src={users.imageUrl} alt="집꾸미기" />
    </>
  );
}

export default MainImage;

const Message = styled.div`
  text-align: center;
  margin-top: 50px;
`;

const Img = styled.img`
  margin-top: 50px;
  width: 60%;
`;
