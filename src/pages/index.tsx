import type {NextPage} from 'next';
import {signIn, signOut, useSession} from 'next-auth/react';
import Link from 'next/link';
import Layout from '../components/layouts/Layout';

const Home: NextPage = () => {
  const {data: session} = useSession();
  return (
    <Layout>
      <div>hogehoge</div>
      <div className='btn btn-primary'>
        <Link href='/page2'>link to page2</Link>
      </div>
      {session && (
        <div>
          <button key='signOut' className='btn mr-2' onClick={() => signOut()}>
            sign out
          </button>
          {session.user?.name}
        </div>
      )}
      {!session && (
        <button key='signIn' className='btn mr-2' onClick={() => signIn()}>
          sign in
        </button>
      )}
    </Layout>
  );
};

export default Home;
