import express from "express";
import user from './user';
import sale from './sale';

const app = express();

app.use(user, sale);

export default app;