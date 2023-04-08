import { Router, Request, Response } from 'express';
import { auth } from 'express-oauth2-jwt-bearer';
import dotenv from 'dotenv';

// Controllers
import getUser from './controllers/getUser.controller';

import getBooksReaded from './controllers/getBooksReaded.controller';
import postBookToRead from './controllers/postBookToRead.controller';
import deleteBookToRead from './controllers/deleteBookToRead.controller';

import getBooksToRead from './controllers/getBooksToRead.controller';
import postBookReaded from './controllers/postBookReaded.controller';
import deleteBookReaded from './controllers/deleteBookReaded.controller';
import updateBookReaded from './controllers/updateBookReaded.controller';

const router = Router();
dotenv.config();

const auth0 = auth({
  audience: process.env.ATUH0_AUDIENCE,
  issuerBaseURL: process.env.AUTH0_ISSUEBASEURL,
});

router.get('/', (req: Request, res: Response) => {
  res.status(200).json('Ok');
});

// User endpoints
router.get('/currentUser', auth0, getUser);

// Books readed endpoints
router.get('/booksreaded', auth0, getBooksReaded)
router.post('/bookreaded', auth0, postBookReaded);
router.delete('/bookreaded/:id', auth0, deleteBookReaded);
router.put('/bookreaded/:id', auth0, updateBookReaded);

// Books to read endpoints
router.get('/booksToRead', auth0, getBooksToRead);
router.post('/bookToRead', auth0, postBookToRead);
router.delete('/bookToRead/:id', auth0, deleteBookToRead);

// Catch non implemented routes
router.all('*', (req: Request, res: Response) => {
  res.status(404).json('Route not found');
});

export default router;