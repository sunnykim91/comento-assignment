<template>
  <div class="Contents">
    <div v-if="hasResult">
      <div
        v-for="content in contents"
        v-bind:key="content.id"
        class="contentList"
        @click="go('/detail', content.id)"
      >
        <div class="content-Top">
          <div
            class="categoryName"
            v-if="categoryList[0].id === content.category_id"
          >
            {{ categoryList[0].name }}
          </div>
          <div
            class="categoryName"
            v-if="categoryList[1].id === content.category_id"
          >
            {{ categoryList[1].name }}
          </div>
          <div
            class="categoryName"
            v-if="categoryList[2].id === content.category_id"
          >
            {{ categoryList[2].name }}
          </div>
          <span class="contentNum">{{ content.user_id }}</span>
        </div>
        <div class="content-Body">
          <div class="body-Top">
            <div class="userEmail">
              이메일
            </div>
            <div>
              |
            </div>
            <div class="createdDate">
              {{ content.created_at }}
            </div>
          </div>
          <div class="body-title">{{ content.title }}</div>
          <div class="body-content">{{ content.contents }}</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "Contents",
  data: function() {
    return {
      categoryNumber: 1,
      order: "asc",
      contents: [],
      categoryList: [],
      listId: 1
    };
  },
  computed: {
    hasResult: function() {
      return this.contents.length > 0;
    }
  },
  methods: {
    getContents: function() {
      this.getCategory();
      const baseURI =
        "https://1rcwozojf0.execute-api.ap-northeast-2.amazonaws.com/production";
      this.$http
        .get(
          `${baseURI}/api/list?page=1&ord=${this.order}&category[]=${this.categoryNumber}&limit=10`
        )
        .then(result => {
          this.contents = result.data.list.data;
          console.log(this.contents);
        });
    },
    getCategory: function() {
      const baseURI =
        "https://1rcwozojf0.execute-api.ap-northeast-2.amazonaws.com/production";
      this.$http.get(`${baseURI}/api/category`).then(result => {
        this.categoryList = result.data.list;
      });
    },
    go(targetName, contentId) {
      this.$EventBus.$emit("click-detailList", contentId);
      this.$router.push(targetName);
    }
  },
  mounted() {
    this.getContents();
  },
  created() {
    this.$EventBus.$on("click-ascend", () => {
      this.order = "asc";
      this.getContents();
    });
    this.$EventBus.$on("click-descend", () => {
      this.order = "desc";
      this.getContents();
    });
    this.$EventBus.$on("changeCategory", select => {
      this.categoryNumber = select;
      this.getContents();
    });
  }
};
</script>

<style>
.Contents {
  padding: 30px;
}

.contentList {
  border: 1px solid black;
  margin-top: 20px;
  cursor: pointer;
}

.content-Top {
  border-bottom: 1px solid black;
  padding: 5px;
  display: flex;
  justify-content: space-between;
}
.categoryName {
  margin-left: 100px;
}
.contentNum {
  margin-right: 50px;
}

.body-Top {
  display: flex;
  padding: 10px;
}
.userEmail {
  margin: 0px 30px;
}
.createdDate {
  margin-left: 30px;
}

.body-createdDate {
  padding: 10px 0px;
}
.body-title {
  display: inline-block;
  width: 100%;
  padding: 20px;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  font-weight: bold;
}
.body-content {
  display: inline-block;
  width: 100%;
  padding: 20px;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}
</style>
