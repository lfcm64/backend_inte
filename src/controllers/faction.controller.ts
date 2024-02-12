import { Request, Response } from 'express';
import { Code, HttpResponse } from '../utils/response';
import * as service from '../services/faction.service';
import { serviceError, fetchingError } from '../utils/error'


export const getAllFactions = async (req: Request, res: Response) => {
  try {
    const entities = await service.getAllFactions();
    res.status(Code.OK).send(new HttpResponse(Code.OK, "factions reached", entities))
  } catch(error) {
    serviceError(res, error);
  }
}

export const getFaction = async (req: Request, res: Response) => {
  const { id } = req.params;
  const idNumber = parseInt(id, 10);

  if (isNaN(idNumber)) { fetchingError(res, "ID format not recognized") }

  try {
    const entitie = await service.getFaction(idNumber);
    res.status(Code.OK).send(new HttpResponse(Code.OK, "faction reached", entitie));
  } catch (err) {
    serviceError(res, err);
  }
};

export const addFaction = async (req: Request, res: Response) => {
  const { name } = req.params;

  name ?? res.status(Code.BAD_REQUEST).json(new HttpResponse(Code.BAD_REQUEST, "no name"));
  
  try {
    await service.addFaction(name);
    res.status(Code.OK).send(new HttpResponse(Code.OK, "faction added"));
  } catch (err) {
    serviceError(res, err);
  }
};

export const deleteFaction = async (req: Request, res: Response) => {
  const { id } = req.params;
  const idNumber = parseInt(id, 10);

  if (isNaN(idNumber)) { fetchingError(res, "ID format not recognized") }

  try {
    await service.deleteFaction(idNumber);
    res.status(Code.OK).send(new HttpResponse(Code.OK, "faction deleted"));
  } catch (err) {
    serviceError(res, err);
  }
};

export const renameFaction = async (req: Request, res: Response) => {
  const { id, name } = req.params;
  const idNumber = parseInt(id, 10);

  name ?? fetchingError(res, "no name");

  if (isNaN(idNumber)) { fetchingError(res, "ID format not recognized") }

  try {
    await service.renameFaction(name, idNumber);
    res.status(Code.OK).send(new HttpResponse(Code.OK, "faction renamed"));
  } catch (err) {
    serviceError(res, err);
  }
};

export const addPoints = async (req: Request, res: Response) => {
  const { id, points } = req.params;
  const idNumber = parseInt(id, 10);
  const pointsNumber = parseInt(points, 10);

  if (isNaN(idNumber)) { fetchingError(res, "ID format not recognized") }

  if (isNaN(pointsNumber)) { fetchingError(res, "points format not recognized") }

  try {
    const currentPoints = await service.getPoints(idNumber);
    service.addPoints(idNumber, currentPoints, pointsNumber)
    res.status(Code.OK).send(new HttpResponse(Code.OK, "faction modified"));
  } catch (err) {
    serviceError(res, err);
  }
};

export const removePoints = async (req: Request, res: Response) => {
  const { id, points } = req.params;
  const idNumber = parseInt(id, 10);
  const pointsNumber = parseInt(points, 10);

  if (isNaN(idNumber)) { fetchingError(res, "ID format not recognized") }

  if (isNaN(pointsNumber)) { fetchingError(res, "points format not recognized") }

  try {
    const currentPoints = await service.getPoints(idNumber);
    service.removePoints(idNumber, currentPoints, pointsNumber)
    res.status(Code.OK).send(new HttpResponse(Code.OK, "faction modified"));
  } catch (err) {
    serviceError(res, err);
  }
};

