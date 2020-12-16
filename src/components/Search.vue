<template>
  <div class="container pt-3">
    <b-form-input placeholder="Search" size="lg" class="text-center mb-5" v-model="query" type="text" v-on:input="search"></b-form-input>
    <div v-if="loading">
      <Loader />
    </div>
    <div v-else>
      <b-card
        class="mb-3 card"
        v-for="(item, index) in items"
        v-bind:key="index"
        v-bind:title="item.package.name"
        v-bind:sub-title="`Last version ` +item.package.version"
        v-on:click="showFullInformation(item.package.name, item.package.version, item.package.description)"
      >
        <b-card-text>
          {{item.package.description}}
        </b-card-text>
    </b-card>
  </div>
    <div v-if="items.length > 0">
      <Paginate
      v-model="page"
      :page-count="pageCount"
      :click-handler="pageChangeHandler"
      :prev-text="'Prev'"
      :next-text="'Next'"
      :container-class="'pagination2'"
    />
    </div>
    <Package
      v-if="showModal"
      @close="closeModal"
      v-bind:name="packageName"
      v-bind:version="packageVersion"
      v-bind:description="packageDescription"
    />
  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex';
import paginationMixin from '@/mixins/pagination.mixin';
import Package from './Package';
import Loader from './Loader';

export default {
  name: 'Search',
  mixins: [paginationMixin],
  components: {
    Package,
    Loader,
  },
  computed: {
    ...mapGetters(['getPackages']),
  },
  watch: {
    getPackages: function() {
      if (this.getPackages.length) {
        this.initPagination(this.getPackages)
        this.loading = false
      }
    },
    $route(to) {
      this.page = +to.query.page
    }
  },
  data() {
    return {
      query: this.$route.query.q || '',
      debounce: null,
      showModal: false,
      packageName: null,
      packageVersion: null,
      packageDescription: null,
      loading: false,
    }
  },
  methods: {
    ...mapActions(['fetchPackages']),

    closeModal() {
      this.showModal = false;
    },

    search(event) {
      clearTimeout(this.debounce);

      if(!event) {
        return
      }

      this.debounce = setTimeout(() => {
        this.fetchPackages(event)
        this.loading = true
        this.$router.push({ path: '', query: { ...this.$route.query , q: event } });
      }, 600);
    },

    setPackages(packages) {
      return packages
    },
    showFullInformation(name, version, description) {
      this.packageDescription = description
      this.packageName = name
      this.packageVersion = version
      this.showModal = true
    }
   },
  mounted() {
    if(this.query) {
      this.loading = true
      this.fetchPackages(this.query)
    }
  }
}
</script>
<style lang="scss">

.card {
  transition: 0.2s;
  &:hover {
    cursor: pointer;
    box-shadow: 0 0 10px 1px white;
  }
}

.pagination2 {
  display: inline-block;
  padding-left: 0;
  margin: 20px 0;
  border-radius: 5px;
  background: white;

  li {
    display: inline;
    > a,
    > span {
      position: relative;
      float: left;
      padding: 10px;
      text-decoration: none;
      color: white;
      margin-left: -1px;
      outline: none;
    }
    &:first-child {
      > a,
      > span {
        border-top-left-radius: 5px;
        border-bottom-left-radius: 5px;
      }
    }
    &:last-child {
      > a,
      > span {
        border-top-right-radius: 5px;
        border-bottom-right-radius: 5px;
      }
    }
  }

  > li > a,
  > li > span {
    &:hover {
      z-index: 3;
      color: white;
      background-color: rgb(55, 175, 243);
      border-color: rgb(55, 175, 243);
    }
  }

  > .active > a,
  > .active > span {
    &,
    &:hover,
    &:focus {
      z-index: 2;
      color: white;
      background-color:  rgb(179, 179, 179);
      border-color: rgb(179, 179, 179);
      cursor: default;
    }
  }
}

</style>
