import { Request, Response } from 'express';
import Reader from '../schemas/reader.schema';

const _ = async (req: Request, res: Response) => {
  const _id = req.auth.payload.sub.split('|')[1];
  let score;
  if (req.body.score == 'Really good') score = 5;
  else if (req.body.score == 'Good') score = 4;
  else if (req.body.score == 'Meh') score = 3;
  else if (req.body.score == 'Bad') score = 2;
  else score = 1;
  const book = {
    name: req.body.name,
    external_id: req.body.key,
    startDate: req.body.startDate,
    endDate: req.body.endDate,
    author: req.body.author,
    pages: req.body.pages,
    review: req.body.review,
    publisher: req.body.publisher,
    year: req.body.year,
    score: req.body.score
  };
  await Reader.updateOne(
    { _id },
    {
      $push: {
        books_readed: book
      }
    }
  );
  res.status(200).json('Item added succesfully');
};

export default _;
