<template>
  <div v-if="posts.length > 0">
    <h3>User List</h3>
    <transition-group name="post-list">
      <post-item 
        v-for="post in posts"
        :post="post"
        :key="post.id"
        @remove="$emit('remove', post)"
        />
    </transition-group>
  </div>
  <h2 v-else style="color: red">
    List of posts is empty
  </h2>
</template>

<script>
import PostItem from './PostItem.vue';

  export default {
    props: {
        posts: {
            type: Array,
            required: true
        }
    },
    components: { PostItem }
}
</script>

<style scoped>
  .post-list-item {
    display: inline-block;
    margin-right: 18px;
  }
  .post-list-enter-active,
  .post-list-leave-active {
    transition: all .4s ease;
  }
  .post-list-enter-from,
  .post-list-leave-to {
    opacity: 0;
    transform: translateX(130px);
  }
  .post-list-move {
    transition: transform 0.4s ease;
  }
</style>