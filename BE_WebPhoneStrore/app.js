// @Import
const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const cors = require('cors');
const usersRoutes = require('./routes/users-route');
const productsRoutes = require('./routes/products-route');

const HttpError = require('./models/http-error')

const app = express();

// @Connection
mongoose.connect(process.env.MONGODB_URI || 'mongodb+srv://Quan:0794266798@cluster0.0ci90.mongodb.net/products?retryWrites=true&w=majority', {
        useCreateIndex: true,
        useNewUrlParser: true,
        useUnifiedTopology: true,
        useFindAndModify: false
    })
    .then(() => console.log('Connected to MongoDB!'))
    .catch((error) => console.log(`Connect fail, please check and try again!Error: ${error} `))

app.use(bodyParser.json());

// @Middleware
app.use(cors());
app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", '*');
    res.header("Access-Control-Allow-Origin", '*');
    res.header("Access-Control-Allow-Credentials", true);
    res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,OPTIONS');
    res.header("Access-Control-Allow-Headers", 'Origin,X-Requested-With,Content-Type,Accept,content-type,application/json');
    next();
});

// @Router
app.use('/api/products', productsRoutes);
app.use('/api/users', usersRoutes);

app.use((req, res, next) => {
    const error = new HttpError('Could not find this route', 404);
    throw error;
});

app.use((error, req, res, next) => {
    if (res.headerSent) {
        return next(error);
    }
    res.status(error.code || 500);
    res.json({message: error.message || 'An unknown error occurred!'});
});



//Catch 404 error and forward them to error handler
app.use((req, res, next) => {
    const err = new HttpError('Not Found')
    err.status = 404
    next(err)
})

app.use((err, req, res, next) => {
    const error = app.get('env') === 'development' ? err : {}
    const status = err.status || 500

    return res.status(status).json({
        error: {
            message: error.message
        }
    })
})

//Error handler function

//Start server
app.set('port', process.env.PORT || 5000);
app.listen(app.get('port'), function(){
    console.log('Server is listening at port ' + app.get('port'));
});