// babel.config.js
/*
module.exports = function(api) {
  api.cache(true);
  return {
    presets: ['babel-preset-expo'],
    plugins: [
      'react-native-reanimated/plugin', // Certifique-se de que este plugin esteja no final da lista
    ],
  };
};
*/

module.exports = {
  presets: ['babel-preset-expo'], // ou 'module:metro-react-native-babel-preset'
  plugins: [
    // ... outros plugins, se houver
    'react-native-reanimated/plugin', // ESTA LINHA DEVE SER A ÚLTIMA
  ],
};