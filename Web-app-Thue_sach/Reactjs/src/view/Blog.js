import React from 'react'
import Post from '../components/Post';
const Blog = () => {
    const posts = [
        {
            id: 1,
            title: 'Introduction to React',
            content:
                'React is a JavaScript library for building user interfaces. It allows developers to create reusable UI components...',
            date: 'December 14, 2023',
        },
        {
            id: 2,
            title: 'Getting Started with Tailwind CSS',
            content:
                'Tailwind CSS is a utility-first CSS framework that provides low-level utility classes to build designs directly in your markup...',
            date: 'December 15, 2023',
        },
        {
            id: 3,
            title: 'State Management in React with Redux',
            content:
                'Redux is a predictable state container for JavaScript apps. It helps manage the state of your application in a predictable way...',
            date: 'December 16, 2023',
        },
        {
            id: 4,
            title: 'Responsive Web Design with Flexbox and Grid',
            content:
                'Flexbox and Grid are CSS layout models that allow you to design flexible and responsive web layouts...',
            date: 'December 17, 2023',
        },
    ];

    return (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {posts.map((post) => (
                <Post key={post.id} {...post} />
            ))}
        </div>
    );
};

export default Blog;
