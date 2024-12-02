"use client";

import Image from "next/image";
import React from "react";
import { Naira } from "../../../../utils";
import Link from "next/link";
import { Edit } from "lucide-react";
import { useEstates } from "@/hooks/use-estate";
import { Skeleton } from "@/components/ui/skeleton";
import { useGetEstate } from "@/hooks/use-estatee";

const Page = ({ params }: { params: { estateId: string } }) => {
  const { data, isFetching } = useGetEstate(params.estateId);

  if (isFetching) {
    return (
      <div className="w-full">
        <div className="flex container flex-col justify-start space-y-2 items-start">
          <Skeleton className="h-[200px] w-[200px]" />
          <Skeleton className="h-[50px] w-[300px]" />
          <div className="flex space-x-4 items-center justify-between">
            <Skeleton className="h-[50px] w-[150px]" />
            <Skeleton className="h-[50px] w-[150px]" />
          </div>
          <Skeleton className="h-[150px] w-[300px]" />
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col space-y-3 justify-start items-start container">
      <div className="flex justify-end w-full items-start -mt-8">
        <Link
          href={`/dashboard/estate/${data._id}/edit`}
          className="bg-primary-light/10 shadow-md text-center space-x-2 px-4 py-3 text-primary-dark hover:bg-white/90 flex rounded-xl font-medium transition-all"
        >
          <Edit className="text-primary-dark h-4 w-4" />
          <p className="text-primary-dark font-medium text-sm">
            Update Product
          </p>
        </Link>
      </div>
      <div className="flex flex-wrap gap-4 justify-start items-center">
        {data.images.map((image: string, index: number) => (
          <div key={index} className="relative w-[200px] h-[200px]">
            <Image src={image} alt="Product" fill className="object-cover" />
          </div>
        ))}
      </div>
      <div className="flex flex-col justify-start items-start">
        <h2 className="text-xl font-bold text-neutral-800">{data.title}</h2>
      </div>
      <div className="flex space-x-3 justify-start items-start flex-wrap">
        <p className="text-neutral-800 font-normal text-sm">{data.location}</p>
        <p className="text-neutral-800 font-normal text-sm">
          {Naira.format(data.price)}
        </p>
      </div>
      <p className="text-sm font-normal text-neutral-700 max-w-2xl">
        {data.details}
      </p>
    </div>
  );
};

export default Page;
