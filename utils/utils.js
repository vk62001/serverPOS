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

const validaPedido = (pedido) => {
  // Sumando valores del detalle
  const totalCantidadSolicitada = sumarDetalles(
    pedido.detallePedido,
    "cantidad_Solicitada"
  );
  const totalPedidoSugerido = sumarDetalles(
    pedido.detallePedido,
    "pedido_Sugerido"
  );
  const totalCantidadRecibida = sumarDetalles(
    pedido.detallePedido,
    "cantidad_Recibida"
  );
  const totalCantidadSurtida = sumarDetalles(
    pedido.detallePedido,
    "cantidad_Surtida"
  );

  // Puedes agregar lógica adicional para verificar si los totales coinciden
  const coincidenTotales =
    totalCantidadSolicitada === pedido.pedidoCab.total_Cantidad_Solicitada &&
    totalPedidoSugerido === pedido.pedidoCab.total_Pedido_Sugerido &&
    totalCantidadRecibida === pedido.pedidoCab.total_Cantidad_Recibida &&
    totalCantidadSurtida === pedido.pedidoCab.total_Cantidad_Surtida;

  console.log(
    `¿Coinciden todos los totales? ${coincidenTotales ? "Sí" : "No"}`
  );

  return coincidenTotales;
};
const sumarDetalles = (detalles, campo) => {
  return detalles.reduce((acumulado, detalle) => acumulado + detalle[campo], 0);
};

module.exports = { delay, eliminarPropiedadesVacias, validaPedido };
