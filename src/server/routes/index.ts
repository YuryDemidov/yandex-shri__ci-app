import { Router } from 'express';

import getSettings from '../controllers/api/getSettings';
import changeSettings from '../controllers/api/changeSettings';
import getBuilds from '../controllers/api/getBuilds';
import addBuild from '../controllers/api/addBuild';
import getBuild from '../controllers/api/getBuild';
import getBuildLogs from '../controllers/api/getBuildLogs';

const apiRouter = Router();

apiRouter.get('/settings', async (req, res) => res.json(await getSettings(req)));
apiRouter.post('/settings', changeSettings);
apiRouter.get('/builds/:buildId/logs', async (req, res) => res.json(await getBuildLogs(req)));
apiRouter.get('/builds/:buildId', async (req, res) => res.json(await getBuild(req)));
apiRouter.get('/builds', async (req, res) => res.json(await getBuilds(req)));
apiRouter.post('/builds/:commitHash', addBuild);

export { apiRouter };
