import asyncHandler from 'express-async-handler';
import jwt from 'jsonwebtoken';
import User from '../models/userModel.js';

const protect = asyncHandler (async (req, res, next)  => {
  let token;
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith('Bearer')
  ) {
    try {
      token = req.headers.authorization.split(' ')[1];
      const decoded = jwt.verify(token, process.env.JWT_SECRET);

      req.user = await User.findById(decoded.id).select('-password');

      next();
    } catch(error) {
      console.error('Error', error);
      res.status(401);
      throw new Error ('Not Authorized, Token Failed')
    }
  };

  if (!token) {
    res.status(401);
    throw new Error('Not Authorized, No Token');
  };
});

const admin = (req, res, next) => {
  // checks if a user is logged in and if the user is admin
  if (req.user && req.user.isAdmin) {
    next();
  } else {
    res.status(401);
    throw new Error ('Not Authorized as an Admin');
  };
};

export { protect, admin };