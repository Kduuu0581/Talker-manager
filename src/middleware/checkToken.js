const checkToken = (req, res, next) => {
    const { authorization: token } = req.headers;
    if (!token) {
      return res.status(401).json({ message: 'Token não encontrado' });
    }
    if (token.length !== 16 && typeof token === 'string') {
      return res.status(401).json({ message: 'Token inválido' });
    }
    return next();
};

module.exports = checkToken;