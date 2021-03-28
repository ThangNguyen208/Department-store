import express from 'express';
import expressAsyncHandler from 'express-async-handler';
import bcrypt from 'bcryptjs';
import data from '../data.js';
import User from '../models/userModel.js';
import { generateToken, isAdmin, isAuth } from '../utils.js';

/** làm cho code thành module*/
const userRouter = express.Router();
userRouter.get(
  '/top-sellers',
  expressAsyncHandler(async (req, res) => {
    const topSellers = await User.find({ isSeller: true })
      .sort({ 'seller.rating': -1 })
      .limit(3);
    res.send(topSellers);
  })
);

userRouter.get(
  '/arse',
  expressAsyncHandler(async (req, res) => {
    // await User.remove({});
    /* insertMany chấp nhận 1 mảng và chèn các đối tượng trên amngr đó trong bộ sưu tập ng dùng  */
    const createdUsers = await User.insertMany(data.users);
    res.send({ createdUsers });
  })
);

userRouter.post(
    '/login',
    expressAsyncHandler(async (req, res) => {
      const user = await User.findOne({ email: req.body.email });
      if (user) {
        if (bcrypt.compareSync(req.body.password, user.password)) {
          res.send({
            _id: user._id,
            name: user.name,
            email: user.email,
            isAdmin: user.isAdmin,
            isSeller: user.isSeller,
            token: generateToken(user),
          });
          return;
        }
      }
      res.status(405).send({ message: 'Invalid email or password' });
    })
  );

  userRouter.post(
    '/register',
    expressAsyncHandler(async (req, res) => {
      const user = new User({
        name: req.body.name,
        email: req.body.email,
        password: bcrypt.hashSync(req.body.password, 8),
      });
      const createUser = await user.save();
      res.send({
        _id: createUser._id,
        name: createUser.name,
        email: createUser.email,
        isAdmin: createUser.isAdmin,
        isSeller: user.isSeller,
        token: generateToken(createUser),
      });
    })
  );
  
  userRouter.get(
    '/:id',
    expressAsyncHandler(async (req, res) => {
      const user = await User.findById(req.params.id);
      if (user) {
        res.send(user);
      } else {
        res.status(404).send({ message: 'User Not Found' });
      }
    })
  );
  userRouter.put(
    '/profile',
    isAuth,
    expressAsyncHandler(async (req, res) => {
      const user = await User.findById(req.user._id);
      if (user) {
        user.name = req.body.name || user.name;
        user.email = req.body.email || user.email;
        if (user.isSeller){
          user.seller.name = req.body.sellerName || user.seller.name;
          user.seller.logo = req.body.sellerLogo || user.seller.logo;
          user.seller.description = req.body.sellerDescription || user.seller.description;
        }
        if (req.body.password) {
          user.password = bcrypt.hashSync(req.body.password, 8);
        }
        const updatedUser = await user.save();
        res.send({
          _id: updatedUser._id,
          name: updatedUser.name,
          email: updatedUser.email,
          isAdmin: updatedUser.isAdmin,
          isSeller: user.isSeller,
          token: generateToken(updatedUser),
        });
      }
    })
  );

  userRouter.get(
    '/',
    isAuth,
    isAdmin,
    expressAsyncHandler(async (req, res) => {
      const users = await User.find({});
      res.send(users);
    })
  );

  userRouter.delete(
    '/:id',
    isAuth,
    isAdmin,
    expressAsyncHandler(async (req, res) => {
      const user = await User.findById(req.params.id);
      if (user) {
        if (user.email === 'admin@example.com') {
          res.status(400).send({ message: 'Can Not Delete Admin User' });
          return;
        }
        const deleteUser = await user.remove();
        res.send({ message: 'User Deleted', user: deleteUser });
      } else {
        res.status(404).send({ message: 'User Not Found' });
      }
    })
  );

  userRouter.put(
    '/:id',
    isAuth,
    isAdmin,
    expressAsyncHandler(async (req, res) => {
      const user = await User.findById(req.params.id);
      if (user) {
        user.name = req.body.name || user.name;
        user.email = req.body.email || user.email;
        user.isSeller = req.body.isSeller || user.isSeller;
        user.isAdmin = req.body.isAdmin || user.isAdmin;
        const updatedUser = await user.save();
        res.send({ message: 'User Updated', user: updatedUser });
      } else {
        res.status(404).send({ message: 'User Not Found' });
      }
    })
  ); 
  
    userRouter.patch('/reserPassword/:email', expressAsyncHandler(async (req,res) => {
      try{
        const user = await User.findOne( {email:req.params.email} );
        
        user.set({password: bcrypt.hashSync(req.body.password, 8)});
        const result = await user.save();

        res.send(result);
        } catch (error) {
            res.status(500).send(error);
        }
      })
    );



    
export default userRouter;