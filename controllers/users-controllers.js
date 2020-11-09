const { v4: uuid } = require('uuid');
const { validationResult } = require('express-validator');

const HttpError = require('../models/http-error');

Test_users = [
    {
        id: 'u1',
        name: 'Hitler',
        email: 'test@gmail.com',
        password: 'test'
    }
];

const getUsers = (req, res, next) => {
    res.json({ users: Test_users });
};

const signup = (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        console.log(errors);
        throw new HttpError('Invalid inputs passed, please check your data.', 422);
    }
    
    const { name, email, password } = req.body;

    const hasUser = Test_users.find(u => u.email === email);
    if (hasUser) {
        throw new HttpError('Could not create user, email already exists.', 401); 
    }

    const createdUser = {
        id: uuid(),
        name,
        email,
        password
    };

    Test_users.push(createdUser);

    res.status(201).json({users: createdUser});
};

const login = (req, res, next) => {
    const { email, password } = req.body;

    const identifiedUser = Test_users.find(u => u.email === email);
    if (!identifiedUser || identifiedUser.password !== password) {
        throw new HttpError('Could not identified user, credentials seem to be wrong.', 422); 
    }
    
    res.json({message: 'Logged in!'});
};

exports.getUsers = getUsers;
exports.signup = signup;
exports.login = login;