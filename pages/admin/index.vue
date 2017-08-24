<template>
  <div>
  <div class="preview col2" >
    <article>
    <section>
      <h1>{{ title }}</h1>
      <h2>{{ subtitle }}</h2>
    </section>
    <section :class="sections[index].width" v-bind:key="index" v-for="(section, index) in sections" v-html="sections[index].content">
    </section>
    </article>
  </div><div class="input col2">
    <div class="formfield">
      <label>Category
      <select v-if="!toggleNewCategory" v-model="category">
        <option value="" selected>No category</option>
        <option  :value="category._id" v-for="category in categories">{{ category.name }}</option>
      </select>
      </label>

      <button v-on:click="toggleNewCategory = !toggleNewCategory">
        {{ toggleNewCategory ? 'Hide category creation' : 'Create category' }}
      </button><br>
      
      <div v-if="toggleNewCategory">
        <label>Category name
        <input v-model="newCategory.name"></label>
        <label>Category description
        <input v-model="newCategory.description"></label>
        <button v-on:click="createCategory">Create</button>
      </div>

    </div>
    <div class="formfield">
      <label>Title
      <input v-model="title" placeholder="title"></label>
    </div>
    <div class="formfield">
      <label>Subtitle
      <input v-model="subtitle" placeholder="subtitle"></label>
    </div>
    <div class="formfield" v-bind:key="index" v-for="(section, index) in sections">
      <label :for="'s'+index">Section {{ index + 1 }} content</label>
      <select v-model="sections[index].width">
        <option value="normal" selected>normal</option>
        <option value="wide">wide</option>
        <option value="full">full-width</option>
      </select>
      <button v-on:click="removeSection(index)" class="danger">delete</button>
      <textarea :id="'s'+index" v-model="sections[index].content" placeholder="html"></textarea>
    </div>
    <button v-on:click="addSection">Add section</button>
    <button v-on:click="createPost">Create post</button>
  </div>
  </div>
</template>

<script>

export default {
  data: {
    title: "",
    subtitle: "",
    sections: [
      { width: "normal", content: "" }
    ],
    category: "",
    toggleNewCategory: false,
    newCategory: { name: "", description: "", banner: "" },
    categories: [],
    published: true,
  },
  created: function(){
    fetch("http://localhost:3001/api/categories")
      .then(r => r.json())
      .then(res => this.categories = res)
  },
  methods: {
    createCategory() {
      if( this._data.newCategory.title === "" ) {
        return
      } 
      const body = this._data.newCategory
      fetch('http://localhost:3001/api/categories', {
        method: "POST",
        body: JSON.stringify(body),
        headers:{
          'Content-Type': 'application/json',
          'Accept': 'application/json',
        }
      }).then(r => {
        if( r.status == 200) return r.json()
        return false
      }).then(res => {
        if(res){
          this._data.categories.push(res)
          this._data.category = res._id
          this._data.newCategory = { title: "", description: "", banner: "" }
          this._data.toggleNewCategory = false
        }else{
          alert("Adding category failed")
        }
      })
    },
    addSection() {
      this._data.sections.push({ width: "normal", content: "" })
    },
    removeSection(index){
      this._data.sections.splice(index, 1)
    },
    createPost(){
      let body = this._data
      delete body.categories
      delete body.newCategory
      body.sections = body.sections.filter( s => s.content !== "")
      
      fetch("http://localhost:3001/api/posts", {
        method: "POST",
        body: JSON.stringify(body),
        headers:{
          'Content-Type': 'application/json',
          'Accept': 'application/json',
        }
      }).then(r => r.json())
        .then(console.log)
    }
  }
}
</script>