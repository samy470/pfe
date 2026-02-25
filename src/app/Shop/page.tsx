'use client';
import { useDispatch, useSelector } from "react-redux";
import { Dispatch } from "@reduxjs/toolkit";
import { addToCart, showDetails, fetchGames, removeFromCart } from "../../redux/shopSlice";
import { useEffect, useState } from "react";

const Shop = () => {
    const data = useSelector((state: any) => state.cart.list);
    const dispatch: Dispatch<any> = useDispatch();
    const details = useSelector((state: any) => state.cart.details);
    const [open, setOpen] = useState(false);
    const items = useSelector((state: any) => state.cart.cart);

    useEffect(() => {
        dispatch(fetchGames());
    }, []);

    return (
        <div className="container mx-auto px-4 py-8">
            <h1 className="text-3xl font-bold mb-8">List</h1>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 mb-12">
                {data.map((item: any, index: number) => (
                    <div key={index} className="bg-white rounded-lg shadow-lg overflow-hidden">
                        <img src={item.image} alt={item.name} className="w-full h-48 object-cover" />
                        <div className="p-4">
                            <h3 className="text-xl font-semibold mb-2">{item.name}</h3>
                            <div className="flex flex-col gap-2">
                                <button 
                                    onClick={() => { dispatch(showDetails(item)); setOpen(true); }}
                                    className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition"
                                >
                                    Details
                                </button>
                                <div className="flex justify-between items-center">
                                    <span className="text-lg font-bold">{item.price} USD</span>
                                    <button 
                                        onClick={() => dispatch(addToCart(item))}
                                        className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700 transition"
                                    >
                                        Add to Cart
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
            {details.map((item: any, index: number) => (
                <div key={index}>
                    {open && (
                        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
                            <div className="bg-white rounded-lg max-w-md w-full mx-4">
                                <img src={item.image} alt={item.name} className="w-full h-64 object-cover rounded-t-lg" />
                                <div className="p-6">
                                    <div className="flex justify-between items-center mb-4">
                                        <h2 className="text-2xl font-bold">{item.name}</h2>
                                        <button 
                                            onClick={() => setOpen(false)}
                                            className="text-gray-500 hover:text-gray-700"
                                        >
                                            ✕
                                        </button>
                                    </div>
                                    <p className="text-gray-700 mb-6">{item.details}</p>
                                    <div className="flex justify-between items-center">
                                        <span className="text-xl font-bold">{item.price} USD</span>
                                        <button 
                                            onClick={() => dispatch(addToCart(item))}
                                            className="bg-green-600 text-white px-6 py-2 rounded hover:bg-green-700 transition"
                                        >
                                            Add to cart
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    )}
                </div>
            ))}
            <div className="mt-12">
                <h1 className="text-3xl font-bold mb-6">Shopping Cart</h1>
                {items.length === 0 && (
                    <p className="text-gray-500 text-center py-8">Cart is empty</p>
                )}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {items.map((item: any, index: number) => (
                        <div key={index} className="bg-white rounded-lg shadow-lg overflow-hidden flex">
                            <img src={item.image} alt={item.name} className="w-24 h-24 object-cover" />
                            <div className="p-4 flex-1">
                                <h3 className="font-semibold">{item.name}</h3>
                                <div className="flex justify-between items-center mt-2">
                                    <span className="text-lg font-bold">${item.price}</span>
                                    <button 
                                        onClick={() => dispatch(removeFromCart(item.name))}
                                        className="bg-red-600 text-white px-3 py-1 rounded hover:bg-red-700 transition text-sm"
                                    >
                                        Remove
                                    </button>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
                {items.length > 0 && (
                    <h4 className="text-2xl font-bold mt-6 text-right">
                        Total: ${items.reduce((total: number, item: any) => total + parseFloat(item.price), 0).toFixed(2)}
                    </h4>
                )}
            </div>
        </div>
    )
}

export default Shop;