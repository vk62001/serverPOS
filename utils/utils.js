const delay = (ms) => {
  return new Promise((resolve) => setTimeout(resolve, ms));
};
const eliminarPropiedadesVacias = (obj) => {
  for (const clave in obj) {
    if (Array.isArray(obj[clave]) && obj[clave].length === 0) {
      delete obj[clave];
    } else if (typeof obj[clave] === "object") {
      eliminarPropiedadesVacias(obj[clave]);
    }
  }
  return obj; // Devolver el objeto modificado
};

module.exports = { delay, eliminarPropiedadesVacias };
