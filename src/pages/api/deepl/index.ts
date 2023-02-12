import axios from 'axios';
import type {NextApiRequest, NextApiResponse} from 'next';

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  const text = req.query.text || 'こんにちは';
  const apiUrl = 'https://api-free.deepl.com/v2/translate';

  const param = {
    text: [typeof text === 'string' ? text : text.join(', ')],
    source_lang: 'JA',
    target_lang: 'EN',
  };
  const headers = {
    Authorization: process.env.DEEPL_API_KEY,
  };
  const data = await axios
    .post(apiUrl, param, {headers})
    .then((res) => res.data);

  res.status(200).json(data);
};

export default handler;
