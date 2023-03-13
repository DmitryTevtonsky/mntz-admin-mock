export const getFileType = (filename: string): string | undefined => filename.split('.').pop();

export const asyncFileReadAsDataURL = (file: File): Promise<string> =>
  new Promise((resolve, reject) => {
    const reader = new FileReader();

    reader.onloadend = function () {
      resolve(reader.result as string);
    };

    reader.onerror = function (e: any) {
      reject(e);
    };
    reader.readAsDataURL(file);
  });

export const asyncImageLoader = (src: string): Promise<HTMLImageElement> =>
  new Promise((resolve, reject) => {
    const image = new Image();
    image.src = src;

    image.addEventListener(
      'load',
      () => {
        image.width = image.naturalWidth;
        image.height = image.naturalHeight;
        resolve(image);
      },
      { once: true }
    );

    image.addEventListener('error', (e) => reject(e), { once: true });
  });

export const asyncVideoLoader = (src: string): Promise<HTMLVideoElement> =>
  new Promise((resolve, reject) => {
    const video = document.createElement('video');
    video.preload = 'metadata';
    video.muted = true;
    video.src = src;

    document.body.appendChild(video);

    video.addEventListener(
      'loadeddata',
      () => {
        video.currentTime = video.duration / 2;
        video.width = video.videoWidth;
        video.height = video.videoHeight;

        resolve(video);
      },
      { once: true }
    );

    video.addEventListener('error', (e) => reject(e), { once: true });
  });

const createMediaElement = async (file: File) => {
  if (file.type.includes('video')) {
    const objectUrl = URL.createObjectURL(file);
    const videoElement: HTMLVideoElement = await asyncVideoLoader(objectUrl);

    return videoElement;
  }

  const fileDataUrl: string = await asyncFileReadAsDataURL(file);
  const imageElement: HTMLImageElement = await asyncImageLoader(fileDataUrl);

  return imageElement;
};

export const dataURLtoArrayBuffer = (src: string): Promise<ArrayBuffer> => fetch(src).then((res) => res.arrayBuffer());

export const drawMediaThumbOnCanvas = (
  ctx: CanvasRenderingContext2D,
  file: File,
  mediaElement: HTMLVideoElement | HTMLImageElement,
  width: number,
  height: number
): Promise<void> =>
  new Promise((resolve) => {
    if (file.type.includes('video')) {
      mediaElement.addEventListener(
        'seeked',
        () => {
          ctx?.drawImage(mediaElement, 0, 0, width, height);
          resolve();
        },
        { once: true }
      );
    } else {
      ctx?.drawImage(mediaElement, 0, 0, width, height);
      resolve();
    }
  });

export const fileToCompressedThumbArrayBuffer = async (file: File) => {
  const mediaElement = await createMediaElement(file);

  const oldWidth = mediaElement.width;
  const oldHeight = mediaElement.height;

  const newWidth = 300;
  const newHeight = Math.floor((oldHeight / oldWidth) * newWidth);

  const canvas = document.createElement('canvas');
  canvas.width = newWidth;
  canvas.height = newHeight;

  const ctx = canvas.getContext('2d');

  ctx && (await drawMediaThumbOnCanvas(ctx, file, mediaElement, newWidth, newHeight));

  mediaElement.remove();

  const compressedFileDataUrl = canvas.toDataURL('image/jpeg', 0.7);

  canvas.remove();

  const compressedArrayBuffer: ArrayBuffer = await dataURLtoArrayBuffer(compressedFileDataUrl);

  return compressedArrayBuffer;
};

export const trimObjectValues = <T>(object: T): T => {
  const trimmedValues = Object.fromEntries(
    Object.entries(object).map(([key, value]: [string, string]) => {
      return [key, value && typeof value === 'string' ? value.trim() : value];
    })
  );

  return trimmedValues as unknown as T;
};
