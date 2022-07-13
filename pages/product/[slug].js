import React, { useState } from 'react'
import { client, urlFor } from '../../lib/client'
import Product from '../../components/Products'
import { AiOutlineMinus, AiOutlinePlus, AiFillStar, AiOutlineStar } from 'react-icons/ai';
import {useStateContext} from '../../context/StateContext'


const ProductDetails = ({ product, products }) => {
  const { image, name, details, price } = product
  const [indexImage,setIndexImage] = useState(0)
  const {decQty,incQty,qty,onAddCart,setShowCart} =  useStateContext()
  const handleBuyNow = () =>{
    onAddCart(product,qty)
    setShowCart(true)
  }
  return (
    <div>
      <div className="product-detail-container">
        <div>
          <div className="image-container">
            <img src={urlFor(image && image[indexImage])} className='product-detail-image' />
            <div className="small-images-container">
            {image?.map((item, i) => (
              <img 
                key={i}
                src={urlFor(item)}
                className={i === indexImage ? 'small-image selected-image' : 'small-image'}
                onMouseEnter={() => setIndexImage(i)}
              />
            ))}
          </div>
          </div>
        </div>
        <div className='product-detail-desc'>
          <h1 className='title-product'>{name}</h1>
          <div className="reviews">
            <div className='star-avaliation' >
              <AiFillStar />
              <AiFillStar />
              <AiFillStar />
              <AiFillStar />
              <AiOutlineStar />
              <strong>(20)</strong>
            </div>
          </div>
          <h4>Details:</h4>
          <p>{details}</p>
          <p className="price">R$ {price}</p>
          <div className="quantity">

            <div className='quantity-flex'>
              <h3>Quantity: </h3>
              <p className="quantity-desc">
                <span className="minus" onClick={decQty}><AiOutlineMinus /></span>
                <span className="num">{qty}</span>
                <span className="plus" onClick={incQty}>< AiOutlinePlus /></span>
              </p>
            </div>
            <div className="buttons">
              <button type='button' className='add-to-cart' onClick={() => onAddCart(product,qty)}>Add to Cart</button>
              <button type='button' className='buy-now' onClick={handleBuyNow}>Buy Now</button>
            </div>
          </div>

        </div>

      </div>
      <div className="maylike-products-wrapper">
        <h2>You may  also like:</h2>
        <div className='marquee'>
          <div className="maylike-products-container track">
            {products.map((item) => (
              <Product key={item._id} product={item} />
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

export const getStaticPaths = async () => {
  const query = `*[_type == "product"] {
    slug {
      current
    }
  }
  `;

  const products = await client.fetch(query);

  const paths = products.map((product) => ({
    params: { 
      slug: product.slug.current
    }
  }));

  return {
    paths,
    fallback: 'blocking'
  }
}

export const getStaticProps = async ({ params: { slug }}) => {
  const query = `*[_type == "product" && slug.current == '${slug}'][0]`;
  const productsQuery = '*[_type == "product"]'
  
  const product = await client.fetch(query);
  const products = await client.fetch(productsQuery);


  return {
    props: { products, product }
  }
}


export default ProductDetails