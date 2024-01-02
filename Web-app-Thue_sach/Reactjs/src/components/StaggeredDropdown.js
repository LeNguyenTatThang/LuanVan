import React, { useState } from "react";
import { FiEdit, FiChevronDown, FiTrash, FiShare, FiPlusSquare } from "react-icons/fi";
import { motion } from "framer-motion";
import { Link, useNavigate } from "react-router-dom";
import iziToast from "izitoast";
import { LOG_OUT } from "../app/userReducer";
import { useDispatch } from "react-redux";
import Logout from "../view/Logout";

const StaggeredDropDown = ({ userName }) => {
    const [open, setOpen] = useState(false);
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const handleLogout = async (e) => {
        alert('ok')
        // navigate('/');
        // iziToast.success({
        //     position: 'topRight',
        //     message: 'Bạn đã đăng xuất'
        // });
        // await dispatch(LOG_OUT());
    };

    return (
        <div className=" flex items-center justify-center">
            <motion.div animate={open ? "open" : "closed"} className="relative">
                <button
                    onClick={() => setOpen((pv) => !pv)}
                    className="flex items-center p-2 text-gray-900 rounded-lg hover:bg-gray-400 group"
                >
                    <svg
                        className="w-5 h-5 text-gray-400 group-hover:text-white "
                        fill="none"
                        viewBox="0 0 23 23"
                        stroke="currentColor"
                    >
                        <path
                            stroke-linecap="round"
                            stroke-linejoin="round"
                            stroke-width="2"
                            d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                        />
                    </svg>
                    <span className="flex-1 ml-3 whitespace-nowrap">{userName}</span>
                    <motion.span variants={iconVariants}>
                        <FiChevronDown />
                    </motion.span>
                </button>

                <motion.ul
                    initial={wrapperVariants.closed}
                    variants={wrapperVariants}
                    style={{ originY: "top", translateX: "-50%" }}
                    className="flex flex-col gap-2 p-2 rounded-lg shadow-xl absolute top-[120%] left-[50%] w-48 overflow-hidden bg-white"
                >
                    <Option setOpen={setOpen} Icon={FiEdit} text="Xem tài khoản" to="/profiles" />
                    <Option setOpen={setOpen} Icon={FiPlusSquare} text="Thêm sách mới" to="/add-book" />
                    <Option setOpen={setOpen} Icon={FiShare} text="Quản lý phiếu thuê" to="/manager-book" />
                    <Option setOpen={setOpen} Icon={FiTrash} text="Quản lý sách" to="/read-book" />
                    <Logout setOpen={setOpen} />
                </motion.ul>
            </motion.div>
        </div>
    );
};

const Option = ({ text, Icon, setOpen, userName, to }) => {
    return (
        <motion.button
            type="button"
            onClick={() => {
                setOpen(false);
            }}
            className="flex items-center gap-2 w-full p-2 text-xs font-medium whitespace-nowrap rounded-md hover:bg-indigo-100 text-slate-700 hover:text-indigo-500 transition-colors cursor-pointer"
        >
            <Link to={to} className="flex items-center ">
                <motion.span variants={actionIconVariants}>
                    <Icon className="w-4 h-4" />
                </motion.span>
                <span className="text-base font-sans">{text}</span>
                <span className="ml-2 font-sans">{userName}</span>
            </Link>
        </motion.button>
    );
};

export default StaggeredDropDown;

const wrapperVariants = {
    open: {
        scaleY: 1,
        transition: {
            when: "beforeChildren",
            staggerChildren: 0.1,
        },
    },
    closed: {
        scaleY: 0,
        transition: {
            when: "afterChildren",
            staggerChildren: 0.1,
        },
    },
};

const iconVariants = {
    open: { rotate: 180 },
    closed: { rotate: 0 },
};

const itemVariants = {
    open: {
        opacity: 1,
        y: 0,
        transition: {
            when: "beforeChildren",
        },
    },
    closed: {
        opacity: 0,
        y: -15,
        transition: {
            when: "afterChildren",
        },
    },
};

const actionIconVariants = {
    open: { scale: 1, y: 0 },
    closed: { scale: 0, y: -7 },
};