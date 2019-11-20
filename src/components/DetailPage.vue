<template>
  <div class="DetailPage">
    <h1>디테일 페이지</h1>
    <div>
      <b-card
        v-bind:title="detailInfo.info.title"
        tag="article"
        style="max-width: 100%;"
        class="mb-2"
      >
        <div class="detailInfo-Top">
          <p class="emailInfo">작성자 : {{ emailAddress }}</p>
          <p class="dateInfo">작성일자 : {{detailInfo.info.created_at}}</p>
        </div>
        <b-card-text>
          <p>{{ detailInfo.info.contents }}</p>
        </b-card-text>
      </b-card>
    </div>
    <b-card title="리뷰">
      <div v-if="hasReply">
        <b-list-group flush>
          <div v-for="rp in reply" v-bind:key="rp.id" class="reply">
            <b-list-group-item>{{ rp.contents }}</b-list-group-item>
          </div>
        </b-list-group>
      </div>
      <div v-else>리뷰가 없습니다.</div>
    </b-card>
  </div>
</template>
<script>
export default {
  name: "DetailPage",
  data: function() {
    return {
      listId: 0,
      emailAddress: "",
      detailInfo: [],
      reply: []
    };
  },
  methods: {
    getContents: function() {
      const baseURI =
        "https://1rcwozojf0.execute-api.ap-northeast-2.amazonaws.com/production";
      this.$http.get(`${baseURI}/api/view?id=${this.listId}`).then(result => {
        this.detailInfo = result.data;
        console.log(result.data.info);
        this.emailAddress = result.data.info.user.email;
        this.reply = result.data.info.reply;
        console.log(this.reply);
      });
    }
  },
  computed: {
    param: function() {
      return this.$route.params;
    },
    hasReply: function() {
      return this.reply.length > 0;
    }
  },
  mounted() {
    this.getContents();
  },
  created() {
    this.listId = this.$route.params.id;
    this.getContents();
  }
};
</script>
<style>
.DetailPage {
  padding: 20px;
}
.detailInfo-Top {
  display: flex;
  justify-content: flex-end;
  margin: 30px;
}
.emailInfo {
  margin-left: 50px;
}
.dateInfo {
  margin-left: 50px;
}

.detailInfo {
  display: block;
}

.reply {
  display: block;
}
</style>
