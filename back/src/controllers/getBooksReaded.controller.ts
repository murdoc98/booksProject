import { Request, Response } from 'express';
import Reader from '../schemas/reader.schema';

const _ = async (req: Request, res: Response) => {
  const _id = req.auth.payload.sub.split('|')[1];
  let reader = await Reader.findOne({ _id });
  if(!reader) {
    reader = new Reader({
      _id,
      books_readed: [],
      books_to_read: []
    });
    reader.save();
  }
  res.status(200).json(reader.books_readed);
}

export default _;