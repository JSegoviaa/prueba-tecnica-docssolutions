import { FC, useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

const Navbar: FC = () => {
  const [token, setToken] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    if (localStorage.getItem('token')) {
      setToken(localStorage.getItem('token') || '');
    }
  }, [token]);

  const onLogout = (): void => {
    localStorage.removeItem('token');
    navigate('/');
    setToken('');
  };

  return (
    <nav>
      <ul>
        <li>
          <Link className="link" to="/">
            Login
          </Link>
        </li>
        {token ? (
          <>
            <li>
              <Link className="link" to="/users">
                Get Users
              </Link>
            </li>
            <li>
              <Link className="link" to="/register">
                Register
              </Link>
            </li>
            <li>
              <button onClick={onLogout} className="active-button">
                Logout
              </button>
            </li>
          </>
        ) : null}
      </ul>
    </nav>
  );
};

export default Navbar;
