<template>
  <v-app>
    <v-app-bar app height="48px" flat class="login-header">
      <i class="iconfont icon-close grey--text" @click="closeWindow"></i>
    </v-app-bar>
    <v-content v-model="valid" class="pt-12 login-content mt-4">
      <v-form>
        <v-container fluid class="login-container">
          <v-row no-gutters v-if="loginType === 'phonenumber'" >
            <v-col cols="3" align-self="center" justify-self="center" class="grey--text">
              <i class="iconfont icon-phone"></i> +86
            </v-col>
            <v-col cols="9">
              <v-text-field
                v-model="phonenumber"
                :counter="11"
                label="电话号码"
                required
                :rules="phonenumberRules"
              ></v-text-field>
            </v-col>
          </v-row>
          <v-row no-gutters v-if="loginType === 'email'" >
            <v-col cols="3" align-self="center" justify-self="center" class="grey--text">
              <i class="iconfont icon-mail"></i> @163
            </v-col>
            <v-col cols="9">
              <v-text-field v-model="email" label="邮箱" required :rules="emailRules"></v-text-field>
            </v-col>
          </v-row>
          <v-row no-gutters class="mt-4">
            <v-col cols="3" align-self="center" justify-self="center" class="grey--text">
              <i class="iconfont icon-password"></i>
            </v-col>
            <v-col cols="9">
              <v-text-field v-model="password" label="密码" required :rules="passwordRules" type="password"></v-text-field>
            </v-col>
          </v-row>

          <v-btn large block class="mt-12 mb-12" color="rgb(199,46,46)">登录</v-btn>

          <v-row no-gutters align="center" class="mb-6">
            <v-col cols="4.5">
              <v-divider />
            </v-col>
            <v-col cols="3" class="caption ml-2 mr-2">其他登录方式</v-col>
            <v-col cols="4.5">
              <v-divider />
            </v-col>
          </v-row>
          <v-row class="loginType-wrap" justify="center">
            <i
              class="iconfont icon-phone"
              v-if="loginType === 'email'"
              @click="loginType = 'phonenumber'"
            ></i>
            <i
              class="iconfont icon-mail"
              v-if="loginType === 'phonenumber'"
              @click="loginType = 'email'"
            ></i>
          </v-row>
        </v-container>
      </v-form>
    </v-content>
  </v-app>
</template>

<script>
import {
  VApp,
  VContent,
  VForm,
  VTextField,
  VDivider,
  VAppBar
} from 'vuetify/lib'
import {ipcRenderer} from 'electron'
export default {
  components: {
    VApp,
    VContent,
    VForm,
    VTextField,
    VDivider,
    VAppBar
  },
  data() {
    return {
      loginType: 'phonenumber', // 登录类型，默认为电话号码登录   email: 邮箱登录
      valid: false,
      phonenumber: '',
      email: '',
      password: '',
      phonenumberRules: [
        v => !!v || '请输入电话号码',
        v =>
          /^(?:\+?86)?1(?:3\d{3}|5[^4\D]\d{2}|8\d{3}|7(?:[35678]\d{2}|4(?:0\d|1[0-2]|9\d))|9[189]\d{2}|66\d{2})\d{6}$/.test(
            v
          ) || '电话号码不合法'
      ],
      emailRules: [
        v => !!v || '请输入邮箱',
        v =>
          /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(
            v
          ) || '邮箱不合法'
      ],
      passwordRules: [
        v => !!v || '请输入密码',
        v => v.length > 5 || '密码长度太短'
      ]
    }
  },
  methods: {
    closeWindow(){
      ipcRenderer.send('loginWindow:close')
    }
  }
}
</script>

<style lang="scss" scoped>
.login-container {
  max-width: 350px;
}
.login-header{
  display: flex;
  justify-content: flex-end;
  background-color: #222225;
}
.login-content{
  background-color: $bg-dark;
}
.icon-phone,
.icon-mail,
.icon-password,
.icon-close {
  font-size: 20px;
}
.icon-close {
  cursor: pointer;
  &:hover {
    color: #fff !important;
  }
}
.loginType-wrap {
  .iconfont {
    color: $theme-color;
    font-size: 40px;
    display: flex;
    width: 80px;
    height: 80px;
    border-radius: 50%;
    border: 1px solid $theme-color;
    align-items: center;
    justify-content: center;
    cursor: pointer;
    &:hover {
      filter: brightness(1.3);
    }
  }
}
</style>
