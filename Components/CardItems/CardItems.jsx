import React,{useContext} from 'react'
import './CardItems.css'
import {ShopContext} from '../../Context/ShopContext'
import remove_icon from '../Assets/cart_cross_icon.png'

const CardItems = () => {
    const {getTotalCartAmount, all_product,cartItems,removeFromCart} = useContext(ShopContext);
  return (
    <div className='cartitems'>CardItems
        <div className='cartitems-format-main'>
            <p>Product</p>
            <p>Title</p>
            <p>Price</p>
            <p>Quatity</p>
            <p>Total</p>
            <p>Remove</p>
        </div>
        <hr/>
            {all_product.map((e) => {
            if(cartItems[e.id]>0) {
                return (
                    <div key={e.id}>
                        <div className='cartitems-format cartitems-format-main'>
                            <img src={e.img} alt='' className='carticon-product-icon'/>
                            <p>{e.name}</p>
                            <p>${e.new_price}</p>
                            <button className='cartitems-quantity'>{cartItems[e.id]}</button>
                            <p>${e.new_price * cartItems[e.id]}</p>
                            <img src={remove_icon} onClick={() => { removeFromCart(e.id) }} alt=''/>
                        </div>
                    </div>
                )
            }return null;
        })}
        <div className='cartitems-down'>
            <div className='cartitems-total'>
                <h1>Cart Totals</h1>
                <div>
                    <div className='cartitems-total-item'>
                        <p>Subtotal</p>
                        <p>${getTotalCartAmount()}</p>
                    </div>
                    <hr/>
                    <div className="cartitems-total-item">
                        <p>Shipping Fee</p>
                        <p>Free</p>
                    </div>
                    <hr/>
                    <div className='cartitems-total-item'>
                        <p>Total</p>
                        <p>${getTotalCartAmount()}</p>
                    </div>
                </div>
                <button> Proceed to Checkout </button>
            </div>
            <div className='cartitems-promocode'>
                <p>If You have a promo code, Enter it here</p>
                <div className='cartitems-promobox'>
                    <input type="text" placeholder='Promo Code'/>
                    <button>Submit</button>
                </div>
            </div>
        </div>
    </div>
  )
}

export default CardItems