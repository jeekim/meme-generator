import { describe, it, expect } from 'vitest';
import { MEME_TEMPLATES } from '../constants';
import type { MemeTemplate } from '../types';

describe('constants', () => {
  describe('MEME_TEMPLATES', () => {
    it('should be an array', () => {
      expect(Array.isArray(MEME_TEMPLATES)).toBe(true);
    });

    it('should contain at least one template', () => {
      expect(MEME_TEMPLATES.length).toBeGreaterThan(0);
    });

    it('should have valid template structure', () => {
      MEME_TEMPLATES.forEach((template: MemeTemplate) => {
        expect(template).toHaveProperty('id');
        expect(template).toHaveProperty('name');
        expect(template).toHaveProperty('url');
        expect(typeof template.id).toBe('string');
        expect(typeof template.name).toBe('string');
        expect(typeof template.url).toBe('string');
      });
    });

    it('should have unique IDs', () => {
      const ids = MEME_TEMPLATES.map(t => t.id);
      const uniqueIds = new Set(ids);
      expect(ids.length).toBe(uniqueIds.size);
    });

    it('should have valid URLs', () => {
      MEME_TEMPLATES.forEach((template: MemeTemplate) => {
        expect(template.url).toMatch(/^https?:\/\//);
      });
    });

    it('should contain expected number of templates', () => {
      expect(MEME_TEMPLATES.length).toBe(8);
    });
  });
});
