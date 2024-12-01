"use client";

import React, { useEffect, useRef, useState } from "react";

import { Naira } from "@/utils";
import Autoplay from "embla-carousel-autoplay";
import Image from "next/image";
import { cn } from "@/lib/utils";
import { ScrollTrigger } from "gsap/ScrollTrigger";

import { useEstatesPages } from "@/hooks/use-estates";
import { IEstate } from "@/lib/interfaces/estate";
import {
  Carousel,
  CarouselApi,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { Skeleton } from "./ui/skeleton";
import { Star } from "lucide-react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";

const EstateId = ({ estateId }: { estateId: string }) => {
  const { estate, loadingPage } = useEstatesPages(estateId);
  const [api, setApi] = useState<CarouselApi | null>(null);
  const [current, setCurrent] = useState(0);
  const [count, setCount] = useState(0);

  // Refs for animation targets
  const titleRef = useRef(null);
  const detailsRef = useRef(null);
  const agentInfoRef = useRef(null);

  useEffect(() => {
    if (!api) return;

    setCount(api.scrollSnapList().length);
    setCurrent(api.selectedScrollSnap() + 1);

    api.on("select", () => {
      setCurrent(api.selectedScrollSnap() + 1);
    });
  }, [api]);

  useGSAP(() => {
    // Triggering animation when the component mounts and when scrolling into view
    gsap.fromTo(
      titleRef.current,
      { opacity: 0, y: 50 },
      {
        opacity: 1,
        y: 0,
        scrollTrigger: {
          trigger: titleRef.current,
          start: "top 80%",
          end: "bottom top",
          scrub: true,
          toggleActions: "play none none none",
        },
      }
    );

    gsap.fromTo(
      detailsRef.current,
      { opacity: 0, y: 50 },
      {
        opacity: 1,
        y: 0,
        scrollTrigger: {
          trigger: detailsRef.current,
          start: "top 80%",
          end: "bottom top",
          scrub: true,
          toggleActions: "play none none none",
        },
      }
    );

    gsap.fromTo(
      agentInfoRef.current,
      { opacity: 0, y: 50 },
      {
        opacity: 1,
        y: 0,
        scrollTrigger: {
          trigger: agentInfoRef.current,
          start: "top 80%",
          end: "bottom top",
          scrub: true,
          toggleActions: "play none none none",
        },
      }
    );
  }, []);

  if (loadingPage || !estate) {
    return (
      <div className="flex flex-col w-full container">
        <Skeleton className="h-[300px] w-full" />
        <div className="flex flex-col space-y-3 mt-2">
          <Skeleton className="w-full md:w-2/3 h-8" />
          <div className="flex justify-between items-center">
            <Skeleton className="w-1/3 h-8" />
            <Skeleton className="w-1/3 h-8" />
          </div>
          <div className="flex justify-between items-center">
            <Skeleton className="w-1/3 h-8" />
            <Skeleton className="w-1/3 h-8" />
          </div>
        </div>
        <div className="flex flex-col w-full space-y-2 mt-4">
          <Skeleton className="w-1/3 h-8" />
          <Skeleton className="w-full h-4" />
          <Skeleton className="w-full h-4" />
          <Skeleton className="w-full h-4" />
          <Skeleton className="w-full h-4" />
        </div>
      </div>
    );
  }

  return (
    <div>
      {/* Carousel */}
      <div className="w-full">
        <Carousel
          setApi={setApi}
          className="w-full group"
          plugins={[
            Autoplay({
              delay: 7000,
            }),
          ]}
        >
          <CarouselContent className="w-full">
            {estate.images.map((image, index) => (
              <CarouselItem key={index} className="w-full">
                <div className="relative w-full h-[300px] md:h-[500px] lg:[600px]">
                  <Image src={image} alt={`${index}`} fill className="object-cover" />
                </div>
              </CarouselItem>
            ))}
          </CarouselContent>

          {/* Pagination */}
          <div className="absolute bottom-0 w-full justify-center items-start flex py-4 px-6 bg-neutral-800/30">
            {Array.from({ length: estate.images.length }).map((_, index) => (
              <div
                key={index}
                className={`w-3 h-2 ring-1 ring-neutral-200 transition-all ease-linear duration-700 rounded-full mx-1 ${index === current - 1 && "bg-neutral-200 w-8 rounded-lg"}`}
              />
            ))}
          </div>
        </Carousel>
      </div>

      {/* Estate Details */}
      <div className="w-full container mt-8 flex flex-col">
        <h1 ref={titleRef} className="text-2xl md:text-3xl font-bold scroll-text">{estate.title}</h1>
        <div className="flex justify-between items-center scroll-text">
          <p className="text-lg font-medium">{estate.category}</p>
          <p className="text-2xl md:text-3xl font-bold">{Naira.format(estate.price)}</p>
        </div>

        {/* Location & Rating */}
        <div className="flex justify-between items-center mt-4 scroll-text">
          <p className="text-lg font-medium">{estate.location}</p>
          <div className="flex justify-center items-center space-x-1">
            <span className="text-2xl font-medium text-neutral-800">
              {parseFloat(estate.ratings.toFixed(1))}
            </span>
            <Star className="text-[#f2dd1d] h-7 w-7" fill="#f2dd1d" />
          </div>
        </div>

        {/* Details Section */}
        <div ref={detailsRef} className="mt-4">
          <h2 className="text-lg mb-4 md:text-2xl font-semibold text-neutral-800 scroll-text">Details</h2>
          <p className="text-sm sm:text-base text-neutral-700 font-medium">{estate.details}</p>
        </div>

        {/* Agent Info */}
        <div ref={agentInfoRef} className="mt-4">
          <h2 className="text-lg mb-4 md:text-2xl font-semibold text-neutral-800">Agent Information</h2>
          <div className="flex flex-col space-y-2 scroll-text">
            <div className="flex justify-start items-center space-x-2">
              <h3 className="text-sm sm:text-base font-semibold text-neutral-500">Name</h3>
              <h3 className="text-sm sm:text-base font-medium text-neutral-800">{estate.agent.organization_name}</h3>
            </div>
            <div className="flex justify-start items-center space-x-2">
              <h3 className="text-sm sm:text-base font-semibold text-neutral-500">Phone Number</h3>
              <h3 className="text-sm sm:text-base font-medium text-neutral-800">{estate.agent.organization_phone}</h3>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EstateId;