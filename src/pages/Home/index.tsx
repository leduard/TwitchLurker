import React from 'react';

import { Container } from './styles';

const Home: React.FC = () => {
  return (
    <Container>
      <form>
        <div>
          <h2>Twitch Username</h2>
          <input type="text" />
        </div>

        <div>
          <h2>OAuth Token</h2>
          <input type="password" />
        </div>

        <button>Start Lurking</button>
      </form>
    </Container>
  );
};

export default Home;
