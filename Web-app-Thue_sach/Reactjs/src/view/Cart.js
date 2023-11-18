import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';

export default function Cart() {
    const [count, setCount ]= useState()
    const card = useSelector((state) => state.shop.cart);
    // const a = card.length
    // count = a
    // setCount(a)
    // console.log(a)
    return (
        <>

            <div className="flex-none">
                <div className="dropdown dropdown-end">
                    <label tabindex="0" className="btn btn-ghost btn-circle">
                        <div className="indicator">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" /></svg>
                            <span className="badge badge-sm indicator-item">{card.length}</span>
                        </div>
                    </label>
                    <div tabindex="0" className="mt-3 z-[1] card card-compact dropdown-content w-52 bg-base-100 shadow">
                        <div className="card-body">
                            <span className="font-bold text-lg">{card.length} Items</span>
                            <span className="text-info">Subtotal: $999</span>
                            <div className="card-actions">
                                <Link to="/customer-card"><button className="btn btn-primary btn-block">View cart</button></Link>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

        </>
    )
}
