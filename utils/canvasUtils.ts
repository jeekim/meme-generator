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
                return reject(new Error('Could not get canvas context'));
            }

            canvas.width = img.width;
            canvas.height = img.height;

            ctx.drawImage(img, 0, 0);

            const fontSize = Math.floor(img.width / 10);
            ctx.font = `${fontSize}px Anton`;
            ctx.fillStyle = 'white';
            ctx.strokeStyle = 'black';
            ctx.lineWidth = Math.floor(fontSize / 20);
            ctx.textAlign = 'center';

            const x = canvas.width / 2;
            const topY = fontSize;
            const bottomY = canvas.height - 20;

            // FIX: The 'textTransform' property does not exist on CanvasRenderingContext2D.
            // Text is converted to uppercase before drawing.
            // Draw top text
            ctx.strokeText(topText.toUpperCase(), x, topY);
            ctx.fillText(topText.toUpperCase(), x, topY);

            // Draw bottom text
            ctx.strokeText(bottomText.toUpperCase(), x, bottomY);
            ctx.fillText(bottomText.toUpperCase(), x, bottomY);

            resolve(canvas.toDataURL(fileType, 0.9));
        };
        img.onerror = () => {
            reject(new Error('Failed to load image for canvas rendering.'));
        };
        img.src = imageSrc;
    });
}
