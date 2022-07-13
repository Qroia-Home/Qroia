import jwt from 'jsonwebtoken';

export default (req, res, next) => {
    //NOTE: Delete Bearer type string
    const token = (req.headers.authorization || '').replace(/Bearer\s?/, '');

    //NOTE: Check Token
    if (token) {
        try {
            //NOTE: Decode Token
            const decodeToken = jwt.verify(token, QroiaKey);

            req.userId = decodeToken._id;

            //NOTE: Next function
            next();
        } catch (err) {
            return res.status(403).json({
                message: 'Error Token'
            });
        }
    } else {
        return res.status(403).json({
            message: 'No access'
        })
    }
};
