import express from "express";
import tareasRouter from "./tareas.routes";

const routes = express.Router();

/** GET /health-check - Ver el estado del servicio */
routes.get("/health-check", (req, res) => res.send("OK"));

// Endpoint /tareas
routes.use("/tareas", tareasRouter);

export default routes;
