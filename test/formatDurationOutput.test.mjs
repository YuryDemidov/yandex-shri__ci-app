import { describe, it } from 'mocha';
import assert from 'assert';
import { formatDurationOutput } from '../src/client/assets/js/utils/functions/dateFormatter.mjs';

describe('Formatting date function - formatDateOutput', () => {
  describe('Expected input', () => {
    it('Should return string', () => {
      const result = formatDurationOutput(121);
      assert.strictEqual(typeof result, 'string');
    });

    it('Should return hours and minutes if duration is more than 60 and is not divisible by 60', () => {
      const result = formatDurationOutput(121);
      assert.strictEqual(result, '2 h 1 min');
    });

    it('Should return only hours if the duration is divisible by 60', () => {
      const result = formatDurationOutput(120);
      assert.strictEqual(result, '2 h');
    });

    it('Should return only minutes if the duration is less than 60', () => {
      const result = formatDurationOutput(11);
      assert.strictEqual(result, '11 min');
    });
  });

  describe('Edge cases', () => {
    it('Should return an empty string if the duration is equal to 0', () => {
      const result = formatDurationOutput(0);
      assert.strictEqual(result, '');
    });
  })
});
