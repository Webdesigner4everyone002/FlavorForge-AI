import { z } from 'zod';

export const generateSchema = z.object({
  ingredients: z.array(z.string()).default([]),
  dietary_restrictions: z.array(z.string()).default([]),
  cuisine_type: z.string().default('')
});

export function validateBody(schema) {
  return (req, res, next) => {
    try {
      req.validated = schema.parse(req.body);
      next();
    } catch (err) {
      res.status(400).json({ error: 'Invalid input', details: err.errors });
    }
  };
}
