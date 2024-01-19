// karma.conf.js
module.exports = function(config) {
    config.set({
      // ... other configuration ...
  
      reporters: ['progress', 'junit'],
  
      // JUnit Reporter configurations
      junitReporter: {
        outputFile: 'test-results.xml', // Output file
        useBrowserName: false, // Add browser name to report and classes names
        suite: '', // Suite will become the package name attribute in xml testsuite element
      },
  
      // ... rest of the configuration ...
    });
  };
  