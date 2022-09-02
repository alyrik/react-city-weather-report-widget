import styled, { keyframes } from 'styled-components';

import { IProps } from './Widget';

const appear = keyframes`
  from {
    opacity: 0;
  }

  to {
    opacity: 1;
  }
`;

export const StyledRoot = styled.section<{
  orientation: IProps['orientation'];
}>`
  padding: 20px;
  width: 100%;
  max-width: ${({ orientation }) =>
    orientation === 'vertical' ? '300px' : '500px'};
  min-height: ${({ orientation }) =>
    orientation === 'vertical' ? '320px' : '200px'};
  background: #fff;
  position: relative;
  border-radius: 6px;
  box-shadow: 0 10px 15px rgba(0, 0, 0, 0.5);
  box-sizing: border-box;

  * {
    box-sizing: border-box;
  }
`;

export const StyledMaskedImage = styled.div`
  border-radius: 6px;
  position: absolute;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  background-size: cover;
  background-repeat: no-repeat;
  background-position: 50%;
  overflow: hidden;

  &::after {
    content: '';
    position: absolute;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    background-color: rgba(0, 0, 0, 0.4);
  }
`;

export const StyledContent = styled.div`
  height: 100%;
  position: relative;
  z-index: 1;
  color: #fff;
`;

export const StyledRow = styled.div`
  margin-bottom: 4px;
  font-size: 22px;

  &::first-letter {
    text-transform: uppercase;
  }
`;

export const StyledForm = styled.form`
  margin-bottom: 20px;
  display: flex;
`;

export const StyledInput = styled.input`
  width: 100%;
  height: 40px;
  padding: 4px 10px;
  border: 2px solid #fff;
  border-radius: 4px 0 0 4px;
  font-size: 20px;
  background: rgba(255, 255, 255, 0.2);
  color: #fff;
  transition: background-color 200ms ease;

  &:hover {
    background: rgba(255, 255, 255, 0.3);
  }

  &:focus {
    background: rgba(255, 255, 255, 0.4);
    outline: 0;
  }
`;

export const StyledButton = styled.button`
  width: 40px;
  height: 40px;
  border: 0;
  border-radius: 0 4px 4px 0;
  background: #fff;
  font-size: 20px;
  cursor: pointer;
  transition: font-size 200ms ease;

  &:hover {
    font-size: 22px;
  }
`;

export const StyledMessage = styled.div`
  font-size: 18px;
`;

export const StyledInfo = styled.div<{ orientation: IProps['orientation'] }>`
  animation: ${appear} 300ms both;
  column-count: ${({ orientation }) => (orientation === 'vertical' ? 1 : 2)};
  column-width: 130px;
`;

export const StyledLoaderWrapper = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate3d(-50%, -50%, 0);
`;
