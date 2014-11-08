var index = 0;
var direction = null;

function renderCarousel () {
  var carouselInstance = (
    <Carousel activeIndex={index} direction={direction} onSelect={handleSelect}>
      <CarouselItem>
        <img width={900} height={500} alt="900x500" src="/assets/carousel.png"/>
        <div className="carousel-caption">
          <h3>First slide label</h3>
          <p>Nulla vitae elit libero, a pharetra augue mollis interdum.</p>
        </div>
      </CarouselItem>
      <CarouselItem>
        <img width={900} height={500} alt="900x500" src="/assets/carousel.png"/>
        <div className="carousel-caption">
          <h3>Second slide label</h3>
          <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
        </div>
      </CarouselItem>
      <CarouselItem>
        <img width={900} height={500} alt="900x500" src="/assets/carousel.png"/>
        <div className="carousel-caption">
          <h3>Third slide label</h3>
          <p>Praesent commodo cursus magna, vel scelerisque nisl consectetur.</p>
        </div>
      </CarouselItem>
    </Carousel>
  );

  React.render(carouselInstance, mountNode);
}

function handleSelect (selectedIndex, selectedDirection) {
  alert('selected=' + selectedIndex + ', direction=' + selectedDirection);
  index = selectedIndex;
  direction = selectedDirection;
  renderCarousel();
}

renderCarousel();