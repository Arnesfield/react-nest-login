export const JWT = {
  secret: () => process.env.JWT_SECRET,
  expiresIn: () => process.env.JWT_EXPIRES_IN || '60s'
};
