const request = require('supertest')
const { app } = require('../server')

describe('API Server', () => {

    let api;
    let testTrainer = {
        name: 'Armin',
        age: 21,
        hair: 'Blonde',
        eye: 'Blue',
        pokemon: 'Pikachu'
    }
    let patchTrainer = {
        id: 1, 
        name: "Eren", 
        age: 21, 
        hair: "Brown", 
        eye: "Brown", 
        pokemon: "Bulbasaur" 
    }

    beforeAll(() => {
        api = app.listen(5000, () => console.log('Test server running on port 5000...'));
    })

    afterAll((done) => {
        console.log('Stopping test server.')
        api.close(done)
    })

    it('should get / with status 200', (done) => {
        request(api)
            .get('/')
            .expect(200, done);
    })

    describe('get trainers', () => {
        it('should get /trainers with status 200', (done) => {
            request(api)
                .get('/trainers')
                .expect(200, done);
        })
    })

    describe('get trainers by name', () => {
        it('should get trainer by id', (done) => {
            request(api)
                .get('/trainers/eren')
                .expect(200)
                .expect({ id: 1, name: 'Eren', age: 20, hair: 'Brown', eye: 'Brown', pokemon: 'Bulbasaur' }, done);
        })
        it('should respond to unknown name with 404', (done) => {
            request(api)
                .get('/trainers/noah')
                .expect(404)
                .expect({}, done);
        })
        // Could test case-sensitivity
    })

    describe('create a new trainer', () => {
        it('should respond to post /trainers with 201', (done) => {
            request(api)
                .post('/trainers')
                .send(testTrainer)
                .set('Accept', /application\/json/)
                .expect(201)
                .expect({id: 7, ...testTrainer}, done);  
        })
        // Testing functionality of the class would be easier to do seperately
    })

    describe('changing trainers', () => {
        it('should change the data requested', (done) => {
            request(api)
                .patch(`/trainers/${patchTrainer.name}`)
                .send(patchTrainer)
                .set('Accept', /application\/json/)
                .expect(200)
                .expect(patchTrainer, done);
        })
    })

    describe('delete trainer by name', () => {
        it('should delete the trainer', async () => {
            await request(api)
                    .delete('/trainers/armin')
                    .expect(204);
            const updatedTrainers = await request(api).get('/trainers')
            expect(updatedTrainers.body.length).toBe(6);
        })
    })

    it('should respond to non-existent path with 404', (done) => {
        request(api)
            .get('/example')
            .expect(404, done);
    })

    it('should respond to invalid method request with 405', (done) => {
        request(api)
            .post('/')
            .expect(405, done);
    })

})
