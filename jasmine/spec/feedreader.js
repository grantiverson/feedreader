// feedreader.js

// This is the spec file that Jasmine will read and contains all of the tests
// that will be run against the application.

// All of the tests are within the $() function, since some of these tests may
// require DOM elements. We want to ensure they don't run until the DOM
// is ready.
$(function() {
    // This suite is all about the RSS feeds definitions, the allFeeds variable in the application.
    describe('RSS Feeds', function() {
        // Makes sure that the allFeeds variable has been defined and that it is not empty.
        it('are defined', function() {
            // checks to see if allFeeds array is defined
            expect(allFeeds).toBeDefined();
            // checks to see if allFeeds array has at least one entry
            expect(allFeeds.length).not.toBe(0);
        });


        // Loops through each feed in the allFeeds object and ensures it has a
        // URL defined and that the URL is not empty.
        it('has a URL', function() {
            allFeeds.forEach(function(element) {
                // checks to see if all entries in allFeeds array have a defined URL value
                expect(element['url']).toBeDefined();
                // checks to see if all entries in allFeeds array have a non-empty URL value
                expect(element['url']).not.toBe('');
            });
        });


        // Loops through each feed in the allFeeds object and ensures it has a
        // name defined and that the name is not empty.
        it('has a URL', function() {
            allFeeds.forEach(function(element) {
                // checks to see if all entries in allFeeds array have a defined name key
                expect(element['name']).toBeDefined();
                // checks to see if all entries in allFeeds array have a non-empty name key
                expect(element['name']).not.toBe('');
            });
        });
    });


    // This suite includes tests to ensure the menu appears and disappears correctly
    describe('The menu', function() {

        // Ensures the menu element is hidden by default
        it('should be hidden by default', function() {
            // stores a boolean indicating whether the body element's class list contains 'menu-hiden'
            var menuHidden = document.getElementsByTagName('body')[0].classList.contains('menu-hidden');
            // body element should have the menu-hidden class
            expect(menuHidden).toBe(true);
        });

        // Ensures the menu changes visibility when the menu icon is clicked
        it('should change visibility when the menu icon is clicked', function() {
            // simulates a click on the menu-icon-link
            document.getElementsByClassName('menu-icon-link')[0].click();
            // stores a boolean indicating whether the body element's class list contains 'menu-hiden'
            var menuHidden = document.getElementsByTagName('body')[0].classList.contains('menu-hidden');
            // body element should not have the menu-hidden class
            expect(menuHidden).toBe(false);

            // simulates a click on the menu-icon-link
            document.getElementsByClassName('menu-icon-link')[0].click();
            // stores a boolean indicating whether the body element's class list contains 'menu-hiden'
            var menuHidden = document.getElementsByTagName('body')[0].classList.contains('menu-hidden');
            // body element should have the menu-hidden class
            expect(menuHidden).toBe(true);
        });
    });

    // This suite includes tests that make sure the feeds load properly
    describe('Initial Entries', function() {
        beforeEach(function(done) {
            // simulates running the loadFeed function before each test
            loadFeed(0, done);
        });

        // Test ensures when the loadFeed function is called and completes its
        // work, there is at least a single .entry element within the .feed
        // container (loadFeed() is asynchronous)
        it('should exist', function() {
            // checks to see if an object with class 'entry' has been loaded
            expect(typeof document.getElementsByClassName('entry')[0]).toBe("object");
        });
    });


    // This suite includes tests that make sure new feeds load properly
    describe('New Feed Selection', function() {
        var oldEntry,
            newEntry;

        beforeEach(function(done) {
            // loads feed the first feed
            loadFeed(0, function() {
                // stores the first entry as 'oldEntry'
                oldEntry = document.querySelector('.entry h2');
                // load new feed
                loadFeed(1, done);
            });

        });

        // Test that ensures when a new feed is loaded by the loadFeed function
        // that the content actually changes (loadFeed() is asynchronous)
        it('content should update', function() {
            // stores the first entry as 'newEntry'
            newEntry = document.querySelector('.entry h2');
            // if the new entry is the same as the old entry, the new feed has not loaded
            expect(newEntry).not.toBe(oldEntry);
        });
    });
}());
