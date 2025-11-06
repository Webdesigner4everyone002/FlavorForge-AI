import { useState } from 'react';
import { Form, Button, Badge } from 'react-bootstrap';

export default function IngredientChips({ onChange }) {
  const [input, setInput] = useState('');
  const [items, setItems] = useState([]);

  const addIngredient = () => {
    const trimmed = input.trim();
    if (!trimmed) return;
    const updated = Array.from(new Set([...items, trimmed]));
    setItems(updated);
    setInput('');
    onChange?.(updated);
  };

  const removeIngredient = (i) => {
    const updated = items.filter(item => item !== i);
    setItems(updated);
    onChange?.(updated);
  };

  return (
    <>
      <div className="d-flex gap-2">
        <Form.Control
          type="text"
          placeholder="e.g. tomato"
          value={input}
          onChange={(e) => setInput(e.target.value)}
        />
        <Button variant="dark" onClick={addIngredient}>Add</Button>
      </div>

      <div className="mt-3 d-flex flex-wrap gap-2">
        {items.map(i => (
          <Badge pill bg="secondary" key={i}>
            {i} <span
              style={{ cursor: 'pointer', marginLeft: '5px' }}
              onClick={() => removeIngredient(i)}
            >×</span>
          </Badge>
        ))}
      </div>
    </>
  );
}
