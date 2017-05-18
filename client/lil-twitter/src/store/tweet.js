import Vue from 'vue'
import Vuex from 'vuex'
import router from '../router'
import * as firebase from 'firebase';
import tgl from 'tgl'
Vue.use(Vuex)

var config = {
  apiKey: "AIzaSyCq1TPdUjkJVsqJ89TLcvo1hK2JFLfoWNI",
  authDomain: "tweet-5f077.firebaseapp.com",
  databaseURL: "https://tweet-5f077.firebaseio.com",
  storageBucket: "tweet-5f077.appspot.com"
};
firebase.initializeApp(config);
var database = firebase.database();

export const store = new Vuex.Store({
  state: {
    user: {
      _id: '',
      username: '',
      password: '',
      email: '',
      img_url: '',
      logusername: '',
      logpassword: ''
    },
    prof: {
      _id: '',
      username: '',
      password: '',
      email: '',
      img_url: '',
    },
    tweet: {
      status: '',
      author: '',
      answer: [{
        id: '',
        description: '',
        author: '',
        created: ''
      }],
      hastag: [''],
      created: ''
    },
    list_tweet: [],
    list_prof: [],
    message: '',
    status: true,
    db: database,
    popular: []
  },
  mutations: {
    emptyuser(state) {
      state.user._id = ''
      state.user.username = ''
      state.user.password = ''
      state.user.img_url = ''
      state.user.email = ''
      state.user.logusername = ''
      state.user.logpassword = ''
      setTimeout(function() {
        $("#loginfailed").hide();
      }, 2000);
      setTimeout(function() {
        $("#loginsuccess").hide();
      }, 2000);
      setTimeout(function() {
        $("#logoutsuccess").hide();
      }, 2000);
      setTimeout(function() {
        $("#signupsuccess").hide();
      }, 2000);
      setTimeout(function() {
        $("#signupwarning").hide();
      }, 2000);
    },
    login(state, data) {
      state.message = data;
      state.status = false;
    },
    logout(state) {
      state.status = true;
    },
    setMessage(state, data) {
      state.message = data;
    },
    setprof(state, data) {
      state.prof = data;
    },
    seedpopular(state, data) {
      state.popular = data;
    },
    setUser(state, data) {
      state.user = data;
      state.user.created = tgl.formatdate1(new Date(data.created))
    },
    emptytweet(state) {
      state.tweet.status = '';
    },
    seedlist(state, data) {
      data.forEach(tmp => {
        tmp.created = tgl.kapan(new Date(tmp.created))
      })
      state.list_tweet = data;
    },
    seedlistprof(state, data) {
      data.forEach(tmp => {
        tmp.created = tgl.kapan(new Date(tmp.created))
      })
      state.list_prof = data;
    },
    setfirebase(state, data) {
      state.db.ref('tweet/' + data).set({
        status: Math.floor((Math.random() * 999999999) + 1)
      });
    },
    tweetReset(state) {
      state.tweet.status = '';
      setTimeout(function() {
        $("#createsuccess").hide();
      }, 2000);
      setTimeout(function() {
        $("#createwarning").hide();
      }, 2000);
    }
  },
  actions: {
    emptyuser({
      commit
    }) {
      commit('emptyuser');
    },
    toprofile({
      commit
    }, data) {
      axios.get('http://localhost:3000/tweet/recent/' + data.author._id)
        .then(function(response) {
          commit('seedlistprof', response.data)
          commit('setprof', data.author)
          router.push('/profile');
        })
        .catch(function(error) {
          console.log(error);
        });
    },
    seedpopular({
      commit
    }) {
      axios.get('http://localhost:3000/tweet/hastag/popular')
        .then(function(response) {
          commit('seedpopular', response.data.popular)
        })
        .catch(function(error) {
          console.log(error);
        });
    },
    searchhastag({
      commit
    }, data) {
      axios.get('http://localhost:3000/tweet/search/hastag/' + data)
        .then(function(response) {
          commit('seedlist', response.data)
        })
        .catch(function(error) {
          console.log(error);
        });
    },
    seedTweet({
      commit
    }) {
      axios.get('http://localhost:3000/tweet')
        .then(function(response) {
          commit('seedlist', response.data)
        })
        .catch(function(error) {
          console.log(error);
        });
    },
    createTweet({
      commit
    }, data) {
      if (data.status !== '') {
        axios.post('http://localhost:3000/tweet', {
            status: data.status,
            hastag: data.hastag,
            author: data.author
          })
          .then(function(response) {
            console.log(response);
            commit('setfirebase', response.data._id);
            commit('tweetReset');
            $("#createsuccess").fadeIn();
          })
          .catch(function(error) {
            console.log(error);
          });
      } else {
        $("#createwarning").fadeIn();
      }
    },
    cektoken({
      commit
    }) {
      if (!localStorage.getItem('token')) {
        localStorage.removeItem('data');
        localStorage.removeItem('token');
        commit('emptyuser');
        router.push('/');
      }
    },
    signup({
      commit
    }, data) {
      if (data.username != '' || data.password != '' || data.email != '' || data.img_url != '') {
        axios.post('http://localhost:3000/signup', {
            username: data.username,
            email: data.email,
            img_url: data.img_url,
            password: data.password
          })
          .then(function(response) {
            localStorage.setItem('token', response.data.token);
            commit('setUser', response.data.data)
            commit('login', response.data.data.username)
            router.push('/home');
            $("#signupsuccess").fadeIn();
          })
          .catch(function(error) {
            console.log(error);
          });
      } else {
        commit('emptyuser')
        $("#signupwarning").fadeIn();
      }
    },
    logout({
      commit
    }) {
      commit('logout');
      $("#logoutsuccess").fadeIn();
      commit('emptyuser');
      commit('emptytweet');
      localStorage.removeItem('token');
      router.push('/')
    },
    login({
      commit
    }, data) {
      if (data.username != '' || data.password != '') {
        axios.post('http://localhost:3000/signin', {
            username: data.username,
            password: data.password
          })
          .then(function(response) {
            if (response.data.success) {
              console.log(response.data.data);
              localStorage.setItem('token', response.data.token);
              commit('setUser', response.data.data)
              $("#loginsuccess").fadeIn();
              commit('login', response.data.data.username)
              router.push('/home');
            } else {
              commit('setMessage', response.data.message)
              $("#loginfailed").fadeIn();
            }
          })
      } else {
        commit('setMessage', 'input field.')
        $("#loginfailed").fadeIn();
        commit('emptyuser')
      }
    }
  },
  getters: {
    user(state) {
      return state.user
    },
    message(state) {
      return state.message
    },
    status(state) {
      return state.status
    },
    in (state) {
      return state.in
    },
    db(state) {
      return state.db
    },
    tweet(state) {
      return state.tweet
    },
    list_tweet(state) {
      return state.list_tweet
    },
    list_prof(state) {
      return state.list_prof
    },
    popular(state) {
      return state.popular
    },
    prof(state) {
      return state.prof
    }
  }
})
