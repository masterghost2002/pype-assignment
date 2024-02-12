import jwt, { Secret } from 'jsonwebtoken';
const jwtSecret:Secret = process.env.JWT_SECRET as Secret || 'jwtsecret';
const validateToken = async (accessTokens:string | Array<string>) => {
    let accessToken:string | undefined = undefined;
    if (Array.isArray(accessTokens))
        accessToken = accessTokens[0].split(' ')[1];
    else accessToken = accessTokens?.split(' ')[1];
    if (!accessToken || accessToken === null || typeof accessToken !== 'string' || accessToken === 'undefined')
        return null;
    try {
        const result = await jwt.verify(accessToken, jwtSecret);
        if (!result || typeof result === 'string')
            return null;
       return result;
    } catch (error) {
        console.log('Error at verifyToken middleware: ', error);
        return null;
    }
};
export default validateToken;