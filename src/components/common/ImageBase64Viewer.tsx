import {format} from 'date-fns';

type ImageBase64ViewerType = {
  imgUrl?: string;
  alt?: string;
  filename?: string;
  loading?: Boolean;
  className?: string;
};

const ImageBase64Viewer = ({
  imgUrl,
  alt,
  filename,
  loading = false,
  className = '',
}: ImageBase64ViewerType) => {
  if (loading) {
    return (
      <div className='bg-gray-100 w-full aspect-square flex flex-col items-center justify-center'>
        <div className='animate-spin h-10 w-10 border-4 border-blue-500 rounded-full border-t-transparent' />
        <div>Loading...</div>
      </div>
    );
  }
  return (
    <div className={className}>
      {imgUrl && (
        <a
          href={'data:image/png;base64,' + imgUrl}
          download={`${filename}_${format(new Date(), 'yyMMdd_HHmmss')}.png`}
        >
          <img src={'data:image/png;base64,' + imgUrl} alt={alt} />
        </a>
      )}
    </div>
  );
};

export default ImageBase64Viewer;
