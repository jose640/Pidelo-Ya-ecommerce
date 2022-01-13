// <<<<<<< HEAD
// import React from 'react'
// import './Estilos/Home.css'
// import {
//     CarouselHome,
//   } from "./";

// export const Home = () => {
//     return (
//     <div className='home' >
//         <CarouselHome/>
// =======
import React from "react";

import "bootstrap/dist/css/bootstrap.min.css";

import imagen from "../images/RedDot_Burger.jpg";
import imagen1 from "../images/img1.jpg";
import imagen2 from "../images/image-2.png";
import imagen3 from "../images/img3.jpg";
import "./Home.sass";

export const Home = () => {
  return (
    <div className="mt-5">
      <section>
        <div className="container">
          <div className="bd-example">
            <div
              id="carouselExampleCaptions"
              className="carousel slide"
              data-ride="carousel"
            >
              <ol className="carousel-indicators">
                <li
                  data-target="#carouselExampleCaptions"
                  data-slide-to={0}
                  className="active"
                />
                <li data-target="#carouselExampleCaptions" data-slide-to={1} />
                <li data-target="#carouselExampleCaptions" data-slide-to={2} />
                <li data-target="#carouselExampleCaptions" data-slide-to={3} />
                <li data-target="#carouselExampleCaptions" data-slide-to={4} />
              </ol>
              <div className="carousel-inner" role="listbox">
                <div className="carousel-item active">
                  <img
                    className="d-block w-100"
                    data-src="holder.js/900x300?auto=yes&bg=777&fg=555&text=First slide"
                    alt="First slide [900x300]"
                    src={imagen}
                    data-holder-rendered="true"
                  />
                  <div className="carousel-caption d-none d-md-block">
                    <h3>Hamburguesa</h3>
                    <p>Monster</p>
                  </div>
                </div>

                {/*******************************************/}
                <div className="carousel-item">
                  <img
                    className="d-block w-100"
                    data-src="holder.js/900x300?auto=yes&bg=666&fg=444&text=Second slide"
                    alt="Second "
                    src={imagen1}
                    // height="375"
                    data-holder-rendered="true"
                  />
                  <div className="carousel-caption d-none d-md-block">
                    <h3>Combos de comida</h3>
                    <p className="">Con Gaseosa</p>
                  </div>
                </div>
                <div className="carousel-item">
                  <img
                    className="d-block w-100"
                    data-src="holder.js/900x300?auto=yes&bg=666&fg=444&text=Second slide"
                    alt="Second "
                    src={imagen2}
                    height="352"
                    data-holder-rendered="true"
                  />
                  <div className="carousel-caption d-none d-md-block">
                    <h3>Pizzas </h3>
                    <p className="">Con mucho queso</p>
                  </div>
                </div>
                <div className="carousel-item">
                  <img
                    className="d-block w-100"
                    data-src="holder.js/900x300?auto=yes&bg=666&fg=444&text=Second slide"
                    alt="Second "
                    src={imagen3}
                    // height="375"
                    data-holder-rendered="true"
                  />
                  <div className="carousel-caption d-none d-md-block">
                    <h3>Envios rapidos y efectivos</h3>
                    <p className="">Por toda la zona metropolitana</p>
                  </div>
                </div>
                {/****************************************************************** */}
              </div>
              <a
                className="carousel-control-prev"
                href="#carouselExampleCaptions"
                role="button"
                data-slide="prev"
              >
                <span
                  className="carousel-control-prev-icon"
                  aria-hidden="true"
                />
                <span className="sr-only">Previous</span>
              </a>
              <a
                className="carousel-control-next"
                href="#carouselExampleCaptions"
                role="button"
                data-slide="next"
              >
                <span
                  className="carousel-control-next-icon"
                  aria-hidden="true"
                />
                <span className="sr-only">Next</span>
              </a>
            </div>
          </div>
        </div>
      </section>

      <section className="mt-5 mb-5">
        <div className="container-fluid ">
          <div className="row">
            <div className="col-4">
              <div className="ensallo">
                <a href="#!">
                  <img
                    src="https://img2.freepng.es/20180221/ide/kisspng-circle-button-download-cute-round-buttons-5a8d50d20314f4.1981035015192107060126.jpg"
                    alt="dddd"
                    width="100"
                  />
                </a>
              </div>
              <div className="card-body text-center">
                <h4 className="card-title">Card title</h4>
                <p className="card-text">
                  Lorem ipsum dolor sit amet consectetur adipisicing elit.
                  Quaerat culpa similique ipsa assumenda enim impedit soluta
                  corrupti deserunt quibusdam quos! Eveniet minima possimus, sit
                  commodi maxime accusamus tenetur voluptate quidem?
                </p>
              </div>
            </div>

            <div className="col-4">
              <div className="ensallo">
                <a href="#!">
                  <img
                    src="https://img2.freepng.es/20180221/ide/kisspng-circle-button-download-cute-round-buttons-5a8d50d20314f4.1981035015192107060126.jpg"
                    alt="dddd"
                    width="100"
                  />
                </a>
              </div>
              <div className="card-body text-center">
                <h4 className="card-title">Card title</h4>
                <p className="card-text">
                  Lorem ipsum dolor sit amet consectetur adipisicing elit.
                  Quaerat culpa similique ipsa assumenda enim impedit soluta
                  corrupti deserunt quibusdam quos! Eveniet minima possimus, sit
                  commodi maxime accusamus tenetur voluptate quidem?
                </p>
              </div>
            </div>

            <div className="col-4 ">
              <div className="ensallo">
                <a href="#!">
                  <img
                    src="https://img2.freepng.es/20180221/ide/kisspng-circle-button-download-cute-round-buttons-5a8d50d20314f4.1981035015192107060126.jpg"
                    alt="dddd"
                    width="100"
                  />
                </a>
              </div>
              <div className="card-body text-center">
                <h4 className="card-title">Card title</h4>
                <p className="card-text">
                  Lorem ipsum dolor sit amet consectetur adipisicing elit.
                  Quaerat culpa similique ipsa assumenda enim impedit soluta
                  corrupti deserunt quibusdam quos! Eveniet minima possimus, sit
                  commodi maxime accusamus tenetur voluptate quidem?
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};
