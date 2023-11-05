import React, { useEffect, useState } from 'react'
import { fetchAllUser } from '../Service/UserService'
import ReactPaginate from 'react-paginate';
import { Fragment } from 'react';
import { toast } from 'react-toastify';

export default function TestApi() {
    const [listUsers, setListUser] = useState([]);
    const [totalUser, setTotalUser] = useState(0);
    const [totalPage, setTotalPage] = useState(0);
    useEffect(() => {

        getUser(1);
    }, [])
    const getUser = async (page) => {
        let res = await fetchAllUser(page);
        console.log(res)
        if (res) {
            //     console.log('gggg', res.data.total_pages)
            setTotalUser(res.total)
            setListUser(res.data)
            setTotalPage(res.total_pages);
        }
        else if (!res) {
            toast.error("Error");
        }
    }
    const handlePageClick = (event) => {
        console.log(event.selected)
        getUser(+event.selected + 1)
    }
    return (
        <>
            {listUsers && listUsers.length > 0 &&
                listUsers.map((item, index) => {
                    return (
                        <Fragment key={`users-${index}`}>
                            <tr >
                                <td>{item.id}</td>
                                <td>{item.first_name}</td>
                                <td>{item.last_name}</td>
                                <td>{item.email}</td>
                            </tr>
                        </Fragment>
                    )
                })
            }

            <div className="flex items-center">
                <ReactPaginate
                    nextLabel="next >"
                    onPageChange={handlePageClick}
                    pageRangeDisplayed={3}
                    breakLabel="..."
                    pageCount={totalPage}
                    previousLabel="< previous"

                    pageClassName="page-item"
                    pageLinkClassName="page-link"
                    previousClassName="page-item"
                    previousLinkClassName="page-link"
                    nextClassName="page-item"
                    nextLinkClassName="page-link"
                    breakClassName="page-item"
                    breakLinkClassName="page-link"
                    containerClassName="pagination"
                    activeClassName="active"

                />
            </div>

        </>
    )
}
