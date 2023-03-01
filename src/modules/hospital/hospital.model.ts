import { Schema, model, Document } from 'mongoose';

export interface HospitalDocument extends Document {
  name: string;
  services: string[];
  userId: string;
  createdAt: Date;
  updatedAt: Date;

}

const HospitalSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  services: [{
    type: String,
    required: true,
  }],
  userId: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
}, {
  timestamps: true,
  versionKey: false,
});

const Hospital = model<HospitalDocument>('Hospital', HospitalSchema);

export default Hospital;
