import { useEffect, useState, useCallback } from 'react'
import globalAxios from '@/api/axios'

export function useUserReviews(userId) {
  const [reviews, setReviews] = useState([])
  const [isLoading, setLoading] = useState(true)
  const [isError, setError] = useState(null)

  const fetchReviews = useCallback(async () => {
    try {
      setLoading(true)
      const res = await globalAxios.get(`/reviews/user/${userId}`)
      setReviews(res.data.data || [])
      setError(null)
    } catch (err) {
      setError(err)
    } finally {
      setLoading(false)
    }
  }, [userId])

  const updateReview = async (id, data) => {
    const res = await globalAxios.put(`/reviews/${id}`, data);
    const updatedReview = res.data.data;

    setReviews((prev) =>
      prev.map((r) =>
        r.review_id === id ? { ...r, ...updatedReview } : r
      )
    );
  };


  const deleteReview = async (id) => {
    await globalAxios.delete(`/reviews/${id}`)
    setReviews((prev) => prev.filter((r) => r.review_id !== id))
  }

  useEffect(() => {
    fetchReviews()
  }, [fetchReviews])

  return {
    reviews,
    isLoading,
    isError,
    fetchReviews,
    updateReview,
    deleteReview,
  }
}