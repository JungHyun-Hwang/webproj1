<template>
  <v-app>
    <v-navigation-drawer
      persistent
      :mini-variant="miniVariant"
      :clipped="clipped"
      v-model="drawer"
      enable-resize-watcher
      fixed
      app
    >
      <v-list>
        <v-list-tile
          value="true"
          v-for="(item, i) in items"
          :key="i"
          :to="item.to"

        >
          <v-list-tile-action>
            <v-icon v-html="item.icon"></v-icon>
          </v-list-tile-action>
          <v-list-tile-content>
            <v-list-tile-title v-text="item.title"></v-list-tile-title>
          </v-list-tile-content>
        </v-list-tile>
      </v-list>
    </v-navigation-drawer>
    <v-toolbar
      app
      :clipped-left="clipped"
    >
      <v-toolbar-side-icon @click.stop="drawer = !drawer"></v-toolbar-side-icon>
      <v-btn icon @click.stop="miniVariant = !miniVariant">
        <v-icon v-html="miniVariant ? 'chevron_right' : 'chevron_left'"></v-icon>
      </v-btn>
      <v-btn icon @click.stop="clipped = !clipped">
        <v-icon>web</v-icon>
      </v-btn>
      <v-btn icon @click.stop="fixed = !fixed">
        <v-icon>web</v-icon>
      </v-btn>
      <v-toolbar-title v-text="title"></v-toolbar-title>
      <v-spacer></v-spacer>
      <v-btn icon
      @click="loginMdUp"
      class="mr-4"
      >
      <v-icon class="mr-1">supervised_user_circle</v-icon>
      Login
      </v-btn>
      <v-btn icon @click.stop="rightDrawer = !rightDrawer">
        <v-icon>menu</v-icon>
      </v-btn>
    </v-toolbar>

    <!-- Dialog -->
    <v-dialog v-model="loginDialog" persistent max-width="600px">
     <template v-slot:activator="{ on }">
     </template>
     <v-card>
       <v-card-title>
         <span class="headline">로그인</span>
       </v-card-title>
       <v-card-text>
         <v-container grid-list-md>
           <v-layout wrap justify-space-between>
             <v-flex xs12 sm12 md12 >
               <v-text-field
                   v-model="userId"
                   label="아이디를 입력하세요"
               >
             </v-text-field>

             </v-flex>
             <v-flex xs12 sm12 md12 >
               <v-text-field
                   v-model="userPw"
                   label="비밀번호를 입력하세요"
                   type="password"
               >
             </v-text-field>
             </v-flex>
           </v-layout>
         </v-container>
       </v-card-text>
       <v-card-actions>
         <v-spacer></v-spacer>
         <v-btn color="blue darken-1" flat @click="loginUser">로그인</v-btn>
         <v-btn color="blue darken-1" flat @click="loginDialog = false">닫기</v-btn>
       </v-card-actions>
     </v-card>
   </v-dialog>
    <v-content>
      <router-view/>
    </v-content>
    <v-navigation-drawer
      temporary
      :right="right"
      v-model="rightDrawer"
      fixed
      app
    >
      <v-list>
        <v-list-tile @click="right = !right">
          <v-list-tile-action>
            <v-icon>compare_arrows</v-icon>
          </v-list-tile-action>
          <v-list-tile-title>Switch drawer (click me)</v-list-tile-title>
        </v-list-tile>
      </v-list>
    </v-navigation-drawer>
    <v-footer :fixed="fixed" app>
      <span>&copy; 2017</span>
    </v-footer>
  </v-app>
</template>

<script>
import axios from 'axios'
export default {
  name: 'App',
  data () {
    return {
      loginDialog: false,
      clipped: false,
      drawer: true,
      fixed: false,
      userId: '',
      userPw: '',
      items: [
        {
          icon: 'home',
          title: 'home',
          to: '/'
        },
        {
          icon: 'face',
          title: 'user_admin',
          to: '/user'
        },
        {
          icon: 'face',
          title: 'RestFul',
          to: '/REST'
        },
        {
          icon: 'face',
          title: 'login',
          to: '/login'
        },
        {
          icon: 'face',
          title: 'signup',
          to: '/signup'
        }
      ],
      miniVariant: false,
      right: true,
      rightDrawer: false,
      title: 'Vuetify.js'
    }
  },
  methods: {
    loginMdUp () {
      this.loginDialog = true
    },
    loginUser () {
      axios.post('http://localhost:3000/api/webproj/findone', {id: this.userId})
      .then((r)=>{
        console.log(r.data.id)
        if(r.data.id != null){
          if(this.userPw == r.data.pw)
          {
            alert("로그인 성공")
            this.$router.push({name: 'home'})
          }else{
            alert("로그인 실패")
          }
        }else{
          alert("로그인 실패")
        }
      }).catch((e) => {
        console.error(e.message)
      })
    }
  }
}
</script>
