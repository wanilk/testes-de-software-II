import { describe, expect, it, jest, beforeEach, afterAll, afterEach } from '@jest/globals';
import mongoose from 'mongoose';
import request from 'supertest';
import app from '../../src/app.js';

let server
let token = false;
describe('Testes de autenticação na api', () => {
    beforeEach(() => {
        const port = 3000;
        server = app.listen(port);
    });

    afterEach(() => {
        server.close();
    });

    afterAll(() => {
        mongoose.connection.close();
    });

    it('Deve retornar logar com usuário valido', async () => {
        const dados = await request(app)
            .post('/login')
            .send({
                email: '4190451Rynaldo.Carvalho@live.com',
                senha: '123'
            })
            .set('Accept', 'application/json')
            .expect(200)
        expect(dados._body.user.email).toEqual('4190451Rynaldo.Carvalho@live.com');
        token = dados._body.token;

    });

    it ('Deve retornar erro de usuário invalido ou senha invalido', async () => {
        const dados = await request(app)
            .post('/login')
            .send({
                email: '4190451Rynaldo.Caarvalho@live.com',
                senha: '1234'
            })            
            .expect(400)
        expect(dados._body.menssage).toEqual('usuario invalido ou senha invalido');
        token = dados._body.token;
    });

    it ('Deve retornar erro de senha invalido', async () => {
        const dados = await request(app)
            .post('/login')
            .send({
                email: '4190451Rynaldo.Carvalho@live.com',
                senha: '1234'
            })            
            .expect(400)
        expect(dados._body.menssage).toEqual('senha invalido');
        token = dados._body.token;
    });
});