import { DocumentDefinition, FilterQuery } from 'mongoose';

import Doctor, { DoctorDocument } from './doctor.model';

export async function createDoctor(
  input: DocumentDefinition<
    Omit<DoctorDocument, 'createdAt' | 'updatedAt'>
  >,
) {
  return Doctor.create(input);
}

export async function getDoctorByID(id: string) {
  try {
    return await Doctor.findById(id).populate('profiles');
  } catch (error: any) {
    throw new Error(error);
  }
}

export async function getDoctor(filter: FilterQuery<DoctorDocument>) {
  const doctor = await Doctor.findOne(filter);
  return doctor;
}

export async function getDoctors(filter?: FilterQuery<DoctorDocument>) {
  const doctors = filter ? await Doctor.find(filter) : await Doctor.find();
  return doctors;
}

export async function updateDoctor(
  filter: FilterQuery<DoctorDocument>,
  input: DocumentDefinition<DoctorDocument>,
) {
  const doctor = await Doctor.findOneAndUpdate(filter, input, { new: true });
  return doctor;
}

export async function deleteDoctor(filter: FilterQuery<DoctorDocument>) {
  const doctor = await Doctor.findOneAndDelete(filter);
  return doctor;
}

export async function getDoctorByEmail(email: string) {
  const doctor = await Doctor.findOne({ email });
  return doctor;
}
