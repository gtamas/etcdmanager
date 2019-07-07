const tasks = arr => arr.join(' && ')

module.exports = {
  'hooks': {
    'pre-commit': tasks([
      'yarn lint',
    ]),
    'pre-push': tasks([
        'yarn lint',
      ])
  }
}
