module.exports = function (config) {
  config.set({
      basePath: '',
      frameworks: ['jasmine', '@angular-devkit/build-angular'],
      plugins: [
          require('karma-jasmine'),
          require('karma-chrome-launcher'),
          require('karma-jasmine-html-reporter'),
          require('karma-spec-reporter'),
          require('@angular-devkit/build-angular/plugins/karma'),
          require('karma-coverage-reporter'),
          require('karma-junit-reporter') // Add this line

      ],
      client: {
          clearContext: false // leave Jasmine Spec Runner output visible in browser
      },
      jasmineHtmlReporter: {
          suppressAll: true // removes the duplicated traces
      },
      junitReporter: {
        outputDir: require('path').join(__dirname, './test-results'), // results will be saved as $outputDir/$browserName.xml
        outputFile: 'test-results.xml', // if included, results will be saved as $outputDir/$browserName/$outputFile
        useBrowserName: false // add browser name to report and classes names
      },  
      reporters: ['progress', 'kjhtml', 'spec', "junit"],
      port: 9876,
      colors: true,
      logLevel: config.LOG_INFO,
      autoWatch: true,
      browsers: ['ChromeHeadless'],
      singleRun: false,
      restartOnFileChange: true
  });
};