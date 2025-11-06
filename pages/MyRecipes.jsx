import { useEffect, useState } from 'react';
import { api } from '../api';
import RecipeCard from '../components/RecipeCard';
import { Row, Col, Form, Spinner } from 'react-bootstrap';

export default function MyRecipes() {
  const [recipes, setRecipes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [query, setQuery] = useState('');

  async function fetchRecipes() {
    try {
      const res = await api.get('/recipes');
      setRecipes(res.data);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => { fetchRecipes(); }, []);

  async function handleDelete(id) {
    await api.delete(`/recipes/${id}`);
    fetchRecipes();
  }

  const filtered = recipes.filter(r =>
    r.title.toLowerCase().includes(query.toLowerCase())
  );

  return (
    <>
      <h2 className="fw-bold mb-3">My Saved Recipes</h2>
      <Form.Control
        type="text"
        placeholder="Search recipes..."
        className="mb-4"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
      />

      {loading ? (
        <div className="text-center mt-5">
          <Spinner animation="border" variant="dark" />
        </div>
      ) : (
        <Row xs={1} md={2} lg={3} className="g-4">
          {filtered.map(r => (
            <Col key={r._id}>
              <RecipeCard recipe={r} onDelete={handleDelete} />
            </Col>
          ))}
        </Row>
      )}
    </>
  );
}
