<template>
    <div class="posts">
      <div class="post" v-for="post of discussions" :key="post.id">
        <h3 class="post-title">{{ post.title }}</h3>
        <vue-markdown class="post-body">{{ post.body }}</vue-markdown>
        <div class="post-footer">
          <i class="fas fa-user"></i> {{ post.author }}
        </div>
      </div>
    </div>
</template>

<script>
import VueMarkdown from 'vue-markdown'
import Steem from 'steem'

export default {
  name: 'steemit',
  props: ['tag'],
  data () {
    return {
      discussions: []
    }
  },
  mounted() {
    this.loadDiscussions(this.tag)
  },
  methods: {
    loadDiscussions(tag) {
      const perPage = 10

      // Steem.api.getAccountHistory(account, 100, 100, function(err, result) {
      //   console.log(err, result);
      // });

      Steem.api.getDiscussionsByCreated({tag: tag, limit: perPage}, (err, data) => {
        console.log(data)

        if (data && !err) {
          this.discussions = data;
        } else {
          console.error('No discussions or error');
        }
      });
    }
  },
  components: {
    VueMarkdown
  }
}
</script>

<style lang="scss" scoped>
@import '../../assets/variables';

.posts {
  margin: 0 5rem;

  .post {
    background: #FFF;
    padding: 1.5rem 2rem;
    color: $palette-body;
    border-radius: 16px;
    margin: 2rem auto;

    .post-title {
      margin: 1rem 0 2rem 0;
      font-size: 2rem;
      font-weight: 700;
    }

    .post-body {
      line-height: 1.6;
    }

    .post-footer {
      padding: 2rem 0 0 0;
      text-align: center;
    }

    img {
      display: block;
      margin: 0 auto;
    }
  }
}

</style>