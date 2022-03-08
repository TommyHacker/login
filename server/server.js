const express = require('express');
const app = express();
const dotenv = require('dotenv').config();
const cors = require('cors');
const mongoose = require('mongoose');
const cookieParser = require('cookie-parser');
const uri = process.env.DB_URL || 'mongodb://localhost:27017/loginportaldb';
const port = process.env.PORT || 4000;
const userRoutes = require('./routes/userRoutes');
const adminRoutes = require('./routes/adminRoutes');

mongoose.connect(uri);
mongoose.connection
	.on('error', (error) => console.error(error))
	.on('open', () => console.log('db:live'));

const cookieOptions = {
	httpOnly: true,
};

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(
	cors({
		credentials: true,
		origin: ['http://localhost:3000', 'http://192.168.1.14'],
	})
);
app.use(cookieParser(process.env.COOKIE_SECRET, cookieOptions));

app.use((req, res, next) => {
	console.log(req.ip);
	next();
});

app.use('/user', userRoutes);
app.use('/admin', adminRoutes);

app.listen(port, () => console.log(`server:${port}`));
