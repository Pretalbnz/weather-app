import React from 'react';
import styled from 'styled-components';

const Message = styled.div`
  color: red;
  margin: 1rem 0;
`;

interface Props {
  message: string;
}

const ErrorMessage = ({ message }: Props) => <Message>{message}</Message>;

export default ErrorMessage;
