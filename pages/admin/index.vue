<template>
  <div>
    <div class="preview col2">
      <article>
        <section>
          <h1>{{ formData.title }}</h1>
          <h2>{{ formData.subtitle }}</h2>
        </section>
        <section :class="formData.sections[index].width" v-bind:key="index" v-for="(section, index) in formData.sections" v-html="formData.sections[index].content">
        </section>
      </article>
    </div><div class="input col2">
      <div class="formfield">
        <label>Category
        <select v-if="!toggleNewCategory" v-model="formData.category">
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
        <input v-model="formData.title" placeholder="title"></label>
      </div>
      <div class="formfield">
        <label>Subtitle
        <input v-model="formData.subtitle" placeholder="subtitle"></label>
      </div>
      <div class="formfield" v-bind:key="index" v-for="(section, index) in formData.sections">
        <label :for="'s'+index">Section {{ index + 1 }} content</label>
        <select v-model="formData.sections[index].width">
          <option value="normal" selected>normal</option>
          <option value="wide">wide</option>
          <option value="full">full-width</option>
        </select>
        <button v-on:click="removeSection(index)" class="danger">delete</button>
        <textarea :id="'s'+index" v-model="formData.sections[index].content" placeholder="html"></textarea>
      </div>
      <button v-on:click="addSection">Add section</button>
      <button v-on:click="createPost">Create post</button>
    </div>
  </div>
</template>

<script>

export default {
  data: () => ({
    formData: {
      title: '',
      subtitle: '',
      sections: [
        { width: 'normal', content: '' }
      ],
      category: '',
      published: true
    },
    toggleNewCategory: false,
    newCategory: { name: '', description: '', banner: '' },
    categories: [],
    error: ''
  }),
  asyncData(context, resolve) {
    return context.store.dispatch('getCategories')
      .then(r => r.json())
      .then(res => resolve(null, { categories: res.data }))
      .catch(e => resolve(null, { error: e }))
  },
  methods: {
    createCategory() {
      const newCategory = this.newCategory
      if (newCategory.name === '') {
        return
      }
      const body = {
        name: newCategory.name,
        description: newCategory.description,
        banner: newCategory.banner
      }
      this.$store.dispatch('saveCategory', body)
        .then(r => r.json())
        .then(res => {
          console.log(res)
          this.categories.push(res.data)
        })
        .catch(e => {
          console.warn(e)
          this.error = e
        })
    },
    addSection() {
      this.formData.sections.push({ width: 'normal', content: '' })
    },
    removeSection(index) {
      this.formData.sections.splice(index, 1)
    },
    createPost() {
      let body = this.formData
      body.sections = body.sections.filter(s => s.content !== '')
      console.warn('TODO SAVE POST')
      /*
      fetch("http://localhost:3001/api/posts", {
        method: "POST",
        body: JSON.stringify(body),
        headers:{
          'Content-Type': 'application/json',
          'Accept': 'application/json',
        }
      }).then(r => r.json())
        .then(console.log) */
    }
  }
}
</script>