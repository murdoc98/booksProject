import { Request, Response } from 'express';
import Reader from '../schemas/reader.schema';

const _ = async (req: Request, res: Response) => {
  const _id = req.auth.payload.sub.split('|')[1];
  await Reader.updateOne(
    { _id },
    {
      $pull: {
        books_to_read: {
          _id: req.params.id
        }
      }
    }
  );
  res.status(200).json('Item deleted succesfully');
};

export default _;
