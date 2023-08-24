import User from '../models/User';

export const fetchUserByUsername = async (username, isPasswordVisible) => {
  const projection = isPasswordVisible ? {} : { password: 0 };
  return User.findOne({ username })
    .select(projection)
    .populate('image');
};

export const fetchUserById = async (userId, isPasswordVisible) => {
  const projection = isPasswordVisible ? {} : { password: 0 };
  return User.findOne({ _id: userId })
    .select(projection)
    .populate(['image']);
};

export const saveUser = async (user) => User.create(user);

export const deleteUser = async (userId) => User.findByIdAndDelete(userId);

export const updateUser = async (userId, user) => User.findByIdAndUpdate(userId, user);
