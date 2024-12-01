import { useCallback, useEffect, useState } from "react";
import { toast } from "sonner";
import qs from "query-string";
import { IEstate } from "@/lib/interfaces/estate";
import { deleteMethod, get } from "@/lib/endpoints";

export const useEstates = (estateId?: string) => {
  const [estate, setEstate] = useState<IEstate | null>(null);
  const [estates, setEstates] = useState<IEstate[]>([]);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [totalPages, setTotalPages] = useState<number>(1);
  const [loading, setLoading] = useState<boolean>(false);
  const [isDeleting, setIsDeleting] = useState(false);

  // Fetch estates based on the page
  const getEstates = useCallback(async (page: number) => {
    const url = qs.stringifyUrl({
      url: `estates/user/my-estates`,
      query: {
        page: page,
        limit: 10,
      },
    });

    try {
      setLoading(true);
      const res = await get(url);

      // Only update state if data has changed
      if (
        res.data.currentPage !== currentPage ||
        res.data.totalPages !== totalPages ||
        res.data.items !== estates
      ) {
        setTotalPages(res.data.totalPages);
        setCurrentPage(res.data.currentPage);
        setEstates(res.data.items);
      }
    } catch (error: any) {
      toast.error(error.response.data);
    } finally {
      setLoading(false);
    }
  }, [currentPage, totalPages, estates]); // Use dependencies to avoid unnecessary re-fetch

  // Initial load when hook is mounted (or estates are empty)
  useEffect(() => {
    if (estates.length === 0) {
      getEstates(1);
    }
  }, [estates.length, getEstates]);

  // Load next page
  const loadNext = useCallback(() => {
    if (currentPage < totalPages && !loading) {
      setCurrentPage(prev => prev + 1);
      getEstates(currentPage + 1);
    }
  }, [currentPage, totalPages, loading, getEstates]);

  // Load previous page
  const loadPrev = useCallback(() => {
    if (currentPage > 1 && !loading) {
      setCurrentPage(prev => prev - 1);
      getEstates(currentPage - 1);
    }
  }, [currentPage, loading, getEstates]);

  // Fetch estate details by ID
  const getEstate = useCallback(async (estateId: string) => {
    try {
      setLoading(true);
      const res = await get(`estates/${estateId}`);
      setEstate(res.data);
    } catch (error: any) {
      toast.error("Error Fetching Estate");
    } finally {
      setLoading(false);
    }
  }, []); // Only run once when needed

  // Delete estate by ID
  const deleteEstate = useCallback(async (estateId: string) => {
    try {
      setIsDeleting(true);
      await deleteMethod(`estates/${estateId}`);
      await getEstates(currentPage);
      toast.success("Estate deleted successfully");
    } catch (error: any) {
      toast.error("Error Deleting Estate");
    } finally {
      setIsDeleting(false);
    }
  }, [currentPage, getEstates]); // Ensure it doesn't trigger unnecessary re-fetch

  // Fetch estate details when `estateId` changes
  useEffect(() => {
    if (estateId) {
      getEstate(estateId);
    }
  }, [estateId, getEstate]);

  // Check if there's a next page or previous page
  const hasNextPage = currentPage < totalPages;
  const hasPrevPage = currentPage > 1;

  return {
    estates,
    setEstates,
    loadNext,
    loadPrev,
    loading,
    hasNextPage,
    hasPrevPage,
    estate,
    isDeleting,
    deleteEstate,
  };
};