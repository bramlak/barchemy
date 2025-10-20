import { useState, useEffect } from 'react';
import { API_BASE_URL, handleResponse } from '../utils';

export function useMixableRecipes(inventory) {
  const [mixableRecipes, setMixableRecipes] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!inventory || inventory.length === 0) return;

    async function fetchMixable() {
      setLoading(true);
      try {
        const response = await fetch(`/api/recipes/mixable`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(inventory),
        });
        const data = await handleResponse(response);
        setMixableRecipes(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    }
    fetchMixable();
  }, [inventory]);

  return { mixableRecipes, loading, error };
}