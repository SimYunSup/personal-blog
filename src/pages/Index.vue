<template>
  <Layout :show-logo="false">


    <div class="description content-box">
      <h1 class="title">
        Logs
      </h1>
        기록을 위한 간단한 기술 블로그
    </div>
    <!-- List posts -->
    <div class="posts">
      <PostCard v-for="edge in $page.posts.edges" :key="edge.node.id" :post="edge.node"/>
    </div>

  </Layout>
</template>

<page-query>
query {
  posts: allPost(filter: { published: { eq: true }}) {
    edges {
      node {
        id
        title
        date (format: "YYYY년 MM월 DD월")
        timeToRead
        description
        image (width: 770, height: 380, blur: 10)
        path
        tags {
          id
          title
          path
        }
      }
    }
  }
}
</page-query>

<script>
import Author from '~/components/Author.vue'
import PostCard from '~/components/PostCard.vue'

export default {
  components: {
    Author,
    PostCard
  },
  metaInfo: {
    title: 'Blog'
  }
}
</script>

<style lang="scss">
  .description {
    background: none;
    text-align: center;
    box-shadow: none;

    & .title {
      display: block;
      font-size: 1.5rem;
      font-weight: bold;
    }
  }
</style>
