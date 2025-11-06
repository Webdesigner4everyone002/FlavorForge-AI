import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { api } from '../api';
import { Spinner, Button, Form, Alert } from 'react-bootstrap';

export default function RecipeDetail() {
  const { id } = useParams();
  const [recipe, setRecipe] = useState(null);
  const [loading, setLoading] = useState(true);
  const [rating, setRating] = useState(5);
  const [msg, setMsg] = useState('');

  useEffect(() => {
    async function fetchRecipe() {
      try {
        const res = await api.get(`/recipes/${id}`);
        setRecipe(res.data);
      } catch {
        setMsg('Recipe not found');
      } finally {
        setLoading(false);
      }
    }
    fetchRecipe();
  }, [id]);

  async function saveRecipe() {
    await api.post(`/recipes/${id}/save`);
    setMsg('Recipe saved!');
  }

  async function rateRecipe() {
    await api.post(`/recipes/${id}/rate`, { value: Number(rating) });
    setMsg('Thanks for rating!');
  }

  if (loading) return <div className="text-center"><Spinner animation="border" /></div>;
  if (!recipe) return <Alert variant="danger">{msg}</Alert>;

  return (
    <div style={{ maxWidth: '700px', margin: 'auto' }}>
      <h2 className="fw-bold mb-3">{recipe.title}</h2>
      <p><b>Prep Time:</b> {recipe.prep_time} | <b>Difficulty:</b> {recipe.difficulty}</p>

      <h5>Ingredients</h5>
      <ul>
        {recipe.ingredients.map((i, idx) => (
          <li key={idx}>{i.quantity} {i.name}</li>
        ))}
      </ul>

      <h5>Instructions</h5>
      <ol>
        {recipe.instructions.map((s, idx) => <li key={idx}>{s}</li>)}
      </ol>

      <div className="mt-4">
        <Button variant="dark" onClick={saveRecipe}>Save Recipe</Button>
      </div>

      <div className="mt-3">
        <Form.Select
          style={{ width: '150px', display: 'inline-block', marginRight: '10px' }}
          value={rating}
          onChange={(e) => setRating(e.target.value)}
        >
          {[1,2,3,4,5].map(n => <option key={n}>{n}</option>)}
        </Form.Select>
        <Button variant="outline-dark" onClick={rateRecipe}>Rate</Button>
      </div>

      {msg && <Alert className="mt-3" variant="info">{msg}</Alert>}
    </div>
  );
}
