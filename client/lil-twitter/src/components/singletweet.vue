<template>
<div class="singletweet">
  <div class="container">
    <div v-for="lp in list_prof" class="col-sm-8">
      <div class="panel panel-white post panel-shadow">
        <div class="post-heading">
          <div class="pull-left image">
            <img :src="lp.author.img_url" class="img-circle avatar" alt="user profile image">
          </div>
          <div class="pull-left meta">
            <div class="title h5">
              <a class="btn"><b>{{lp.author.username}}</b></a> made a post.
            </div>
            <h6 class="text-muted time" style="margin-right:65px;">{{lp.created}}</h6>
          </div>
        </div>
        <div class="post-description text-left">
          <p>{{lp.status}}</p>
          <!-- <div class="stats">
            <a href="#" class="btn btn-default stat-item">
                        <i class="fa fa-thumbs-up icon"></i>2
                    </a>
            <a href="#" class="btn btn-default stat-item">
                        <i class="fa fa-share icon"></i>12
                    </a>
          </div> -->
        </div>
      </div>
    </div>
  </div>
</div>
</template>

<script>
export default {
  name: 'singletweet',
  computed: {
    list_prof() {
      return this.$store.getters.list_prof
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.panel-shadow {
  box-shadow: rgba(0, 0, 0, 0.3) 7px 7px 7px;
}

.panel-white {
  border: 1px solid #dddddd;
}

.panel-white .panel-heading {
  color: #333;
  background-color: #fff;
  border-color: #ddd;
}

.panel-white .panel-footer {
  background-color: #fff;
  border-color: #ddd;
}

.post .post-heading {
  height: 95px;
  padding: 20px 15px;
}

.post .post-heading .avatar {
  width: 60px;
  height: 60px;
  display: block;
  margin-right: 15px;
}

.post .post-heading .meta .title {
  margin-bottom: 0;
}

.post .post-heading .meta .title a {
  color: black;
}

.post .post-heading .meta .title a:hover {
  color: #aaaaaa;
}

.post .post-heading .meta .time {
  margin-top: 8px;
  color: #999;
}

.post .post-image .image {
  width: 100%;
  height: auto;
}

.post .post-description {
  padding: 15px;
}

.post .post-description p {
  font-size: 14px;
}

.post .post-description .stats {
  margin-top: 20px;
}

.post .post-description .stats .stat-item {
  display: inline-block;
  margin-right: 15px;
}

.post .post-description .stats .stat-item .icon {
  margin-right: 8px;
}

.post .post-footer {
  border-top: 1px solid #ddd;
  padding: 15px;
}

.post .post-footer .input-group-addon a {
  color: #454545;
}

.post .post-footer .comments-list {
  padding: 0;
  margin-top: 20px;
  list-style-type: none;
}

.post .post-footer .comments-list .comment {
  display: block;
  width: 100%;
  margin: 20px 0;
}

.post .post-footer .comments-list .comment .avatar {
  width: 35px;
  height: 35px;
}

.post .post-footer .comments-list .comment .comment-heading {
  display: block;
  width: 100%;
}

.post .post-footer .comments-list .comment .comment-heading .user {
  font-size: 14px;
  font-weight: bold;
  display: inline;
  margin-top: 0;
  margin-right: 10px;
}

.post .post-footer .comments-list .comment .comment-heading .time {
  font-size: 12px;
  color: #aaa;
  margin-top: 0;
  display: inline;
}

.post .post-footer .comments-list .comment .comment-body {
  margin-left: 50px;
}

.post .post-footer .comments-list .comment>.comments-list {
  margin-left: 50px;
}
</style>
