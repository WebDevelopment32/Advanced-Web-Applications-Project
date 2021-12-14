const sendTokenCookie = (user, statusCode, res) => {
    const token = user.getJwtToken();

    const options = {
        expires: new Date(Date.now() + process.env.COOKIE_EXPIRES_TIME *
        24*60*60*1000),
        // Cookie must be http only for security of the token
        httpOnly: true
    }

    if(process.env.NODE_ENV === 'production') {
        options.secure = true;
    }

    res.status(statusCode)
        .cookie('token', token, options)
        .json({
            success: true,
            token
        });
}

module.exports = sendTokenCookie;