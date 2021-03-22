import { Empty, Result } from 'antd'
import Axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux'
import { getCartItems, removeCartItem } from '../../../_actions/user_actions'
import Paypal from '../../utils/Paypal'
import UserCardBlock from './Sections/UserCardBlock'

function CartPage(props) {
  const dispatch = useDispatch()
  const [Total, setTotal] = useState(0)
  const [ShowTotal, setShowTotal] = useState(false)
  const [ShowSuccess, setShowSuccess] = useState(false)

  useEffect(() => {
    let cartItems = []
    if (
      props.user.userData &&
      props.user.userData.cart &&
      props.user.userData.cart.length
    ) {
      props.user.userData.cart.forEach(item => {
        cartItems.push(item.id)
      })
      dispatch(getCartItems(cartItems, props.user.userData.cart))
    }
  }, [props.user.userData])

  useEffect(() => {
    props.user.cartDetail &&
      props.user.cartDetail.length &&
      calculateTotal(props.user.cartDetail)
  }, [props.user.cartDetail])

  const calculateTotal = cartDetail => {
    let total = 0

    cartDetail &&
      cartDetail.length &&
      cartDetail.map(item => {
        total += parseInt(item.price, 10) * item.quantity
      })

    setTotal(total)
    setShowTotal(true)
  }

  const removeFromCart = productId => {
    dispatch(removeCartItem(productId)).then(() => {
      Axios.get('/api/users/userCartInfo').then(response => {
        if (response.data.success) {
          if (!response.data.cartDetail.length) setShowTotal(false)
          else {
            response.data.cartDetail[0].quantity =
              response.data.cartDetail[0].writer.cart[0].quantity
            calculateTotal(response.data.cartDetail)
          }
        } else {
          alert('Failed to get cart info')
        }
      })
    })
  }

  return (
    <div style={{ width: '85%', margin: '3rem auto' }}>
      <h1>My Cart</h1>
      <div>
        <UserCardBlock
          products={props.user.cartDetail}
          removeItem={removeFromCart}
        />

        {ShowTotal ? (
          <div style={{ marginTop: '3rem' }}>
            <h2>Total amount: ${Total} </h2>
          </div>
        ) : ShowSuccess ? (
          <Result status='success' title='Successfully Purchased Items' />
        ) : (
          <div
            style={{
              width: '100%',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'center'
            }}
          >
            <br />
            <Empty description={false} />
            <p>No Items In the Cart</p>
          </div>
        )}
      </div>
      <Paypal />
    </div>
  )
}

export default CartPage
