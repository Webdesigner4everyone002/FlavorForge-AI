import { Card, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';

export default function RecipeCard({ recipe, onDelete }) {
  return (
    <Card className="h-100 shadow-sm">
      <Card.Body>
        <Card.Title>{recipe.title}</Card.Title>
        <Card.Subtitle className="text-muted mb-2">
          Prep: {recipe.prep_time || 'N/A'} | Difficulty: {recipe.difficulty || 'easy'}
        </Card.Subtitle>
        <Card.Text>
          Cuisine: {recipe.cuisine_type || 'General'}
        </Card.Text>
        <Button as={Link} to={`/recipe/${recipe._id}`} variant="dark" size="sm" className="me-2">
          View
        </Button>
        {onDelete && (
          <Button
            variant="outline-danger"
            size="sm"
            onClick={() => onDelete(recipe._id)}
          >
            Delete
          </Button>
        )}
      </Card.Body>
    </Card>
  );
}
