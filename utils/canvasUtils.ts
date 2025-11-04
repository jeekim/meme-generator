import { CANVAS_CONFIG, ERROR_MESSAGES } from '../config';

/**
 * Renders a meme with text overlays to a data URL
 * @param imageSrc - Source URL or data URL of the image
 * @param topText - Text to display at the top of the meme
 * @param bottomText - Text to display at the bottom of the meme
 * @param fileType - MIME type for the output image (default: 'image/jpeg')
 * @returns Promise resolving to a data URL of the rendered meme
 */
export function renderMemeToDataURL(
  imageSrc: string,
  topText: string,
  bottomText: string,
  fileType: string = 'image/jpeg'
): Promise<string> {
  return new Promise((resolve, reject) => {
    const img = new Image();
    img.crossOrigin = 'anonymous';
    img.onload = () => {
      const canvas = document.createElement('canvas');
      const ctx = canvas.getContext('2d');
      if (!ctx) {
        return reject(new Error(ERROR_MESSAGES.CANVAS_CONTEXT_FAILED));
      }

      canvas.width = img.width;
      canvas.height = img.height;

      ctx.drawImage(img, 0, 0);

      const fontSize = Math.floor(img.width / CANVAS_CONFIG.FONT_SIZE_RATIO);
      ctx.font = `${fontSize}px ${CANVAS_CONFIG.FONT_FAMILY}`;
      ctx.fillStyle = CANVAS_CONFIG.TEXT_COLOR;
      ctx.strokeStyle = CANVAS_CONFIG.STROKE_COLOR;
      ctx.lineWidth = Math.floor(fontSize / CANVAS_CONFIG.STROKE_WIDTH_RATIO);
      ctx.textAlign = 'center';

      const x = canvas.width / 2;
      const topY = fontSize;
      const bottomY = canvas.height - CANVAS_CONFIG.BOTTOM_TEXT_OFFSET;

      // Draw top text
      const topTextUpper = topText.toUpperCase();
      ctx.strokeText(topTextUpper, x, topY);
      ctx.fillText(topTextUpper, x, topY);

      // Draw bottom text
      const bottomTextUpper = bottomText.toUpperCase();
      ctx.strokeText(bottomTextUpper, x, bottomY);
      ctx.fillText(bottomTextUpper, x, bottomY);

      resolve(canvas.toDataURL(fileType, CANVAS_CONFIG.JPEG_QUALITY));
    };
    img.onerror = () => {
      reject(new Error(ERROR_MESSAGES.IMAGE_LOAD_FAILED));
    };
    img.src = imageSrc;
  });
}
