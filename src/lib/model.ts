import mongoose from "mongoose";

export const tareasSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      min: 1,
      max: 100,
    },
    description: {
      type: String,
      required: false,
    },
  },
  { timestamps: true }
);

export const Tarea =
  mongoose.models.tareas || mongoose.model("tareas", tareasSchema);
