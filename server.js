const express = require('express');
const morgan = require('morgan');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config()

//routes
const AuthRoute = require('./routes/auth');
const TableRoute = require('./routes/table');

//app 
const app = express()
//db 
mongoose
.connect(process.env.DATABASE_LOCAL,{ useNewUrlParser:true,useUnifiedTopology:true,useCreateIndex:true,useFindAndModify:false})
.then(()=>console.log('DB connected vishwas'));
app.use(morgan('dev'));
app.use(bodyParser.json())
app.use(cookieParser())
//cors 
if(process.env.NODE_ENV == 'development')
{
    app.use(cors({origin:`${process.env.CLIENT_URL}`}));
}
//routes 
app.use('/api',AuthRoute);
app.use('/api',TableRoute);


const port = process.env.PORT || 8000
app.listen(port,()=>{
    console.log(`server is running on port ${port}`);
})