import express from 'express';
import  * as tc  from '../controllers/team.controller';

const teamRouter = express.Router();

teamRouter.post('/:name', tc.createTeam);
teamRouter.get('', tc.getAllTeams);
teamRouter.get('/:id', tc.getTeam);
teamRouter.delete('/:id', tc.deleteTeam);
teamRouter.post('/rename/:id/:name', tc.renameTeam);
teamRouter.post('/addtofac/:teamId/:factionId', tc.addTeamToFaction);


export default teamRouter;