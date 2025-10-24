import config from "../../config/config.js";
import adminRoute from "./admin.route.js";
import analysisRoute from "./analysis.route.js";
import authRoute from "./auth.route.js";
import clientRoute from "./client.route.js";
import dashboardRoute from "./dashboard.route.js";
import docsRoute from "./docs.route.js";
import mcpRoute from "./mcp.route.js";
import recommendationRoute from "./recommendation.route.js";
import reportRoute from "./report.route.js";
import statementRoute from "./statement.route.js";
import treasuryProductRoute from "./treasury-product.route.js";
import userRoute from "./user.route.js";
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
