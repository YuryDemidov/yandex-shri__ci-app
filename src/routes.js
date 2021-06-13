const { Router } = require('express');

const getSettings = require('./controllers/api/getSettings');
const changeSettings = require('./controllers/api/changeSettings');
const getBuilds = require('./controllers/api/getBuilds');
const addBuild = require('./controllers/api/addBuild');
const getBuild = require('./controllers/api/getBuild');
const getBuildLogs = require('./controllers/api/getBuildLogs');

const getBuildsList = require('./controllers/db/getBuildsList');
const getBuildLog = require('./controllers/db/getBuildLog');
const getBuildDetails = require('./controllers/db/getBuildDetails');
const requestBuild = require('./controllers/db/requestBuild');
const startBuild = require('./controllers/db/startBuild');
const finishBuild = require('./controllers/db/finishBuild');
const cancelBuild = require('./controllers/db/cancelBuild');
const getConfig = require('./controllers/db/getConfig');
const changeConfig = require('./controllers/db/changeConfig');
const deleteConfig = require('./controllers/db/deleteConfig');

const apiRouter = new Router();

apiRouter.get('/api/settings', getSettings);
apiRouter.post('/api/settings', changeSettings);
apiRouter.get('/api/builds', getBuilds);
apiRouter.post('/api/builds/:commitHash', addBuild);
apiRouter.get('/api/builds/:buildId', getBuild);
apiRouter.get('/api/builds/:buildId/logs', getBuildLog);

exports.apiRouter = apiRouter;

const dbRouter = new Router();

dbRouter.get('/build/list', getBuildsList);
dbRouter.get('/build/log', getBuildLog);
dbRouter.get('/build/details', getBuildDetails);
dbRouter.post('/build/request', requestBuild);
dbRouter.post('/build/start', startBuild);
dbRouter.post('/build/finish', finishBuild);
dbRouter.post('/build/cancel', cancelBuild);
dbRouter.get('/conf', getConfig);
dbRouter.post('/conf', changeConfig);
dbRouter.delete('/conf', deleteConfig);

exports.dbRouter = dbRouter;
