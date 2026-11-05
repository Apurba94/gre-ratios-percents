/* Ratios and Percents: ratios, proportions, percent change and successive percents. */
(function () {
  'use strict';
  const NAMES = SK.QUANT_TOPICS.ratio.concat(['percentChange', 'qcSwap']);
  // A percent tool: what is p% of x, x is what % of y, and percent change from a to b.
  const tool = { of: (p, x) => (p * x) / 100, whatPct: (x, y) => (100 * x) / y, change: (a, b) => (100 * (b - a)) / a };
  const App = {
    about: 'Ratios and percents run through the whole Quant measure. Practise ratio splits, percent of, percent change, successive changes and reverse percents with generated questions that include the classic traps, such as treating a 20% rise and a 20% fall as cancelling out.',
    how: ['Practise in **Practice**.', 'Check your own numbers in **Percent tool**.', 'Remember: a percent change is always measured against the original value.'],
    tabs: [
      SK.quantTab('practice', 'Practice', NAMES),
      { id: 'tool', label: 'Percent tool', render(el) {
        const a = SK.h('input', { type: 'number', value: 80, style: { width: '9ch' }, oninput: () => draw() }), b = SK.h('input', { type: 'number', value: 100, style: { width: '9ch' }, oninput: () => draw() });
        const out = SK.h('div', {});
        const draw = () => {
          SK.clear(out);
          const A = Number(a.value), B = Number(b.value);
          if (!isFinite(A) || !isFinite(B) || B === 0 || A === 0) { out.appendChild(SK.note('Enter two numbers other than zero.', 'wrong')); return; }
          out.appendChild(SK.table(['Question', 'Answer'], [[A + '% of ' + B, SK.round(tool.of(A, B), 4)], [A + ' is what percent of ' + B + '?', SK.round(tool.whatPct(A, B), 4) + '%'], ['Percent change from ' + A + ' to ' + B, SK.round(tool.change(A, B), 4) + '%'], ['Percent change from ' + B + ' to ' + A, SK.round(tool.change(B, A), 4) + '%']], false));
        };
        el.appendChild(SK.card('Percent tool', SK.h('div', { class: 'sk-row' }, SK.field('First number', a), SK.field('Second number', b)), out, SK.h('p', { class: 'sk-small sk-muted', text: 'Notice that the change from 80 to 100 (25%) is not the same as from 100 to 80 (−20%).' })));
        draw();
      } },
    ],
    tool,
    checks: {
      'the percent tool is right': (data, assert) => { assert.equal(tool.of(15, 40), 6); assert.equal(tool.whatPct(30, 120), 25); assert.equal(tool.change(80, 100), 25); assert.equal(tool.change(100, 80), -20); },
      'generated sets are valid': (data, assert) => { for (let s = 1; s < 30; s++) for (const q of SK.makeQuant(NAMES, 10, s)) assert.deepEqual(SK.validateItem(q), []); },
    },
  };
  if (typeof module !== 'undefined' && module.exports) module.exports = App; else SK.start(App);
})();
