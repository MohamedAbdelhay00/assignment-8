import { Router } from 'express';
import {
  createAuthor,
  getAllAuthors,
  getAuthorById,
  updateAuthor,
  deleteAuthor,
} from './author.controller.js';

const authorRouter = Router();

authorRouter.post('/', createAuthor);
authorRouter.get('/', getAllAuthors);
authorRouter.get('/:id', getAuthorById);
authorRouter.patch('/:id', updateAuthor);
authorRouter.delete('/:id', deleteAuthor);

export default authorRouter;
