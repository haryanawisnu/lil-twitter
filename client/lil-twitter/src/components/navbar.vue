<template>
<div class="navbar">
  <nav class="navbar navbar-inverse">
    <div class="container-fluid">
      <div class="navbar-header">
        <button type="button" class="navbar-toggle" data-toggle="collapse" data-target="#myNavbar">
          <span class="icon-bar"></span>
          <span class="icon-bar"></span>
          <span class="icon-bar"></span>
        </button>
        <a @click="tohome" class="navbar-brand" style="color:#ffffff;"><b>Lil Twitter</b></a>
      </div>
      <ul v-if="!status" class="nav navbar-nav pull-left">
        <li class="dropdown">
          <a href="#" class="dropdown-toggle" data-toggle="dropdown" style="color:#ffffff;">POPULAR HASTAG<span class="caret"></span></a>
          <ul class="dropdown-menu" role="menu">
            <li v-for="popu in popular"><a @click="searchhastag">{{popu.name}}</a></li>
          </ul>
        </li>
      </ul>
      <form v-if="!status" class="navbar-form navbar-left">
        <div class="form-group">
          <input v-model="searching" class="form-control" placeholder="Search">
        </div>
        <a @click="searchhastag" class="btn btn-primary">Search</a>
      </form>
      <div class="collapse navbar-collapse" id="myNavbar">
        <ul class="nav navbar-nav navbar-right">
          <div class="collapse navbar-collapse" id="bs-example-navbar-collapse-1">
            <div v-if="status" class="navbar-form navbar-right" role="form">
              <div class="input-group">
                <span class="input-group-addon"><i class="glyphicon glyphicon-user"></i></span>
                <input id="username" type="text" class="form-control" name="username" v-model="user.logusername" placeholder="Username">
              </div>
              <div class="input-group">
                <span class="input-group-addon"><i class="glyphicon glyphicon-lock"></i></span>
                <input id="password" type="password" class="form-control" name="password" v-model="user.logpassword" placeholder="Password">
              </div>
              <button type="submit" class="btn btn-primary" @click="login">Login</button>
            </div>
            <div v-else class="navbar-form navbar-right" role="form">
              <a class="btn" style="color:#ffffff;">I'm<b> {{message}}   &nbsp&nbsp</b></a>
              <button type="submit" class="btn btn-warning" @click="logout">Logout</button>
            </div>
          </div>
        </ul>
      </div>
    </div>
  </nav>
  <div class="alert alert-danger" id="loginfailed" role="alert" style="display:none;">
    <button type="button" class="close" data-dismiss="alert" aria-label="Close"><span aria-hidden="true">&times;</span></button>
    <strong>Login Failed!</strong> {{message}}.
  </div>
  <div class="alert alert-success" id="loginsuccess" role="alert" style="display:none;">
    <button type="button" class="close" data-dismiss="alert" aria-label="Close"><span aria-hidden="true">&times;</span></button>
    <strong>Welcome!</strong> {{message}}.
  </div>
  <div class="alert alert-success" id="logoutsuccess" role="alert" style="display:none;">
    <button type="button" class="close" data-dismiss="alert" aria-label="Close"><span aria-hidden="true">&times;</span></button>
    <strong>Bye!</strong> {{message}}.
  </div>
</div>
</template>

<script>
export default {
  name: 'navbar',
  data() {
    return {
      searching: ''
    }
  },
  computed: {
    user() {
      return this.$store.getters.user
    },
    status() {
      return this.$store.getters.status
    },
    message() {
      return this.$store.getters.message
    },
    popular() {
      return this.$store.getters.popular
    }
  },
  methods: {
    login() {
      let data = {};
      data.username = this.user.logusername;
      data.password = this.user.logpassword;
      this.$store.dispatch('login', data)
    },
    logout() {
      this.$store.dispatch('logout')
      this.$router.push('/')
    },
    tohome() {
      this.$router.push('/home')
    },
    searchhastag() {
      this.$store.dispatch('searchhastag', this.searching)
    }
  },
  created() {}
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped></style>
