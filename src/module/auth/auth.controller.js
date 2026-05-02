const catchAsync = require('../../utils/catchAsync');
const userService = require('../user/user.service');

const loginUser = catchAsync(async (req, res) => {
    const {email, password} = req.body;
    const {accessToken, refreshToken } = userService.loginUser(email, password);
    // console.log(`inside login controller, token: ${accesToken}`);
    return res.status(200).json({ accessToken, refreshToken });
});

const refresh = catchAsync(async ( req, res) => {
    const { refreshToken } = req.body;
    if(!refreshToken){
        throw new AppError('No refresh token', 401);
    }
    try {
        const decoded = jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET);
        const user = userModel.getUserById(decoded.id);

        if(!user || user.refreshToken !== refreshToken){
            throw new AppError('Invalid refresh token', 401);
        }
        const newAccessToken = jwt.sign(
            {id: user.id, email: user.email, role: user.role},
            process.env.SECRET,
            {expiresIn: '15m'}
        );
        res.json({ newAccessToken : newAccessToken });
    } catch (err) {
        throw new AppError('Invalid refresh token', 401);
    }
});

const logout = (req, res) => {
    // req object contains user returned by authentication middleware
    const userId = req.user.id;
    userModel.saveRefreshToken(userId, null);
    return res.status(200).json({message: "User Logged out"});

}

module.exports = {
    loginUser,
    refresh,
    logout
}