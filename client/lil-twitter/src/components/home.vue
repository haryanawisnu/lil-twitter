<template>
<div class="home">
  <div class="container">
    <div class="row">
      <div class="col-lg-8 col-lg-offset-2 col-md-10 col-md-offset-1">
        <div class="alert alert-success" id="createsuccess" role="alert" style="display:none;">
          <button type="button" class="close" data-dismiss="alert" aria-label="Close"><span aria-hidden="true">&times;</span></button>
          <strong>Success create!</strong>
        </div>
        <div class="alert alert-warning" id="createwarning" role="alert" style="display:none;">
          <button type="button" class="close" data-dismiss="alert" aria-label="Close"><span aria-hidden="true">&times;</span></button>
          <strong>Warning!</strong> input field.
        </div>
        <div class="panel panel-default">
          <div class="panel-body">
            <input v-model="tweet.status" type="text" class="form-control" placeholder="Title">
          </div>
          <div class="panel-footer">
            <button @click="createTweet" type="button" class="btn btn-success">Create</button>
          </div>
        </div>
        <br>
        <br>
        <router-view></router-view>
      </div>
    </div>
  </div>
</div>
</template>

<script>
export default {
  name: 'home',
  computed: {
    user() {
      return this.$store.getters.user
    },
    tweet() {
      return this.$store.getters.tweet
    }
  },
  methods: {
    createTweet() {
      let obj = {};
      var pattern = /\B\#\w\w+\b/g;
      var result = this.tweet.status.match(pattern);
      if (result) {
        obj.hastag = result;
      } else {
        obj.hastag = [];
      }
      obj.status = this.tweet.status;
      obj.author = this.user._id;
      console.log(obj);
      this.$store.dispatch('createTweet', obj)
    }
  },
  created() {
    this.$store.dispatch('cektoken')
    this.$store.dispatch('seedpopular')
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.nav-sidebar {
  width: 100%;
  padding: 8px 0;
  border-right: 1px solid #ddd;
}

.nav-sidebar a {
  color: #333;
  -webkit-transition: all 0.08s linear;
  -moz-transition: all 0.08s linear;
  -o-transition: all 0.08s linear;
  transition: all 0.08s linear;
  -webkit-border-radius: 4px 0 0 4px;
  -moz-border-radius: 4px 0 0 4px;
  border-radius: 4px 0 0 4px;
}

.nav-sidebar .active a {
  cursor: default;
  background-color: #428bca;
  color: #fff;
  text-shadow: 1px 1px 1px #666;
}

.nav-sidebar .active a:hover {
  background-color: #428bca;
}

.nav-sidebar .text-overflow a,
.nav-sidebar .text-overflow .media-body {
  white-space: nowrap;
  overflow: hidden;
  -o-text-overflow: ellipsis;
  text-overflow: ellipsis;
}




/* Right-aligned sidebar */

.nav-sidebar.pull-right {
  border-right: 0;
  border-left: 1px solid #ddd;
}

.nav-sidebar.pull-right a {
  -webkit-border-radius: 0 4px 4px 0;
  -moz-border-radius: 0 4px 4px 0;
  border-radius: 0 4px 4px 0;
}
</style>
