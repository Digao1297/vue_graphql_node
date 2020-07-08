<template>
  <div class="domain-list">
    <div class="container">
      <div class="row">
        <div class="col-md">
          <app-item-list
            title="Prefixos"
            type="prefix"
            :items="items.prefix"
            v-on:addItem="addItem"
            v-on:deleteItem="deleteItem"
          />
        </div>
        <div class="col-md">
          <app-item-list
            title="Sufixos"
            type="suffix"
            :items="items.suffix"
            v-on:addItem="addItem"
            v-on:deleteItem="deleteItem"
          />
        </div>
      </div>
      <br />

      <h5>
        Dominios
        <span class="badge badge-info">{{ domains.length }}</span>
      </h5>
      <div class="card">
        <div class="card-body">
          <ul class="list-group">
            <li class="list-group-item" v-for="domain in domains" :key="domain.name">
              <div class="row">
                <div class="col-md">{{ domain.name }}</div>
                <div class="col-md text-right">
                  <a class="btn btn-info" :href="domain.checkout" target="_blank">
                    <span class="fa fa-shopping-cart" />
                  </a>
                </div>
              </div>
            </li>
          </ul>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { http } from "../services";

export default {
  name: "domain-list",
  data: () => ({
    items: {
      prefix: [],
      suffix: []
    }
  }),
  components: {
    "app-item-list": () => import("./AppItemList")
  },
  methods: {
    /**
     * Prefixes
     */
    addItem(item) {
      http
        .POST({
          query: `
          mutation ($item: ItemInput){
            newItem: saveItem(item: $item){
              id
              type
              description
            }
          }
        `,
          variables: {
            item
          }
        })
        .then(response => {
          const { newItem } = response.data;
          this.items[item.type].push(newItem);
          this.getItems(item.type);
        });
    },
    deleteItem(item) {
      http
        .POST({
          query: `
          mutation ($id: Int){
            deleted:deleteItem(id: $id)
          }
        `,
          variables: {
            id: item.id
          }
        })
        .then(() => {
          this.getItems(item.type);
        });
    },

    getItems(type) {
      http
        .POST({
          query: `
            query ($type: String){
              items :items (type: $type){
                id
                type
                description
              }
          }
      `,
          variables: {
            type
          }
        })
        .then(response => {
          const query = response.data;
          // console.log(query.data);
          this.items[type] = query.data.items;
        });
    }
  },
  computed: {
    domains() {
      const _domains = [];
      for (const prefix of this.items.prefix) {
        for (const sufix of this.items.suffix) {
          const name = prefix.description + sufix.description;
          const url = name.toLowerCase();
          const checkout = `https://checkout.hostgator.com.br/?a=add&sld=${url}&tld=.com.br`;
          _domains.push({
            name,
            checkout
          });
        }
      }
      return _domains;
    }
  },
  created() {
    this.getItems("prefix");
    this.getItems("suffix");
  }
};
</script>

