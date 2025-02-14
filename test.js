const { describe, test, expect } = require('@jest/globals');

const request = require('supertest');
const http = require('http');
const fs = require('fs');
const superheroes = require('superheroes');
const supervillains = require('supervillains');
const inpoQuote = require('inspirational-quotes');
const movieQuote = require("popular-movie-quotes");
const famousLastWords = require('famous-last-words');

describe('Testing index.js functionalities', () => {
    let server;

    beforeAll(() => {
        server = http.createServer((req, res) => {
            res.statusCode = 200;
            res.setHeader('Content-Type', 'text/plain');
            res.end("Super Hero: " + superheroes.random() + "\nSuper Villain: " + supervillains.random() + "\nQuote of the Day: " + inpoQuote.getRandomQuote() + "\nPopular Movie Quote: " + movieQuote.getRandomQuote() + "\nFamous Last Words: " + famousLastWords[0]);
        });
        server.listen(3000);
    });

    afterAll(() => {
        server.close();
    });

    test('Server should respond with status 200', async () => {
        const response = await request(server).get('/');
        expect(response.statusCode).toBe(200);
    });

    test('Superheroes module should return a valid name', () => {
        const hero = superheroes.random();
        expect(typeof hero).toBe('string');
        expect(hero.length).toBeGreaterThan(0);
    });

    test('Supervillains module should return a valid name', () => {
        const villain = supervillains.random();
        expect(typeof villain).toBe('string');
        expect(villain.length).toBeGreaterThan(0);
    });

    test('Inspirational Quotes module should return a valid quote', () => {
        const quote = inpoQuote.getRandomQuote();
        expect(typeof quote).toBe('string');
        expect(quote.length).toBeGreaterThan(0);
    });

    test('Popular Movie Quotes module should return a valid quote', () => {
        const movieQ = movieQuote.getRandomQuote();
        expect(typeof movieQ).toBe('string');
        expect(movieQ.length).toBeGreaterThan(0);
    });

    test('Famous Last Words should return a valid phrase', () => {
        expect(typeof famousLastWords[0]).toBe('string');
        expect(famousLastWords[0].length).toBeGreaterThan(0);
    });

    test('Files should be created correctly', () => {
        const files = ['file1.txt', 'file2.txt', 'file3.txt', 'file4.txt', 'file5.txt'];
        files.forEach(file => {
            expect(fs.existsSync(file)).toBe(true);
        });
    });
});
