import { Router } from 'express';

import getSettings from '../controllers/api/getSettings';
import changeSettings from '../controllers/api/changeSettings';
import getBuilds from '../controllers/api/getBuilds';
import addBuild from '../controllers/api/addBuild';
import getBuild from '../controllers/api/getBuild';
import getBuildLogs from '../controllers/api/getBuildLogs';

const apiRouter = new Router();

apiRouter.get('/settings', getSettings);
apiRouter.post('/settings', changeSettings);
apiRouter.get('/builds', getBuilds);
apiRouter.post('/builds/:commitHash', addBuild);
apiRouter.get('/builds/:buildId', getBuild);
apiRouter.get('/builds/:buildId/logs', getBuildLogs);

export { apiRouter };
