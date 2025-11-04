import { describe, it, expect, beforeEach, vi, afterEach } from 'vitest';
import { renderMemeToDataURL } from '../utils/canvasUtils';

describe('canvasUtils', () => {
  describe('renderMemeToDataURL', () => {
    let mockContext: any;
    let mockCanvas: any;
    let originalImage: any;
    let originalCreateElement: any;

    beforeEach(() => {
      // Store original functions
      originalImage = global.Image;
      originalCreateElement = document.createElement.bind(document);

      // Mock canvas context
      mockContext = {
        drawImage: vi.fn(),
        strokeText: vi.fn(),
        fillText: vi.fn(),
        font: '',
        fillStyle: '',
        strokeStyle: '',
        lineWidth: 0,
        textAlign: '',
      };

      // Mock canvas
      mockCanvas = {
        width: 0,
        height: 0,
        getContext: vi.fn(() => mockContext),
        toDataURL: vi.fn((type: string, quality: number) => `data:${type};base64,mockBase64`),
      };

      // Mock createElement
      document.createElement = vi.fn((tag: string) => {
        if (tag === 'canvas') {
          return mockCanvas as any;
        }
        return originalCreateElement(tag);
      }) as any;
    });

    afterEach(() => {
      // Restore original functions
      global.Image = originalImage;
      document.createElement = originalCreateElement;
      vi.clearAllMocks();
    });

    it('should return a Promise', () => {
      const result = renderMemeToDataURL('data:image/png;base64,test', 'TOP', 'BOTTOM');
      expect(result).toBeInstanceOf(Promise);
    });

    it('should resolve with a data URL string', async () => {
      // Mock Image constructor
      global.Image = class {
        crossOrigin = '';
        width = 500;
        height = 500;
        onload: (() => void) | null = null;
        onerror: (() => void) | null = null;
        src = '';

        constructor() {
          setTimeout(() => {
            if (this.onload) {
              this.onload();
            }
          }, 0);
        }
      } as any;

      const result = await renderMemeToDataURL('data:image/png;base64,test', 'TOP', 'BOTTOM');
      expect(typeof result).toBe('string');
      expect(result).toMatch(/^data:image/);
    });

    it('should convert text to uppercase', async () => {
      global.Image = class {
        crossOrigin = '';
        width = 500;
        height = 500;
        onload: (() => void) | null = null;
        onerror: (() => void) | null = null;
        src = '';

        constructor() {
          setTimeout(() => {
            if (this.onload) {
              this.onload();
            }
          }, 0);
        }
      } as any;

      await renderMemeToDataURL('data:image/png;base64,test', 'top text', 'bottom text');

      expect(mockContext.strokeText).toHaveBeenCalledWith('TOP TEXT', expect.any(Number), expect.any(Number));
      expect(mockContext.fillText).toHaveBeenCalledWith('TOP TEXT', expect.any(Number), expect.any(Number));
      expect(mockContext.strokeText).toHaveBeenCalledWith('BOTTOM TEXT', expect.any(Number), expect.any(Number));
      expect(mockContext.fillText).toHaveBeenCalledWith('BOTTOM TEXT', expect.any(Number), expect.any(Number));
    });

    it('should reject when image fails to load', async () => {
      global.Image = class {
        crossOrigin = '';
        width = 0;
        height = 0;
        onload: (() => void) | null = null;
        onerror: (() => void) | null = null;
        src = '';

        constructor() {
          setTimeout(() => {
            if (this.onerror) {
              this.onerror();
            }
          }, 0);
        }
      } as any;

      await expect(renderMemeToDataURL('invalid-url', 'TOP', 'BOTTOM')).rejects.toThrow('Failed to load image for canvas rendering.');
    });

    it('should reject when canvas context cannot be obtained', async () => {
      mockCanvas.getContext = vi.fn(() => null);

      global.Image = class {
        crossOrigin = '';
        width = 500;
        height = 500;
        onload: (() => void) | null = null;
        onerror: (() => void) | null = null;
        src = '';

        constructor() {
          setTimeout(() => {
            if (this.onload) {
              this.onload();
            }
          }, 0);
        }
      } as any;

      await expect(renderMemeToDataURL('data:image/png;base64,test', 'TOP', 'BOTTOM')).rejects.toThrow('Could not get canvas context');
    });

    it('should use default fileType when not provided', async () => {
      global.Image = class {
        crossOrigin = '';
        width = 500;
        height = 500;
        onload: (() => void) | null = null;
        onerror: (() => void) | null = null;
        src = '';

        constructor() {
          setTimeout(() => {
            if (this.onload) {
              this.onload();
            }
          }, 0);
        }
      } as any;

      await renderMemeToDataURL('data:image/png;base64,test', 'TOP', 'BOTTOM');
      expect(mockCanvas.toDataURL).toHaveBeenCalledWith('image/jpeg', 0.9);
    });

    it('should use custom fileType when provided', async () => {
      global.Image = class {
        crossOrigin = '';
        width = 500;
        height = 500;
        onload: (() => void) | null = null;
        onerror: (() => void) | null = null;
        src = '';

        constructor() {
          setTimeout(() => {
            if (this.onload) {
              this.onload();
            }
          }, 0);
        }
      } as any;

      await renderMemeToDataURL('data:image/png;base64,test', 'TOP', 'BOTTOM', 'image/png');
      expect(mockCanvas.toDataURL).toHaveBeenCalledWith('image/png', 0.9);
    });
  });
});
