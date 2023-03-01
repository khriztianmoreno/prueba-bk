import { Request, Response, NextFunction } from 'express';
import { DocumentDefinition } from 'mongoose';

import {
  createHospital,
  deleteHospital,
  getHospitalByID,
  getHospitals,
  updateHospital,
} from './hospital.services';
import { createUser } from '../user/user.services';
import { UserDocument } from '../user/user.model';

export async function listHospitalHandler(req: Request, res: Response, next: NextFunction) {
  try {
    const hospitals = await getHospitals();
    return res.status(200).json(hospitals);
  } catch (e: any) {
    return next(e);
  }
}

export async function createHospitalHandler(req: Request, res: Response, next: NextFunction) {
  const data = req.body;
  const newUser = {
    name: data.name,
    identification: data.identification,
    email: data.email,
    password: data.password,
    role: 'hospital',
  };

  try {
    const user = await createUser(newUser as DocumentDefinition<Omit<UserDocument, 'createdAt' | 'updatedAt'>>);
    const hospital = await createHospital({
      name: data.name,
      services: data.services,
      // eslint-disable-next-line no-underscore-dangle
      userId: user._id,
    });

    // SEND EMAIL TO USER

    return res.status(201).json(hospital);
  } catch (e: any) {
    return next(e);
  }
}

export async function getHospitalHandler(req: Request, res: Response, next: NextFunction) {
  const { id } = req.params;

  try {
    const hospital = await getHospitalByID(id);
    if (!hospital) {
      res.status(404).json({ msg: 'Hospital not found' });
    }
    return res.status(200).json(hospital);
  } catch (e: any) {
    return next(e);
  }
}

export async function updateHospitalHandler(req: Request, res: Response, next: NextFunction) {
  const { id } = req.params;
  const data = req.body;

  try {
    const hospital = await getHospitalByID(id);
    if (!hospital) {
      res.status(404).json({ msg: 'Hospital not found' });
    }
    const updatedHospital = await updateHospital({ _id: id }, data);
    return res.status(200).json(updatedHospital);
  } catch (e: any) {
    return next(e);
  }
}

export async function deleteHospitalHandler(req: Request, res: Response, next: NextFunction) {
  const { id } = req.params;

  try {
    const query = { _id: id };
    const hospital = await deleteHospital(query);
    if (!hospital) {
      res.status(404).json({ msg: 'Hospital not found' });
    }
    return res.status(200).json(hospital);
  } catch (e: any) {
    return next(e);
  }
}
