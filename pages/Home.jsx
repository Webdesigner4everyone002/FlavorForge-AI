import { useState } from 'react';
import { api } from '../api';
import { useNavigate } from 'react-router-dom';
import { Container, Form, Button, Spinner, Alert } from 'react-bootstrap';
import IngredientChips from '../components/IngredientChips';

const DIETS = ['Vegetarian', 'Vegan', 'Gluten-Free', 'Keto', 'Paleo'];
const CUISINES = ['Any', 'Indian', 'Italian', 'Mexican', 'Chinese', 'Thai'];

export default function Home() {
  const [ingredients, setIngredients] = useState([]);
  const [dietary, setDietary] = useState([]);
  const [cuisine, setCuisine] = useState('Any');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  async function onGenerate() {
    setError('');
    setLoading(true);
    try {
      const res = await api.post('/recipes/generate', {
        ingredients,
        dietary_restrictions: dietary,
        cuisine_type: cuisine === 'Any' ? '' : cuisine,
      });
      navigate(`/recipe/${res.data._id || res.data.recipe_id}`);
    } catch (err) {
      setError(err.response?.data?.error || 'Failed to generate recipe');
    } finally {
      setLoading(false);
    }
  }

  return (
    <Container style={{ maxWidth: '600px' }}>
      <h2 className="fw-bold mb-4 text-center">Generate a Personalized Recipe</h2>
      <Form>
        <Form.Group className="mb-3">
          <Form.Label>Ingredients</Form.Label>
          <IngredientChips onChange={setIngredients} />
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>Dietary Restrictions</Form.Label>
          <div className="d-flex flex-wrap gap-3">
            {DIETS.map(d => (
              <Form.Check
                key={d}
                type="checkbox"
                label={d}
                checked={dietary.includes(d.toLowerCase())}
                onChange={(e) => {
                  if (e.target.checked)
                    setDietary([...dietary, d.toLowerCase()]);
                  else
                    setDietary(dietary.filter(x => x !== d.toLowerCase()));
                }}
              />
            ))}
          </div>
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>Cuisine Type</Form.Label>
          <Form.Select value={cuisine} onChange={(e) => setCuisine(e.target.value)}>
            {CUISINES.map(c => <option key={c}>{c}</option>)}
          </Form.Select>
        </Form.Group>

        <div className="text-center">
          <Button variant="dark" disabled={loading} onClick={onGenerate}>
            {loading ? <Spinner size="sm" animation="border" /> : 'Generate Recipe'}
          </Button>
        </div>

        {error && <Alert variant="danger" className="mt-3">{error}</Alert>}
      </Form>
    </Container>
  );
}
