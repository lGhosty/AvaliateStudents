import request from 'supertest';
import { app } from '../app';

describe('Testes de API - Casos de Uso de Moradia', () => {

  it('Deve ser capaz de listar as moradias existentes', async () => {
    const response = await request(app).get('/api/moradias');
    expect(response.status).toBe(200);
    expect(Array.isArray(response.body)).toBe(true);
  });

  it('Deve ser capaz de criar uma nova moradia com dados válidos', async () => {
    const response = await request(app)
      .post('/api/moradias')
      .send({
        nome: "República Teste V&V",
        endereco: "Rua dos Testes, 123",
        descricao: "Uma ótima moradia para testes.",
        preco: 550.00
      });

    expect(response.status).toBe(201);
    expect(response.body).toHaveProperty('id');
  });
});
