"use client";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Edit, Loader, Plus, Trash } from "lucide-react";
import Image from "next/image";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import Link from "next/link";
import { useEstates } from "@/hooks/use-estate";
import { Naira } from "@/utils";
import { Skeleton } from "@/components/ui/skeleton";
// import { useGetMyEstates } from "@/hooks/use-estatee";
import { IEstate } from "@/lib/interfaces/estate";
import { useState } from "react";
import { toast } from "sonner";
import { keepPreviousData, useQuery } from "@tanstack/react-query";
import { getMyEstates } from "@/lib/server";
import { useDeleteEstate } from "@/hooks/use-estatee";
import { useModal } from "@/hooks/use-modal-store";

const Page = () => {


  const [page, setPage] = useState(1);
  const {onOpen} = useModal()
  
  const {mutateAsync} = useDeleteEstate()

  const { data, isPending, isPlaceholderData, isFetched, isFetching } =useQuery({
    queryKey: ["my-estates", page],
    queryFn: async () => await getMyEstates(page),
    
    placeholderData: keepPreviousData,
  });


  async function handleDelete(estateId: string) {
    onOpen("deleteEstate", {data: estateId})
  }
  
  return (
    <div className="w-full container">
      <div className="flex justify-end w-full items-start -mt-10">
        <Link
          href="/dashboard/estate/create"
          className="bg-primary-light/10 shadow-md text-center text-sm px-4 py-3 text-primary-dark hover:bg-white/90 flex rounded-xl space-x-2 transition-all"
        >
          <Plus className="text-primary-dark h-4 w-4" />
          <p className="text-primary-dark font-medium text-sm max-sm:hidden">
            Add Estate
          </p>
        </Link>
      </div>
 
      <Table className="w-full border-collapse mt-2 mb-5 border rounded-2xl">
        <TableHeader className="bg-neutral-200 w-full rounded-t-3xl">
          <TableRow>
            <TableHead className="">Estate(s)</TableHead>
            <TableHead className=""></TableHead>
            <TableHead className="">Price</TableHead>
            <TableHead className=""></TableHead>
            <TableHead className=""></TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {!isPending &&
            data?.items.map((item: IEstate) => (
              <TableRow key={item._id}>
                <TableCell>
                  <Link
                    href={`/dashboard/estate/${item._id}`}
                    className="flex flex-col md:flex-row justify-start space-x-1 items-start flex-1"
                  >
                    <Image
                      src={item.images[0]}
                      alt={item.title}
                      height={60}
                      width={60}
                      className="rounded-2xl object-cover aspect-square"
                    />

                    <h3 className="text-primary-dark uppercase text-xs sm:text-sm  font-semibold">
                      {item.title}
                    </h3>
                  </Link>
                </TableCell>
                <TableCell>{Naira.format(item.price)}</TableCell>
                <TableCell>
                  <Link
                    href={`/dashboard/estate/${item._id}/edit`}
                    className="bg-primary h-8 w-8 rounded-full flex justify-center items-center"
                  >
                    <Edit className="text-white h-4 w-4" />
                  </Link>
                </TableCell>
                <TableCell>
                  <button
                    onClick={() => handleDelete(item._id)}
                    className="bg-rose-200 h-8 w-8 rounded-full flex justify-center items-center"
                  >
                    <Trash className="h-4 w-4 text-rose-700" />
                  </button>
                </TableCell>
              </TableRow>
            ))}
        </TableBody>
        <TableBody>
          {isPending &&
            [1, 2].map((item) => (
              <TableRow key={item}>
                <TableCell>
                  <Skeleton className="h-20 w-full" />
                </TableCell>
                <TableCell>
                  <Skeleton className="h-10 w-full" />
                </TableCell>
                <TableCell>
                  <Skeleton className="h-10 w-full" />
                </TableCell>
                <TableCell>
                  <Skeleton className="h-10 w-10" />
                </TableCell>
                <TableCell>
                  <Skeleton className="h-10 w-10" />
                </TableCell>
              </TableRow>
            ))}
        </TableBody>
      </Table>
      {isFetching && (
        <div className="flex justify-end items-end">
          <Loader className="animate-spin h-4 w-4 text-neutral-600" />
        </div>
      )}
      {data?.items.length > 0 && (
        <div className="mt-4 mb-8 w-full justify-center items-center flex">
          <Pagination>
            <PaginationContent className="max-w-2xl flex justify-between items-center space-x-8">
              <PaginationItem>
                <PaginationPrevious
                  onClick={() => setPage((old) => Math.max(old - 1, 0))}
                  disabled={page === 1}
                />
              </PaginationItem>
              <PaginationItem>
                <PaginationNext
                  onClick={() => {
                    if (!isPlaceholderData && data.hasNextPage) {
                      setPage((old) => old + 1);
                    }
                  }}
                  disabled={isPlaceholderData || !data?.hasNextPage}
                />
              </PaginationItem>
            </PaginationContent>
          </Pagination>
        </div>
      )}

      {data?.items.length === 0 && isFetched && (
        <div className="flex w-full justify-center items-center mt-8">
          <p className="text-base sm:text-lg font-semibold text-neutral-800 text-center">
            Agent have not uploaded any estate yet
          </p>
        </div>
      )}
    </div>
  );
};

export default Page;
