import { useState } from 'react';
import { API_BASE_URL, handleResponse } from '../utils';

export function useMixRecipe() {
  const [changes, setChanges] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  async function mixRecipe(recipeData) {
    setLoading(true);
    setError(null);
    try {
      const response = await fetch(`${API_BASE_URL}/api/recipes/mix`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(recipeData),
      });
      const data = await handleResponse(response);
      setChanges(data);
      return data;
    } catch (err) {
      setError(err.message);
      throw err;
    } finally {
      setLoading(false);
    }
  }

  return { mixRecipe, changes, loading, error };
}