import '../styles/css/main.css';
import { useState, useEffect } from 'react';
import Nav from '../components/Nav';
import axios from 'axios';
import Loading from '../components/Loading';

const MyApp = ({ Component, pageProps }) => {
	const [user, setUser] = useState();
	const [userPending, setUserPending] = useState(true);
	const [loading, setLoading] = useState(false);

	const getUser = () => {
		axios
			.get('http://localhost:4000/user', { withCredentials: true })
			.then((res) => {
				if (res.data.status === 'fail') return setUser();
				setUser(res.data.data);
			})
			.catch((err) => console.log(err));
		setUserPending(false);
		setLoading(false);
	};

	useEffect(() => {
		console.log('useeffect ran');
		if (user) return;
		if (userPending) getUser();
		setLoading(false);
		return setUserPending(false);
	}, [userPending]);

	return (
		<div className='app-container'>
			<Nav user={user} setUser={setUser} />
			{loading ? (
				<Loading />
			) : (
				<Component
					user={user}
					setLoading={setLoading}
					setUserPending={setUserPending}
					{...pageProps}
				/>
			)}
		</div>
	);
};

export default MyApp;
