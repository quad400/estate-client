import { useCallback, useEffect, useState } from "react";
import { toast } from "sonner";
import qs from "query-string";
import { IFeedbacks } from "@/lib/interfaces/estate";
import { get, post } from "@/lib/endpoints";

export const useFeedbacks = (estateId: string) => {
  const [feedbacks, setFeedbacks] = useState<IFeedbacks[]>([]);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [totalPages, setTotalPages] = useState<number>(1);
  const [loading, setLoading] = useState<boolean>(false);

  // Function to fetch feedbacks and handle state updates only when data changes
  const getFeedbacks = useCallback(async (page: number) => {
    const url = qs.stringifyUrl({
      url: `estates/${estateId}/feedbacks`,
      query: {
        page: page,
        limit: 3,
      },
    });

    try {
      setLoading(true);
      const res = await get(url);
      const { items, currentPage: pageNum, totalPages: pages } = res.data;

      // Only update state if the feedbacks or pagination have changed
      setTotalPages(pages);
      setCurrentPage(pageNum);
      setFeedbacks(prevFeedbacks => {
        // If the page has not changed, return the previous state
        if (pageNum === currentPage) {
          return prevFeedbacks;
        }

        // Add new feedbacks only if they differ from the previous ones
        return pageNum === 1 ? items : [...prevFeedbacks, ...items];
      });
    } catch (error: any) {
      toast.error("Error fetching feedbacks");
    } finally {
      setLoading(false);
    }
  }, [estateId, currentPage]);  // Memoize getFeedbacks with estateId and currentPage dependencies

  // Fetch feedbacks when the estateId changes or on initial load
  useEffect(() => {
    if (estateId) {
      getFeedbacks(1);
    }
  }, [estateId, getFeedbacks]);

  // Load next page if available
  const loadNext = useCallback(() => {
    if (currentPage < totalPages && !loading) {
      const nextPage = currentPage + 1;
      setCurrentPage(nextPage); // Update current page before fetching
      getFeedbacks(nextPage);
    }
  }, [currentPage, totalPages, loading, getFeedbacks]);

  // Load previous page if available
  const loadPrev = useCallback(() => {
    if (currentPage > 1 && !loading) {
      const prevPage = currentPage - 1;
      setCurrentPage(prevPage); // Update current page before fetching
      getFeedbacks(prevPage);
    }
  }, [currentPage, loading, getFeedbacks]);

  // Submit a new feedback
  const newFeedback = useCallback(async (values: any) => {
    try {
      setLoading(true);
      await post(`/estates/${estateId}/feedbacks`, values);
      toast.success("Feedback submitted successfully");
    } catch (error) {
      toast.error("Error submitting feedback");
    } finally {
      setLoading(false);
    }
  }, [estateId, getFeedbacks]);

  // Pagination checks
  const hasNextPage = currentPage < totalPages;
  const hasPrevPage = currentPage > 1;

  return {
    feedbacks,
    setFeedbacks,
    loading,
    hasNextPage,
    hasPrevPage,
    loadNext,
    loadPrev,
    newFeedback,
  };
};
