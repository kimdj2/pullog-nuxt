<template>
  <v-card>
    <v-card-text>
      <v-row align="center" justify="center" align-content="center">
        <v-col cols="12" class="text-center" align="center">
          <v-avatar size="65">
            <v-img :src="require('@/assets/Kim_Dongjin.png')"></v-img>
          </v-avatar>
        </v-col>
        <v-col cols="12" class="text-center" align="center">
          <v-icon>mdi-email</v-icon>
          1222kdj@gmail.com
        </v-col>
        <v-col cols="12" class="text-center" align="center">
          <v-btn nuxt href="https://github.com/kimdj2">
            <v-icon large color="blue-grey darken-2"> mdi-github </v-icon>
          </v-btn>
        </v-col>
      </v-row>
    </v-card-text>
  </v-card>
</template>
