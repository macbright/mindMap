import React from "react";
import Slider from "react-slick";

import { ReactComponent as Icon1 } from '../../assets/signup1.svg';
import { ReactComponent as Icon2 } from '../../assets/signup2.svg';
import { ReactComponent as Icon3 } from '../../assets/signup3.svg';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import styles from './slider.module.scss';

export default function SimpleSlider() {
  var settings = {
    dots: true,
    infinite: true,
    speed: 100,
    slidesToShow: 1,
    slidesToScroll: 1
  };
  
  return (
    <Slider {...settings} className={styles.main}>
      <div >
        <Icon1 />
        <div className={styles.text}>
            <h3>Turn your team's ideas into reality</h3>
            <p>is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been 
                the industry's standard dummy text ever since the 1500s, 
                when an unknown printer took a galley of type and scrambled  </p>
        </div>
        
      </div>
      <div>
         <Icon2 />
        <div className={styles.text}>
                <h3>Turn your team's ideas into reality</h3>
                <p>is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been 
                    the industry's standard dummy text ever since the 1500s, 
                    when an unknown printer took a galley of type and scrambled  </p>
            </div>
      </div>
      <div>
        <Icon2 />
        <div className={styles.text}>
                <h3>Turn your team's ideas into reality</h3>
                <p>is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been 
                    the industry's standard dummy text ever since the 1500s, 
                    when an unknown printer took a galley of type and scrambled  </p>
            </div>
      </div>  
    </Slider>
  );
}

