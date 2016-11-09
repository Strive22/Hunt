require(TEST_HELPER); // <--- This must be at the top of every test file.

var request = require('supertest-as-promised');
var routes = require(__server + '/app.js');

describe('The Server to end all Servers!', function() {

  var app = TestHelper.createApp();
  app.use('/', routes);
  app.testReady();

  describe('index.js', function() {

    it_('Should have an index route, and it should respond with html', function * () {

      //
      // Notice how we're in a generator function (indicated by the the *)
      // See test/test-helper.js for details of why this works.
      //
      yield request(app)
        .get('/')
        .expect(200)
        .expect(function(response) {
          var content = response.header['content-type'];

          expect(content).to.be.a('string');
          expect(content).to.equal('text/html; charset=UTF-8');
        });

    });

    it_('Should respond with index.html for endpoints that don\'t exist', function * () {

      yield request(app)
        .get('/something')
        .expect(200)
        .expect(function(response) {
          var content = response.header['content-type'];
          var doctype = response.text.slice(0, 15);

          expect(content).to.be.a('string');
          expect(content).to.equal('text/html; charset=UTF-8');
          expect(doctype).to.equal('<!DOCTYPE html>');
        });

    });

  });

  describe('search.js', function() {

    it_('Should have a route for GitHub Jobs API', function * () {

      yield request(app)
        .get('/search/gh/developer')
        .expect(200)
        .expect(function(response) {
          // console.log(response);
        });

    });

    it_('Should have a route for Indeed API', function * () {

      yield request(app)
        .get('/search/in/developer')
        .expect(200)
        .expect(function(response) {
          var content = response.header['content-type'];
          var doctype = response.text.slice(0, 15);

          expect(content).to.be.a('string');
          expect(content).to.equal('text/html; charset=UTF-8');
          expect(doctype).to.equal('<!DOCTYPE html>');
        });

    });

    it_('Should have a route for Authentic Jobs API', function * () {

      yield request(app)
        .get('/search/aj/developer')
        .expect(200)
        .expect(function(response) {
          // console.log(response);
        });

    });

  });

});
