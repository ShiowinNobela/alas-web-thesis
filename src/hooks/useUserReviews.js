import { useEffect, useState, useCallback } from 'react'
import axios from '../lib/axios-config'

export function useUserReviews(userId) {
  const [reviews, setReviews] = useState([])
  const [isLoading, setLoading] = useState(true)
  const [isError, setError] = useState(null)

  const fetchReviews = useCallback(async () => {
    try {
      setLoading(true)
      const res = await axios.get(`/api/reviews/user/${userId}`)
      setReviews(res.data.data || [])
      setError(null)
    } catch (err) {
      setError(err)
    } finally {
      setLoading(false)
    }
  }, [userId])

  const updateReview = async (id, data) => {
    const res = await axios.put(`/api/reviews/${id}`, data);
    const updatedReview = res.data.data;

    setReviews((prev) =>
      prev.map((r) =>
        r.review_id === id ? { ...r, ...updatedReview } : r
      )
    );
  };


  const deleteReview = async (id) => {
    await axios.delete(`/api/reviews/${id}`)
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