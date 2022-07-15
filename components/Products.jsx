import React from 'react'
import Link from 'next/link'
import { urlFor } from '../lib/client'

function Products({product:{image, name,slug,price}}) {
  return (
    <section>
      <Link href={`/product/${slug.current}`}>
        <div className="product-card">
          <img src={urlFor(image && image[0])} alt="JBL Headphone black sale" style={{width:250, height:250,backgroundColor:'##F4F0F1'}} className="product-image"/>
          <p className='product-name'>{name}</p>
          <p className='product-price'>R${price}</p>
        </div>
      </Link>
    </section>
  )
}

export default Products