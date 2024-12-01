import { useEffect, useState, useCallback } from "react";
import { toast } from "sonner";
import qs from "query-string";
import { IEstate } from "@/lib/interfaces/estate";
import { get } from "@/lib/endpoints";

export const useEstatesPages = (estateId?: string) => {
  const [estates, setEstates] = useState<IEstate[]>([]);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [totalPages, setTotalPages] = useState<number>(1);
  const [loading, setLoading] = useState<boolean>(false);
  const [loadingPage, setLoadingPage] = useState<boolean>(false);
  const [estate, setEstate] = useState<IEstate | null>(null);

  const getEstates = useCallback(async (page: number) => {
    // Avoid unnecessary request if we already have estates for this page
    if (loading || (page === currentPage && estates.length > 0)) return;

    const url = qs.stringifyUrl({
      url: "estates",
      query: { page, limit: 10 },
    });

    try {
      setLoading(true);
      const res = await get(url);
      setTotalPages(res.data.totalPages);
      setCurrentPage(res.data.currentPage);
      setEstates(res.data.items);
    } catch (error: any) {
      toast.error(error.response?.data || "Error fetching estates");
    } finally {
      setLoading(false);
    }
  }, [currentPage, estates.length, loading]);

  useEffect(() => {
    if (estateId && !estate) {
      // If we are fetching a specific estate by ID, only fetch if we haven't already
      getEstate(estateId);
    }
  }, [estateId, estate]);

  useEffect(() => {
    if (estates.length === 0) {
      getEstates(1);
    }
  }, [estates.length, getEstates]);

  const getEstate = useCallback(async (estateId: string) => {
    if (loadingPage) return; // Prevent re-fetching if already loading

    try {
      setLoadingPage(true);
      const res = await get(`estates/${estateId}`);
      setEstate(res.data);
    } catch (error: any) {
      toast.error("Error fetching estate");
    } finally {
      setLoadingPage(false);
    }
  }, [loadingPage]);

  const loadNext = () => {
    if (currentPage < totalPages && !loading) {
      getEstates(currentPage + 1);
    }
  };

  const loadPrev = () => {
    if (currentPage > 1 && !loading) {
      getEstates(currentPage - 1);
    }
  };

  const hasNextPage = currentPage < totalPages;
  const hasPrevPage = currentPage > 1;

  return {
    estates,
    setEstates,
    estate,
    loadingPage,
    setEstate,
    loadNext,
    loadPrev,
    loading,
    getEstate,
    hasNextPage,
    hasPrevPage,
  };
};
