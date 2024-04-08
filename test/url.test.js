import * as chai from 'chai';
import chaiHttp from 'chai-http';
import supertest from 'supertest';
import dotenv from 'dotenv';
dotenv.config();
const { expect } = chai;
import app from '../app.js';

chai.use(chaiHttp);

describe('POST /short', () => {

    it('should return 400 if no URL is provided', (done) => {
        supertest(app)
            .post('/short')
            .send({})
            .expect(400)
            .end((err, res) => {
                expect(res.body).to.have.property('error', 'A URL is required.');
                done(err);
            });
    });

    it('should return 400 for an invalid URL format', (done) => {
        supertest(app)
            .post('/short')
            .send({ original_url: 'invalid-url' })
            .expect(400)
            .end((err, res) => {
                expect(res.body).to.have.property('error', 'Invalid URL format.');
                done(err);
            });
    });

    it('should create a shortened URL for a valid URL and return it', (done) => {
        supertest(app)
            .post('/short')
            .send({ original_url: 'https://example.com' })
            .expect(200)
            .end((err, res) => {
                expect(res.body).to.have.property('original_url', 'https://example.com');
                expect(res.body).to.have.property('short_url').that.includes(process.env.DOMAIN);
                done(err);
            });
    });
});

