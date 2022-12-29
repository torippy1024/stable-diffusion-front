import type {NextPage} from 'next';
import {signIn, signOut, useSession} from 'next-auth/react';
import Link from 'next/link';
import Layout from '../components/layouts/Layout';

const Home: NextPage = () => {
  const {data} = useSession();
  return (
    <Layout>
      <div>hogehoge</div>
      <div className='btn btn-primary'>
        <Link href='/page2'>link to page2</Link>
      </div>
      {data && (
        <button
          key='signOut'
          className='btn mr-2'
          onClick={(e) => {
            e.preventDefault();
            signOut();
          }}
        >
          sign out
        </button>
      )}
      {!data && (
        <button
          key='signIn'
          className='btn mr-2'
          onClick={(e) => {
            e.preventDefault();
            signIn('spotify');
          }}
        >
          sign in
        </button>
      )}
    </Layout>
  );
};

export default Home;
