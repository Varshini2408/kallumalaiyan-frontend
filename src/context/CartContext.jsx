import React, { createContext, useContext, useState } from 'react'

const CartContext = createContext()

export function CartProvider({ children }) {
  const [cartItems, setCartItems] = useState([])

  const addToCart = (product, variant, qty) => {
    setCartItems(prev => {
      const key = product._id + "-" + variant.color + "-" + variant.size
      const exists = prev.find(i => i.key === key)
      if (exists) {
        return prev.map(i => i.key === key ? { ...i, qty: i.qty + qty } : i)
      }
      return [...prev, { key, product, variant, qty }]
    })
  }

  const updateQty = (key, newQty) => {
    if (newQty < 1) return
    setCartItems(prev => prev.map(i => i.key === key ? { ...i, qty: newQty } : i))
  }

  const removeFromCart = (key) => {
    setCartItems(prev => prev.filter(i => i.key !== key))
  }

  const clearCart = () => {
    setCartItems([])
  }

  const total = cartItems.reduce((sum, i) => sum + i.product.price * i.qty, 0)

  return (
    <CartContext.Provider value={{
      cartItems,
      setCartItems,
      addToCart,
      updateQty,
      removeFromCart,
      clearCart,
      total
    }}>
      {children}
    </CartContext.Provider>
  )
}

export function useCart() {
  return useContext(CartContext)
}