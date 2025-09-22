"use client";

import Image from 'next/image';
import { useEffect, useState } from 'react';

const bannerImages = [
  { src: '/CARROSSEL-CAPA_01.png', width: 1920, height: 1080},
  { src:'/CARROSSEL-CAPA_02.png', width: 1920, height: 1080},
  { src: '/CARROSSEL-CAPA_03.png', width: 1920, height: 1080}
];

export default function Banner() {
    const [currentImageIndex, setCurrentImageIndex] = useState(0);

    useEffect(() => {
        const interval = setInterval(() => {
        setCurrentImageIndex((prevIndex) => 
            (prevIndex + 1) % bannerImages.length
        );
        }, 5000); 

        return () => clearInterval(interval);
    }, []); 

    return (
        <div className="w-full">
            <Image
                src={bannerImages[currentImageIndex].src}
                width={bannerImages[currentImageIndex].width}
                height={bannerImages[currentImageIndex].height}
                alt="Banner de Fundo"
                className="inset-0 w-full h-auto xl:h-200 3xl:h-256 transition-opacity duration-1000 ease-in-out"
                style={{
                    opacity: 1,
                }}
            />
        </div>
    );
}