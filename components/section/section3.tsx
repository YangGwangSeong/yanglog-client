import Image from "next/image";
import Link from "next/link";
import Author from "../_child/author";
import { Swiper, SwiperSlide } from 'swiper/react';
import SwiperCore, { Autoplay } from 'swiper';
import 'swiper/css';
import Spinner from "../_child/spinner";
import Error from "../_child/error";
import useSWR from 'swr';


interface PostsProps {
    id:Number;
    title:string;
    subtitle:string;
    category:string;
    img:string;
    description:string;
    published:string;
    author:{
        name:string;
        img:string;
        designation:string;
    }
}

const section3 = () => {
    SwiperCore.use([Autoplay]);

    const baseURL = "http://localhost:3000/";
    const response = (...args: Parameters<typeof fetch>) => fetch(...args).then((res) => res.json());
    const { data, isLoading, error } = useSWR<PostsProps[],Error>(`${baseURL}api/popular`,response);
    
    if(isLoading) return <Spinner></Spinner>;
    if(error) return <Error></Error>

    return(
        <div className="container mx-auto md:px-20 py-10">
            <h1 className="font-bold text-4xl py-12 text-left">인기 게시물</h1>
            <Swiper
                slidesPerView={2}
                loop={true}
                autoplay={{
                    delay:2000
                }}
                >
                {/* <SwiperSlide>{Post()}</SwiperSlide>
                <SwiperSlide>{Post()}</SwiperSlide>
                <SwiperSlide>{Post()}</SwiperSlide>
                <SwiperSlide>{Post()}</SwiperSlide> */}
                {
                    data&&
                    data.map((value:PostsProps,index:number) =>(
                        <SwiperSlide key={index}><Post data={value}></Post></SwiperSlide>
                    ))
                }
            </Swiper>
        </div>
    )
}

const Post = ({data}:{data:PostsProps}) =>{

    const {id, title, subtitle, description, category, img, published, author } = data;

    return (
        <div className="grid">
            <div className="images">
                <Link href={"/"}><a><Image src={img || "/"} width={600} height={400}></Image></a></Link>
            </div>
            <div className="info flex justify-center flex-col py-4">
                <div className="cat">
                    <Link href={"/"}><a className=" text-orange-600 hover:text-orange-800">{category || null}</a></Link>
                    <Link href={"/"}><a className=" text-gray-800 hover:text-gray-600">- {published || null}</a></Link>
                </div>
                <div className="title">
                    <Link href={"/"}><a className=" text-3xl md:text-4xl font-bold text-gray-800 hover:text-gray-600">{title || null}</a></Link>
                </div>
                <p className=" text-gray-500 py-3">
                    {description || null}
                </p>
                { author ? <Author></Author> : null }
            </div>
        </div>
    );
}

export default section3;