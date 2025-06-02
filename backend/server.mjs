import express from "express";
import "dotenv/config";
import path from "path";
import { v4 as uuidv4 } from "uuid";
import { registrarCancion, mostrarCanciones } from "./operaciones.mjs";

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

//REQ-04

app.put("/canciones/:id", (req, res) => {
  try {
        const {id} = req.params
        const {titulo, artista, tono} = req.body

        if(!titulo || !artista|| !tono){
          return res.status(400).json({ mensaje: 'Todos los campos son obligatorios.' })
        }

        const canciones = JSON.parse(fs.readFileSync('./data/repertorio.json', 'utf8'))
        const index = canciones.findIndex(i => i.id == id)  
        canciones[index] = {...canciones[index], titulo,artista,tono}
        
        fs.writeFileSync('./data/repertorio.json', JSON.stringify(canciones))
        res.json({ mensaje: 'Canción editada!.' })
    } catch (error) {
        res.status(500).json({mensaje:'No se pudo borrar la canción',error:error.message})
    }
});

//REQ-05
app.delete("/canciones/:id", (req, res) => {
      try {
        const {id} = req.params
        const canciones = JSON.parse(fs.readFileSync('./data/repertorio.json', 'utf8'))
        const NuevaListaCanciones = canciones.filter(e => e.id !== id)
        if(canciones.length === NuevaListaCanciones.length){
            return res.status(404).json({mensaje:'No se encontró la canción'})
        }
        fs.writeFileSync('./data/repertorio.json', JSON.stringify(NuevaListaCanciones))
        res.json({ mensaje: 'Canción eliminada!.' })
    } catch (error) {
        res.status(500).json({mensaje:'No se pudo borrar la canción',error:error.message})
    }
});
