import { ChangeEvent, FC, FormEvent, useEffect, useState } from 'react';
import { RegisterForm, RegisterInterface } from '../interfaces';
import { useNavigate } from 'react-router-dom';
import Navbar from '../components/Navbar';

const RegisterPage: FC = () => {
  const [token, setToken] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [form, setForm] = useState<RegisterForm>({
    confirmPassword: '',
    email: '',
    firstLastName: '',
    name: '',
    password: '',
    phoneNumber: '',
    secondLastName: '',
    user: '',
  });

  const {
    confirmPassword,
    email,
    firstLastName,
    name,
    password,
    phoneNumber,
    secondLastName,
    user,
  } = form;

  const navigate = useNavigate();

  const onChange = (e: ChangeEvent<HTMLInputElement>): void => {
    const { value, name } = e.target;
    setForm((state) => ({ ...state, [name]: value }));
  };

  const onSubmit = async (e: FormEvent): Promise<void> => {
    setIsSubmitting(true);
    e.preventDefault();

    if (password !== confirmPassword) {
      alert('Las contraseñas no coinciden');
      return;
    }

    const res = await fetch(
      'https://techhub.docsolutions.com/OnBoardingPre/WebApi/api/user/RegisterUserRole',
      {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          Body: {
            Tenant: null,
            UserName: user,
            Password: password,
            Name: name,
            FatherLastName: firstLastName,
            MotherLastName: secondLastName,
            Email: email,
            PhoneNumber: phoneNumber,
            Metadata: null,
            Roles: [{ Id: 2, Name: 'Usuario Tradicional' }],
          },
        }),
      }
    );
    const data: RegisterInterface = await res.json();
    if (!data.IsOK) {
      setIsSubmitting(false);
      alert(`Verifica tu información: ${data.Messages}`);
      return;
    }

    navigate('/');
    setIsSubmitting(false);
  };

  useEffect(() => {
    if (localStorage.getItem('token')) {
      setToken(localStorage.getItem('token') || '');
    }
  }, []);

  const validateForm = (): boolean => {
    if (
      !confirmPassword ||
      !email ||
      !firstLastName ||
      !name ||
      !password ||
      !phoneNumber ||
      !secondLastName ||
      !user
    ) {
      return true;
    }

    return false;
  };

  return (
    <>
      <Navbar />
      <form className="form" onSubmit={onSubmit}>
        <div>
          <h1>Nuevo Usuario</h1>
          <label>Nombre</label>
          <input
            onChange={onChange}
            type="text"
            value={name}
            name="name"
            autoComplete="off"
          />
          <br />
          <label>Apellido paterno</label>
          <input
            onChange={onChange}
            type="text"
            value={firstLastName}
            name="firstLastName"
            autoComplete="off"
          />
          <br />
          <label>Apellido materno</label>
          <input
            onChange={onChange}
            type="text"
            value={secondLastName}
            name="secondLastName"
            autoComplete="off"
          />
          <br />
          <label>Email</label>
          <input
            onChange={onChange}
            type="email"
            value={email}
            name="email"
            autoComplete="off"
          />
          <br />
          <label>Teléfono</label>
          <input
            onChange={onChange}
            type="text"
            value={phoneNumber}
            name="phoneNumber"
            autoComplete="off"
          />
          <br />
          <label>Usuario</label>
          <input
            onChange={onChange}
            type="text"
            value={user}
            name="user"
            autoComplete="off"
          />
          <br />
          <label>Password</label>
          <input
            onChange={onChange}
            type="password"
            value={password}
            name="password"
            autoComplete="off"
          />
          <br />
          <label>Password</label>
          <input
            onChange={onChange}
            type="password"
            value={confirmPassword}
            name="confirmPassword"
            autoComplete="off"
          />
          <br />
          <button
            className={
              isSubmitting || validateForm()
                ? 'inactive-button'
                : 'active-button'
            }
            type="submit"
            disabled={isSubmitting || validateForm()}
          >
            Guardar
          </button>
        </div>
      </form>
    </>
  );
};

export default RegisterPage;
