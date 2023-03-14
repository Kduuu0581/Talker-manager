function validateEmailPassword(req, res, next) {
  const { email, password } = req.body;
  const emailRegex = /\S+@\S+\.\S+/;
  const HTTP_BAD_REQUEST = 400;
  if (!email) {
    return res.status(HTTP_BAD_REQUEST).json({ message: 'O campo "email" é obrigatório' });
  }
  if (!password) {
    return res.status(HTTP_BAD_REQUEST).json({ message: 'O campo "password" é obrigatório' });
  }
  if (!emailRegex.test(email)) {
    return res.status(HTTP_BAD_REQUEST).json({ message: 
        'O "email" deve ter o formato "email@email.com"' });
  }
    if (password.length < 6) {
    return res.status(HTTP_BAD_REQUEST).json({
      message: 'O "password" deve ter pelo menos 6 caracteres' });
    }
    next();
}

module.exports = validateEmailPassword;
