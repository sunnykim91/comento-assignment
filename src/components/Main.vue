<template>
  <div class="Main">
    <MenuFilter />
    <Contents />
  </div>
</template>

<script>
import MenuFilter from "./MenuFilter";
import Contents from "./Contents";

export default {
  name: "Main",
  components: {
    MenuFilter,
    Contents
  }
};
</script>

<style></style>
