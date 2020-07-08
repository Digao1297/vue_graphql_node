<template>
  <div class="app-item-list">
    <h5>
      {{title}}
      <span class="badge badge-info">{{ items.length }}</span>
    </h5>
    <div class="card">
      <div class="card-body">
        <ul class="list-group">
          <li v-for="item in items" :key="item.id" class="list-group-item">
            <div class="row">
              <div class="col-md">{{ item.description }}</div>
              <div class="col-md text-right">
                <button class="btn btn-info" @click.prevent="deleteItem(item)">
                  <span class="fa fa-trash" />
                </button>
              </div>
            </div>
          </li>
        </ul>
        <br />
        <div class="input-group">
          <input
            type="text"
            v-model="description"
            v-on:keyup.enter="addItem(description)"
            class="form-control"
            placeholder="Digite o Prefixo"
          />
          <div class="input-group-append">
            <button class="btn btn-info" @click.prevent="addItem(description)">
              <span class="fa fa-plus" />
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "app-item-list",
  props: {
    items: {
      type: Array,
      required: true
    },
    title: {
      type: String,
      required: true
    },
    type: {
      type: String,
      required: true
    }
  },
  data: () => ({
    description: ""
  }),
  methods: {
    addItem(description) {
      this.$emit("addItem", {
        type: this.type,
        description
      });
      this.description = "";
    },
    deleteItem(item) {
      this.$emit("deleteItem", item);
      this.description = "";
    }
  }
};
</script>

