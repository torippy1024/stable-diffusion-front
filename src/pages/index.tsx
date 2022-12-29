import type {NextPage} from 'next';
import Link from 'next/link';
import Layout from '../components/layouts/Layout';

const Home: NextPage = () => {
  return (
    <Layout>
      <div>hogehoge</div>
      <div className='btn btn-primary'>
        <Link href='/page2'>link to page2</Link>
      </div>
    </Layout>
  );
};

export default Home;
