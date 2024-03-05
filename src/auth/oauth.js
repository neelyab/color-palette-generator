const router = require("express").Router();
const dotenv = require("dotenv");
dotenv.config();
const {oAuth2Client, OAuth2Client} = require("google-auth-library");


async function getUserData(access_token) {
    const response = await fetch(`https://www.googleapis.com/oauth2/v3/userinfo?access_token=${access_token}`);
    const data = await response.json();
    console.log('data', data);
}
router.get('/', async function(req, res, next){
    const code = req.query.code;
    console.log(code);
    try {
        const redirectUrl = 'http://127.0.0.1:5150/oauth';
        const oAuth2Client = new OAuth2Client(
            process.env.CLIENT_ID,
            process.env.CLIENT_SECRET,
            redirectUrl
        );
        const r = await oAuth2Client.getToken(code);
        await oAuth2Client.setCredentials(r.tokens);
        console.log('tokens acquired');
        const user = oAuth2Client.credentials;
        console.log('credentials', user);
        await getUserData(user.access_token);
    } catch(err) {
        console.log('error with signing in user');
    }

    res.redirect(303, 'http://localhost:3000/');
})

module.exports = router;
