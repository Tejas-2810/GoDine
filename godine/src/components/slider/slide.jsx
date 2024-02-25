import i1 from '../../images/bg.png';
import i2 from '../../images/bg1.png';
import i3 from '../../images/bg2.png';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min';
import "react-multi-carousel/lib/styles.css";
import Carousel from "react-multi-carousel";
import "./slide.css"

const Slide = () => {
const responsive = {
    superLargeDesktop: {
        // the naming can be any, depends on you.
        breakpoint: { max: 4000, min: 3000 },
        items: 5
      },
    desktop: {
      breakpoint: { max: 3000, min: 1024 },
      items: 3,
      slidesToSlide: 3,
      partialVisibilityGutter: 40 // optional, default to 1.
    },
    tablet: {
      breakpoint: { max: 1024, min: 464 },
      items: 2,
      slidesToSlide: 2,
      partialVisibilityGutter: 30 // optional, default to 1.
    },
    mobile: {
      breakpoint: { max: 464, min: 0 },
      items: 1,
      slidesToSlide: 1,
      partialVisibilityGutter: 30 // optional, default to 1.
    }
  };
return(
<Carousel
additionalTransfrom={0}
arrows
autoPlaySpeed={1000}
centerMode={true}
className=""
containerClass="container-with-dots"
dotListClass=""
draggable
focusOnSelect={false}
infinite
itemClass=""
keyBoardControl
minimumTouchDrag={80}
pauseOnHover
renderArrowsWhenDisabled={false}
renderButtonGroupOutside={false}
renderDotsOutside={false}
responsive={{
  desktop: {
    breakpoint: {
      max: 3000,
      min: 1024
    },
    items: 3,
    partialVisibilityGutter: 40
  },
  mobile: {
    breakpoint: {
      max: 464,
      min: 0
    },
    items: 1,
    partialVisibilityGutter: 30
  },
  tablet: {
    breakpoint: {
      max: 1024,
      min: 464
    },
    items: 2,
    partialVisibilityGutter: 30
  }
}}
rewind={false}
rewindWithAnimation={false}
rtl={false}
shouldResetAutoplay
showDots={false}
sliderClass=""
slidesToSlide={1}
swipeable
>
<div className="card">
  <div className="card-img-top">
      <img className="img-fluid" alt="Card image" src={i1} />
  </div>
  <div className="card-body">
      <h5 className="card-title">Item 1</h5>
      <p className="card-text">Item 1 details</p>
  </div>
</div>
<div className="card">
  <div className="card-img-top">
      <img className="img-fluid" alt="Card image" src={i2} />
  </div>
  <div className="card-body">
      <h5 className="card-title">Item 1</h5>
      <p className="card-text">Item 1 details</p>
  </div>
</div>
<div className="card">
  <div className="card-img-top">
      <img className="img-fluid" alt="Card image" src={i3} />
  </div>
  <div className="card-body">
      <h5 className="card-title">Item 1</h5>
      <p className="card-text">Item 1 details</p>
  </div>
</div>
<div className="card">
  <div className="card-img-top">
      <img className="img-fluid" alt="Card image" src={i1} />
  </div>
  <div className="card-body">
      <h5 className="card-title">Item 1</h5>
      <p className="card-text">Item 1 details</p>
  </div>
</div>
<div className="card">
  <div className="card-img-top">
      <img className="img-fluid" alt="Card image" src={i2} />
  </div>
  <div className="card-body">
      <h5 className="card-title">Item 1</h5>
      <p className="card-text">Item 1 details</p>
  </div>
</div>
<div className="card">
  <div className="card-img-top">
      <img className="img-fluid" alt="Card image" src={i3} />
  </div>
  <div className="card-body">
      <h5 className="card-title">Item 1</h5>
      <p className="card-text">Item 1 details</p>
  </div>
</div>
<div className="card">
  <div className="card-img-top">
      <img className="img-fluid" alt="Card image" src={i1} />
  </div>
  <div className="card-body">
      <h5 className="card-title">Item 1</h5>
      <p className="card-text">Item 1 details</p>
  </div>
</div>
<div className="card">
  <div className="card-img-top">
      <img className="img-fluid" alt="Card image" src={i2} />
  </div>
  <div className="card-body">
      <h5 className="card-title">Item 1</h5>
      <p className="card-text">Item 1 details</p>
  </div>
</div>
<div className="card">
  <div className="card-img-top">
      <img className="img-fluid" alt="Card image" src={i3} />
  </div>
  <div className="card-body">
      <h5 className="card-title">Item 1</h5>
      <p className="card-text">Item 1 details</p>
  </div>
</div>
<div className="card">
  <div className="card-img-top">
      <img className="img-fluid" alt="Card image" src={i1} />
  </div>
  <div className="card-body">
      <h5 className="card-title">Item 1</h5>
      <p className="card-text">Item 1 details</p>
  </div>
</div>
<div className="card">
  <div className="card-img-top">
      <img className="img-fluid" alt="Card image" src={i2} />
  </div>
  <div className="card-body">
      <h5 className="card-title">Item 1</h5>
      <p className="card-text">Item 1 details</p>
  </div>
</div>
<div className="card">
  <div className="card-img-top">
      <img className="img-fluid" alt="Card image" src={i3} />
  </div>
  <div className="card-body">
      <h5 className="card-title">Item 1</h5>
      <p className="card-text">Item 1 details</p>
  </div>
</div>
</Carousel>
);
};

export default Slide;