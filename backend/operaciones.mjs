import fs from "fs";

const _pathName = "./data/repertorio.json";

const registrarCancion = (objetoCancion) => {
  try {
    const canciones = JSON.parse(fs.readFileSync(_pathName, "utf8"));
    canciones.push(objetoCancion);
    fs.writeFileSync(_pathName, JSON.stringify(canciones));
    console.log("Registro guardado exitosamente.");
  } catch (error) {
    console.error("Error al guardar el registro:", error);
  }
};

const mostrarCanciones = () => {
  try {
    return JSON.parse(fs.readFileSync(_pathName, "utf8"));
  } catch (error) {
    console.error("Error al mostrar las canciones:", error);
  }
};

const updateSong = (objectSong) => {
  try {
    const songs = JSON.parse(fs.readFileSync(_pathName, "utf8"));
    const songToUpdate = songs.find((s) => s.id === objectSong.id);
    songToUpdate.titulo = objectSong.titulo;
    songToUpdate.artista = objectSong.artista;
    songToUpdate.tono = objectSong.tono;
    fs.writeFileSync(_pathName, JSON.stringify(songs));
    console.log("Elemento actuializado exitosamente.");
  } catch (error) {
    console.log("Error en actualizar cancion", error);
  }
};

const deleteSong = (id) => {
  try {
    const songs = JSON.parse(fs.readFileSync(_pathName, "utf8"));
    const newSongs = songs.filter((s) => s.id !== id);
    fs.writeFileSync(_pathName, JSON.stringify(newSongs));
    console.log(`Elemento eliminado ${id}`);
  } catch (error) {
    console.log("Error en eliminar cancion", error);
  }
};

export { registrarCancion, mostrarCanciones, updateSong, deleteSong };
