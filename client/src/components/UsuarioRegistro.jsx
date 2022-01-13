import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { obtenerOrdenes, obtenerUsuarios } from "../redux/actions";
import { useParams } from "react-router-dom";
import "./UsuarioRegistro.sass";

export const UsuarioRegistro = () => {
  var id = useParams().id;
  const dispatch = useDispatch();
  const ordenes = useSelector((store) => store.ordenes.ordenes);
  const usuario = useSelector((store) => store.usuarios.usuarios);

  useEffect(() => {
    dispatch(obtenerOrdenes(id));
    dispatch(obtenerUsuarios(id));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  //ordenesCompletas aloja las ordenes completas del usuario en un array, junto con su id, fecha
  // y sus productos los productos estan tambien en un array, con su nombre, precio, y cantidad
  var ordenesCompletas = ordenes ? (
    ordenes
      .filter((orden) => {
        return orden.estado === "completa";
      })
      .map((orden) => {
        return [
          orden.id, // ID ORDEN DE FACTURA
          orden.userId, // ID USUARIO
          orden.updatedAt ? orden.updatedAt : orden.createdAt, // FECHA CREADA, O ACTUALIZADA
          orden.products.map((productsItems) => {
            //Productos [nombre, cantidad, precio]
            return [
              productsItems.nombre, //Producto Nombre
              productsItems.orderline.cantidad, //Producto Cantidad
              productsItems.precio,
            ]; //Producto Precio Unitario
          }),
        ];
      })
  ) : (
    <span>Error en llamada</span>
  );

  function precioTotal(arrayProductos) {
    var total = 0;
    arrayProductos.map((producto) => {
      return (total += producto[2] * producto[1]);
    });

    return total;
  }

  return (
    <div className="registroDeFacturas overflow">
      <h3 className=" font-italic- font-weight-normal text-center text-primary ">
        BIENVENIDO A TU HISTORIAL DE FACTURACIONES
      </h3>
      {ordenes[0] && usuario ? (
        ordenesCompletas.map((orden) => {
          return (
            <div className="container">
              <div class="card">
                <div className="card-header">
                  <strong>FACTURA ID:</strong>
                  {"  " + orden[0]}

                  <span clasName="float-right">
                    <strong>FECHA:</strong>
                    {"  " + orden[2].slice(0, 10)}
                  </span>
                </div>

                <div className="card-body">
                  <div clasNames="row mb-4">
                    <div className="col-sm-6">
                      <h6 className="mb-3">Remitente:</h6>
                      <div>
                        <strong>Super Ricas ®</strong>
                      </div>
                      <div>Direccion: J.C. Closure 1101</div>
                      <div>E-Mail: superricas@zmail.com</div>
                      <div>Whatsapp: +54 333 11 2342523</div>
                    </div>

                    <div className="col-sm-6">
                      <h6 className="mb-3">Consumidor Final:</h6>
                      <div>
                        <strong>
                          {usuario.nombre + " " + usuario.apellido}
                        </strong>
                      </div>
                      <div>E-Mail: {usuario.email} </div>
                    </div>
                  </div>

                  <div className="table-responsive-sm">
                    <table className="table table-striped">
                      <thead>
                        <tr>
                          <th>Producto</th>
                          <th className="right">Costo Unitario</th>
                          <th className="center">Cantidad</th>
                          <th className="right">SubTotal</th>
                        </tr>
                      </thead>
                      <tbody>
                        {orden[3].map((producto) => {
                          return (
                            <tr>
                              <td className="left strong">{producto[0]}</td>
                              {/*NOMBRE*/}
                              <td className="right">{producto[2]}</td>
                              {/*COSTO UNITARIO*/}
                              <td className="center">{producto[1]}</td>
                              {/*CANTIDAD*/}
                              <td className="right">
                                {parseInt(producto[2]) * parseInt(producto[1])}
                              </td>
                            </tr>
                          );
                        })}
                      </tbody>
                    </table>
                  </div>

                  <div class="row">
                    <div className="col-lg-4 col-sm-5"></div>

                    <div className="col-lg-4 col-sm-5 ml-auto">
                      <table className="table table-clear">
                        <tbody>
                          <tr>
                            <td className="left">
                              <strong>Subtotal</strong>
                            </td>
                            <td className="right">{precioTotal(orden[3])}</td>
                          </tr>
                          <tr>
                            <td className="left">
                              <strong>Descuento</strong>
                            </td>
                            <td className="right">$0</td>
                          </tr>
                          <tr>
                            <td className="left">
                              <strong>Total</strong>
                            </td>
                            <td className="right">
                              <strong>{precioTotal(orden[3])}</strong>
                            </td>
                          </tr>
                        </tbody>
                      </table>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          );
        })
      ) : (
        <div>
          EL USUARIO NO TIENE HISTORIAL DE ORDENES FACTURADAS, O HUBO ERROR EN
          LA BASE DE DATOS
        </div>
      )}
    </div>
  );
};
