import { Router } from 'express';
import {
  createBook,
  getAllBooks,
  getBookById,
  updateBook,
  deleteBook,
} from './book.controller.js';

const bookRouter = Router();

bookRouter.post('/', createBook);
bookRouter.get('/', getAllBooks);
bookRouter.get('/:id', getBookById);
bookRouter.patch('/:id', updateBook);
bookRouter.delete('/:id', deleteBook);

export default bookRouter;
