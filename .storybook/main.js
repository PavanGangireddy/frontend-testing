const path = require('path')

module.exports = {
   addons: [
      '@storybook/preset-create-react-app',
      '@storybook/addon-actions',
      '@storybook/addon-links',
      '@storybook/addon-notes',
      '@storybook/addon-knobs/register'
   ],
   webpackFinal: async (config, { configType }) => {
      config.module.rules.push({
         test: /\.(png|woff|woff2|eot|ttf|svg)$/,
         loaders: ['file-loader'],
         include: path.resolve(__dirname, '../')
      })

      // Return the altered config
      return config
   }
}
