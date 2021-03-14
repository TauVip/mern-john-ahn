import { Carousel } from 'antd'
import React from 'react'

function ImageSlider(props) {
  return (
    <div>
      <Carousel autoplay>
        {props.images.map(image => (
          <div key={image}>
            <img
              style={{ width: '100%', maxHeight: '150px' }}
              src={`http://localhost:5000/${image}`}
              alt='productImage'
            />
          </div>
        ))}
      </Carousel>
    </div>
  )
}

export default ImageSlider
