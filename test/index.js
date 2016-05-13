var api = require('../server');

var test = require('tape');
var request = require('supertest');


test('WA Representatives create (POST)', function(t){

    /*
        Created at https://www.govtrack.us/congress/members/WA via...

        var members = document.querySelectorAll('#representatives .member');
        var washington_reps = [];
        for(var i = 0; i < members.length; i++){
            washington_reps.push({
                'name': members[i].querySelector('.moc a').innerHTML.trim(),
                'political_party': members[i].querySelector('.info div').innerHTML.trim(),
                'district': parseInt(members[i].querySelector('.photo_flag').innerHTML),
                'state': 'WA',
                'term_starts_on': '2010-01-01', // todo: parse dates with moment
                'term_starts_on': '2018-01-01'
            });
        }
    */

    var washington_reps = [
        {"name":"Suzan DelBene","political_party":"Democrat","district":1,"state":"WA", "term_starts_on": "2010-01-01", "term_ends_on": "2018-01-01"},
        {"name":"Rick Larsen","political_party":"Democrat","district":2,"state":"WA", "term_starts_on": "2010-01-01", "term_ends_on": "2018-01-01"},
        {"name":"Jaime Herrera Beutler","political_party":"Republican","district":3,"state":"WA", "term_starts_on": "2010-01-01", "term_ends_on": "2018-01-01"},
        {"name":"Dan Newhouse","political_party":"Republican","district":4,"state":"WA", "term_starts_on": "2010-01-01", "term_ends_on": "2018-01-01"},
        {"name":"Cathy McMorris Rodgers","political_party":"Republican","district":5,"state":"WA", "term_starts_on": "2010-01-01", "term_ends_on": "2018-01-01"},
        {"name":"Derek Kilmer","political_party":"Democrat","district":6,"state":"WA", "term_starts_on": "2010-01-01", "term_ends_on": "2018-01-01"},
        {"name":"Jim McDermott","political_party":"Democrat","district":7,"state":"WA", "term_starts_on": "2010-01-01", "term_ends_on": "2018-01-01"},
        {"name":"David Reichert","political_party":"Republican","district":8,"state":"WA", "term_starts_on": "2010-01-01", "term_ends_on": "2018-01-01"},
        {"name":"Adam Smith","political_party":"Democrat","district":9,"state":"WA", "term_starts_on": "2010-01-01", "term_ends_on": "2018-01-01"},
        {"name":"Denny Heck","political_party":"Democrat","district":10,"state":"WA", "term_starts_on": "2010-01-01", "term_ends_on": "2018-01-01"}
    ];

    for(var w in washington_reps){

        (function(w){
            request(api)
                .post('/api/1/legislators')
                .send(washington_reps[w])
                .set('Accept', 'application/json')
                .expect(201)
                .end(function (err, res){
                    t.same(res.status, 201, "201 status code for creating " + washington_reps[w]['name'])

                    if(w == washington_reps.length - 1){
                        t.end();
                    }
                });

        })(w);
    }

});

test('WA Representatives detail (GET)', function (t) {

    request(api)
        .get('/api/1/legislators/1')
        .expect('Content-Type', /json/)
        .expect(200)
        .end(function (err, res) {
            t.same(res.body.name, "Suzan DelBene", 'Representative with ID 1 is named "Suzan DelBene"');
        });

    request(api)
        .get('/api/1/legislators/2')
        .expect('Content-Type', /json/)
        .expect(200)
        .end(function (err, res) {
            t.same(res.body.name, "Rick Larsen", 'Representative with ID 2 is named "Rick Larsen"');
            t.end();
        });

    request(api)
        .get('/api/1/legislators/3')
        .expect('Content-Type', /json/)
        .expect(200)
        .end(function (err, res) {
            t.same(res.body.political_party, "Republican", 'Representative with ID 3 is part of the Republican party');
        });

    request(api)
        .get('/api/1/legislators/4')
        .expect('Content-Type', /json/)
        .expect(200)
        .end(function (err, res) {
            t.same(res.body.district, 4, 'Representative with ID 4 represents the 4th Legislative District');
        });

});

test('WA Representatives list (GET) [ bonus points features ]', function (t) {

    request(api)
        .get('/api/1/legislators')
        .expect('Content-Type', /json/)
        .expect(200)
        .end(function (err, res) {
            t.same(res.body['legislators'].length, 10, '10 Representatives returned for Washington');
        });

    request(api)
        .get('/api/1/legislators?political_party=Democrat')
        .expect('Content-Type', /json/)
        .expect(200)
        .end(function (err, res) {
            t.same(res.body['legislators'].length, 6, 'Found 6 Democratic Representatives');
        });

    request(api)
        .get('/api/1/legislators?political_party=Republican')
        .expect('Content-Type', /json/)
        .expect(200)
        .end(function (err, res) {
            t.same(res.body['legislators'].length, 4, 'Found 4 Republican Representatives');
        });

    request(api)
        .get('/api/1/legislators?name=Rick')
        .expect('Content-Type', /json/)
        .expect(200)
        .end(function (err, res) {
            t.same(res.body['legislators'].length, 1, 'Found 1 Representative named "Rick"');
        });

    request(api)
        .get('/api/1/legislators?district=7')
        .expect('Content-Type', /json/)
        .expect(200)
        .end(function (err, res) {
            t.same(res.body['legislators'].length, 1, 'Found 1 Representative in the 7th Legislative District');
        });

    request(api)
        .get('/api/1/legislators?state=CA')
        .expect('Content-Type', /json/)
        .expect(200)
        .end(function (err, res) {
            t.same(res.body['legislators'].length, 0, 'Found 0 Representatives for California (booorrr-innnnggg)');
            t.end();
        });

});

test('WA Representatives update (POST & GET)', function (t) {

    request(api)
        .post('/api/1/legislators')
        .send({"name":"Pramila Jayapal","political_party":"Democrat","district":7,"state":"WA", "term_starts_on": "2010-01-01", "term_ends_on": "2018-01-01", "id": 7})
        .expect('Content-Type', /json/)
        .expect(200)
        .end(function (err, res) {
            // 
        });

    request(api)
        .get('/api/1/legislators/7')
        .expect('Content-Type', /json/)
        .expect(200)
        .end(function (err, res) {
            t.same(res.body.name, "Pramila Jayapal", 'Representative with ID 7 has been updated to be "Pramila Jayapal"');
        });


    request(api)
        .post('/api/1/legislators')
        .send({"name":"Literally Anybody","political_party":"Democrat","district":5,"state":"WA", "term_starts_on": "2010-01-01", "term_ends_on": "2018-01-01", "id": 5})
        .expect('Content-Type', /json/)
        .expect(200)
        .end(function (err, res) {
            // 
        });

    request(api)
        .get('/api/1/legislators/5')
        .expect('Content-Type', /json/)
        .expect(200)
        .end(function (err, res) {
            t.same(res.body.name, "Literally Anybody", 'Representative with ID 5 has been updated to be "Literally Anybody"');
            t.end();
        });

});

test('WA Representatives creation validation (POST)', function(t){

    request(api)
        .post('/api/1/legislators')
        .send({"name": "Frank Ocean",
                "political_party": "Orange",
                "district": "Pilot Jones",
                "state": "LA",
                "term_starts_on": "2010-01-01",
                "term_ends_on": "2018-01-01"})
        .set('Accept', 'application/json')
        .expect(500)
        .end(function (err, res){
            t.same(res.body, { error: 'Invalid district: Pilot Jones. `district` must be numeric.'}, "District 'Pilot Jones' should not be allowed; `district` should be numeric");
        });

    request(api)
        .post('/api/1/legislators')
        .send({"name": "Frank Ocean",
                "political_party": "Orange",
                "district": 6,
                "state": "PK",
                "term_starts_on": "2010-01-01",
                "term_ends_on": "2018-01-01"})
        .set('Accept', 'application/json')
        .expect(500)
        .end(function (err, res){
            t.same(res.body, { error: 'Invalid state: PK. `state` must be a two-letter state abbreviation representing a US state.' }, "State 'PK' should not be allowed; `state` needs to be a valid, two-letter US state abbreviation");
        });

    request(api)
        .post('/api/1/legislators')
        .send({"name": "Frank Ocean",
                "political_party": "Orange",
                "district": 6,
                "state": "LA",
                "term_starts_on": "notarealdate",
                "term_ends_on": "2018-01-01"})
        .set('Accept', 'application/json')
        .expect(500)
        .end(function (err, res){
            t.same(res.body, { error: 'Invalid term_starts_on: `term_starts_on` must be formatted YYYY-MM-DD' }, "Starting date 'notarealdate' should not be allowed; `term_starts_on` needs to be a YYYY-MM-DD formatted date.");
        });

    request(api)
        .post('/api/1/legislators')
        .send({"name": "Frank Ocean",
                "political_party": "Orange",
                "district": 6,
                "state": "LA",
                "term_starts_on": "2010-01-01",
                "term_ends_on": "2018-01-01",
                "future_album_release_date": "2018-01-01"
            })
        .set('Accept', 'application/json')
        .expect(500)
        .end(function (err, res){
            t.same(res.body, { error: 'Invalid key: future_album_release_date' }, "Field future_album_release_date is not allowed.");
            t.end();
        });

});