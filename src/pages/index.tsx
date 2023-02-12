import type {NextPage} from 'next';
import Layout from '../components/layouts/Layout';
import DiffusionContainer from '../components/diffusion';

const Home: NextPage = () => {
  return (
    <Layout>
      <DiffusionContainer />
    </Layout>
  );
};

export default Home;
