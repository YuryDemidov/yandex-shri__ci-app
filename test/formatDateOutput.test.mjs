import { describe, it } from 'mocha';
import assert from 'assert';
import { formatDateOutput } from '../src/client/assets/js/utils/functions/dateFormatter.mjs';

describe('Formatting date function - formatDateOutput', () => {
  describe('Expected input', () => {
    it('Should return string if parameter is Date', () => {
      const result = formatDateOutput(new Date());
      assert.strictEqual(typeof result, 'string');
    });

    it('Should return string if parameter is string with date', () => {
      const result = formatDateOutput('11/09/1996');
      assert.strictEqual(typeof result, 'string');
    });

    it('Should return string if parameter is timestamp', () => {
      const result = formatDateOutput(2000000);
      assert.strictEqual(typeof result, 'string');
    });

    it('Should return expected output for date input', () => {
      const date = new Date(2020, 1, 5, 21, 1);

      const result = formatDateOutput(date);
      assert.strictEqual(result, 'Feb 05, 18:01');
    });

    it('Should return expected output for string with date input', () => {
      const date = '2001-11-09T08:15:29.347Z';

      const result = formatDateOutput(date);
      assert.strictEqual(result, 'Nov 09, 08:15');
    });

    it('Should return expected output for timestamp input', () => {
      const result = formatDateOutput(1625769929347);
      assert.strictEqual(result, 'Jul 08, 18:45');
    });
  });

  describe('Edge cases', () => {
    it('Should return expected output for timestamp 0', () => {
      const result = formatDateOutput(0);
      assert.strictEqual(result, 'Jan 01, 00:00');
    });
  });

  describe('Unexpected input', () => {
    it('Should return null if invalid date received', () => {
      const result = formatDateOutput(new Date('invalid'));
      assert.strictEqual(result, null);
    });

    it('Should return null if invalid date string received', () => {
      const result = formatDateOutput(new Date('invalid'));
      assert.strictEqual(result, null);
    });
  });
});
