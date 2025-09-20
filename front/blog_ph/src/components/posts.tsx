"use client";

import { useEffect, useState } from 'react';
import api from '../lib/api';
import { Button } from '@/components/ui/button';
import { formatDate } from '../utils/formatDate';
import { Badge } from '@/components/ui/badge';

interface Post {
  id: number;
  title: string;
  summary: string;
  body: string;
  published_at: string;
  author: string;
}

export default function Posts() {

    const [posts, setPosts] = useState<Post[]>([]);

    useEffect(() => {
    const fetchPosts = async () => {
        try {
            const res = await api.get("/posts");
            setPosts(res.data.data);
        } catch (error) {
            console.error(error);
        }
    };

    fetchPosts();
    }, []);

    return (
        <main className="container px-4 mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12 my-8 md:my-12 lg:my-14 xl:my-24">
            {posts.map((post) => (
                <div key={post.id} className="p-4 border rounded-lg shadow">
                    <h2 className="text-md font-semibold">{post.title}</h2>
                    <div className='flex w-full justify-between items-center mb-3'>
                        <div className='flex w-auto gap-1 text-xs text-gray-400'>
                            <p>{post.author.name}</p>
                            •
                            <p>{formatDate(post.published_at)}</p>  
                        </div>

                        <div className='flex gap-1'>
                            {post.tags.map((tag: any) => (
                                <Badge key={tag.id}>{tag.name}</Badge>
                            ))}
                        </div>
                    </div>
                    <p className='text-sm'>{post.summary}</p>
                    <Button className='w-full py-6 mt-4 cursor-pointer'>Ler post</Button>
                </div>
            ))}
        </main>
    );
}