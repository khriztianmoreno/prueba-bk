import { Schema, model, Document } from 'mongoose';

export interface DoctorDocument extends Document {
  birthDate: Date;
  userId: string;
  createdAt: Date;
  updatedAt: Date;

}

const DoctorSchema = new Schema({
  birthDate: {
    type: Date,
    required: true,
  },
  userId: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
}, {
  timestamps: true,
  versionKey: false,
});

const Doctor = model<DoctorDocument>('Doctor', DoctorSchema);

export default Doctor;
