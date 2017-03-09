module.exports = (req , res, next) => {
    // #1 Verify authorization header exists.
    if (!req.headers || !req.headers.authorization) {
        return res.status(401).send();
    }

    // #2 Verify the token is valid

    // #3 get the user from the token.
    return next();
};