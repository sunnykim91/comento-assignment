<template>
  <div
    v-infinite-scroll="getContents"
    v-bind:infinite-scroll-disabled="busy"
    v-bind:infinite-scroll-distance="limit"
  >
    <div class="Contents">
      <div v-if="hasResult">
        <div
          v-for="(content, index) in contents"
          v-bind:key="content.id"
          class="contentList"
          @click="go('/detail', content.id)"
        >
          <div v-if="index % 4 === 0 && index !== 0">
            <div class="ads">
              <div class="ads-maintitle">Sponsored</div>
              <div class="ads-main">
                <img
                  class="ads-image"
                  v-bind:src="
                    'https://cdn.comento.kr/assignment/' +
                      ads[index / 4 - 1][0].img
                  "
                />
                <div class="ads-bottom">
                  <div class="ads-title">{{ ads[index / 4 - 1][0].title }}</div>
                  <div class="ads-contents">
                    {{ ads[index / 4 - 1][0].contents }}
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div v-else>
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
    </div>
  </div>
</template>

<script>
export default {
  name: "Contents",
  data: function() {
    return {
      baseURI:
        "https://1rcwozojf0.execute-api.ap-northeast-2.amazonaws.com/production",
      categoryNumber: 1,
      order: "asc",
      contents: [],
      categoryList: [],
      listId: 1,
      pageNum: 1,
      busy: false,
      limit: 10,
      ads: [],
      adNum: 1
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
      this.getAds();
      this.busy = true;
      this.$http
        .get(
          `${this.baseURI}/api/list?page=${this.pageNum}&ord=${this.order}&category[]=${this.categoryNumber}&limit=${this.limit}`
        )
        .then(result => {
          this.contents = [...this.contents, ...result.data.list.data];
          this.pageNum++;
          this.busy = false;
        });
    },
    getCategory: function() {
      this.$http.get(`${this.baseURI}/api/category`).then(result => {
        this.categoryList = result.data.list;
      });
    },
    getAds: function() {
      for (let i = 1; i < 30; i++) {
        this.$http
          .get(`${this.baseURI}/api/ads?page=${i}&limit=1`)
          .then(result => {
            this.ads.push(result.data.list.data);
          });
      }
    },
    go(targetName, contentId) {
      this.$router.push(targetName + "/" + contentId);
    }
  },
  created() {
    this.getAds();
    this.$EventBus.$on("click-ascend", () => {
      this.order = "asc";
      this.contents = [];
      this.pageNum = 1;
      this.getContents();
    });
    this.$EventBus.$on("click-descend", () => {
      this.order = "desc";
      this.contents = [];
      this.pageNum = 1;
      this.getContents();
    });
    this.$EventBus.$on("changeCategory", select => {
      this.categoryNumber = select;
      this.contents = [];
      this.pageNum = 1;
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
.ads {
  display: block;
  margin: 20px;
}
.ads-maintitle {
  display: block;
  font-weight: bold;
  text-align: left;
  margin-left: 10px;
}
.ads-main {
  display: flex;
}
.ads-image {
  margin: 20px;
}
.ads-bottom {
  display: grid;
}
.ads-title {
  font-weight: bold;
  font-size: 1.6rem;
  margin-top: 50px;
  display: inline-block;
  width: 100%;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis; /* 여러 줄 자르기 추가 스타일 */
  white-space: normal;
  line-height: 1.2;
  height: 2.4em;
  word-wrap: break-word;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
}
.ads-contents {
  display: inline-block;
  width: 100%;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis; /* 여러 줄 자르기 추가 스타일 */
  white-space: normal;
  line-height: 1.2;
  height: 3.6rem;
  text-align: left;
  word-wrap: break-word;
  display: -webkit-box;
  -webkit-line-clamp: 3;
  -webkit-box-orient: vertical;
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
  font-size: 2rem;
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
