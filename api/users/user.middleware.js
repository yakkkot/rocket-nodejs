const {getUserByID, findOneByParams} = require("./users.services");
const {CustomError} = require("../../errors/CustomError");
const {isEmailValidReg} = require("../../helpers/user.helper");

const userMiddleware = {
    checkIsUserValid: async (req, res, next) => {
        try {
            const user = await getUserByID(req.params.id);
            if (!user) {
                throw new CustomError('User not found', 404);
            }
            req.user = user;

            next();
        } catch (e) {
            next(e);
        }
    },

    checkIsBodyValidPost: (req, res, next) => {
        try {
            const {firstName, lastName, age, password} = req.body;

            if (typeof firstName !== 'string' || firstName.length < 2) {
                throw new CustomError('Incorrect Name', 400);
            }

            if (typeof lastName !== 'string' || lastName.length < 2) {
                throw new CustomError('Incorrect LastName', 400);
            }

            if (typeof age !== 'number' || age < 0) {
                throw new CustomError('Incorrect Age', 400);
            }

            if (!password || password.length < 5 || typeof password !== 'string' ) {
                throw new CustomError('Incorrect Password', 400);
            }

            next();
        } catch (e) {
            next(e);
        }
    },

    checkIsBodyValidPut: (req, res, next) => {
        try {
            const {firstName, lastName, age, password} = req.body;

            if (typeof firstName !== 'string' || firstName.length < 2) {
                throw new CustomError('Incorrect Name', 400);
            }

            if (lastName && (typeof lastName !== 'string' || lastName.length < 2)) {
                throw new CustomError('Incorrect LastName', 400);
            }

            if (age && (typeof age !== 'number' || age < 0)) {
                throw new CustomError('Incorrect Age', 400);
            }

            if (password && (password.length < 5 || typeof password !== 'string' )) {
                throw new CustomError('Incorrect Password', 400);
            }

            req.user = req.body;
            next();
        } catch (e) {
            next(e);
        }
    },

    checkIsEmailUniquePost: async (req, res, next) => {
        try {
            const {email} = req.body;
            const findUser = await findOneByParams({email});

            if (findUser) {
                throw new CustomError('Email has been used', 400);
            }
            if (!email || !isEmailValidReg(email)) {
                throw new CustomError('Incorrect Email', 400);
            }

            next();
        } catch (e) {
            next(e);
        }
    },

    checkIsEmailUniquePut: async (req, res, next) => {
        try {
            const {email} = req.body;
            const findUser = await findOneByParams({email});

            if (findUser) {
                throw new CustomError('Email has been used', 400);
            }
            if (email && !isEmailValidReg(email)) {
                throw new CustomError('Incorrect Email', 400);
            }

            next();
        } catch (e) {
            next(e);
        }
    },
};

module.exports = {
    userMiddleware
};