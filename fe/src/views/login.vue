<template>
  <v-container fill-height>
    <v-layout row wrap align-center>
      <v-flex xs12>
        <v-toolbar flat>
         <v-toolbar-title>로그인</v-toolbar-title>
       </v-toolbar>
        <v-card>
          <div class="pa-3">
            <v-text-field
                v-model="userId"
                label="아이디를 입력하세요."

            >
            </v-text-field>
            <v-text-field
                v-model="userPw"
                label="패스워드를 입력하세요"
                type="password"
            >
            </v-text-field>
            <v-btn
             large
             block
             color="primary"
             @click="login()"
            >로그인</v-btn>
              <v-btn
            <v-btn
             class="mt-4"
             large
             block
             color="primary"
             @click="movepage()"
            >회원가입</v-btn>
          </div>
        </v-card>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
import axios from 'axios'
export default {
  data () {
    return {
      userId: null,
      userPw: null
    }
  },
  methods: {
    login() {
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
    },
    movepage() {
      this.$router.push({name: 'signup'})
    }
  }
}
</script>
