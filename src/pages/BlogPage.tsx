import { useEffect, useState } from 'react';
import axios from 'axios';
import Navbar from '@/components/custom/Navbar';
import Footer from '@/components/custom/Footer';
// @ts-ignore
import STRIPI_API_ENDPOINT from '../utils/constants.js';
import { Card, CardContent } from '@/components/ui/card';
import { useNavigate } from 'react-router-dom';
import { useToast } from "@/hooks/use-toast"


const BlogPage = () => {
    const [blogData, setBlogData] = useState([]);
    const navigate = useNavigate();
    const { toast } = useToast();

    const getAllBlogs = async () => {
        try {
            const response = await axios.get(`${STRIPI_API_ENDPOINT}/api/blogs?populate=*`, {
                headers: {
                    'Content-Type': 'application/json',
                },
            });
            setBlogData(response.data?.data);
            console.log(response.data?.data);

        } catch (error) {
            toast({
                variant: "destructive",
                title: 'Sorry!',
                description: "falied to fetch blogs : Stripi seems offline",
            })
            // alert("falied to fetch blogs : Stripi seems offline");
            console.error("Error fetching blogs:", error);
        }
    };

    useEffect(() => {
        getAllBlogs();
    }, []);

    return (
        <div className="flex flex-col min-h-screen bg-gray-50">
            <Navbar />
            <div className='my-20 mx-auto max-w-4xl px-4'>
                <h1 className="text-4xl font-bold text-center text-gray-800 mb-8">Our Blogs</h1>
                {blogData.length === 0 &&
                    <div className="my-20 mx-auto max-w-4xl px-4 text-center">
                        <p className="text-lg text-gray-600">Loading blogs hang On...</p>
                    </div>
                }

                <div className="space-y-6">
                    {blogData.map((blog:any, index:number) => (
                        <Card key={index} className="overflow-hidden shadow-md rounded-lg transition-all hover:shadow-lg hover:scale-105 cursor-pointer" onClick={() => { navigate(`/blogs/${blog.documentId}`) }}>
                            <CardContent className="p-4 flex flex-col md:flex-row gap-4">
                                {/* Blog Image */}
                                <div className="flex-shrink-0 w-full md:w-1/3">
                                    {blog.Thumbnail_image ? (
                                        <img
                                            src={`${STRIPI_API_ENDPOINT}${blog.Thumbnail_image.url}`}
                                            alt={blog?.blog_title || 'Blog Image'}
                                            className="w-full h-40 object-cover rounded-md"
                                        />
                                    ) : (
                                        <div className="w-full h-40 bg-gray-200 flex items-center justify-center rounded-md">
                                            <span className="text-gray-500">No Image Available</span>
                                        </div>
                                    )}
                                </div>

                                {/* Blog Content */}
                                <div className="flex flex-col justify-between w-full md:w-2/3">
                                    <div>
                                        <h2 className="text-xl font-semibold text-gray-900 mb-2">{blog.blog_title}</h2>
                                        <p className="text-gray-600 mb-4">{blog.short_description.substring(0, 210)}...</p>
                                        <div className="flex gap-2 flex-wrap text-sm text-gray-500">
                                            {blog?.tags?.map((tag:any, tagIndex:number) => (
                                                <span
                                                    key={tagIndex}
                                                    className="bg-gray-200 rounded-full px-3 py-1 text-xs font-medium">
                                                    #{tag}
                                                </span>
                                            ))}
                                        </div>
                                    </div>
                                    <div className="flex justify-between items-center mt-4">
                                        <p className="text-gray-700 font-medium">Author: {blog.author}</p>
                                        <p className="text-sm text-gray-500">⌛ {blog.read_time} min read</p>
                                    </div>
                                </div>
                            </CardContent>
                        </Card>
                    ))}
                </div>
            </div>

            <Footer />
        </div>
    );
};

export default BlogPage;
