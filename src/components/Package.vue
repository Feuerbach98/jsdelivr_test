<template>
  <transition name="modal">
        <div class="modal-mask">
          <div class="mt-5" v-if="loading">
            <Loader />
          </div>
          <div v-else class="modal-wrapper">
            <div class="modal-container">

              <div class="modal-header d-flex justify-content-between align-items-center">
                <h4 name="header">
                  {{`${this.name}@${this.version}`}}
                </h4>
                 <div>Rank: {{getPackage.rating.rank}}</div>
              </div>

              <div class="modal-body text-left">
                <slot name="body">
                  <div class="mb-3">{{this.description}}</div>
                  <h5 class="text-left">List of versions:</h5>
                  <span class="version text-left" v-for="(version, index) in getPackage.versions.versions" :key="index">
                    {{version}}
                  </span>
                </slot>
              </div>

              <div class="modal-footer">
                <slot name="footer">
                  <button class="modal-default-button btn btn-primary" @click="$emit('close')">
                    Close
                  </button>
                </slot>
              </div>
            </div>
          </div>
        </div>
      </transition>
</template>

<script>
import { mapActions, mapGetters } from 'vuex';
import Loader from './Loader';

export default {
  props: {
    name: String,
    version: String,
    description: String,
  },
  components: {
    Loader,
  },
  methods: {
    ...mapActions(['fetchPackage'])
  },
  data() {
    return {
      loading: true,
    }
  },
  watch: {
    getPackage: function() {
      if (this.getPackage.rating.rank > -1) {
        this.loading = false
      }
    },
  },
  computed: {
    ...mapGetters(['getPackage'])
  },
  mounted() {
    this.fetchPackage({
      text: this.name
    })
  }
}
</script>

<style scoped>
.version {
  display: inline-block;
  padding: 3px;
  margin: 3px;
  color: white;
  background-color: #42b983;
}
.modal-mask {
  position: fixed;
  z-index: 9998;
  top: 0;
  left: 0;
  bottom: 0;
  padding: 30px 0;
  width: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  transition: opacity 0.3s ease;
  overflow-y: scroll;
}

.modal-wrapper {
  display: table-cell;
  vertical-align: middle;
  width: 80%;
}

.modal-container {
  width: 100%;
  margin: 0px auto;
  padding: 20px 30px;
  background-color: #fff;
  border-radius: 2px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.33);
  transition: all 0.3s ease;
  font-family: Helvetica, Arial, sans-serif;
}

.modal-header h3 {
  margin-top: 0;
  color: #42b983;
}

.modal-body {
  margin: 20px 0;
}

.modal-default-button {
  float: right;
}

.modal-enter {
  opacity: 0;
}

.modal-leave-active {
  opacity: 0;
}

.modal-enter .modal-container,
.modal-leave-active .modal-container {
  -webkit-transform: scale(1.1);
  transform: scale(1.1);
}
</style>
