import React, { useState, useEffect } from 'react';
import styled from 'styled-components';

const Navbar = styled.nav`
  background-color: #f2f2f2;
  padding: 20px;
  max-width: 100%;
  display:flex;
  align-items: center;
  justify-content:space-between;
  overflow:hidden;
`;

const Card = styled.div`
    
`
const Button = styled.button`
  background-color: #007bff;
  color: #fff;
  border: none;
  padding: 10px 20px;
  font-size: 16px;
  cursor: pointer;
  border-radius: 5px;
  margin: 1rem;
`;
const Input = styled.input`
    padding: 10px;
    border-radius: 0.5rem;
`


const Loader = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 200px;
  font-size: 24px;
  color: #007bff;
`;

const CardGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 20px;
  padding: 20px;
`;

const UserCard = styled.div`
  border: 1px solid #ddd;
  padding: 20px;
`;

const UserGrid = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(false);

  const getUsers = async () => {
    setLoading(true);
    try {
      const response = await fetch('https://reqres.in/api/users?page=1');
      const data = await response.json();
      setUsers(data.data);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching users:', error);
      setLoading(false);
    }
  };

  useEffect(() => {
    getUsers();
  }, []);

  return (
    <>
      <Navbar>
        <Button onClick={getUsers}>Fetch User from API</Button>
              <Card>
                   <Input type='text' placeholder='Search...'/>
                    <Button onClick={getUsers}>Search </Button>
                            
                </Card>
      </Navbar>
      {loading ? (
        <Loader>Loading...</Loader>
      ) : (
        <CardGrid>
          {users.map((user) => (
            <UserCard key={user.id}>
              <img src={user.avatar} alt={user.first_name} />
              <h3>{`${user.first_name} ${user.last_name}`}</h3>
              <p>{user.email}</p>
            </UserCard>
          ))}
        </CardGrid>
      )}
    </>
  );
};

export default UserGrid;