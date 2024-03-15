import { ChangeEvent, FC, FormEvent, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { LoginForm, LoginInterface } from '../interfaces';
import '../App.css';
import Navbar from '../components/Navbar';

const LoginPage: FC = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [form, setForm] = useState<LoginForm>({ email: '', password: '' });
  const navigate = useNavigate();

  const onChange = (e: ChangeEvent<HTMLInputElement>): void => {
    const { value, name } = e.target;
    setForm((state) => ({ ...state, [name]: value }));
  };

  const onSubmit = async (e: FormEvent): Promise<void> => {
    setIsSubmitting(true);
    e.preventDefault();

    const res = await fetch(
      'https://techhub.docsolutions.com/OnBoardingPre/WebApi/api/authentication/authentication',
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          Body: {
            Username: form.email,
            Password: form.password,
          },
        }),
      }
    );

    const data: LoginInterface = await res.json();

    if (!data.IsOK) {
      alert(
        'Sus datos son incorrectos, verifique su información e intente nuevamente.'
      );

      setIsSubmitting(false);
      return;
    }

    localStorage.setItem('token', data.Body.Token);
    setForm({ email: '', password: '' });
    navigate('/users');
    setIsSubmitting(false);
  };

  return (
    <>
      <Navbar />
      <form className="form" onSubmit={onSubmit} noValidate>
        <div>
          <h1>Inicio de sesión</h1>
          <label>Usuario</label>
          <input
            onChange={onChange}
            type="text"
            name="email"
            value={form.email}
            placeholder="Usuario"
            autoComplete="off"
          />
          <br />
          <label>Password</label>
          <input
            onChange={onChange}
            type="password"
            name="password"
            value={form.password}
            placeholder="Contraseña"
            autoComplete="off"
          />
          <br />
          <button
            className={
              isSubmitting || !form.email || !form.password
                ? 'inactive-button'
                : 'active-button'
            }
            type="submit"
            disabled={isSubmitting || !form.email || !form.password}
          >
            OK
          </button>
        </div>
      </form>
    </>
  );
};

export default LoginPage;
