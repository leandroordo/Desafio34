import { Request, Response } from "express";
import { connectToDB } from "../lib/utils";
import { Tarea } from "../lib/model";
import httpStatus from "http-status";

export const getAllTareas = async (req: Request, res: Response) => {
  try {
    connectToDB();

    const tareas = await Tarea.find();
    res.status(httpStatus.OK).send(tareas);
  } catch (err) {
    console.log(err);
    res.status(httpStatus.INTERNAL_SERVER_ERROR).send({
      message: "Error al obtener los datos de las tareas!",
    });
  }
};

export const getTarea = async (req: Request, res: Response) => {
  try {
    const tareaId = req.params.id;
    if (!tareaId) {
      res.status(httpStatus.BAD_REQUEST).send({
        message: "El id de la tarea es requerido",
      });
      return;
    }

    connectToDB();

    const tarea = await Tarea.findById(tareaId);
    if (tarea) {
      res.status(httpStatus.OK).send(tarea);
    } else {
      res.status(httpStatus.NOT_FOUND).send({
        message: `No existe una tarea con id=${tareaId}.`,
      });
    }
  } catch (err) {
    console.log(err);
    res.status(httpStatus.INTERNAL_SERVER_ERROR).send({
      message: "Error al buscar una tarea",
    });
  }
};

export const addTarea = async (req: Request, res: Response) => {
  if (!req.body.title) {
    res.status(httpStatus.BAD_REQUEST).send({
      message: "El contenido está vacío",
    });
    return;
  }

  try {
    const { title, description } = req.body;

    connectToDB();
    const newTarea = new Tarea({
      title,
      description,
    });

    await newTarea.save();

    res.status(httpStatus.CREATED).send(newTarea);
  } catch (error) {
    console.log(error);
    res.status(httpStatus.INTERNAL_SERVER_ERROR).send({
      message: "Error al crear una nueva tarea",
    });
  }
};

export const updateTarea = async (req: Request, res: Response) => {
  //Validar si hay contenido en el body
  if (!req.body) {
    res.status(httpStatus.BAD_REQUEST).send({
      message: "El contenido está vacío",
    });
    return;
  }

  const tareaId = req.params.id;
  if (!tareaId) {
    res.status(httpStatus.BAD_REQUEST).send({
      message: "El id de la tarea es requerido",
    });
    return;
  }

  const { titulo, descripcion } = req.body;

  const updatedFields = {
    titulo,
    descripcion,
  };

  try {
    connectToDB();

    await Tarea.findByIdAndUpdate(tareaId, updatedFields);
    res.status(httpStatus.NO_CONTENT).send();
  } catch (error) {
    console.log(error);
    res.status(httpStatus.INTERNAL_SERVER_ERROR).send({
      message: "Error al actualizar los datos de la tarea",
    });
  }
};

export const deleteTarea = async (req: Request, res: Response) => {
  const tareaId = req.params.id;
  if (!tareaId) {
    res.status(httpStatus.BAD_REQUEST).send({
      message: "El id de la tarea es requerido",
    });
    return;
  }

  try {
    connectToDB();

    await Tarea.findByIdAndDelete(tareaId);
    res.status(httpStatus.NO_CONTENT).send();
  } catch (error) {
    console.log(error);
    res.status(httpStatus.INTERNAL_SERVER_ERROR).send({
      message: "Error al borrar la tarea",
    });
  }
};
