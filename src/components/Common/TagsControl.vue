<template>
<div class="order_line">
    <span class="controlspan" v-if="title">{{title}}</span>
    <el-tag :key="tag" v-for="tag in tags" closable :disable-transitions="false" @close="handleClose(tag)" size="small">
        {{tag}}
    </el-tag>
    <el-input class="mydefinewidth" :placeholder="placeholder" v-show="inputVisible" v-model="inputValue" ref="saveTagInput" size="small" @keyup.enter.native="handleInputConfirm" @blur="handleInputConfirm">
    </el-input>
    <el-button v-if="showNewTag" class="button-new-tag" size="small" @click="showInput">+</el-button>
</div>
</template>

<script>
import u from "../../utils/utility";
import Vue from "vue";
export default {
    props: {
        value: [String, Number],
        title: [String],
        length: {
            default: 1
        },
        placeholder: String,
    },
    data() {
        return {
            inputVisible: false,
            inputValue: '',
            tags:[]
        };
    },
    mounted() {
        let that = this;
        u.setcontrolwidth(that, "mydefinewidth");
    },
    watch: {
      value: function (val) {
        if (val){
          this.tags = val.split(",");
        }
        else {
          this.tags = [];
        }

      },
    },
    computed: {
        showNewTag: function () {
            return this.tags.length < 3
        }
    },
    methods: {

        handleClose(tag) {
            this.tags.splice(this.tags.indexOf(tag), 1);
            this.$emit("tags", this.tags)
        },
        showInput() {
            this.inputVisible = true;
            this.$nextTick(_ => {
                this.$refs.saveTagInput.$refs.input.focus();
            });
        },

        handleInputConfirm() {
            let inputValue = this.inputValue;
            if (inputValue) {
                this.tags.push(inputValue);
            }
            this.inputVisible = false;
            this.inputValue = '';

            this.$emit("tags", this.tags)
        }

    }
};
</script>

<style lang="scss" scoped>
.el-tag+.el-tag {
    margin-left: 10px;
}

.button-new-tag {
    margin-left: 10px;
    height: 20px;
    line-height: 10px;
    padding-top: 0;
    padding-bottom: 0;
}
</style>
