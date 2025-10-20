import { useState, useEffect } from 'react';
import { API_BASE_URL, handleResponse } from '../utils';

export function useIngredients() {
  const [ingredients, setIngredients] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function fetchIngredients() {
      try {
        const response = await fetch(`/api/ingredient`);
        const data = await handleResponse(response);
        setIngredients(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    }
    fetchIngredients();
  }, []);

  return { ingredients, setIngredients, loading, error };
}