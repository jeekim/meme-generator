import { describe, it, expect } from 'vitest';
import type { MemeTemplate, MemeCaption } from '../types';

describe('types', () => {
  describe('MemeTemplate', () => {
    it('should accept valid MemeTemplate objects', () => {
      const validTemplate: MemeTemplate = {
        id: '1',
        name: 'Test Meme',
        url: 'https://example.com/meme.jpg',
      };

      expect(validTemplate.id).toBe('1');
      expect(validTemplate.name).toBe('Test Meme');
      expect(validTemplate.url).toBe('https://example.com/meme.jpg');
    });

    it('should have string properties', () => {
      const template: MemeTemplate = {
        id: 'test-id',
        name: 'test-name',
        url: 'test-url',
      };

      expect(typeof template.id).toBe('string');
      expect(typeof template.name).toBe('string');
      expect(typeof template.url).toBe('string');
    });
  });

  describe('MemeCaption', () => {
    it('should accept valid MemeCaption objects', () => {
      const validCaption: MemeCaption = {
        topText: 'TOP TEXT',
        bottomText: 'BOTTOM TEXT',
      };

      expect(validCaption.topText).toBe('TOP TEXT');
      expect(validCaption.bottomText).toBe('BOTTOM TEXT');
    });

    it('should have string properties', () => {
      const caption: MemeCaption = {
        topText: 'test-top',
        bottomText: 'test-bottom',
      };

      expect(typeof caption.topText).toBe('string');
      expect(typeof caption.bottomText).toBe('string');
    });

    it('should allow empty strings', () => {
      const caption: MemeCaption = {
        topText: '',
        bottomText: '',
      };

      expect(caption.topText).toBe('');
      expect(caption.bottomText).toBe('');
    });
  });
});
