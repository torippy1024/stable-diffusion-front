import {signIn, signOut, useSession} from 'next-auth/react';

const AuthButton = () => {
  const {status} = useSession();

  return (
    <div>
      {status === 'authenticated' ? (
        <div className='btn' onClick={() => signOut()}>
          sign out
        </div>
      ) : (
        <div className='btn' onClick={() => signIn()}>
          sign in
        </div>
      )}
    </div>
  );
};

export default AuthButton;
