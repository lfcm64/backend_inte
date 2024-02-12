import express from 'express';
import  * as tc  from '../controllers/team.controller';

const teamRouter = express.Router();

teamRouter.get('/add/:name', tc.addTeam);
teamRouter.get('/all', tc.getAllTeams);
teamRouter.get('get/:id', tc.getTeam);
teamRouter.get('/rename/:id/:name', tc.renameTeam);
teamRouter.get('/addtofac/:teamId/:factionId', tc.addTeamToFaction);

export default teamRouter;