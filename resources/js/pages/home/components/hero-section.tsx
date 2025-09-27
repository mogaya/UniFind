import { Button } from '@/components/ui/button';
import { Link } from '@inertiajs/react';
import Slider from 'react-slick';
import hero1 from '../assets/hero1.jpg';
import hero2 from '../assets/hero2.jpg';
import hero3 from '../assets/hero3.jpg';
import hero4 from '../assets/hero4.jpeg';

const sliderImages = [hero1, hero2, hero3, hero4];

const HeroSection = () => {
    const settings = {
        infinite: true,
        speed: 1000,
        autoplay: true,
        autoplaySpeed: 5000,
        fade: true,
        arrows: false,
        pauseOnHover: false,
    };

    return (
        <section className="relative h-[80vh] overflow-hidden md:h-[80vh]">
            {/* Carousel Background */}
            <div className="absolute inset-0 z-0">
                <Slider {...settings}>
                    {sliderImages.map((img, index) => (
                        <img key={index} src={img} className="h-[80vh] w-full object-cover md:h-[90vh]" />
                    ))}
                </Slider>
            </div>

            {/* Overlay filter */}
            <div className="absolute inset-0 z-10 bg-black/60" />

            {/* Overlay Content */}
            <div className="absolute inset-0 z-20 flex items-center justify-center px-4">
                <div className="flex w-full max-w-3xl min-w-[250px] flex-col items-center space-y-4 text-center text-white">
                    <h1 className="text-4xl font-bold md:text-5xl">Lost something?</h1>
                    <h1 className="text-4xl font-bold md:text-5xl">We'll help you find it.</h1>
                    <p className="text-md md:text-lg">
                        Connect with your campus community to recover lost items and help others find what they've misplaced.
                    </p>
                    <div className="flex gap-4">
                        <Link href={'/lost-items/create'}>
                            <Button size="lg">Report Lost Item</Button>
                        </Link>
                        <Link href={'/found-items/create'}>
                            <Button size="lg">Report Found Item</Button>
                        </Link>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default HeroSection;
