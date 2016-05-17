# legislator-rest-api

Sometimes you need a REST API to house (pun assuredly intended) Washington's representatives. `legislator-rest-api` is here to help. It's a simple no-storage (in memory only) Node.js REST API built in Express.

## Requirements

Node v5.8.0 or recent equivalent

## Installation

    $ git clone git@github.com:bahoo/legislator-rest-api
    $ cd legislator-rest-api
    $ npm install
    $ npm start

## Usage

We'll use cURL, but Postman or any tool du jour should do just fine.

### Creating Legislators

    $ curl -H "Content-Type: application/json" -X POST -d '{"name": "Jon Culver", "state": "WA", "district": 1, "political_party": "independent", "term_starts_on": "2016-02-01", "term_ends_on": "2018-02-01"}' http://localhost:8080/api/1/legislators
    {"name":"Jon Culver","state":"WA","district":1,"political_party":"independent","term_starts_on":"2016-02-01","term_ends_on":"2018-02-01","id":1}

    $ curl -H "Content-Type: application/json" -X POST -d '{"name": "Frank Ocean", "state": "WA", "district": 2, "political_party": "democratic", "term_starts_on": "2016-02-01", "term_ends_on": "2018-02-01"}' http://localhost:8080/api/1/legislators
    {"name":"Frank Ocean","state":"WA","district":2,"political_party":"democratic","term_starts_on":"2016-02-01","term_ends_on":"2018-02-01","id":2}

    $ curl -H "Content-Type: application/json" -X POST -d '{"name": "Kshama Sawant", "state": "WA", "district": 3, "political_party": "republican", "term_starts_on": "2016-02-01", "term_ends_on": "2018-02-01"}' http://localhost:8080/api/1/legislators
    {"name":"Kshama Sawant","state":"WA","district":3,"political_party":"republican","term_starts_on":"2016-02-01","term_ends_on":"2018-02-01","id":3
    
### Updating Legislators

Adding a middle name:

    $ curl -H "Content-Type: application/json" -X POST -d '{"name": "Jon Christopher Culver", "state": "WA", "district": 1, "political_party": "independent", "term_starts_on": "2016-02-01", "term_ends_on": "2018-02-01", "id": 1}' http://localhost:8080/api/1/legislators
    {"name":"Jon Christopher Culver","state":"WA","district":1,"political_party":"independent","term_starts_on":"2016-02-01","term_ends_on":"2018-02-01","id":1}

Switching parties:

    $ curl -H "Content-Type: application/json" -X POST -d '{"name": "Frank Ocean", "state": "WA", "district": 2, "political_party": "orange", "term_starts_on": "2016-02-01", "term_ends_on": "2018-02-01", "id": 2}' http://localhost:8080/api/1/legislators
    {"name":"Frank Ocean","state":"WA","district":2,"political_party":"orange","term_starts_on":"2016-02-01","term_ends_on":"2018-02-01","id":2}

Changing legislator:

    $ curl -H "Content-Type: application/json" -X POST -d '{"name": "Ben Haggerty", "state": "WA", "district": 3, "political_party": "libertarian", "term_starts_on": "2016-05-17", "term_ends_on": "2018-02-01", "id": 3}' http://localhost:8080/api/1/legislators
    {"name":"Ben Haggerty","state":"WA","district":3,"political_party":"libertarian","term_starts_on":"2016-05-17","term_ends_on":"2018-02-01","id":3}

### Listing Legislators

All legislators:

    $ curl http://localhost:8080/api/1/legislators
    {"legislators":[{"name":"Jon Christopher Culver","state":"WA","district":1,"political_party":"independent","term_starts_on":"2016-02-01","term_ends_on":"2018-02-01","id":1},{"name":"Frank Ocean","state":"WA","district":2,"political_party":"orange","term_starts_on":"2016-02-01","term_ends_on":"2018-02-01","id":2},{"name":"Ben Haggerty","state":"WA","district":3,"political_party":"libertarian","term_starts_on":"2016-05-17","term_ends_on":"2018-02-01","id":3}]}

Legislators named 'Frank':

    $ curl http://localhost:8080/api/1/legislators?name=Frank
    {"legislators":[{"name":"Frank Ocean","state":"WA","district":2,"political_party":"orange","term_starts_on":"2016-02-01","term_ends_on":"2018-02-01","id":2}]}

By district:

    $ curl http://localhost:8080/api/1/legislators?district=3
    {"legislators":[{"name":"Ben Haggerty","state":"WA","district":3,"political_party":"libertarian","term_starts_on":"2016-05-17","term_ends_on":"2018-02-01","id":3}]}

By party:

    $ curl http://localhost:8080/api/1/legislators?political_party=independent
    {"legislators":[{"name":"Jon Christopher Culver","state":"WA","district":1,"political_party":"independent","term_starts_on":"2016-02-01","term_ends_on":"2018-02-01","id":1}]}


## Running tests

    npm test
