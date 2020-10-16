import styled from 'styled-components';

export const Container = styled.div`
  display: flex;
  height: 100vh;
  flex-direction: column;
  align-items: center;
  justify-content: center;

  form {
    margin-bottom: 50px;
    display: flex;
    flex-direction: column;
    align-items: center;
    align-self: stretch;

    div {
      display: flex;
      align-self: stretch;
      flex-direction: column;
      align-items: center;

      input {
        margin-top: 5px;
        padding: 5px;

        height: 30px;
        width: 65%;

        border: none;
        border-radius: 15px;

        font-size: 18px;
        font-weight: bold;
        text-align: center;
      }
    }

    div + div {
      margin-top: 15px;
    }

    button {
      margin-top: 15px;
      background-color: #ff5555;
      border: none;
      border-radius: 15px;
      padding: 15px;
      color: #f8f8f2;
      font-weight: bold;
      font-size: 16px;
      text-align: center;
    }
  }
`;
