import { useEffect, useState } from 'react';
import axios from 'axios';
import Navbar from '@/components/custom/Navbar';
import Footer from '@/components/custom/Footer';
// @ts-ignore
import STRIPI_API_ENDPOINT from '../utils/constants.js';
import { useParams } from 'react-router-dom';
import { RiShareBoxLine } from "react-icons/ri";

const BlogReadPage = () => {
    const { id } = useParams();
    const [blogContent, setBlogContent]:any = useState(null);

    const getBlogContent = async () => {
        try {
            const response = await axios.get(`${STRIPI_API_ENDPOINT}/api/blogs/${id}?populate=*`, {
                headers: {
                    'Content-Type': 'application/json',
                },
            });
            setBlogContent(response.data?.data);
            // console.log(response.data?.data);
        } catch (error) {
            alert("Failed to fetch blog: Strapi seems offline");
            console.error("Error fetching blog:", error);
        }
    };

    useEffect(() => {
        window.scrollTo(0, 0);
        getBlogContent();
    }, []);

    if (!blogContent) {
        return (
            <div className="flex flex-col min-h-screen bg-gray-50">
                <Navbar />
                <div className="my-20 mx-auto max-w-4xl px-4 text-center">
                    <p className="text-lg text-gray-600">Loading blog content...</p>
                </div>
                <Footer />
            </div>
        );
    }

    return (
        <div className="flex flex-col min-h-screen bg-gray-50">
            <Navbar />
            <div className='my-20 mx-auto max-w-4xl px-4'>
                <h1 className="text-5xl font-bold text-gray-900 mb-6">{blogContent.blog_title}</h1>
                <div className="flex justify-between items-center text-sm text-gray-500 mb-8">
                    <p>By <span className="font-medium text-gray-700">{blogContent.author}</span></p>
                    <p>Published on {new Date(blogContent.publishedAt).toLocaleDateString()}</p>
                </div>
                {blogContent.Thumbnail_image ? (
                    <img
                        src={`${STRIPI_API_ENDPOINT}${blogContent.Thumbnail_image.url}`}
                        alt={blogContent?.blog_title || 'Blog Image'}
                        className="w-full h-[35rem] object-cover rounded-md"
                    />
                ) : (
                    <div className="w-full h-40 bg-gray-200 flex items-center justify-center rounded-md">
                        <span className="text-gray-500">No Image Available</span>
                    </div>
                )}
                <div className="prose prose-lg max-w-none text-gray-800">
                    <p className='my-5 leading-8 text-lg text-justify'>{blogContent.short_description}</p>
                </div>

                <div className='flex flex-col gap-4 p-2'>
                    {blogContent.blogs_images && blogContent.blogs_images.length > 1 ? (
                        <img
                            src={`${STRIPI_API_ENDPOINT}${blogContent.blogs_images[1].url}`}
                            alt={blogContent?.blog_title || 'Blog Image'}
                            className="w-full h-96 object-cover rounded-md"
                        />
                    ) : (

                        <></>

                    )}
                    <div className="prose prose-lg max-w-none text-gray-800">
                        <p className='my-5 leading-8 text-lg text-justify'>{blogContent.blog_content.substring(0, 3200)}</p>
                    </div>
                    {blogContent.blogs_images && blogContent.blogs_images.length > 2 ? (
                        <img
                            src={`${STRIPI_API_ENDPOINT}${blogContent.blogs_images[2].url}`}
                            alt={blogContent?.blog_title || 'Blog Image'}
                            className="w-full h-96 object-cover rounded-md"
                        />
                    ) : (

                        <></>

                    )}
                    <div className="prose prose-lg max-w-none text-gray-800">
                        <p className='my-5 leading-8 text-lg text-justify'>{blogContent.blog_content.substring(3200)}</p>
                    </div>
                    {blogContent.blogs_images && blogContent.blogs_images.length > 3 ? (
                        <img
                            src={`${STRIPI_API_ENDPOINT}${blogContent.blogs_images[3].url}`}
                            alt={blogContent?.blog_title || 'Blog Image'}
                            className="w-full h-96 object-cover rounded-md"
                        />
                    ) : (

                        <span className="text-gray-500">Thanks for reading. 😸</span>

                    )}

                </div>



                <div className="mt-8">
                    <h3 className="text-xl font-semibold mb-4">Tags:</h3>
                    <div className="flex gap-2 flex-wrap">
                        {blogContent?.tags?.map((tag:any, index:number) => (
                            <span
                                key={index}
                                className="bg-gray-200 rounded-full px-4 py-1 text-sm font-medium text-gray-600">
                                #{tag}
                            </span>
                        ))}
                    </div>
                    <a className='flex no-underline items-center align-middle gap-2 mt-3' href={blogContent.ref_links} target='_blank'>Reference Links <RiShareBoxLine /></a>
                </div>
            </div>
            <Footer />
        </div>
    );
};

export default BlogReadPage;
