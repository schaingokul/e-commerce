import React, { useContext } from 'react'
import {ShopContext} from '../Context/ShopContext'
import { useParams } from 'react-router-dom'
import Breadcrum from '../Components/Breadcrums/Breadcrum'
import ProductDisplay from '../Components/ProductDisplay/ProductDisplay'
import DescriptionsBox from '../Components/DescriptionsBox/DescriptionsBox'
import RelatedProducts from '../Components/RelatedProducts/RelatedProducts'

const Product = () => {
  const {all_product}= useContext(ShopContext)
  const {productId} = useParams();
  const product = all_product.find((e)=> e.id === Number (productId) )
  return (
    <div>
      {product ?<Breadcrum product={product}/> : (<p>No product found</p>) }
      <ProductDisplay product={product}/>
      <DescriptionsBox />
      <RelatedProducts/>
    </div>
  )
}

export default Product