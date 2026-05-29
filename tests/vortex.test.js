/**
 * vortex.test.js — Vortex AI Website tests
 * 
 * Tests landing page logic, form validation, and AI model selection.
 * Pure unit tests.
 */

const VortexValidator = {
  isValidContactForm: (form) => {
    if (!form?.name?.trim()) return { valid: false, error: 'Name is required' };
    if (!form?.email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) {
      return { valid: false, error: 'Valid email is required' };
    }
    if (!form?.message?.trim()) return { valid: false, error: 'Message is required' };
    return { valid: true };
  },

  selectAIModel: (useCase) => {
    const models = {
      'chat': 'gemini-pro',
      'image': 'imagen-3',
      'code': 'gemini-pro',
      'data-analysis': 'gemini-pro',
      'default': 'gemini-flash',
    };
    return models[useCase] || models['default'];
  },

  formatPricingTier: (tier) => {
    const tiers = {
      free: { name: 'Free', price: 0, currency: 'USD', period: 'month', requests: 100 },
      pro: { name: 'Pro', price: 29, currency: 'USD', period: 'month', requests: 10000 },
      enterprise: { name: 'Enterprise', price: 199, currency: 'USD', period: 'month', requests: -1 },
    };
    return tiers[tier] || tiers.free;
  },

  sanitizePrompt: (prompt) => {
    if (typeof prompt !== 'string') return '';
    return prompt
      .replace(/<script[^>]*>.*?<\/script>/gi, '')
      .replace(/<[^>]+>/g, '')
      .trim()
      .substring(0, 4000); // max prompt length
  },
};

describe('Vortex AI Website', () => {
  describe('isValidContactForm', () => {
    it('validates a complete form', () => {
      const result = VortexValidator.isValidContactForm({
        name: 'John Doe',
        email: 'john@example.com',
        message: 'Hello, I need help with your AI services',
      });
      expect(result.valid).toBe(true);
    });

    it('rejects missing name', () => {
      const result = VortexValidator.isValidContactForm({ email: 'a@b.com', message: 'Hi' });
      expect(result.valid).toBe(false);
      expect(result.error).toContain('Name');
    });

    it('rejects invalid email', () => {
      const result = VortexValidator.isValidContactForm({ name: 'John', email: 'not-email', message: 'Hi' });
      expect(result.valid).toBe(false);
      expect(result.error).toContain('email');
    });
  });

  describe('selectAIModel', () => {
    it('selects correct model for each use case', () => {
      expect(VortexValidator.selectAIModel('chat')).toBe('gemini-pro');
      expect(VortexValidator.selectAIModel('image')).toBe('imagen-3');
      expect(VortexValidator.selectAIModel('code')).toBe('gemini-pro');
    });

    it('falls back to default model for unknown use case', () => {
      expect(VortexValidator.selectAIModel('unknown')).toBe('gemini-flash');
      expect(VortexValidator.selectAIModel('')).toBe('gemini-flash');
    });
  });

  describe('formatPricingTier', () => {
    it('returns correct pricing for pro tier', () => {
      const tier = VortexValidator.formatPricingTier('pro');
      expect(tier.name).toBe('Pro');
      expect(tier.price).toBe(29);
      expect(tier.requests).toBe(10000);
    });

    it('enterprise has unlimited requests (-1)', () => {
      const tier = VortexValidator.formatPricingTier('enterprise');
      expect(tier.requests).toBe(-1);
    });

    it('falls back to free tier for unknown', () => {
      const tier = VortexValidator.formatPricingTier('unknown');
      expect(tier.price).toBe(0);
    });
  });

  describe('sanitizePrompt', () => {
    it('removes script tags', () => {
      const input = 'Hello <script>alert("xss")</script> World';
      expect(VortexValidator.sanitizePrompt(input)).toBe('Hello  World');
    });

    it('removes HTML tags', () => {
      const input = '<b>Bold</b> <p>text</p>';
      expect(VortexValidator.sanitizePrompt(input)).toBe('Bold text');
    });

    it('truncates to 4000 characters', () => {
      const input = 'A'.repeat(5000);
      expect(VortexValidator.sanitizePrompt(input)).toHaveLength(4000);
    });

    it('handles non-string inputs', () => {
      expect(VortexValidator.sanitizePrompt(null)).toBe('');
      expect(VortexValidator.sanitizePrompt(123)).toBe('');
    });
  });
});
