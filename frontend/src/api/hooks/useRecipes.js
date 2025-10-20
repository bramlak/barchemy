import { useState, useEffect } from 'react';
import { API_BASE_URL, handleResponse } from '../utils';

export function useRecipes() {
  const [recipes, setRecipes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function fetchRecipes() {
      try {
        const response = await fetch(`/api/recipes/`);
        const data = await handleResponse(response);
        setRecipes(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    }
    fetchRecipes();
  }, []);

  return { recipes, loading, error };
}