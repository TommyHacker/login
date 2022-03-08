import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBacon, faAngleRight } from '@fortawesome/free-solid-svg-icons';
import { useRouter } from 'next/router';
import Link from 'next/link';
import axios from 'axios';
const Nav = ({ user, setUser, loginPending }) => {
	const router = useRouter();

	const logoutHandler = () => {
		axios
			.delete('http://localhost:4000/user/logout', { withCredentials: true })
			.then((res) => {
				console.log(res);
				setUser(null);
				return router.replace('/');
			})
			.catch((err) => console.log(err));
	};

	return (
		<nav>
			<div className='nav-title'>
				<div className='icon'>
					<FontAwesomeIcon icon={faBacon} fontSize={'40px'} />
				</div>
			</div>
			{!user && <Link href={'/register'}>Register</Link>}
			{user && (
				<>
					<div className='user-bubble'>
						{user.fullName.split(' ')[0][0].toUpperCase()}
						{user.fullName.split(' ')[1][0].toUpperCase()}
					</div>
					<div className='nav-links'>
						<Link href={'/dashboard'}>dashboard</Link>
						<Link href={'/notifications'}>Notifications</Link>
						<Link href={'/projects'}>Projects</Link>
						<Link href={'/allUsers'}>all users</Link>
					</div>
					<button className='logout-btn' onClick={() => logoutHandler()}>
						<FontAwesomeIcon icon={faAngleRight} /> logout
					</button>
				</>
			)}
		</nav>
	);
};

export default Nav;
