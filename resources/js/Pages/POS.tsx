import React, { useEffect, useState } from "react";
import { Button } from "@mui/material";
import { Card, CardContent } from "../Components/ui/Card";
import { motion } from "framer-motion";
import useFetchProducts from "../Hooks/useFetchProducts";
import useBulkUpdateProducts from "../Hooks/useBulkUpdateProducts";
import useFetchCurrentUsers from "../Hooks/useFetchCurrentUser";

const POS: React.FC = () => {
    const [cart, setCart] = useState<{ id: number; product_name: string; pricing: number; quantity: number }[]>([]);
    const [total, setTotal] = useState(0);
  const {products} = useFetchProducts()
 const {updateStock} = useBulkUpdateProducts(products)
 const { user, loading } = useFetchCurrentUsers();

  useEffect(() => {
    const newTotal = cart.reduce((sum, item) => sum + item.pricing * item.quantity, 0);
    setTotal(newTotal);
  }, [cart]);
  const addToCart = (product: { id: number; product_name: string; pricing: number }) => {
    setCart((prevCart) => {
      const existingProduct = prevCart.find((item) => item.id === product.id);
      if (existingProduct) {
        return prevCart.map((item) =>
          item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item
        );
      } else {
        return [...prevCart, { ...product, quantity: 1 }];
      }
    });
  };



  const removeFromCart = (product: {id: number; product_name: string; pricing: number }) => {
    setCart((prevCart) => {
      const updatedCart = prevCart
        .map((item) => {
          if (item.id === product.id) {
            return item.quantity > 1 ? { ...item, quantity: item.quantity - 1 } : null;
          }
          return item;
        })
        .filter((item): item is { id: number; product_name: string; pricing: number; quantity: number } => item !== null);

      const newTotal = updatedCart.reduce((sum, item) => sum + item.pricing * item.quantity, 0);
      setTotal(newTotal);
      return updatedCart;
    });
  };


  const handlePayment = async () => {
    if (cart.length === 0) return;
    await updateStock(cart.map(item => ({ id: item.id, quantity: item.quantity }))); // Deduct stock
    setCart([]);
    window.location.reload();
  };


  return (
    <div className="p-6 min-h-screen bg-gray-100 grid grid-cols-2 gap-4">
      {/* Product List */}
      <div>
        <h1 className="text-2xl font-bold mb-4">Point of Sale System<span className="text-[17px] text-blue-500 font-semibold m-5"> - {user?.last_name} {user?.first_name}{" "}</span></h1>
        <div className="grid grid-cols-2 gap-4">
          {products.map((product, index) => (
            <Card key={index} className="p-4 shadow-lg cursor-pointer" >
              <CardContent>
                <h2 className="text-lg font-semibold">{product.product_name}</h2>
                <p className="text-gray-800">₱{product.pricing}</p>
                <Button
                  variant="contained"
                  color="primary"
                  onClick={() => addToCart(product)}
                  className="mt-2"
                  disabled={product.stocks < 1}
                >
                  Add to Cart
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
      {/* Order Summary */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="p-4 bg-white rounded-lg shadow-md"
      >
        <h2 className="text-xl font-semibold mb-2">Cart</h2>
        {cart.length > 0 ? (
          cart.map((item, index) => (
            <div key={index} className="flex justify-between border-b py-2">
                <span className="w-2/3">{item.product_name} x{item.quantity}</span>
                <span className="w-1/3 text-right">₱{item.pricing * item.quantity}</span>

                <Button variant="outlined" color="secondary" size="small" sx={{ marginLeft: 3 }} onClick={() => removeFromCart(item)}>-</Button>

            </div>
          ))
        ) : (
          <p className="text-gray-500">Cart is empty</p>
        )}
        <h3 className="text-lg font-bold mt-4">Total: ₱ {total}</h3>
        {cart.length > 0 && (
          <Button
            variant="contained"
            color="success"
            onClick={handlePayment}
            className="mt-6 w-full"
          >
            Pay
          </Button>
        )}
      </motion.div>
    </div>
  );
};

export default POS;
