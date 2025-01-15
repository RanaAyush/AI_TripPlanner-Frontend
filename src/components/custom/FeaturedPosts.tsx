import React, { useEffect, useState } from 'react';
import { Card, CardContent } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast"
import axios from 'axios';
// @ts-ignore
import STRIPI_API_ENDPOINT from '../../utils/constants.js';
import { useNavigate } from 'react-router-dom';


interface Blog {
    id: number;
    blog_title: string;
    short_description: string;
    blog_content:string;
    createdAt: string;
    updatedAt: string;
    publishedAt: string;
    blog_images: {};
    Thumbnail_image:{url:string;};
    documentId:string;  
    author: string;
}

const FeaturedPosts: React.FC = () => {
    const [blogData, setBlogData] = useState<Blog[]>([]);
    const { toast } = useToast();

    const getAllBlogs = async () => {
        try {
            const response = await axios.get(`${STRIPI_API_ENDPOINT}/api/blogs?populate=*&pagination[limit]=5`, {
                headers: {
                    'Content-Type': 'application/json',
                },
            });
            setBlogData(response.data?.data);
            // console.log(response.data?.data);

        } catch (error) {
            toast({
                variant: "destructive",
                title: 'Sorry!',
                description: "failed to fetch blogs: Strapi seems offline",
            });
            console.error("Error fetching blogs:", error);
        }
    };

    useEffect(() => {
        getAllBlogs();
    }, []);
    const navigate = useNavigate();

    const MainFeaturePost: React.FC<{ blog: Blog }> = ({ blog }) => (
        <Card className="h-full overflow-hidden group cursor-pointer" onClick={() => { navigate(`/blogs/${blog.documentId}`) }}>
            <div className="relative h-full">
                <img
                    src={`${STRIPI_API_ENDPOINT}${blog.Thumbnail_image.url}`}
                    alt={blog.blog_title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                />
                <div className="absolute inset-0 bg-black/20"></div>
                <div className="absolute bottom-0 p-6 text-white">
                    <h2 className="text-2xl font-bold mb-2">{blog.blog_title}</h2>
                    <p className="text-sm opacity-90 mb-4">{blog.short_description}</p>
                    <div className="flex items-center">
                        <div className="text-sm">
                            <span>{blog.author}</span>
                            <span className="mx-2">•</span>
                            <span>{new Date(blog.publishedAt).toLocaleDateString()}</span>
                        </div>
                    </div>
                </div>
            </div>
        </Card>
    );

    const RegularPost: React.FC<{ blog: Blog }> = ({ blog }) => (
        <Card className="overflow-hidden group cursor-pointer" onClick={() => { navigate(`/blogs/${blog.documentId}`) }}>
            <div className="relative">
                <div className="h-[200px] overflow-hidden">
                    <img
                        src={`${STRIPI_API_ENDPOINT}${blog.Thumbnail_image.url}`}
                        alt={blog.blog_title}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                </div>
                <CardContent className="p-4">
                    <h3 className="font-bold mb-2">{blog.blog_title}</h3>
                    <p className="text-sm text-gray-600 mb-4 line-clamp-2">{blog.short_description}</p>
                    <div className="flex items-center">

                        <div className="text-sm text-gray-500">
                            <span>{blog.author}</span>
                            <span className="mx-2">•</span>
                            <span>{new Date(blog.publishedAt).toLocaleDateString()}</span>
                        </div>
                    </div>
                </CardContent>
            </div>
        </Card>
    );

    const [mainBlog, ...regularBlogs] = blogData;
    const displayRegularBlogs = regularBlogs.slice(0, 4);

    if (blogData.length === 0) {
        return (
            <div className="max-w-7xl mx-auto px-4 py-4">
                <h1 className="text-5xl font-semibold mb-14 pl-3 animate-right">Featured Posts</h1>
                <div className="text-center py-10">Loading blogs...</div>
            </div>
        );
    }

    return (
        <div className="max-w-7xl mx-auto px-4 py-4">
            <h1 className="text-5xl font-semibold mb-14 pl-3 animate-right">Featured Posts</h1>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="md:col-span-1 h-full">
                    {mainBlog && <MainFeaturePost blog={mainBlog} />}
                </div>
                <div className="md:col-span-1">
                    <div className="grid grid-cols-2 gap-6 h-full">
                        {displayRegularBlogs.map((blog) => (
                            <RegularPost key={blog.id} blog={blog} />
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default FeaturedPosts;