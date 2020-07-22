// This is where project configuration and plugin options are located.
// Learn more: https://gridsome.org/docs/config

// Changes here requires a server restart.
// To restart press CTRL + C in terminal and run `gridsome develop`

module.exports = {
  siteName: 'Ethan Sup\'s log',
  siteDescription: '기록을 위한 블로그',
  siteUrl: 'https://ethansup.net',

  templates: {
    Post: '/blog/:slug',
    Tag: '/blog/tag/:id'
  },

  plugins: [
    {
      // Create posts from markdown files
      use: '@gridsome/source-filesystem',
      options: {
        typeName: 'Post',
        path: 'content/posts/*.md',
        refs: {
          // Creates a GraphQL collection from 'tags' in front-matter and adds a reference.
          tags: {
            typeName: 'Tag',
            create: true,
          },
        }
      }
    },
    {
      use: '@gridsome/plugin-google-analytics',
      options: {
        id: 'UA-150206793-4'
      },
    },
    {
      use: '@gridsome/plugin-sitemap',
      options: {
        cacheTime: 600000,
        config: {
          '/blog/*': {
            changefreq: 'daily',
            priority: 1
          },
          '/blog/tag/*': {
            changefreq: 'monthly',
            priority: 0.7
          },
          '/': {
            changefreq: 'monthly',
            priority: 0.5
          }
        }
      }
    },
    {
      use: 'gridsome-plugin-feed',
      options: {
        // Required: array of `GraphQL` type names you wish to include
        contentTypes: ['Post'],
        // Optional: any properties you wish to set for `Feed()` constructor
        // See https://www.npmjs.com/package/feed#example for available properties
        feedOptions: {
          title: 'Ethan Sup\'s log',
          description: '기록을 위한 블로그',
          language: 'ko',
          author: {
            name: 'Yunsup Sim',
            email: 'pedogunu@gmail.com'
          }
        },
        rss: {
          enabled: true,
          output: '/rss.xml'
        },
        atom: {
          enabled: false
        },
        json: {
          enabled: false
        },
        maxItems: 10,
        // Optional: an array of properties passed to `Feed.addItem()` that will be parsed for
        // URLs in HTML (ensures that URLs are full `http` URLs rather than site-relative).
        // To disable this functionality, set to `null`.
        htmlFields: ['description', 'Author'],
        filterNodes: (node) => node.published,
        // Optional: a method that accepts a node and returns an object for `Feed.addItem()`
        // See https://www.npmjs.com/package/feed#example for available properties
        // NOTE: `date` field MUST be a Javascript `Date` object
        nodeToFeedItem: (node) => ({
          title: node.title,
          date: node.date || node.fields.date,
          summary: node.description,
          content: node.content,
          url: node.link,
          author: 'Yunsup Sim',
        })
      }
    }
  ],

  transformers: {
    //Add markdown support to all file-system sources
    remark: {
      externalLinksTarget: '_blank',
      externalLinksRel: ['nofollow', 'noopener', 'noreferrer'],
      slug: false,
      plugins: [
        ['gridsome-plugin-remark-prismjs-all', {
          highlightClassName: 'code-highlight',
          languageExtensions: [
            {
              language: 'vue',
              extend: 'html',
              definition: {
                vue_types: /(vue)/,
              },
            }
          ]
        }],
      ]
    }
  }
}
