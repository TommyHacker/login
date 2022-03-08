import axios from 'axios';
import { useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUserPlus } from '@fortawesome/free-solid-svg-icons';
import { useRouter } from 'next/router';
import Link from 'next/link';

const Register = ({ user }) => {
	const router = useRouter();
	const [fullName, setFullName] = useState('');
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');

	useEffect(() => {
		if (!user) return;
		router.replace('/');
	}, [user]);

	const usericon = <FontAwesomeIcon icon={faUserPlus} />;

	const submitHandler = (e) => {
		e.preventDefault();
		axios
			.post('http://localhost:4000/user/register', {
				fullName,
				email,
				password,
			})
			.then((res) => console.log(res))
			.catch((err) => console.log(err));
		getUser();
		return router.replace('/');
	};

	return (
		<div className='page-container'>
			<div className='register-container'>
				<form onSubmit={(e) => submitHandler(e)} className='register-form'>
					<h1>Register</h1>
					<div className='section'>
						<label htmlFor='fullName'>Full Name</label>
						<input
							type='text'
							name='fullName'
							id='fullName'
							placeholder='John Smith'
							onChange={(e) => setFullName(e.target.value)}
						/>
					</div>
					<div className='section'>
						<label htmlFor='email'>Email</label>
						<input
							type='email'
							name='email'
							id='email'
							placeholder='email'
							onChange={(e) => setEmail(e.target.value)}
						/>
					</div>
					<div className='section'>
						<label htmlFor='password'>Password</label>
						<input
							type='password'
							name='password'
							id='password'
							placeholder='password'
							onChange={(e) => setPassword(e.target.value)}
						/>
					</div>
					<button>
						<FontAwesomeIcon icon={faUserPlus} className='font-icon' />
						Register
					</button>
					<p className='portal-query'>
						Already have an account? <Link href={'/login'}>Login</Link> here.
					</p>
				</form>
			</div>
		</div>
	);
};

export default Register;
