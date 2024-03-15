import { ChangeEvent, FC, FormEvent, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { GetUsers, SearchForm, UserBody } from '../interfaces';

import '../App.css';
import Navbar from '../components/Navbar';

const UsersPage: FC = () => {
  const [token, setToken] = useState('');
  const [isSearching, setIsSearching] = useState(false);
  const [form, setForm] = useState<SearchForm>({ name: '' });
  const [users, setUsers] = useState<UserBody[]>([]);
  const navigate = useNavigate();

  const onNewUser = (): void => {
    navigate('/register');
  };

  const onChange = (e: ChangeEvent<HTMLInputElement>): void => {
    const { value, name } = e.target;
    setForm((state) => ({ ...state, [name]: value }));
  };

  const onSubmit = async (e: FormEvent): Promise<void> => {
    setIsSearching(true);
    e.preventDefault();

    const res = await fetch(
      'https://techhub.docsolutions.com/OnBoardingPre/WebApi/api/user/GetUsers',
      {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          Body: { SearchText: form.name },
        }),
      }
    );

    const data: GetUsers = await res.json();
    if (!data.IsOK) {
      alert(data.Messages);
      setIsSearching(false);
      return;
    }

    setUsers(data.Body);
    setIsSearching(false);
  };

  useEffect(() => {
    if (localStorage.getItem('token')) {
      setToken(localStorage.getItem('token') || '');
    }
  }, []);

  return (
    <>
      <Navbar />
      <div>
        <div className="searchContainer">
          <form className="form" onSubmit={onSubmit}>
            <input
              type="text"
              placeholder="Buscar"
              name="name"
              value={form.name}
              onChange={onChange}
              autoComplete="off"
            />
            <button
              className={isSearching ? 'inactive-button' : 'active-button'}
              type="submit"
              disabled={isSearching}
            >
              OK
            </button>
          </form>
          <button onClick={onNewUser}>Nuevo</button>
        </div>

        <table>
          <tr className="tableRow">
            <th>Username</th>
            <th>Name</th>
            <th>FatherLastName</th>
            <th>CreationDate</th>
            <th>Email</th>
            <th>PhoneNumber</th>
          </tr>
          {isSearching ? (
            <h1>Cargando información</h1>
          ) : (
            <>
              {users.length === 0 ? (
                <h1>No hay resultados</h1>
              ) : (
                <>
                  {users.map((user, i) => (
                    <tr
                      style={{
                        backgroundColor: i % 2 === 1 ? '#ccc' : 'white',
                        color: i % 2 === 1 ? '#FFF' : '#000',
                      }}
                      key={user.Id}
                    >
                      <th>{user.Username}</th>
                      <th>{user.Name}</th>
                      <th>{user.FatherLastName}</th>
                      <th>{user.CreationDate}</th>
                      <th>{user.Email}</th>
                      <th>{user.PhoneNumber}</th>
                    </tr>
                  ))}
                </>
              )}
            </>
          )}
        </table>
      </div>
    </>
  );
};

export default UsersPage;
