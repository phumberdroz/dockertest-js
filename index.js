const Docker = require('dockerode');

class Pool {
  constructor(endpoint) {
    if (endpoint === undefined) {
      if (process.env['DOCKER_MACHINE_NAME'] !== '') {
        // TODO later
      }
      if (process.env['DOCKER_HOST'] !== undefined) {
        endpoint = process.env['DOCKER_HOST'];
      } else if (process.env['DOCKER_URL'] !== undefined) {
        endpoint = process.env['DOCKER_URL'];
      } else if (process.platform === 'win32') {
        endpoint = {
          host: 'localhost',
          port: 2375,
        };
      } else {
        endpoint = {socketPath: '/var/run/docker.sock'};
      }
    }
    this.docker = new Docker(endpoint);
  }

  async run(image, tag) {
    await this.docker.run('ubuntu', ['bash', '-c', 'uname -a'], process.stdout)
        .then(function(data) {
          const output = data[0];
          const container = data[1];
          console.log(output.StatusCode);
          return container.remove();
        }).then(function(data) {
          console.log('container removed');
        }).catch(function(err) {
          console.log(err);
        });
  }
}

function sum(a, b) {
  return a + b;
}
module.exports = {sum, Pool};
