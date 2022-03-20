<script setup lang="ts">
import { SelectSessionType } from "@/interface/selectSession";
import { UserType } from "@/interface/user";
import LCU_EVENT from "@/main-process/event";

const userInfo = ref<UserType>();
const userIcon = ref();
const userSelectState = ref<SelectSessionType>();

// 获取用户信息
const getUserInfo = async () => {
  const { userInfoRes, userIconRes } = await window.ipcRenderer.invoke(LCU_EVENT.getUserInfo);
  userInfo.value = userInfoRes;
  userIcon.value = userIconRes;
};
window.ipcRenderer.on(LCU_EVENT.selectSession, (event, msg) => {
  console.log(msg);
  userSelectState.value = msg;
  console.log(userSelectState.value?.actions[0][0]);
});
getUserInfo();
</script>

<template>
  <div class="home">
    {{ userInfo?.internalName }}
    {{ userInfo?.summonerLevel }}
    <span v-if="userSelectState?.actions"> {{ userSelectState?.actions[0][0].completed }}</span>
    <span v-if="userSelectState?.actions"> {{ userSelectState?.actions[0][0].championId > 0 ? "选择" : "未选择" }}</span>
    <n-avatar v-if="userIcon" round :size="64" :src="userIcon" />
  </div>
</template>
