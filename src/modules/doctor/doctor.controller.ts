import { Request, Response, NextFunction } from 'express';
import { DocumentDefinition } from 'mongoose';

import {
  createDoctor,
  deleteDoctor,
  getDoctorByID,
  getDoctors,
  updateDoctor,
} from './doctor.services';
import { createUser } from '../user/user.services';
import { UserDocument } from '../user/user.model';

export async function listDoctorHandler(req: Request, res: Response, next: NextFunction) {
  try {
    const doctors = await getDoctors();
    return res.status(200).json(doctors);
  } catch (e: any) {
    return next(e);
  }
}

export async function createDoctorHandler(req: Request, res: Response, next: NextFunction) {
  const data = req.body;
  const newUser = {
    name: data.name,
    identification: data.identification,
    email: data.email,
    password: data.password,
    role: 'doctor',
  };

  try {
    const user = await createUser(newUser as DocumentDefinition<Omit<UserDocument, 'createdAt' | 'updatedAt'>>);
    // eslint-disable-next-line no-underscore-dangle
    const doctor = await createDoctor({ birthDate: data.birthDate, userId: user._id });

    // SEND EMAIL TO USER

    return res.status(201).json(doctor);
  } catch (e: any) {
    return next(e);
  }
}

export async function getDoctorHandler(req: Request, res: Response, next: NextFunction) {
  const { id } = req.params;

  try {
    const doctor = await getDoctorByID(id);
    if (!doctor) {
      res.status(404).json({ msg: 'Doctor not found' });
    }
    return res.status(200).json(doctor);
  } catch (e: any) {
    return next(e);
  }
}

export async function updateDoctorHandler(req: Request, res: Response, next: NextFunction) {
  const { id } = req.params;
  const data = req.body;

  try {
    const doctor = await getDoctorByID(id);
    if (!doctor) {
      res.status(404).json({ msg: 'Doctor not found' });
    }
    const updatedDoctor = await updateDoctor({ _id: id }, data);
    return res.status(200).json(updatedDoctor);
  } catch (e: any) {
    return next(e);
  }
}

export async function deleteDoctorHandler(req: Request, res: Response, next: NextFunction) {
  const { id } = req.params;

  try {
    const query = { _id: id };
    const doctor = await deleteDoctor(query);
    if (!doctor) {
      res.status(404).json({ msg: 'Doctor not found' });
    }
    return res.status(200).json(doctor);
  } catch (e: any) {
    return next(e);
  }
}
