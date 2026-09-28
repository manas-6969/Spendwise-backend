import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

export default function Auth({ register: isRegistration = false }) {
  const { register, handleSubmit, watch, formState: { errors } } = useForm({ defaultValues: { currency: 'INR' } });
  const { login } = useAuth();
  const navigate = useNavigate();
  const [apiError, setApiError] = useState('');

  const submit = async (data) => {
    try {
      setApiError('');
      await login(data, isRegistration);
      navigate('/dashboard');
    } catch (error) {
      const message = error.response?.data?.message
        || (error.request
          ? 'Cannot reach the API. Start the backend on port 5000 and check frontend/.env.'
          : 'Unable to continue. Please try again.');
      setApiError(message);
    }
  };

  const formError = apiError || Object.values(errors)[0]?.message;
  return <main className="grid min-h-screen place-items-center bg-gradient-to-br from-indigo-100 to-sky-50 p-4">
    <form className="card w-full max-w-md" onSubmit={handleSubmit(submit)}>
      <h1 className="text-3xl font-bold text-indigo-700">SpendWise</h1>
      <p className="mb-6 mt-1 text-slate-500">{isRegistration ? 'Start building smarter money habits.' : 'Welcome back to your money space.'}</p>
      {isRegistration && <>
        <label className="label">Full name</label>
        <input className="field mb-3" {...register('fullName', { required: 'Name is required' })} />
        <label className="label">Monthly allowance</label>
        <input className="field mb-3" type="number" min="0" {...register('monthlyAllowance')} />
      </>}
      <label className="label">Email</label>
      <input className="field mb-3" type="email" {...register('email', { required: 'Email is required' })} />
      <label className="label">Password</label>
      <input className="field mb-3" type="password" {...register('password', { required: 'Password is required', minLength: { value: 8, message: 'Password must be at least 8 characters' } })} />
      {isRegistration && <>
        <label className="label">Confirm password</label>
        <input className="field mb-3" type="password" {...register('confirmPassword', { validate: (value) => value === watch('password') || 'Passwords do not match' })} />
      </>}
      {formError && <p className="mb-3 rounded-lg bg-red-50 p-3 text-sm text-red-700">{formError}</p>}
      <button className="btn w-full">{isRegistration ? 'Create account' : 'Log in'}</button>
      <p className="mt-4 text-center text-sm">{isRegistration ? 'Already registered? ' : 'New here? '}<Link className="text-indigo-600" to={isRegistration ? '/login' : '/register'}>{isRegistration ? 'Log in' : 'Create account'}</Link></p>
    </form>
  </main>;
}
