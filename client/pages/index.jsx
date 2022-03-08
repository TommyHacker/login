const Index = () => {
	return (
		<div className='page-container'>
			<div className='index-container'>
				<p>
					The purpose of this project is to demontrate a full-stack solution to
					authentication / authorization with jsonwebtoken and cookies.
				</p>
				<p>
					The application then authorizes the content based on if user.isAdmin
				</p>

				<p>user registers or logs in, then is returned a JWTcookie </p>
				<p>
					the cookie is then used with the api to determine if the user is
					genuine, the cookie and or jwt has not expired.
				</p>

				<p>
					in all instances of admin only viewable data, both the front end and
					the back end have to read that the user is admin.
				</p>
				<p>
					e.g. front end user has spoofed user.isAdmin: true;, the server would
					then determine this as false from the cookie recieved, and will return
					"not authorized"
				</p>
			</div>
		</div>
	);
};
export default Index;
