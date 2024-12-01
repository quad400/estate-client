import { IEstate } from "@/lib/interfaces/estate";
import { Naira } from "@/utils";
import { Star } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import React from "react";

const EstateCard = ({ item }: { item: IEstate }) => {
  return (
    <Link href={`/${item._id}`} className="w-full group bg-white h-full shadow space-y-2">
      <div className="relative w-full h-[200px]">
        <Image
          src={item.images[0]}
          alt={item.title}
          fill
          className="object-cover"
        />
      </div>

      <div className="flex flex-col group-hover:bg-neutral-100 transition-all duration-500 ease-in-out justify-start items-start space-y-2 mt-2 px-3 w-full py-2">
        <h2 className="text-neutral-800 font-semibold text-base md:text-lg line-clamp-2  tracking-tighter">
          {item.title}
        </h2>
        <div className="flex w-full justify-between items-center flex-wrap">
          <h4 className="text-neutral-700 font-medium text-sm md:text-base">
            {item.category}
          </h4>
          <h2 className="text-neutral-700 font-medium text-lg md:text-xl">
            {Naira.format(item.price)}
          </h2>
        </div>
        <div className="flex w-full justify-between items-center flex-wrap">
          <h4 className="text-neutral-700 font-medium text-sm md:text-base">
            {item.location}
          </h4>
          <div className="flex space-x-1 justify-center items-center">
            <span className="text-sm text-neutral-800 font-medium">
              {parseFloat(item.ratings.toFixed(1))}
            </span>

            <Star
              className="text-[#f2dd1d]"
              fill="#f2dd1d"
              stroke="currentColor"
            />
          </div>
        </div>
      </div>
    </Link>
  );
};

export default EstateCard;
