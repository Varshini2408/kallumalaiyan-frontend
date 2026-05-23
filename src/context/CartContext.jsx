import { createContext, useContext, useState } from 'react'

const CartContext = createContext()

export function CartProvider({ children }) {
  const [cartItems, setCartItems] = useState([])

  const addToCart = (product, variant, qty) => {
    setCartItems(prev => {
      const key = `${product.id}-${variant.color}-${variant.size}`
      const exists = prev.find(i => i.key === key)
      if (exists) {
        return prev.map(i => i.key === key ? { ...i, qty: i.qty + qty } : i)
      }
      return [...prev, { key, product, variant, qty }]
    })
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
      removeFromCart,
      clearCart,
      total
    }}>
      {children}
    </CartContext.Provider>
  )
}

export const useCart = () => useContext(CartContext)