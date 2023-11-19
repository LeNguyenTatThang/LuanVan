import React from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { REMOVE_FROM_CART } from '../app/userCard';

export default function CustomerCard() {

    const card = useSelector((state) => state.shop.cart);

    let TotalCart = 0;
    Object.keys(card).forEach(function (item) {
        TotalCart += card[item].gia;

    });

    console.log(">>>check card: ", card)

    const userData = useSelector((state) => state.user);

    const dispatch = useDispatch();

    const DeleteCart = (_value) => {
        dispatch(REMOVE_FROM_CART(_value));
    }

    return (
        <>
            <div className=' flex w-full'>
                <div className="w-3/5 p-3 bg-white border border-gray-200 rounded-lg shadow ">
                    <div className="flex items-center justify-between mb-4">
                        <h5 className="text-xl font-bold leading-none text-gray-900 ">Giỏ hàng của bạn</h5>

                    </div>
                    {card.map((value, index) => {
                        return (
                            <React.Fragment key={index}>
                                <div className="flow-root">
                                    <ul role="list" className="divide-y divide-gray-200 ">
                                        <li className="py-3 sm:py-4">
                                            <div className="flex items-center">
                                                <div className="flex-shrink-0">
                                                    <img className="w-8 h-8 rounded-full" src={`http://localhost:8000/img/${value.hinh}`}
                                                        alt={`${value.hinh}`} />
                                                </div>
                                                <div className="flex-1 min-w-0 ms-4">
                                                    <p className="text-sm font-medium text-gray-900 truncate ">
                                                        {value.ten}
                                                    </p>
                                                    <p className="text-sm text-gray-900 truncate">
                                                        {value.tentacgia}
                                                    </p>
                                                </div>
                                                <div className="inline-flex items-center text-base font-semibold text-gray-900 px-3">
                                                    {value.gia} vnđ
                                                </div>
                                                <i className="badge badge-danger px-3 cursor-pointer" onClick={(e) => DeleteCart(value)}>X</i>
                                            </div>
                                        </li>

                                    </ul>
                                </div>
                            </React.Fragment>
                        )
                    })}
                </div>
                <div className="w-2/5 p-4 bg-white border border-gray-200 rounded-lg shadow sm:p-8">
                    <div className="flex items-center justify-between mb-4">
                        <h5 className="text-xl font-bold leading-none text-gray-900 ">Thong tin ca nhan</h5>

                    </div>

                    <div className="flow-root">
                        <ul role="list" className="divide-y divide-gray-200 ">
                            <li className="py-3 sm:py-4">
                                <div className="flex items-center">
                                    <div className="flex-shrink-0">
                                        <img className="w-8 h-8 rounded-full" src={`http://localhost:8000/img/${userData.hinh}`}
                                            alt={`${userData.hinh}`} />
                                    </div>
                                    <div className=" text-center w-full">
                                        <p className="text-sm font-medium text-gray-900 truncate ">
                                            {userData.userInfo.ten}
                                        </p>
                                        <p className="text-sm text-gray-900  truncate">
                                            {userData.userInfo.email}
                                        </p>
                                        <p className="text-sm text-gray-900  truncate">
                                            dia chi
                                        </p>
                                        <p className="text-sm text-gray-900  truncate">
                                            sdt
                                        </p>
                                    </div>

                                </div>
                            </li>

                        </ul>
                    </div>
                    <h3 className="text-xl leading-none text-gray-900 ">Tong tien: {TotalCart} vnđ</h3>
                </div>
            </div>
        </>
    )
}
