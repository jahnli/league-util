<script setup lang="ts">
import { UserType } from "@/interface/user";
import LCU_EVENT from "@/main-process/event";

const userInfo = ref<UserType>();

// 获取用户信息
const getUserInfo = async () => {
  const res = await window.ipcRenderer.invoke(LCU_EVENT.getUserInfo);
  userInfo.value = res;
};
getUserInfo();
</script>

<template>
  <div class="home">
    {{ userInfo?.internalName }}
    {{ userInfo?.summonerLevel }}
  </div>
</template>
