const router = require("express").Router();
const dotenv = require("dotenv");
dotenv.config();
const {oAuth2Client, OAuth2Client} = require("google-auth-library");


async function getUserData(access_token) {
    const response = await fetch(`https://www.googleapis.com/oauth2/v3/userinfo?access_token=${access_token}`);
    const data = await response.json();
    return data;
}
router.get('/', async function(req, res, next){
    const code = req.query.code;
    let userInfo;
    try {
        const redirectUrl = 'http://127.0.0.1:5150/oauth';
        const oAuth2Client = new OAuth2Client(
            process.env.CLIENT_ID,
            process.env.CLIENT_SECRET,
            redirectUrl
        );
        const r = await oAuth2Client.getToken(code);
        await oAuth2Client.setCredentials(r.tokens);

        const user = oAuth2Client.credentials;
        await getUserData(user.access_token).then((data) =>{
            userInfo = {user, url: 'http://localhost:3000/' };
        });
    } catch(err) {
    }

    res.status(200).json(userInfo);
})

module.exports = router;
