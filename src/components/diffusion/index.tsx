import {useState} from 'react';
import fetchDeepl from '../../utils/deepl/fetchDeepl';
import fetchDiffusion from '../../utils/diffusion/fetchDiffusion';
import ImageBase64Viewer from '../common/ImageBase64Viewer';
import DiffusionRadioButton from './DiffusionRadioButton';

const DiffusionContainer = () => {
  const [prompt, setPrompt] = useState<string>('1ガール、水彩');
  const [imgUrl, setImgUrl] = useState<string>();
  const [loading, setLoading] = useState(false);

  const [selected, setSelected] = useState('blue hair');

  const handleClick = async () => {
    setLoading(true);
    const promptTranslated = await fetchDeepl(prompt);
    const imgUrl = await fetchDiffusion([promptTranslated ?? prompt, selected]);
    setImgUrl(imgUrl);
    setLoading(false);
  };

  return (
    <div>
      <div>
        <div>プロンプト:</div>
        <textarea
          onChange={(e) => setPrompt(e.target.value)}
          value={prompt}
          className='border w-full'
          placeholder=''
        />
      </div>
      <DiffusionRadioButton selected={selected} setSelected={setSelected} />
      <div className='flex flex-col items-center'>
        <button
          onClick={handleClick}
          className='btn w-full max-w-lg rounded-b-none'
          disabled={loading}
        >
          generate
        </button>
        <ImageBase64Viewer imgUrl={imgUrl} alt={prompt} loading={loading} />
      </div>
    </div>
  );
};

export default DiffusionContainer;
