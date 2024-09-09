import React from 'react';
import Layout from '../shared/ui/Layout/Layout';
import AppRouter from './routes/AppRouter';

const App: React.FC = () => {
  return (
    <Layout>
      <AppRouter />
    </Layout>
  );
};

export default App;
