import React from 'react';

export const CarouselHome = () => {

    return (
        <div id="carouselExampleIndicators" class="carousel slide" data-ride="carousel">
  <ol class="carousel-indicators">
    <li data-target="#carouselExampleIndicators" data-slide-to="0" class="active"></li>
    <li data-target="#carouselExampleIndicators" data-slide-to="1"></li>
    <li data-target="#carouselExampleIndicators" data-slide-to="2"></li>
  </ol>

        
    <div class="carousel-inner" style={{maxHeight:'650px'}} >
        <div class="carousel-item active">
            <img class="d-block w-100" src='https://www.thedailymeal.com/sites/default/files/story/0_fastfood.jpg' alt="First slide"/>
        </div>
        <div class="carousel-item">
            <img class="d-block w-100" src='https://www.sphinx-it.eu/wp-content/uploads/2019/02/215-2bed35a7ce5cb39a0073d05cfc0a-1444329.jpgd_.jpg' alt="Second slide"/>
        </div>
        <div class="carousel-item">
            <img class="d-block w-100" src='https://techcrunch.com/wp-content/uploads/2018/08/image-2.png' alt="Third slide"/>
        </div>
    </div>

  <a class="carousel-control-prev" href="#carouselExampleIndicators" role="button" data-slide="prev">
    <span class="carousel-control-prev-icon" aria-hidden="true"></span>
    <span class="sr-only">Previous</span>
  </a>
  <a class="carousel-control-next" href="#carouselExampleIndicators" role="button" data-slide="next">
    <span class="carousel-control-next-icon" aria-hidden="true"></span>
    <span class="sr-only">Next</span>
  </a>
</div>
)
}


