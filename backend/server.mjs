import express from "express";
import "dotenv/config";
import path from "path";
import { v4 as uuidv4 } from "uuid";
import { registrarCancion, mostrarCanciones, updateSong, deleteSong } from "./operaciones.mjs";

const app = express();
app.use(express.json());

const port = 80;

//REQ-01
app.listen(port, () => {
  console.log(`Hello encendido en http://localhost:${port}`);
});

//REQ-02
app.get("/", (req, res) => {
  const filePath = path.resolve("index.html");
  res.sendFile(filePath);
});

//REQ-03
app.post("/canciones", (req, res) => {
  const newGuid = uuidv4();
  const cuerpo = req.body;
  const newCancion = {
    id: newGuid,
    titulo: cuerpo.titulo,
    artista: cuerpo.artista,
    tono: cuerpo.tono,
  };
  registrarCancion(newCancion);
  res.status(201).json(newCancion);
});

app.get("/canciones", (req, res) => {
  res.status(200).json(mostrarCanciones());
});

app.put("/canciones/:id", (req, res) => {
  const updateCancion = {
    id: req.body.id,
    titulo: req.body.titulo,
    artista: req.body.artista,
    tono: req.body.tono,
  };
  updateSong(updateCancion);
  res.status(200).json(updateCancion);

});

app.delete("/canciones/:id", (req, res) => {
  const id = req.params.id;
  deleteSong(id);
  res.status(200);
});
