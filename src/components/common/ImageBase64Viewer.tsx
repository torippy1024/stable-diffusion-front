import {format} from 'date-fns';

type ImageBase64ViewerType = {
  imgUrl?: string;
  alt?: string;
  filename?: string;
};

const ImageBase64Viewer = ({imgUrl, alt, filename}: ImageBase64ViewerType) => {
  return (
    <div>
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
