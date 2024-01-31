import React from 'react'
import Hero from '../Components/ShopPages/Hero/Hero'
import Popular from '../Components/ShopPages/Popular/Popular'
import Offers from '../Components/ShopPages/Offers/Offers'
import NewCollections from '../Components/ShopPages/NewCollections/NewCollections'
import NewsLetter from '../Components/ShopPages/NewsLetter/NewsLetter'

const Shop = () => {
  return (
    <div>
      <Hero/>
      <Popular/>
      <Offers/>
      <NewCollections/>
      <NewsLetter/>
    </div>
  )
}

export default Shop