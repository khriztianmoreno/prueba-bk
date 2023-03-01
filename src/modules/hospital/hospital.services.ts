import { DocumentDefinition, FilterQuery } from 'mongoose';

import Hospital, { HospitalDocument } from './hospital.model';

export async function createHospital(
  input: DocumentDefinition<
    Omit<HospitalDocument, 'createdAt' | 'updatedAt'>
  >,
) {
  return Hospital.create(input);
}

export async function getHospitalByID(id: string) {
  try {
    return await Hospital.findById(id).populate('profiles');
  } catch (error: any) {
    throw new Error(error);
  }
}

export async function getHospital(filter: FilterQuery<HospitalDocument>) {
  const hospital = await Hospital.findOne(filter);
  return hospital;
}

export async function getHospitals(filter?: FilterQuery<HospitalDocument>) {
  const hospitals = filter ? await Hospital.find(filter) : await Hospital.find();
  return hospitals;
}

export async function updateHospital(
  filter: FilterQuery<HospitalDocument>,
  input: DocumentDefinition<HospitalDocument>,
) {
  const hospital = await Hospital.findOneAndUpdate(filter, input, { new: true });
  return hospital;
}

export async function deleteHospital(filter: FilterQuery<HospitalDocument>) {
  const hospital = await Hospital.findOneAndDelete(filter);
  return hospital;
}

export async function getHospitalByEmail(email: string) {
  const hospital = await Hospital.findOne({ email });
  return hospital;
}
