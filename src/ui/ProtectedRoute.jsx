import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { styled } from 'styled-components';
import { useUser } from '../features/authentication/useUser';
import Spinner from './Spinner';
const FullPage = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100vh;
  background-color: var(--color-grey-50);
`;

function ProtectedRoute({ children }) {
  const navigate = useNavigate();

  //1. Load the autenticated user
  const { isAutenticated, isPending } = useUser();

  //3. If not authenticated, redirect to login page
  useEffect(
    function () {
      if (!isAutenticated && !isPending) {
        navigate('/login');
      }
    },
    [isAutenticated, isPending, navigate],
  );
  //2. While loading, show a spinner
  if (isPending)
    return (
      <FullPage>
        <Spinner />
      </FullPage>
    );

  //4. If authenticated, show the children

  if (isAutenticated) return children;
}

export default ProtectedRoute;
