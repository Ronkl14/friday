import styled from "styled-components";

const LandingPageStyled = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 100%;
  box-sizing: border-box;

  .logo-wrap {
    width: 140px;
    margin: 1rem auto;
  }

  h3,
  h1 {
    text-align: center;
    padding: 0 5rem;
    margin: 0.3rem 0;
  }

  h1 {
    color: #ffa3fd;
  }

  .btn {
    margin: 0 1rem;
    width: 100px;
  }

  .photos {
    display: flex;
    text-align: center;
    flex-wrap: wrap;
    justify-content: center;
    width: 100%;
  }

  .photos-box {
    display: flex;
    flex-direction: column;
    margin: 0 5rem;
  }

  .photo-wrap {
    width: 350px;
  }
`;

export { LandingPageStyled };
