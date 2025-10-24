import config from '../../config/config.ts';
import adminRoute from './admin.route.ts';
import analysisRoute from './analysis.route.ts';
import authRoute from './auth.route.ts';
import clientRoute from './client.route.ts';
import dashboardRoute from './dashboard.route.ts';
import docsRoute from './docs.route.ts';
import mcpRoute from './mcp.route.ts';
import recommendationRoute from './recommendation.route.ts';
import reportRoute from './report.route.ts';
import statementRoute from './statement.route.ts';
import treasuryProductRoute from './treasury-product.route.ts';
import userRoute from './user.route.ts';
import express from 'express';

const router = express.Router();

const defaultRoutes = [
    {
        path: '/auth',
        route: authRoute
    },
    {
        path: '/users',
        route: userRoute
    },
    {
        path: '/clients',
        route: clientRoute
    },
    {
        path: '/dashboard',
        route: dashboardRoute
    },
    {
        path: '/statements',
        route: statementRoute
    },
    {
        path: '/analysis',
        route: analysisRoute
    },
    {
        path: '/products',
        route: treasuryProductRoute
    },
    {
        path: '/recommendations',
        route: recommendationRoute
    },
    {
        path: '/reports',
        route: reportRoute
    },
    {
        path: '/mcp',
        route: mcpRoute
    },
    {
        path: '/admin',
        route: adminRoute
    }
];

const devRoutes = [
    // routes available only in development mode
    {
        path: '/docs',
        route: docsRoute
    }
];

defaultRoutes.forEach(route => {
    router.use(route.path, route.route);
});

/* istanbul ignore next */
if (config.env === 'development') {
    devRoutes.forEach(route => {
        router.use(route.path, route.route);
    });
}

export default router;
