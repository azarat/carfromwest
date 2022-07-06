const withReactSvg = require('next-react-svg')
const path = require('path')

module.exports = withReactSvg({
  include: path.resolve(__dirname, 'src/assets/svg'),
  webpack(config) {
    return config
  },
  env: {
    botKey: '5472641997:AAE1HmY_aL5KSQFZQcR6n1z9f0DNtBQMpfY',
  },
  images: {
    domains: ["cs.copart.com"],
  },
})
