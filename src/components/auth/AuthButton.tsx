import {signIn, signOut, useSession} from 'next-auth/react';
import {COMMON_CONFIG} from '../../const';

type AuthButtonType = {
  className?: string;
};

const AuthButton = ({className = ''}: AuthButtonType) => {
  const {status} = useSession();

  if (!COMMON_CONFIG.NEED_AUTH) {
    return null;
  }

  return status === 'authenticated' ? (
    <div className={`btn ${className}`} onClick={() => signOut()}>
      sign out
    </div>
  ) : (
    <div className={`btn ${className}`} onClick={() => signIn()}>
      sign in
    </div>
  );
};

export default AuthButton;
