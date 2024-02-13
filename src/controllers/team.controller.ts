import { Request, Response } from 'express';
import * as service from '../services/team.service';
import { errorResponse, createResponse, okResponse } from '../utils/responses';


export const getAllTeams = async (req: Request, res: Response) => {
  try {
    const data = await service.getAllTeams();
    okResponse(res, { data });
  } catch (error) {
    errorResponse(res, { error });
  }
}

export const getTeam = async (req: Request, res: Response) => {
  const { id } = req.params;
  const idNumber = parseInt(id, 10);

  if (isNaN(idNumber)) { errorResponse(res, { msg: "Bad ID format" }) };

  try {
    const data = await service.getTeam(idNumber);
    okResponse(res, { data });
  } catch (error) {
    errorResponse(res, { error });
  }
};

export const createTeam = async (req: Request, res: Response) => {
  const { name } = req.params;

  name ?? errorResponse(res, { msg: "No name" });

  try {
    await service.createTeam(name);
    createResponse(res, {})
  } catch (error) {
    errorResponse(res, { error });
  }
};

export const deleteTeam = async (req: Request, res: Response) => {
  const { id } = req.params;
  const idNumber = parseInt(id, 10);

  if (isNaN(idNumber)) { errorResponse(res, { msg: "Bad ID format" }) };

  try {
    await service.deleteTeam(idNumber);
    okResponse(res, { msg: "Team deleted" });
  } catch (error) {
    errorResponse(res, { error });
  }
};

export const renameTeam = async (req: Request, res: Response) => {
  const { id, name } = req.params;
  const idNumber = parseInt(id, 10);

  name ?? errorResponse(res, { msg: "No name" });

  if (isNaN(idNumber)) { errorResponse(res, { msg: "Bad ID format" }) };

  try {
    await service.renameTeam(name, idNumber);
    okResponse(res, { msg: "Team renamed" });
  } catch (error) {
    errorResponse(res, { error });
  }
};

export const addTeamToFaction = async (req: Request, res: Response) => {
  const { teamId, factionId } = req.params;
  const teamIdNumber = parseInt(teamId, 10);
  const factionIdNumber = parseInt(factionId, 10);

  if (isNaN(teamIdNumber)) { errorResponse(res, { msg: "Bad ID format" }) };
  if (isNaN(factionIdNumber)) { errorResponse(res, { msg: "Bad ID format" }) };

  try {
    await service.addTeamToFaction(teamIdNumber, factionIdNumber);
    okResponse(res, { msg: "Team modified" });
  } catch (error) {
    errorResponse(res, { error });
  }
};
