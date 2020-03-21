// Import main css
import '~/assets/style/index.scss'
import "gridsome-plugin-remark-prismjs-all/themes/night-owl.css";

// Import default layout so we don't need to import it to every page
import DefaultLayout from '~/layouts/Default.vue'

// The Client API can be used here. Learn more: gridsome.org/docs/client-api
export default function (Vue, { router, head, isClient }) {

  head.script.push({
    src: 'https://kit.fontawesome.com/1598fb3eba.js',
    crossorigin: 'anonymous'
  })

  head.meta.push({
    name: 'google-site-verification',
    content: 'fs2XnBhfUj4mE6Mc9tsvmLQ4MOGw5v2SkMdlfhYLPjE'
  })
  head.link.push({
    name: 'apple-touch-icon',
    sizes: '60x60',
    content: '/apple-icon-60x60.png'
  })
  head.link.push({
    name: 'apple-touch-icon',
    sizes: '72x72',
    content: '/apple-icon-72x72.png'
  })
  head.link.push({
    name: 'apple-touch-icon',
    sizes: '57x57',
    content: '/apple-icon-57x57.png'
  })
  head.link.push({
    name: 'apple-touch-icon',
    sizes: '76x76',
    content: '/apple-icon-76x76.png'
  })
  head.link.push({
    name: 'apple-touch-icon',
    sizes: '114x114',
    content: '/apple-icon-114x114.png'
  })
  head.link.push({
    name: 'apple-touch-icon',
    sizes: '120x120',
    content: '/apple-icon-120x120.png'
  })
  head.link.push({
    name: 'apple-touch-icon',
    sizes: '144x144',
    content: '/apple-icon-144x144.png'
  })
  head.link.push({
    name: 'apple-touch-icon',
    sizes: '152x152',
    content: '/apple-icon-152x152.png'
  })
  head.link.push({
    name: 'apple-touch-icon',
    sizes: '192x192',
    content: '/apple-icon-192x192.png'
  })
  head.link.push({
    name: 'apple-touch-icon',
    sizes: '180x180',
    content: '/apple-icon-180x180.png'
  })
  head.link.push({
    rel: 'icon',
    type: 'image/png',
    sizes: '16x16',
    content: '/favicon-16x16.png'
  })
  head.link.push({
    rel: 'icon',
    type: 'image/png',
    sizes: '32x32',
    content: '/favicon-32x32.png'
  })
  head.link.push({
    rel: 'icon',
    type: 'image/png',
    sizes: '96x96',
    content: '/favicon-96x96.png'
  })
  head.link.push({
    rel: 'manifest',
    content: '/manifest.json'
  })
  head.meta.push({
    name: "msapplication-TileColor",
    content: '#ffffff'
  })
  head.meta.push({
    name: "msapplication-TileImage",
    content: '/ms-icon-144x144.png'
  })
  head.meta.push({
    name: "theme-color",
    content: '#ffffff'
  })


  // Set default layout as a global component
  Vue.component('Layout', DefaultLayout)
}