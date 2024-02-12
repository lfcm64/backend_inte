import 'reflect-metadata';
import express from 'express';
import  * as fc  from '../controllers/faction.controller';

const factionRouter = express.Router();


factionRouter.get('/add/:name', fc.addFaction);
factionRouter.get('/all', fc.getAllFactions);
factionRouter.get('/get/:id', fc.getFaction);
factionRouter.get('/delete/:id', fc.deleteFaction);
factionRouter.get('/rename/:id/:name', fc.renameFaction);
factionRouter.get('/addp/:id/:points', fc.addPoints);
factionRouter.get('/rmp/:id/:points', fc.removePoints);


export default factionRouter;