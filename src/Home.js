import React, { useState } from 'react';
import './Home.css';
import Product from './Product';
// import Carousel from 'react-elastic-carousel';
import Carousel from 'react-bootstrap/Carousel';
import 'bootstrap/dist/css/bootstrap.css';

function Home() {
  const [items] = useState([
    {
      id: 1,
      title:
        'https://images-eu.ssl-images-amazon.com/images/G/02/digital/video/merch2016/Hero/Covid19/Generic/GWBleedingHero_ENG_COVIDUPDATE__XSite_1500x600_PV_en-GB._CB428684220_.jpg',
    },
    {
      id: 2,
      title:
        'https://images-eu.ssl-images-amazon.com/images/G/31/IMG20/Home/BAU/Autumn/XCM_Manual_ORIGIN_1249652_1306708_IN_3312968_1500x600_1X_en_IN._CB406551739_.jpg',
    },
    {
      id: 3,
      title:
        'https://images-eu.ssl-images-amazon.com/images/G/31/img20/Events/jupiter20/teaser1/GW/2_Desktop-Hero1x_1500x600._CB404635813_.jpg',
    },
    {
      id: 4,
      title:
        'https://images-eu.ssl-images-amazon.com/images/G/31/img20/Wireless/SamsungM/M51/GW_afterSale/GW_NCE/P38983965_IN_WLME_SamsungGalaxy_M51_With_Bank_PC_1500x600._CB404631695_.jpg',
    },
  ]);
  return (
    <div className='home'>
      <div className='home__container'>
        {/* <img
          className='home__image'
          src='https://images-eu.ssl-images-amazon.com/images/G/02/digital/video/merch2016/Hero/Covid19/Generic/GWBleedingHero_ENG_COVIDUPDATE__XSite_1500x600_PV_en-GB._
                CB428684220_.jpg'
          alt='home banner'
        /> */}
        {/* <Carousel
          pagination={true}
          enableAutoPlay={true}
          autoPlaySpeed={4000}
          transitionMs={700}
          showArrows={false}
          pagination={false}>
          {items.map((item) => (
            <div key={item.id}>
              <img className='home__image' src={item.title} />
            </div>
          ))}
        </Carousel> */}

        <Carousel fade={true}>
          {items.map((item) => (
            <Carousel.Item>
              <img className='d-block w-100 home__image' src={item.title} />
            </Carousel.Item>
          ))}
        </Carousel>

        <div className='home__row'>
          <Product
            id={3}
            title='Lenovo Ideapad Slim 3i 10th Gen Intel Core i5 15.6 inch FHD Thin and Light Laptop (8GB/1TB/Windows 10/MS Office/Grey/1.85Kg), 81WE004WIN'
            image='https://m.media-amazon.com/images/I/61Dw5Z8LzJL._AC_UY218_.jpg'
            price={45990}
            rating={3}
          />
          <Product
            id={4}
            title='ASUS VivoBook 14 M409DA-EK146T AMD Quad Core Ryzen 5-3500U 14-inch FHD Compact and Light Laptop (8GB RAM/256GB NVMe SSD/Windows 10/Integrated Graphics/FP Reader/1.60 kg), Transparent Silver'
            image='https://m.media-amazon.com/images/I/81TRaQLC+jL._AC_UY218_.jpg'
            price={37499}
            rating={4}
          />
        </div>

        <div className='home__row'>
          <Product
            id={5}
            title='Acer Swift 3 SF314-42 14-inch Laptop (AMD Ryzen 5 4500U Hexa-core processor/8GB/512GB SSD/Window 10, Home, 64Bit/AMD Radeon Graphics), Silver'
            image='https://m.media-amazon.com/images/I/81RAueA5gyL._AC_UY218_.jpg'
            price={17499}
            rating={5}
          />
          <Product
            id={1}
            title='Samsung Galaxy M31 (Ocean Blue, 6GB RAM, 128GB Storage)'
            image='https://m.media-amazon.com/images/I/71OxJeyywSL._AC_UY218_.jpg'
            price={11999}
            rating={4}
          />
          <Product
            id={2}
            title='Redmi Note 9 (Aqua Green, 4GB RAM, 64GB Storage) - 48MP Quad Camera & Full HD+ Display'
            image='https://m.media-amazon.com/images/I/81EjHa-dSJL._AC_UY218_.jpg'
            price={17499}
            rating={5}
          />
        </div>

        <div className='home__row'>
          <Product
            id={6}
            title='Sony Bravia 164 cm (65 inches) 4K Ultra HD Smart Android LED TV 65X7400H (Black) (2020 Model)'
            image='https://m.media-amazon.com/images/I/71vGNco7X2L._AC_UY218_.jpg'
            price={109999}
            rating={4}
          />
        </div>
      </div>
    </div>
  );
}

export default Home;
