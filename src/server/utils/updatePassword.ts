import Users from '../models/users';

const updatePassword = async (email: string, newPassword: string)=>{
  const updatedUser = await Users.findOneAndUpdate(
    { email },
    { password: newPassword },
    { new: true }
  );

  if (!updatedUser) {
    throw new Error('User not found');
  }

  return updatedUser;
}

export default updatePassword