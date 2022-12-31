import {signIn, signOut, useSession} from 'next-auth/react';

type AuthButtonType = {
  className?: string;
};

const AuthButton = ({className = ''}: AuthButtonType) => {
  const {status} = useSession();

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
