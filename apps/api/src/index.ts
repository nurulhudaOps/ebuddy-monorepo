import configs from './configs';
import { createServer } from './server';

const server = createServer();
const { name, host, port } = configs.server;

server.listen(port, () => {
  console.log(`\x1b[33m[server] ${name} server listening on ${host}:${port}`);
});
