import { createGlobalStyle } from 'styled-components';

export const GlobalStyle = createGlobalStyle`
  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }

  body {
    font-family: 'Maven Pro', sans-serif;
    font-size: 16px;
    color: #E1E1E6;
    -webkit-font-smoothing: antialiased;

  }

  input, button, textarea, :focus {
      outline: none;
  }

  /* https://github.com/electron/electron/issues/2538#issuecomment-133083181 */
  :not(input):not(textarea),
  :not(input):not(textarea)::after,
  :not(input):not(textarea)::before {
    -webkit-user-select: none;
    user-select: none;
  }

  button {
    cursor: pointer;
  }
`;
