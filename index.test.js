const {sum, Pool} = require('./index');

test('adds 1 + 2 to equal 3', () => {
  expect(sum(1, 2)).toBe(3);
});

test('run docker container', async () => {
  const pool = new Pool();
  await pool.run('test', 'test');
});

