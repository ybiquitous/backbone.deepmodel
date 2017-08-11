module.exports = {
  extends: [
    'ybiquitous',
  ],

  env: {
    mocha: true,
  },

  rules: {
    'import/no-extraneous-dependencies': ['error', {
      devDependencies: [
        'benchmark.js',
        '*webpack*.js',
        'test/**/*.js',
      ],
    }],
  },
}
