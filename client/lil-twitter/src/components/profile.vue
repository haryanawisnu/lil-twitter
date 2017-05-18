<template>
<div class="profile">
  <div class="container">
    <div class="row">
      <div class=" col-lg-offset-3 col-lg-6">
        <div class="panel panel-default">
          <div class="panel-body">
            <div class="row">
              <div class="col-lg-12">
                <div class="row">
                  <div class="col-sm-offset-3 col-sm-6 col-md-offset-3 col-md-6 col-lg-offset-3 col-lg-6">
                    <img class="img-circle img-responsive" :src="prof.img_url">
                  </div>
                </div>
              </div>
            </div>
            <div class="row">
              <div class="col-lg-12">
                <div class="row">
                  <div class="centered-text col-sm-offset-3 col-sm-6 col-md-offset-3 col-md-6 col-lg-offset-3 col-lg-6">
                    <div itemscope="" itemtype="http://schema.org/Person">
                      <h2> <span itemprop="name">{{prof.username}}</span></h2>
                      <p itemprop="email"> <i class="fa fa-envelope"> </i> <a>{{prof.email}}</a> </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div class="panel-footer">
            <div class="row">
              <div id="social-links" class=" col-lg-12">
                <div class="row">
                  <div class="col-xs-6 col-sm-3 col-md-2 col-lg-3 social-btn-holder">
                    <a title="google" class="btn btn-social btn-block btn-google" target="_BLANK">
                                        <i class="fa fa-google"></i> +{{prof.username}}
                                    </a>
                  </div>
                  <div class="col-xs-6 col-sm-3 col-md-2 col-lg-3 social-btn-holder">
                    <a title="twitter" class="btn btn-social btn-block btn-twitter" target="_BLANK">
                                        <i class="fa fa-twitter"></i> /{{prof.username}}
                                    </a>
                  </div>
                  <div class="col-xs-6 col-sm-3 col-md-2 col-lg-3 social-btn-holder">
                    <a title="github" class="btn btn-social btn-block btn-github" target="_BLANK">
                                        <i class="fa fa-github"></i> /{{prof.username}}
                                    </a>
                  </div>
                  <div class="col-xs-6 col-sm-3 col-md-2 col-lg-3 social-btn-holder">
                    <a title="stackoverflow" class="btn btn-social btn-block btn-stackoverflow" target="_BLANK">
                                        <i class="fa fa-stack-overflow"></i> /{{prof.username}}
                                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="container">
      <div class="row">
        <div class="col-lg-8 col-lg-offset-2 col-md-10 col-md-offset-1">
          <router-view></router-view>
        </div>
      </div>
    </div>
  </div>

</div>
</template>

<script>
export default {
  name: 'profile',
  computed: {
    prof() {
      return this.$store.getters.prof
    }
  },
  methods: {},
  created() {}
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
@import url("https://maxcdn.bootstrapcdn.com/font-awesome/4.4.0/css/font-awesome.min.css") .social-btn-holder {
  padding: 10px;
  margin-top: 5px;
  margin-bottom: 5px;
}

.social-btn-holder .btn-social {
  font-size: 12px;
  font-weight: bold;
}

.btn-social {
  color: white;
  opacity: 0.9;
}

.btn-social:hover {
  color: white;
  opacity: 1;
}

.btn-facebook {
  background-color: #3b5998;
}

.btn-twitter {
  background-color: #00aced;
}

.btn-linkedin {
  background-color: #0e76a8;
}

.btn-github {
  background-color: #000000;
}

.btn-google {
  background-color: #c32f10;
}

.btn-stackoverflow {
  background-color: #D38B28;
}

.btn-hackerrank {
  background-color: #27AB5B;
}

.btn-soundcloud {
  background-color: #FF7202;
}

.centered-text {
  text-align: center;
}
</style>
