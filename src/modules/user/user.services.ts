import { DocumentDefinition, FilterQuery } from 'mongoose';

import User, { UserDocument } from './user.model';

export async function createUser(
  input: DocumentDefinition<
    Omit<UserDocument, 'createdAt' | 'updatedAt'>
  >,
) {
  return User.create(input);
}

export async function getUserByID(id: string) {
  try {
    return await User.findById(id).populate('profiles');
  } catch (error: any) {
    throw new Error(error);
  }
}

export async function getUser(filter: FilterQuery<UserDocument>) {
  const user = await User.findOne(filter);
  return user;
}

export async function getUsers(filter?: FilterQuery<UserDocument>) {
  const users = filter ? await User.find(filter) : await User.find();
  return users;
}

export async function updateUser(
  filter: FilterQuery<UserDocument>,
  input: DocumentDefinition<UserDocument>,
) {
  const user = await User.findOneAndUpdate(filter, input, { new: true });
  return user;
}

export async function deleteUser(filter: FilterQuery<UserDocument>) {
  const user = await User.findOneAndDelete(filter);
  return user;
}

export async function getUserByEmail(email: string) {
  const user = await User.findOne({ email });
  return user;
}
