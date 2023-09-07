import styled from 'styled-components';


export const Container = styled.div`
  max-width: 1440px;
  margin: 0 auto;
  padding: 0 20px;

  @media (max-width: 768px) {
  max-width: 100%;
  padding: 0 10px;
  }

  @media (max-width: 1400px) {
    max-width: 90%;
  }
`;
