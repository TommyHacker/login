import axios from 'axios';
import { useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowRight } from '@fortawesome/free-solid-svg-icons';
import { useRouter } from 'next/router';
import Link from 'next/link';

const Login = ({ user, setUserPending, setLoading }) => {
	const router = useRouter();

	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');

	useEffect(() => {
		if (!user) return;
		router.replace('/');
	}, [user]);

	const submitHandler = (e) => {
		e.preventDefault();
		setLoading(true);
		axios
			.post(
				'http://localhost:4000/user/login',
				{
					email,
					password,
				},
				{ withCredentials: true }
			)
			.then((res) => {
				if (res.data.status === 'success') {
					setUserPending(true);
				}
			})
			.catch((err) => console.log(err));
		return router.replace('/');
	};

	return (
		<div className='page-container'>
			<div className='login-container'>
				<form onSubmit={(e) => submitHandler(e)} className='Login-form'>
					<h1>Login</h1>

					<div className='section'>
						<label htmlFor='email'>Email</label>
						<input
							type='email'
							name='email'
							id='email'
							placeholder='johnsmith@email.com'
							onChange={(e) => setEmail(e.target.value)}
						/>
					</div>
					<div className='section'>
						{' '}
						<label htmlFor='password'>Password</label>
						<input
							type='password'
							name='password'
							id='password'
							placeholder='************'
							onChange={(e) => setPassword(e.target.value)}
						/>
					</div>
					<button>
						<FontAwesomeIcon className='font-icon' icon={faArrowRight} />
						Login
					</button>
					<p className='portal-query'>
						Don't have an account? <Link href={'/register'}>Register</Link>{' '}
						here.
					</p>
				</form>
			</div>
		</div>
	);
};

export default Login;
