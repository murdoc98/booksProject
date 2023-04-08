import { Request, Response } from 'express';
import Reader from '../schemas/reader.schema';

const _ = async (req: Request, res: Response) => {
  const _id = req.auth.payload.sub.split('|')[1];
  await Reader.updateOne(
    {
      _id,
      'books_readed._id': req.body._id
    },
    {
      $set: {
        'books_readed.$': req.body
      }
    }
  );
  res.status(200).json('Item updated succcesfully');
};

export default _;
