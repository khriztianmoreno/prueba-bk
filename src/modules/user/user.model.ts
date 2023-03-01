import { Schema, model, Document } from 'mongoose';
import bcrypt from 'bcryptjs';

import { userProfileType } from './user.types';
import { Role } from '../auth/auth.types';

export interface UserDocument extends Document {
  name: string;
  identification: string;
  address?: string;
  email: string;
  phone: string;
  password: string; // 1234 -> hash - SHA256 -> 64 chars -> 32 bytes ->
  role: Role;
  isActive: boolean;
  passwordResetToken?: string;
  passwordResetExpires?: Date;
  createdAt: Date;
  updatedAt: Date;

  profile: userProfileType;
  // eslint-disable-next-line no-unused-vars
  comparePassword: (password: string) => Promise<boolean>;
}

const UserSchema = new Schema({
  name: {
    type: String,
    required: true,
    trim: true,
  },
  identification: {
    type: String,
    required: true,
    trim: true,
  },
  address: {
    type: String,
  },
  email: {
    type: String,
    required: true,
    unique: true,
    trim: true,
    lowercase: true,
  },
  phone: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
    min: 6,
  },
  role: {
    type: String,
    enum: ['HOSPITAL', 'PATIENT', 'DOCTOR'],
    default: 'PATIENT',
  },
  isActive: {
    type: Boolean,
    default: false,
  },
  passwordResetToken: String,
  passwordResetExpires: Date,
}, {
  timestamps: true,
  versionKey: false,
});

// Middlewares
UserSchema.pre<UserDocument>('save', async function save(next: Function) {
  const user = this;

  try {
    if (!this.isModified('password')) {
      next();
    }

    if (user.password) {
      const salt = await bcrypt.genSalt(10);
      const hash = await bcrypt.hash(user.password, salt);

      user.password = hash;
    }
  } catch (error: any) {
    next(error);
  }
});

// Virtuals
UserSchema.virtual('profile').get(function profile() {
  const {
    name, identification, email, phone, role,
  } = this;

  return {
    name,
    identification,
    email,
    phone,
    role,
  };
});

// Methods
async function comparePassword(this: UserDocument, candidatePassword: string, next: Function) {
  const user = this;

  try {
    if (user.password) {
      const isMatch = await bcrypt.compare(candidatePassword, user.password);

      return isMatch;
    }

    return false;
  } catch (error) {
    next(error);
    return false;
  }
}

UserSchema.methods.comparePassword = comparePassword;

const User = model<UserDocument>('User', UserSchema);

export default User;
