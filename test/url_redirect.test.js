import * as chai from 'chai';
import chaiHttp from 'chai-http';
import supertest from 'supertest';
import dotenv from 'dotenv';
import Url from '../models/Url.js';
dotenv.config();
const { expect } = chai;
import app from '../app.js';

chai.use(chaiHttp);

describe('GET /:url', () => {

    let short_url; // This will be dynamically set in the beforeEach

    beforeEach(async () => {
        // Upsert a test URL entry
        const update = { short_url: 'zkngx6', original_url: 'https://example.com' };
        const options = { new: true, upsert: true, setDefaultsOnInsert: true };
    
        // Use findOneAndUpdate with upsert option to reduce database calls
        const result = await Url.findOneAndUpdate({ original_url: update.original_url }, update, options);

        short_url = result.short_url;
    });

    afterEach(async () => {
        // Delete the test URL entry
        await Url.deleteOne({ short_url });
    });

    //I did not write a test for if the user passes an empty short url because it would just direct the user to the default '/' route

    it('should return 404 if short url does not exist', (done) => {
        supertest(app)
            .get('/doesnotexist')
            .expect(404)
            .end((err, res) => {
                expect(res.body).to.have.property('error', 'URL not found');
                done(err);
            });
    });

    it('should redirect to the original URL for a valid short URL', (done) => {
        supertest(app)
          .get('/zkngx6')
          .expect(302) // Checking for a redirection status code
          .end((err, res) => {
              expect(res.header.location).to.equal('https://example.com');
              done(err);
          });
    });
});

