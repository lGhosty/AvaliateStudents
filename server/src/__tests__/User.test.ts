import request from 'supertest';
import { app } from '../app';

describe('Testes de API - Casos de Uso de Usuário', () => {

  it('Deve ser capaz de criar um novo usuário com dados válidos', async () => {
    const response = await request(app)
      .post('/api/users/register')
      .send({
        nome: 'Usuário de Teste V&V',
        email: `teste-${Date.now()}@exemplo.com`,
        senha: 'senha123'
      });
    expect(response.status).toBe(201);

    expect(response.body).toHaveProperty('id');
    expect(response.body).not.toHaveProperty('senha');
  });

  it('NÃO deve ser capaz de criar um usuário com um e-mail já existente', async () => {
    const emailDuplicado = `duplicado-${Date.now()}@exemplo.com`;

    await request(app)
      .post('/api/users/register')
      .send({ nome: 'Primeiro Usuario', email: emailDuplicado, senha: '123' });

    const response = await request(app)
      .post('/api/users/register')
      .send({ nome: 'Usuario Intruso', email: emailDuplicado, senha: '456' });
    expect(response.status).toBe(400);
  });
});
