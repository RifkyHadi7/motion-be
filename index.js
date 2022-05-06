require('dotenv').config();
const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const app = express();
const port = process.env.PORT || 5000;
const cookieParser = require('cookie-parser');
const logger = require('morgan');

const usersRouter = require("./routers/user.router")
const aspekRouter = require("./routers/aspek.router")
const raporRouter = require("./routers/rapor.router")
const bestStaffRouter = require("./routers/bestStaff.router")
const jabatanRouter = require("./routers/jabatan.router")
const departemenRouter = require("./routers/departemen.router")

app.use(cors());
app.use(bodyParser.json());
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

//route
app.use('/user', usersRouter);
app.use('/aspek', aspekRouter);
app.use('/rapor', raporRouter);
app.use('/bestStaff', bestStaffRouter);
app.use('/departemen', departemenRouter);
app.use('/jabatan', jabatanRouter);

//server
app.listen(port, () => console.log(`Listening on port ${port}`));
