import React, { useState } from 'react';
import styled from 'styled-components';

const Form = styled.form`
  display: flex;
  justify-content: center;
  gap: 0.5rem;
  margin-bottom: 1rem;

  @media (max-width: 600px) {
    flex-direction: column;
    align-items: stretch;
  }
`;


const Input = styled.input`
  padding: 0.5rem;
  border-radius: 8px;
  border: 1px solid #ccc;
  flex: 1;
`;

const Button = styled.button`
  background: #0077ff;
  color: white;
  border: none;
  border-radius: 8px;
  padding: 0.5rem 1rem;
  cursor: pointer;

  &:hover {
    background: #005fcc;
  }
`;

interface Props {
  onSearch: (city: string) => void;
}

const SearchBar = ({ onSearch }: Props) => {
  const [city, setCity] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (city.trim()) onSearch(city);
  };

  return (
    <Form onSubmit={handleSubmit}>
      <Input
        type="text"
        placeholder="Introduz uma cidade..."
        value={city}
        onChange={(e) => setCity(e.target.value)}
      />
      <Button type="submit">Pesquisar</Button>
    </Form>
  );
};

export default SearchBar;
