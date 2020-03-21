// This is where project configuration and plugin options are located.
// Learn more: https://gridsome.org/docs/config

// Changes here requires a server restart.
// To restart press CTRL + C in terminal and run `gridsome develop`

module.exports = {
  siteName: 'Yunsup Sim\'s log',
  siteDescription: '기록을 위한 블로그',
  siteUrl: 'https://pickhealer.netlify.com',
  siteAuthor: 'Yunsup Sim',

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
    //{
    //  use: '@gridsome/plugin-google-analytics',
    //  options: {
    //    id: process.env.GA__ID
    //  },
    //},
    {
      use: '@gridsome/plugin-sitemap',
      options: {
        config: {
          '/blog/*': {
            changefreq: 'daily',
            priority: 1
          },
        }
      }
    },
    {
      use: 'gridsome-plugin-rss',
      options: {
        contentTypeName: 'Post',
        feedOptions: {
          title: 'Yunsup Sim\'s log',
          feed_url: 'https://pickhealer.netlify.com/rss.xml',
          site_url: 'https://pickhealer.netlify.com'
        },
        feedItemOptions: node => ({
          title: node.title,
          description: node.description,
          url: 'https://pickhealer.netlify.com/' + node.path,
          author: 'Yunsup Sim',
          date: node.date
        }),
        output: {
          dir: './static',
          name: 'rss.xml'
        },
        maxItems: 20,
        latest: true
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

        }],
      ]
    }
  }
}
