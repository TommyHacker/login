import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSpinner } from '@fortawesome/free-solid-svg-icons';
const Loading = () => {
	return (
		<div className='loading-container'>
			<FontAwesomeIcon className='loading-icon' icon={faSpinner} />
		</div>
	);
};

export default Loading;
