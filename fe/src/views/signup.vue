<template>
  <v-container grid-list-md text-xs-center>
    <v-layout row wrap align-center>
      <v-flex xs12>
        <v-toolbar flat>
         <v-toolbar-title>회원가입</v-toolbar-title>
       </v-toolbar>
        <v-card>
          <div class="pa-3">
            <v-form ref="form" v-model="valid" lazy-validation>
              <v-flex
                  xs12
                  md12
                >
              <v-text-field
                  @blur="handleBlur()"
                  :rules="idCheck"
                  ref="id"
                  v-model="userId"
                  label="아이디를 입력하세요"
                  required
              >
              </v-text-field>
            </v-flex>
            <v-flex
                xs12
                md12
              >
               <v-text-field
                  :rules="pwCheck"
                  v-model="userPw"
                  label="패스워드를 입력하세요"
                  type="password"
                  required
              >
              </v-text-field>
            </v-flex>

            <v-flex
                xs12
                md12
              >
            <v-layout row justify-space-between>
              <v-flex
                  xs5
                  md5
                >
                <v-text-field
                    :rules="nameCheck"
                    v-model="userName"
                    label="이름"
                    required
                >
                </v-text-field>
              </v-flex>
                <v-flex
                    xs5
                    md5
                  >
                <v-text-field
                  :rules="ageCheck"
                    v-model="userAge"
                    label="나이"
                    required
                >
                </v-text-field>
              </v-flex>
            </v-layout>
          </v-flex>
            <v-btn
            :disabled="!valid"
             large
             block
             color="primary"
             @click="signup()"
            >회원가입</v-btn>
          </v-form>
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
      valid: true,
      overlap: 'false',
      idCheck: [
        v => !!v || 'ID Required',
        v => !!this.overlap || 'ID Overlap'
      ],
      pwCheck: [
        v => v.length >= 5 || 'more than 5 characters',
        v => /^(?=.*[0-9]+)[a-zA-Z][a-zA-Z0-9]{4,29}$/.test(v) || 'first letter english, include numbers '
      ],
      nameCheck: [
        v => !!v || 'Name Required'
      ],
      ageCheck: [
        v => !!v || 'Age Required',
        v => /^[0-9]*$/.test(v) || 'numbers only'
      ],
      userId: '',
      userPw: '',
      userName: '',
      userAge: ''
    }
  },
  methods: {
    signup () {
      // if (this.$refs.form.validate()) {
      //   axios.post('/api/submit', {

      //   })
      // }
      axios.post('http://localhost:3000/api/webproj/signup', {
        UserId: this.userId,
        UserPw: this.userPw,
        UserName: this.userName,
        UserAge: this.userAge
      }).then((r) => {
        // this.postMd = JSON.stringify(r.data) 
        alert('회원가입을 축하합니다.')
      }).catch((e) => {
        console.error(e.message)
      })
    },
    handleBlur() {
      axios.post('http://localhost:3000/api/webproj/findone', {id: this.userId})
      .then((r)=>{
        console.log(r.data.id)
        if(r.data.id != null){
          this.overlap = ''
          this.$refs.id.validate()
        }else{
          this.overlap = 'false'
          this.$refs.id.validate()
        }
      }).catch((e) => {
        console.error(e.message)
      })
    },
    find(){
      alert("find")
      axios.post('http://localhost:3000/api/webproj/find')
      .then((r)=>{
        console.log(r.data)
        }).catch((e) => {
        console.error(e.message)
      })
    }
  }
}
</script>
