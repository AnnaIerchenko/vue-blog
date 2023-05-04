<template>
  <div class="navbar">
    <div @click="$router.push('/')">Blog</div>
    <div class="navbar__btns">
      <my-button @click="$router.push('/posts')">Posts</my-button>
      <my-button 
        style="margin-left: 20px;"
        @click="$router.push('/about')"
        >About</my-button>
      <my-button 
        style="margin-left: 20px;"
        @click="$router.push('/store')"
        >Store</my-button>
      <my-button 
        style="margin-left: 20px;"
        @click="$router.push('/composition')"
        >Composition</my-button>
    </div>
  </div>
</template>

<scrpt>

</scrpt>

<style scoped>
  .navbar {
   height: 58px;
   background-color: #b1d8d8;
   box-shadow: 2px 2px 4px gray;
   display: flex;
   align-items: center;
   padding: 0 15px;
  }
  .navbar__btns {
  margin-left: auto;
  
  }
</style>