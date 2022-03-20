<script setup lang="ts">
import { UserType } from "@/interface/user";
import LCU_EVENT from "@/main-process/event";

const userInfo = ref<UserType>();
const userIcon = ref();

// 获取用户信息
const getUserInfo = async () => {
  const { userInfoRes, userIconRes } = await window.ipcRenderer.invoke(LCU_EVENT.getUserInfo);
  userInfo.value = userInfoRes;
  userIcon.value = userIconRes;
};
getUserInfo();
</script>

<template>
  <div class="home">
    {{ userInfo?.internalName }}
    {{ userInfo?.summonerLevel }}
    <n-avatar v-if="userIcon" round :size="64" :src="userIcon" />
  </div>
</template>
