"use client";

import Image from 'next/image';
import LoginPage from '../../components/login';
import bannerImage from '../../../public/login_blog.jpg';
import { Card, CardContent } from '@/components/ui/card';
import Link from 'next/link';

export default function Login() {
  return (
    <main className='w-full h-screen flex'>
        <div className='w-[60%] hidden md:flex h-full relative'>
            <Image 
                src={bannerImage}
                alt={'Banner de login da Ph Negócios Oficial.'}
                fill
                objectFit='cover'
                priority            
            />
            <div className='w-full h-full absolute inset-0 bg-black/40'/>

            <div className='w-full px-10 absolute top-10'>
                <h2 className='text-lg text-white/80'>#OrgulhoDeSerPhzeiro</h2>
            </div>

            <div className='w-full px-10 absolute top-1/2'>
                <h2 className='text-5xl text-white font-bold'>E aí, PhZeiro!</h2>
                <p className='text-white/80 text-2xl'>Entre para gerenciar os posts que contam <br/> sobre nossa história, momentos e planos.</p>
            </div>

            <div className='w-full px-10 absolute bottom-7'>
                <Card className='bg-black/70 border-none backdrop-blur-sm *:text-white'>
                    <CardContent className='w-full flex justify-between px-6'>
                        <h3 className='text-lg text-white/80'>Contando nossas histórias, criando novos destinos.</h3>
                        <Link href='/' className='hover:underline cursor-pointer'>Acessar blog</Link>
                    </CardContent>
                </Card>
            </div>
        </div>

        <div className='w-full md:w-[40%] container flex flex-col items-center justify-content-center h-full'>
            <LoginPage />
        </div>
    </main>
);
}