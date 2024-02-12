import { Request, Response } from 'express';
import { Code, HttpResponse } from '../utils/response';
import * as service from '../services/team.service';
import { serviceError, fetchingError } from '../utils/error'


export const getAllTeams = async (req: Request, res: Response) => {
  try {
    const entities = await service.getAllTeams();
    res.status(Code.OK).send(new HttpResponse(Code.OK, "Teams reached", entities))
  } catch(error) {
    serviceError(res, error);
  }
}

export const getTeam = async (req: Request, res: Response) => {
    const { id } = req.params;
    const idNumber = parseInt(id, 10);

  if (isNaN(idNumber)) { fetchingError(res, "ID format not recognized") }

  try {
    const entitie = await service.getTeam(idNumber);
    res.status(Code.OK).send(new HttpResponse(Code.OK, "Team reached", entitie));
  } catch (err) {
    serviceError(res, err);
  }
};

export const addTeam = async (req: Request, res: Response) => {
  const { name } = req.params;

  name ?? res.status(Code.BAD_REQUEST).json(new HttpResponse(Code.BAD_REQUEST, "no name"));
  
  try {
    await service.addTeam(name);
    res.status(Code.OK).send(new HttpResponse(Code.OK, "Team added"));
  } catch (err) {
    serviceError(res, err);
  }
};

export const deleteTeam = async (req: Request, res: Response) => {
  const { id } = req.params;
  const idNumber = parseInt(id, 10);

  if (isNaN(idNumber)) { fetchingError(res, "ID format not recognized") }

  try {
    await service.deleteTeam(idNumber);
    res.status(Code.OK).send(new HttpResponse(Code.OK, "Team deleted"));
  } catch (err) {
    serviceError(res, err);
  }
};

export const renameTeam = async (req: Request, res: Response) => {
  const { id, name } = req.params;
  const idNumber = parseInt(id, 10);

  name ?? fetchingError(res, "no name");

  if (isNaN(idNumber)) { fetchingError(res, "ID format not recognized") }

  try {
    await service.renameTeam(name, idNumber);
    res.status(Code.OK).send(new HttpResponse(Code.OK, "Team renamed"));
  } catch (err) {
    serviceError(res, err);
  }
};

export const addTeamToFaction = async (req: Request, res: Response) => {
  const { teamId, factionId } = req.params;
  const teamIdNumber = parseInt(teamId, 10);
  const factionIdNumber = parseInt(factionId, 10);

  if (isNaN(teamIdNumber)) { fetchingError(res, "ID format not recognized") }
  if (isNaN(factionIdNumber)) { fetchingError(res, "ID format not recognized") }

  try {
    await service.addTeamToFaction(teamIdNumber, factionIdNumber);
    res.status(Code.OK).send(new HttpResponse(Code.OK, "Team modified"));
  } catch (err) {
    serviceError(res, err);
  }
};
