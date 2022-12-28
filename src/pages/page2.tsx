import Link from 'next/link';
import Footer from '../components/Footer';
import Header from '../components/Header';

const Page2 = () => {
  return (
    <div data-theme='dark' className='flex flex-col min-h-screen'>
      <Header />
      <div className='grow container mx-auto my-4 px-4'>
        <div>
          hogehoge
        </div>
        <div className='btn btn-primary'>
          <Link href='/'>link to home</Link>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Page2;