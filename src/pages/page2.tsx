import Link from 'next/link';
import Layout from '../components/layouts/Layout';

const Page2 = () => {
  return (
    <Layout>
      <div>hogehoge</div>
      <div className='btn btn-primary'>
        <Link href='/'>link to home</Link>
      </div>
    </Layout>
  );
};

export default Page2;
