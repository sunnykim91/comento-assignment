<template>
  <div class="DetailPage">
    <div v-if="hasResult">
      {{ emailAddress }}
      <div v-for="info in detailInfo" v-bind:key="info.id" class="detailInfo">
        {{ info.title }}
        {{ info.contents }}
      </div>
    </div>
  </div>
</template>
<script>
export default {
  name: "DetailPage",
  data: function() {
    return {
      listId: 1,
      emailAddress: "",
      detailInfo: []
    };
  },
  computed: {
    hasResult: function() {
      console.log(this.detailInfo);
      return this.detailInfo;
    }
  },
  methods: {
    getContents: function() {
      const baseURI =
        "https://1rcwozojf0.execute-api.ap-northeast-2.amazonaws.com/production";
      this.$http.get(`${baseURI}/api/view?id=${this.listId}`).then(result => {
        console.log(result.data.info);
        this.detailInfo = result.data;
        this.emailAddress = result.data.info.user.email;
        console.log(this.emailAddress);
      });
    }
  },
  mounted() {
    this.getContents();
  },
  created() {
    this.$EventBus.$on("click-detailList", listId => {
      this.listId = listId;
      this.getContents();
    });
  }
};
</script>
<style></style>
