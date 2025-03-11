const promClient = require('prom-client');

// Criar um registro personalizado
const register = new promClient.Registry();

// Adicionar métricas default do Node.js
promClient.collectDefaultMetrics({
  register,
  prefix: 'node_'
});

// Contador de erros na criação de usuários
const userCreationErrors = new promClient.Counter({
  name: 'user_creation_errors_total',
  help: 'Total number of errors during user creation',
  labelNames: ['error_type']
});

// Contador de usuários deletados
const usersDeleted = new promClient.Counter({
  name: 'users_deleted_total',
  help: 'Total number of deleted users'
});

register.registerMetric(userCreationErrors);
register.registerMetric(usersDeleted);

module.exports = {
  register,
  metrics: {
    userCreationErrors,
    usersDeleted
  }
}; 