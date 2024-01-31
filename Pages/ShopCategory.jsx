import React, { useContext } from 'react'
import './CSS/ShopCategory.css'
import { ShopContext } from '../Context/ShopContext'
import dropdown_icon from '../Components/Assets/dropdown_icon.png'
import Item from '../Components/Item/Item'

const ShopCategory = (props) => {
  const {all_product} = useContext(ShopContext);

  return (
    <div className='shop-category'>
      <img src={props.banner} alt=''/>
      <div className='shopcategory-indexSort'>
        <p>
          <span>Showing 1-12</span> out of 36 products
        </p>
        <div className='shopcategory-sort'>
          Sort by <img src={dropdown_icon} alt=''/>
        </div>
      </div>
      <div className='shopcategory-products'>
      {console.log("all_product:", all_product)}

{all_product.map((item, i) => {
  console.log(`Item ${i} - category:`, item.category);

  if (props.category === item.category) {
    return (
      <Item
        key={i}
        id={item.id}
        name={item.name}
        img={item.img}
        new_price={item.new_price}
        old_price={item.old_price}
      />
    );
  } else {
    console.log(`Category mismatch for item ${i}. Item not displayed.`);
    return null;
  }
})}
      </div>
      <div className="shopcategory-loadmore">
        Explore More
      </div> 
    </div>
  )
}

export default ShopCategory