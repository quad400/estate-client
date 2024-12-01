"use client";

import React, { useEffect } from "react";

import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from "@/components/ui/carousel";
import { ArrowDown, Plus, Star } from "lucide-react";

import { Skeleton } from "@/components/ui/skeleton";
import EstateCard from "@/components/estate-card";
import Feedback from "@/components/feedback";
import EstateId from "@/components/estate-id";
import { useEstatesPages } from "@/hooks/use-estates";

const Page = ({ params }: { params: { estateId: string } }) => {

  
  const { loading, estates } = useEstatesPages();

  return (
    <div className="w-full h-full py-[75px]">
      <EstateId estateId={params.estateId} />
      <Feedback estateId={params.estateId} />
      <div className="mt-4 container">
        <div className="my-3">
          <h2 className="text-lg md:text-2xl font-semibold text-neutral-800">
            Similar Product
          </h2>
        </div>
        <div>
          {loading && estates.length === 0 && (
            <div className="w-full sm:w-[230px] space-y-2">
              <Skeleton className="w-full h-[200px]" />
              <div className="flex flex-col space-y-2">
                <Skeleton className="h-8 w-full" />
                <Skeleton className="h-8 w-4/5" />
                <Skeleton className="h-8 w-4/5" />
              </div>
            </div>
          )}
        </div>

        <div className="hidden gap-3 sm:grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
          {estates.map((item) => (
            <EstateCard key={item._id} item={item} />
          ))}
        </div>

        <Carousel className="flex sm:hidden justify-center items-center mt-4">
          <CarouselContent className="w-full space-x-4 py-4">
            {estates.map((item, index) => (
              <CarouselItem
                key={item._id}
                className="flex flex-col basis-4/5 w-11/12 shadow"
              >
                <EstateCard item={item} />
              </CarouselItem>
            ))}
          </CarouselContent>
        </Carousel>
      </div>

      <button className="fixed bottom-8 right-8 bg-neutral-800 text-white p-2 h-14 w-auto rounded-full shadow-lg flex justify-between items-center space-x-2 hover:bg-neutral-700 transition duration-500 animate-bounce">
        <ArrowDown className="h-6 w-6 text-white" />
        <span className="text-sm font-medium">Buy Now</span>
      </button>
    </div>
  );
};

export default Page;
