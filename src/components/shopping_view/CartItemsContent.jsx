import React from 'react'
import { FaMinus, FaPlus } from 'react-icons/fa'
import { MdDelete } from 'react-icons/md'
import { useDispatch, useSelector } from 'react-redux'
import { deleteToCartAction, getItemsToCartAction, updateToCartAction } from '../../store/actions/CartAction'
import { toast } from 'react-toastify'

const CartItemsContent = ({cartItem}) => {

    const dispatch = useDispatch();
    const { user } = useSelector((state)=>state.auth);


    const handleUpdateQuantity = async (getCartItem, typeOfAction) => {
        try{
           const {payload} = dispatch(updateToCartAction({userId: user._id, productId: getCartItem.productId, quantity: typeOfAction === 'plus' ? getCartItem.quantity + 1 : getCartItem.quantity - 1}))
           console.log(payload);
           if(payload?.success){
            toast.success(payload?.message)
           }
        }catch(err){
            toast.error(err.message)
        }
    }


    const handleCartItemDelete = async (getCartItem) => {
        try{
            const { payload } = await dispatch(deleteToCartAction({userId: user._id, productId: getCartItem}))
            console.log(payload);
            if(payload?.success){
                toast.success(payload.message);
                dispatch(getItemsToCartAction(user._id));
                }
        }catch(err){
                toast.error(err.message)
            }
    }


  return (
    <div className='flex items-center space-x-4 '> 
        <img src={cartItem?.image} alt={cartItem.title} className='w-20 h-20 rounded object-cover'/>
        <div className='flex-1 '>
            <h3 className='font-extrabold'>{cartItem?.title}</h3>
            <div className='flex items-center mt-1 gap-5' >
                <button 
                 disabled={cartItem?.quantity === 1}
                 onClick={()=>handleUpdateQuantity(cartItem, "minus")}>
                    <FaMinus className='w-4 h-4 bg-gray-300 rounded p-1'/>
                    <span className='sr-only'>Decrease</span>
                </button>
                <span className='font-semibold'>{cartItem?.quantity}</span>
                <button onClick={()=>handleUpdateQuantity(cartItem, "plus")}>
                    <FaPlus className='w-4 h-4 bg-gray-300 rounded p-1'/>
                    <span className='sr-only'>Increase</span>
                </button>
            </div>
        </div>
        <div className='flex flex-col items-end'>
            <p className='font-semibold'>₹{((cartItem?.salePrice > 0 ? cartItem.salePrice : cartItem.price) * cartItem.quantity).toFixed(2)}</p>
            <MdDelete onClick={()=>handleCartItemDelete(cartItem.productId)} className='text-red-500 cursor-pointer'/>
        </div>
    </div>
  )
}

export default CartItemsContent