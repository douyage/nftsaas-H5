<template>
  <div>
    <user-title title="常用功能"/>
    <div class="fun-section">
      <div class="grid">
        <div class="grid-item" @click="$globleFun.onGoto('/box-list')">
          <img src="@/assets/images/user/mine_icon_wdmh.png" alt="">
          <p>
            我的盲盒
          </p>
        </div>
        <div class="grid-item" @click="$globleFun.onGoto('/synthesis-list')">
          <img src="@/assets/images/user/mine_icon_hccp.png" alt="">
          <p>
            合成藏品
          </p>
        </div>
        <div class="grid-item" @click="$globleFun.onGoto('/order')">
          <img src="@/assets/images/user/mine_icon_wddd.png" alt="">
          <p>
            我的订单
          </p>
        </div>
        <div class="grid-item" @click="onInvite">
          <img src="@/assets/images/user/mine_icon_yqhy.png" alt="">
          <p>
            邀请好友
          </p>
        </div>
        <!-- <div class="grid-item" @click="onWallet">
          <img src="@/assets/images/user/mine_icon_qbgl.png" alt="">
          <p>
            钱包管理
          </p>
        </div> -->
        <div class="grid-item" @click="$globleFun.onGoto('/transfer-record')">
          <img src="@/assets/images/user/mine_icon_jilu.png" alt="">
          <p>
            转赠记录
          </p>
        </div>
        <div class="grid-item" @click="$globleFun.onGoto('/setting')">
          <img src="@/assets/images/user/mine_icon_sz.png" alt="">
          <p>
            设置
          </p>
        </div>
      </div>
    </div>

  </div>
</template>

<script setup>
import { computed } from 'vue'
import UserTitle from './UserTitle.vue'
import { showToast } from 'vant'
import globleFun from '@/utils/link'
import store from '@/store/index'

let info = computed(() => store.state.user.info)

const onWallet = () => {
  showToast('敬请期待')
}

const onInvite = () => {
  if (info.value?.cer_status !== 1) {
    showToast('请先实名认证')
  } else {
    globleFun.onGoto('/invitation')
  }
}

</script>

<style lang="scss" scoped>
  .fun-section {
    .grid {
      display: flex;
      flex-wrap: wrap;
      .grid-item {
        width: 104px;
        height: 104px;
        margin: 15px 15px 0 0;
        background-color: var(--root-bg-color2);
        border-radius: 8px;
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        &:nth-child(-n+3) {
          margin-top: 0;
        }
        &:nth-child(3n) {
          margin-right: 0;
        }
        img {
          width: 41px;
          height: 41px;
        }
        p {
          font-size: 15px;
          margin-top: 8px;
        }
      }
    }
    .van-grid {
      .van-grid-item {
        :deep(.van-grid-item__content) {
          background-color: var(--root-bg-color1);
          border-radius: 8px;
          img {
            width: 41px;
            height: 41px;
          }
          p {
            font-size: 15px;
          }
        }
      }
    }
  }
</style>
