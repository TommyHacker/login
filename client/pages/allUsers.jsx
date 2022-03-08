import axios from 'axios';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';

const AllUsers = ({ user }) => {
	const router = useRouter();

	useEffect(() => {
		if (user.isAdmin) return;
		router.replace('/');
	}, []);

	const [allUsers, setAllUsers] = useState();

	const getAllUsers = () => {
		axios
			.get('http://localhost:4000/user/allusers', { withCredentials: true })
			.then((res) => {
				setAllUsers(res.data.data);
				console.log(res);
				return;
			})
			.catch((err) => console.log(err));
	};

	useEffect(() => {
		console.log('getting all users : useEffect');
		getAllUsers();
	}, []);

	return (
		<div className='page-container'>
			<div className='all-users-container'>
				<div className='user-card'>
					<h4>Full Name</h4>
					<h4>Email</h4>
					<h4>Admin</h4>
					<h4>Verified</h4>
				</div>
				{allUsers &&
					allUsers.map((user, index) => {
						return (
							<div key={user._id} className='user-card row'>
								<p>{user.fullName}</p>
								<p>{user.email}</p>
								<p>{user.isAdmin.toString()}</p>
								<p>{user.verified.toString()}</p>
							</div>
						);
					})}
			</div>
		</div>
	);
};

export default AllUsers;
