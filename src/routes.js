const { Router } = require('express');

const getSettings = require('./controllers/api/getSettings');
const changeSettings = require('./controllers/api/changeSettings');
const getBuilds = require('./controllers/api/getBuilds');
const addBuild = require('./controllers/api/addBuild');
const getBuild = require('./controllers/api/getBuild');
const getBuildLogs = require('./controllers/api/getBuildLogs');

const apiRouter = new Router();

apiRouter.get('/settings', getSettings);
apiRouter.post('/settings', changeSettings);
apiRouter.get('/builds', getBuilds);
apiRouter.post('/builds/:commitHash', addBuild);
apiRouter.get('/builds/:buildId', getBuild);
apiRouter.get('/builds/:buildId/logs', getBuildLogs);

exports.apiRouter = apiRouter;
