module.exports = {
  root: true,

  extends: ['ybiquitous'],

  rules: {
    'import/no-extraneous-dependencies': ['error', {
      devDependencies: [
        'benchmark.js',
        '*webpack*.js',
        '**/test/**/*.js',
      ],
    }],
  },

  overrides: [
    {
      files: ['**/test/**/*.js'],
      env: {
        mocha: true,
      },
    },
  ],
}
