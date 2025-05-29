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

export { registrarCancion, mostrarCanciones };
