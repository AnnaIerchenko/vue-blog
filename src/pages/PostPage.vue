<template>
  <div >
    <h1>Page with posts</h1>
    <my-input
      v-model="searchQuery"
      placeholder="Search...."
      v-focus
    ></my-input>
    <div class="app__btns">
      <my-button
      @click="showDialog"
      >Create post
      </my-button>
      <my-select
        v-on="selectedSort"
        :options="sortOptions"
      />
    </div>

    <my-dialog v-model:show="dialogVisible">
      <post-form 
      @create="createPost"
      />
    </my-dialog>
    <post-list 
      :posts="sortedAndSearchedPosts"
      @remove="removePost"
      v-if="!isPostLoading"
      />
    <div v-else>Loading....</div>
    <div v-intersection="loadMorePosts" class="observer"></div>
    <!-- <div ref="observer" class="observer"></div> -->
    <!-- <div class="page__wrapper">
      <div 
        v-for="pageNum in totalPages" 
        :key="pageNum"
        class="page"
        :class="{
          'current-page': page === pageNum
        }"
        @click="changePage(pageNum)"
      >
      {{ pageNum }}
      </div>
    </div> -->
  </div>
</template>

<script>
import PostForm from "@/components/PostForm.vue"
import PostList from "@/components/PostList.vue"
import axios from "axios"

  export default {
    components: {
      PostForm, PostList
    },
    data(){
      return {
        posts: [],
        dialogVisible: false,
        isPostLoading: false,
        selectedSort: '',
        searchQuery: '',
        page: 1,
        limit: 10,
        totalPages: 0,
        sortOptions: [
          {value: 'title', name: 'By name'},
          {value: 'body', name: 'By info'}
        ]
      }
    },
    methods: {
      createPost(post){
        this.posts.push(post)
        this.dialogVisible = false
      },
      removePost(post){
        this.posts = this.posts.filter(p => p.id !== post.id)
      },
      showDialog(){
        this.dialogVisible = true 
      },
      // changePage(pageNum){
      //   this.page = pageNum
      // },  
      async fetchPosts(){
        try {
          this.isPostLoading = true
          const response = await axios.get('https://jsonplaceholder.typicode.com/posts', {
            params: {
              _page: this.page,
              _limit: this.limit
            }
          })
          this.totalPages = Math.ceil(response.headers['x-total-count'] / this.limit)
          this.posts = response.data
        } catch (e) {
          alert("Error")
        } finally { 
          this.isPostLoading = false
        }
      },
      async loadMorePosts(){
        try {
          this.page += 1
          // this.isPostLoading = true
          const response = await axios.get('https://jsonplaceholder.typicode.com/posts', {
            params: {
              _page: this.page,
              _limit: this.limit
            }
          })
          this.totalPages = Math.ceil(response.headers['x-total-count'] / this.limit)
          this.posts = [...this.posts, ...response.data]
        } catch (e) {
          alert("Error")
        } 
        // finally { 
          // this.isPostLoading = false
        // }
      }
    },
    
    mounted(){
      this.fetchPosts()

      // console.log(this.$refs.observer)
      // const options = {
      //   rootMargin: '8px',
      //   threhold: 1.0
      // }
      // const callback = (entries, observer) => {
      //   if(entries[0].isIntersecting && this.page < this.totalPages){
      //     this.loadMorePosts()
      //   }
      // }
      // const observer = new IntersectionObserver(callback, options)
      // observer.observe(this.$refs.observer)
    },
    computed: {
      sortedPosts(){
        return [...this.posts].sort((post1, post2) => {
          return post1[this.sort]?.localCompare(post2[this.sort])
        })
      },
      sortedAndSearchedPosts(){
        return this.sortedPosts.filter(post => post.title.toLowerCase().includes(this.searchQuery.toLowerCase()))
      }
    },
    watch: {
      // page() {
      //   this.fetchPosts()
      // }
    }
  }
</script>

<style scoped>

  .app__btns {
    margin: 15px 0;
    display: flex;
    justify-content: space-between;
  }
  .page__wrapper {
    display: flex;
    margin-top: 15px;
  }
  .page{
    border: 1px solid black;
    padding: 10px;
  }
  .current-page {
    border: 2px solid teal;
    background-color: teal;

  }
  .observer {
    height: 38px;
    background: gray;
  }
</style>