import React, { useEffect, useState } from 'react'
import Post from '../components/Post';
import { apiSearchBlog } from '../Service/UserService';
import ReactPaginate from 'react-paginate';
const Blog = () => {

    const [name, setName] = useState(null);
    const [dataSearch, setDataSearch] = useState(null);
    const handleSearch = async (event) => {
        const inputValue = event?.target?.value;
        setName(inputValue);
        try {
            let res = await apiSearchBlog(0, inputValue);

            if (res && res.data) {
                setDataSearch(res.data);
            } else {
                console.error('API response does not contain data.');
            }
        } catch (error) {
            console.error('Error calling the API:', error);
            // Handle the error as needed
        }
    }
    useEffect(() => {
        callApiBlog();
    }, [])
    const [totalPage, setTotalPage] = useState();
    const [listBlog, setListBlog] = useState();
    //
    const callApiBlog = async (page) => {
        try {
            let blog = await apiSearchBlog(page, name);

            if (blog && blog.status === 200) {
                console.log('Blog Data:', blog.data);
                setListBlog(blog.data);

                setTotalPage(blog.totalPage);
            } else {
                console.error('Error fetching chapter:', blog);
            }
        } catch (error) {
            console.error('Error calling apiChapter:', error);
        }
    }

    const handlePageClick = (event) => {
        const selectedPage = +event.selected + 1;
        console.log('Selected Page:', selectedPage);
        callApiBlog(selectedPage);
    }

    return (
        <>
            <div className="flex items-center justify-center h-20">
                <div className="flex items-center w-full max-w-md">
                    <input
                        type="text"
                        placeholder="Nhập tên bài viết"
                        className="flex-1 px-4 py-2 rounded-l-md border border-r-0 border-gray-300 focus:outline-none focus:border-blue-500"
                        onChange={handleSearch}
                    />
                </div>
            </div>
            {dataSearch === null ?
                <>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {listBlog && listBlog.length > 0 &&
                            listBlog?.map((listBlog) => (
                                <Post key={listBlog.id} {...listBlog} />
                            ))}
                    </div>
                    <ReactPaginate
                        className='flex justify-center'
                        breakLabel="..."
                        nextLabel="next >"
                        onPageChange={handlePageClick}
                        pageRangeDisplayed={3}
                        pageCount={totalPage}
                        previousLabel="< previous"
                        pageClassName='page-item'
                        pageLinkClassName='page-link'
                        previousClassName='page-item'
                        previousLinkClassName='page-link'
                        nextClassName='page-item'
                        nextLinkClassName='page-link'
                        breakClassName='page-item'
                        breakLinkClassName='page-link'
                        containerClassName='pagination'
                        activeClassName='active'
                    />
                </> : <>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {dataSearch && dataSearch.length > 0 &&
                            dataSearch?.map((dataSearch) => (
                                <Post key={dataSearch.id} {...dataSearch} />
                            ))}
                    </div>
                </>}

        </>
    );
};

export default Blog;
