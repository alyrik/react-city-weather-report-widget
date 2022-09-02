import React, { FC } from 'react';
import styled, { keyframes } from 'styled-components';

const rotate = keyframes`
  from {
    transform: rotate(0deg);
  }

  to {
    transform: rotate(360deg);
  }
`;

const appear = keyframes`
  from {
    opacity: 0;
  }

  to {
    opacity: 1;
  }
`;

const StyledLoader = styled.div`
  width: 70px;
  height: 70px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 50px;
  transform-origin: 50%;
  animation: ${appear} 300ms both, ${rotate} 2s linear infinite;
`;

export const Loader: FC = () => {
  return (
    <StyledLoader>
      <span>🌞</span>
    </StyledLoader>
  );
};
