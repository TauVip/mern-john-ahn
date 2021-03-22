import React from 'react'

function UserCardBlock(props) {
  const renderCartImage = images => {
    if (images.length) {
      let image = images[0]
      return `http://localhost:5000/${image}`
    }
  }

  const renderItems = () =>
    props.products && props.products.length
      ? props.products.map(product => (
          <tr key={product._id}>
            <td>
              <img
                style={{ width: 70 }}
                alt='product'
                src={renderCartImage(product.images)}
              />
            </td>
            <td>{product.quantity} EA</td>
            <td>$ {product.price}</td>
            <td>
              <button onClick={() => props.removeItem(product._id)}>
                Remove
              </button>
            </td>
          </tr>
        ))
      : null

  return (
    <div>
      <table>
        <thead>
          <tr>
            <th>Product Image</th>
            <th>Product Quantity</th>
            <th>Product Price</th>
            <th>Remove from Cart</th>
          </tr>
        </thead>
        <tbody>{renderItems()}</tbody>
      </table>
    </div>
  )
}

export default UserCardBlock
