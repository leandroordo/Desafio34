import express from "express";
import {
  getAllTareas,
  addTarea,
  getTarea,
  updateTarea,
  deleteTarea,
} from "../controllers/tareasController";
import { body, param } from "express-validator";
import { validationErrorResponse } from "../middleware/validation";

var TareasRouter = express.Router();

TareasRouter.get("/", getAllTareas) //GET: Obtener todas las tareas
  .post(
    "/",
    [
      body("title")
        .isString()
        .isLength({ min: 1, max: 100 })
        .withMessage("El título de la tarea es obligatorio"),
      validationErrorResponse,
    ],
    addTarea
  ) //POST: Crear una nueva tarea
  .get(
    "/:id",
    [
      param("id").isMongoId().withMessage("Id de tarea inválido"),
      validationErrorResponse,
    ],
    getTarea
  ) //GET: Obtener una tarea por id
  .put(
    "/:id",
    [
      param("id").isMongoId().withMessage("Id de tarea inválido"),
      body("title")
        .isString()
        .isLength({ min: 1, max: 100 })
        .withMessage("El título de la tarea es obligatorio"),
      validationErrorResponse,
    ],
    updateTarea
  ) //PUT: Actualizar una tarea
  .delete(
    "/:id",
    [
      param("id").isMongoId().withMessage("Id de tarea inválido"),
      validationErrorResponse,
    ],
    deleteTarea
  ); //DELETE: Borrar una tarea

export default TareasRouter;
