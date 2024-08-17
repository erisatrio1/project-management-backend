import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv'
import session from 'express-session';
import SequelizeStore from 'connect-session-sequelize';
import db from '../config/Database.js';
import AuthRoute from '../modules/v1/router/authRoute.js'
import CommentRoute from '../modules/v1/router/commentRoute.js'
import ProjectRoute from '../modules/v1/router/projectRoute.js'
import SprintRoute from '../modules/v1/router/sprintRoute.js'
import StoriesRoute from '../modules/v1/router/storiesRoute.js'
import TaskRoute from '../modules/v1/router/taskRoute.js'
import UserRoute from '../modules/v1/router/userRoute.js'
dotenv.config();

const app = express();

const sessionStore = SequelizeStore(session.Store);

const store = new sessionStore({
    db:db
});

const VERSION = process.env.VERSION;

// (async() => {
//     await db.sync();
// })();

app.use(session({
    secret: process.env.SESS_SECRET,
    resave: false,
    saveUninitialized: true,
    store: store,
    cookie: {
        secure: 'auto'
    }
}));

app.use(cors({
    credentials: true,
    origin: 'http://localhost:3000'
}))

console.log("SERVER VERSION: ", VERSION);

app.use(express.json())
app.use(AuthRoute);
app.use(CommentRoute);
app.use(ProjectRoute);
app.use(SprintRoute);
app.use(StoriesRoute);
app.use(TaskRoute);
app.use(UserRoute);


export default app;