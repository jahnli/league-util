<script setup lang="ts">
import { SelectSessionType } from "@/interface/selectSession";
import { UserType } from "@/interface/user";
import LCU_EVENT from "@/main-process/event";
import { getLcuImg, LcuImgPath } from "@/main-process/lcu-assets";
import { Get } from "@/service/axios";

const userInfo = ref<UserType>();
const userIcon = ref();
const currentChampionImg = ref();
const userSelectState = ref<SelectSessionType>();

// 获取用户信息
const getUserInfo = async () => {
  const { userInfoRes, userIconRes } = await window.ipcRenderer.invoke(LCU_EVENT.GET_USER_InFO);
  userInfo.value = userInfoRes;
  userIcon.value = userIconRes;
};
window.ipcRenderer.on(LCU_EVENT.GET_ROOM_STATE, (event, msg) => {
  userSelectState.value = msg;
  const championId = userSelectState.value?.actions[0][0]?.championId;
  if (championId) {
    getSelectChampion(championId!);
  }
});
// 获取当前选择英雄头像
const getSelectChampion = async (id: number) => {
  try {
    // const res = await Get();
    currentChampionImg.value = await window.ipcRenderer.invoke(LCU_EVENT.GET_LCU_IMG, id);
  } catch (error) {}
};
getUserInfo();
</script>

<template>
  <div class="home">
    {{ userInfo?.internalName }}
    {{ userInfo?.summonerLevel }}
    <span v-if="userSelectState?.actions"> {{ userSelectState?.actions[0][0].completed }}</span>
    <span v-if="userSelectState?.actions"> {{ userSelectState?.actions[0][0].championId > 0 ? "选择" : "未选择" }}</span>
    <n-avatar v-if="userIcon" round :size="64" :src="userIcon" />
    <n-avatar v-if="currentChampionImg" round :size="64" :src="currentChampionImg" />
  </div>
</template>
