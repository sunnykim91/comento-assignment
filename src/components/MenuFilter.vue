<template>
  <div class="MenuFilter">
    <b-button id="show-btn" @click="showModal">필터</b-button>
    <b-modal modal-class="my-modal" ref="my-modal" hide-footer title="필터">
      <div class="d-block">
        <b-form-group>
          <b-form-checkbox-group
            inline
            v-model="selected"
            :options="options"
            name="category"
            class="category"
          ></b-form-checkbox-group>
          <b-button class="saveBtn" @click="chagneCategory">저장</b-button>
        </b-form-group>
      </div>
    </b-modal>
    <div class="sorting">
      <span
        class="ascend"
        v-on:click="$EventBus.$emit('click-ascend')"
        @click="chagneOrderAsc()"
        ><div v-if="this.order === 'asc'" class="highlightRed">
          오름차순
        </div>
        <div v-else>오름차순</div></span
      >
      <span
        class="descend"
        v-on:click="$EventBus.$emit('click-descend')"
        @click="chagneOrderDesc()"
        ><div v-if="this.order === 'desc'" class="highlightRed">
          내림차순
        </div>
        <div v-else>내림차순</div>
      </span>
    </div>
  </div>
</template>

<script>
export default {
  name: "MenuFilter",
  methods: {
    showModal() {
      this.$refs["my-modal"].show();
    },
    chagneCategory() {
      this.$EventBus.$emit("changeCategory", this.selected);
      this.$refs["my-modal"].hide();
    },
    chagneOrderAsc() {
      this.order = "asc";
    },
    chagneOrderDesc() {
      this.order = "desc";
    }
  },
  data() {
    return {
      order: "asc",
      selected: {},
      options: [
        { text: "카테고리1", value: 1 },
        { text: "카테고리2", value: 2 },
        { text: "카테고리3", value: 3 }
      ]
    };
  }
};
</script>

<style>
.MenuFilter {
  margin: 0px 30px;
  display: flex;
  justify-content: space-between;
}
.my-modal {
  color: #000;
  opacity: 0.7;
  position: fixed;
}
.highlightRed {
  color: red;
}
#show-btn {
  margin-left: 200px;
}
.category {
  margin-left: 40px;
}
.saveBtn {
  float: right;
  margin-right: 30px;
}

.sorting {
  display: flex;
  margin-right: 200px;
}
.sorting span {
  margin-left: 30px;
}
.ascend {
  cursor: pointer;
}
.descend {
  cursor: pointer;
}
</style>
