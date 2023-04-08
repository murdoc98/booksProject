import { Request, Response } from 'express';
import Reader from '../schemas/reader.schema';

const _ = async (req: Request, res: Response) => {
  const _id = req.auth.payload.sub.split('|')[1];
  console.log(req.body);
  const book = { name: req.body.name, external_id: req.body.key };
  await Reader.updateOne(
    { _id },
    {
      $push: {
        books_to_read: book
      }
    }
  );
  res.status(200).json('Item added succesfully');
};

export default _;
