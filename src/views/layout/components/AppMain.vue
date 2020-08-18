<template>
  <section class="app-main">
    <transition mode="out-in" name="fade">
      <!-- <router-view :key="key"></router-view> -->
      <!-- <keep-alive>
        <router-view></router-view>
      </keep-alive>-->
      <div>
        <div :key="tag.path+tag.meta.tpParams" v-for="tag in visitedViews" v-show="tag.path+tag.meta.tpParams===activename">
          <component v-bind:is="tag.path.replace('/','')"></component>
        </div>
      </div>
    </transition>
  </section>
</template>

<script>
import utility from '../../../utils/utility';

export default {
  data() {
    return {
    }
  },
  mounted() {
    utility.addtagview(this, "首  页", "home")
  },
  computed: {
    visitedViews() {
      return this.$store.state.tagsView.visitedViews
    },
    activename() {
      return this.$store.getters.activeTagView.path + this.$store.getters.activeTagView.meta.tpParams;
    }
  },
}
</script>
