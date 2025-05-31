export default {
    verbose: true,
    testEnvironment: 'jsdom',
    transform: {   
    "^.+\\.js$": ["babel-jest", { presets: ["@babel/preset-env"] }],
    },
  };
  