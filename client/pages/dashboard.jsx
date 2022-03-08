import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheck, faXmark } from '@fortawesome/free-solid-svg-icons';
import { useEffect } from 'react';
import { useRouter } from 'next/router';
const Dashboard = ({ user }) => {
	const router = useRouter();
	useEffect(() => {
		if (user) return;
		router.replace('/');
	}, []);

	return (
		<div className='page-container'>
			<div className='dashboard'>
				<div className='user-picture'>pic</div>
				{user && (
					<div className='user-details'>
						<p>{user.email}</p>
						<p>
							{user.verified ? 'verified' : 'not verified'}{' '}
							{user.verified ? (
								<FontAwesomeIcon icon={faCheck} />
							) : (
								<FontAwesomeIcon icon={faXmark} />
							)}
						</p>
					</div>
				)}
			</div>

			<div className='user-stats'>
				<div className='user-recent-activity'>
					<h2 className='title'>Stats</h2>
					<div className='row'>
						<h3>tickets completed</h3>
						<h3>53</h3>
					</div>
					<div className='row'>
						<h3>current tickets</h3>
						<h3>14</h3>
					</div>
					<div className='row'></div>
				</div>
				<div className='user-recent-activity'>
					<h3 className='title'>Recent Activity</h3>
					<div className='row'>
						<p>nav bar...</p>
					</div>
					<div className='row'>
						<p>mobile views...</p>
					</div>
					<div className='row'>
						<p>login on load...</p>
					</div>
				</div>
			</div>
		</div>
	);
};

export default Dashboard;
