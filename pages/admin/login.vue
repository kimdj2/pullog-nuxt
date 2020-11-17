<template>
  <v-app class="post-main">
    <v-main class="blue-grey lighten-5 bg">
      <v-container fill-height>
        <v-row align="center" justify="center">
          <v-col cols="4"></v-col>
          <v-col cols="4">
            <v-card class="elevation-1 pa-3 login-card">
              <v-card-title> ログイン </v-card-title>
              <v-card-text>
                <v-form ref="loginForm">
                  <v-text-field
                    v-model="formData.email"
                    append-icon="mdi-account-circle"
                    type="email"
                    label="E-mail"
                    :counter="128"
                    :rules="emailRules"
                    outlined
                    required
                  ></v-text-field>
                  <v-text-field
                    v-model="formData.password"
                    append-icon="mdi-lock"
                    type="password"
                    label="Password"
                    :counter="32"
                    :rules="passwordRules"
                    outlined
                    required
                  ></v-text-field>
                  <v-btn block :loading="loading" @click="handleSubmit"
                    >ログイン</v-btn
                  >
                </v-form>
              </v-card-text>
            </v-card>
          </v-col>
          <v-col cols="4"></v-col>
        </v-row>
      </v-container>
    </v-main>
  </v-app>
</template>

<script>
import { mapActions } from 'vuex'

export default {
  name: 'AdminLogin',
  layout: 'login',
  data() {
    return {
      loading: false,
      formData: {
        email: '',
        password: '',
      },
      emailRules: [
        (v) => !!v || 'メールアドレスは必須項目です。',
        (v) =>
          (v && v.length <= 128) ||
          'メールアドレスは128文字以内で入力してください。',
        (v) =>
          /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(
            v
          ) || 'メールアドレスの形式が正しくありません。',
      ],
      passwordRules: [
        (v) => !!v || 'パスワードは必須項目です。',
        (v) =>
          (v && v.length <= 32) || 'パスワードは32文字以内で入力してください。',
      ],
    }
  },
  methods: {
    ...mapActions('authModule', ['login']),
    handleSubmit() {
      this.login(this.formData)
    },
  },
}
</script>

<style lang="scss">
.bg {
  background-size: cover;
  background-image: url('~@/assets/no_image.png');
}
</style>
