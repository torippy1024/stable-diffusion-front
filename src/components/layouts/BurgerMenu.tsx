import Link from 'next/link';
import {slide as Menu} from 'react-burger-menu';

type BurgerMenuType = {
  isOpen: boolean;
  handleClose: () => void;
  className?: string;
};

const BurgerMenu = ({isOpen, handleClose, className}: BurgerMenuType) => {
  return (
    <Menu isOpen={isOpen} onClose={handleClose} className={`${className}`}>
      <div className='font-bold text-3xl mb-2 border-b'>Next.js</div>
      <Link href='/' className='menu-item'>
        ホームページ
      </Link>
      <Link href='/page-2' className='menu-item'>
        ページ2
      </Link>
      <Link href='/page-3' className='menu-item'>
        ページ3
      </Link>
      <Link href='/page-4' className='menu-item'>
        ページ4
      </Link>
    </Menu>
  );
};

export default BurgerMenu;
