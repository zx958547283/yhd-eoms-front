<template>
  <div class="tags-view-container" id="tags-view-container">
    <scroll-pane class="tags-view-wrapper" ref="scrollPane">
      <div :class="isActive(tag)?'active':''" :key="tag.path+tag.meta.tpParams" @click="tagClick(tag)" @contextmenu.prevent="openMenu(tag,$event)" class="tags-view-item" v-for="tag in visitedViews" ref="tag">
        {{ tag.title }}
        <span @click.prevent.stop="closeSelectedTag(tag)" class="el-icon-close" v-show="tag.path !=='home' " />
      </div>
    </scroll-pane>
    <ul :style="{left:left+'px',top:top+'px'}" class="contextmenu" v-show="visible">
      <li @click="closeSelectedTag(selectedTag)" v-if="!(selectedTag.meta&&selectedTag.meta.affix)">关闭</li>
      <li @click="closeOthersTags">关闭其它</li>
      <li @click="closeAllTags(selectedTag)">全部关闭</li>
    </ul>
  </div>
</template>

<script>
import ScrollPane from './ScrollPane';
import u from '../../../../utils/utility';

export default {
  components: { ScrollPane },
  data() {
    return {
      visible: false,
      top: 0,
      left: 0,
      selectedTag: {},
      affixTags: []
    }
  },
  mounted(){
  },
  computed: {
    visitedViews() {
      this.moveToCurrentTag();
      return this.$store.state.tagsView.visitedViews
    },
    activeTagView() {
      return this.$store.state.tagsView.activeTagView
    },
  },
  watch: {
    visible(value) {
      if (value) {
        document.body.addEventListener('click', this.closeMenu)
      } else {
        document.body.removeEventListener('click', this.closeMenu)
      }
    },
    activeTagView(){
      this.moveToCurrentTag();
    }
  },
  methods: {
    moveToCurrentTag() {
      this.$nextTick(() => {
        const tags = this.$refs.tag
          for (const tag of tags) {
            if (tag.className.indexOf('active')>0) {
              this.$refs.scrollPane.moveToTarget(tag)
              break
            }
          }
      })
    },
    tagClick(tag) {
      this.$store.dispatch('tagsView/updateActiveTagView', tag)
    },
    isActive(tag) {
      return tag.path + tag.meta.tpParams === this.$store.getters.activeTagView.path + this.$store.getters.activeTagView.meta.tpParams;
    },
    closeSelectedTag(view) {
      this.$store.dispatch('tagsView/delView', view).then(({ visitedViews }) => {
        // 关闭后可以处理异步
      })
    },
    closeOthersTags() {
      this.$store.dispatch('tagsView/delOthersViews', this.selectedTag).then(() => {
        // u.addtagview(this, "首  页", "home")
      })
    },
    closeAllTags(view) {
      this.$store.dispatch('tagsView/delAllViews').then(({ visitedViews }) => {
        u.addtagview(this, "首  页", "home")
      })
    },
    openMenu(tag, e) {
      e.cancelBubble = true;
      console.log("openMenu")
      if(tag.path==='home'){
        return;
      }
      const menuMinWidth = 105
      const offsetLeft = this.$el.getBoundingClientRect().left // container margin left
      const offsetWidth = this.$el.offsetWidth // container width
      const maxLeft = offsetWidth - menuMinWidth // left boundary
      const left = e.clientX - offsetLeft + 10 // 15: margin right

      if (left > maxLeft) {
        this.left = maxLeft
      } else {
        this.left = left
      }

      this.top = e.clientY
      this.visible = true
      this.selectedTag = tag
    },
    closeMenu() {
      console.log("closeMenu")
      this.visible = false
    }
  }
}
</script>

<style lang="scss" scoped>
.tags-view-container {
  height: 34px;
  width: 100%;
  background: #fff;
  border-bottom: 1px solid #d8dce5;
  box-shadow: 0 1px 3px 0 rgba(0, 0, 0, 0.12), 0 0 3px 0 rgba(0, 0, 0, 0.04);
  .tags-view-wrapper {
    .tags-view-item {
      display: inline-block;
      position: relative;
      cursor: pointer;
      height: 26px;
      line-height: 26px;
      border: 1px solid #d8dce5;
      color: #495060;
      background: #fff;
      padding: 0 8px;
      font-size: 12px;
      margin-left: 5px;
      margin-top: 4px;
      &:first-of-type {
        margin-left: 15px;
      }
      &:last-of-type {
        margin-right: 15px;
      }
      &.active {
        background-color: #42b983;
        color: #fff;
        border-color: #42b983;
        &::before {
          content: "";
          background: #fff;
          display: inline-block;
          width: 8px;
          height: 8px;
          border-radius: 50%;
          position: relative;
          margin-right: 2px;
        }
      }
    }
  }
  .contextmenu {
    margin: 0;
    background: #fff;
    z-index: 3000;
    position: absolute;
    list-style-type: none;
    padding: 5px 0;
    border-radius: 4px;
    font-size: 12px;
    font-weight: 400;
    color: #333;
    box-shadow: 2px 2px 3px 0 rgba(0, 0, 0, 0.3);
    li {
      margin: 0;
      padding: 7px 16px;
      cursor: pointer;
      &:hover {
        background: #eee;
      }
    }
  }
}
</style>

<style lang="scss">
//reset element css of el-icon-close
.tags-view-wrapper {
  .tags-view-item {
    .el-icon-close {
      width: 16px;
      height: 16px;
      vertical-align: 2px;
      border-radius: 50%;
      text-align: center;
      transition: all 0.3s cubic-bezier(0.645, 0.045, 0.355, 1);
      transform-origin: 100% 50%;
      &:before {
        transform: scale(0.6);
        display: inline-block;
        vertical-align: -3px;
      }
      &:hover {
        background-color: #b4bccc;
        color: #fff;
      }
    }
  }
}
</style>
