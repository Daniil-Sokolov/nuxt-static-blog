<template>
  <div>
    <div>
      <nuxt-link :to="'/'">home</nuxt-link>
    </div>
    <div class="preview col2">
      <article>
        <section>
          <h1>{{ formData.title }}</h1>
          <h2>{{ formData.subtitle }}</h2>
          <hr>
          <div class='post-meta'>
            {{ 'Month ' + date.getUTCDate() + ', ' + date.getUTCFullYear() }}
          </div>
        </section>
        <section :class="formData.sections[index].width" v-bind:key="index" v-for="(section, index) in formData.sections" v-html="formData.sections[index].content">
        </section>
      </article>
    </div><div class="input col2">
      <div class="error">{{ error }}</div>
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
          <input v-model="newCategory.name" v-on:keyup="setcatslug()"></label>
          <label>Category url slug
          <input v-model="newCategory.slug"></label>
          <label>Category banner image name
          <input v-model="newCategory.banner"></label>
          <label>Category description
          <input v-model="newCategory.description"></label>
          <button v-on:click="createCategory">Create</button>
        </div>

      </div>
      <hr>
      <div class="formfield">
        <label>Title
        <input v-model="formData.title" v-on:keyup="setslug()"></label>
      </div>
      <div class="formfield">
        <label>Url slug
        <input v-model="formData.slug"></label>
      </div>
      <div class="formfield">
        <label>Subtitle
        <input v-model="formData.subtitle"></label>
      </div>
      <hr>
      <div class="formfield">
        <label class="blocklabel">Content</label>
        <div class="content-section" v-bind:key="index" v-for="(section, index) in formData.sections">
          <label :for="'s'+index">Section {{ index + 1 }} content</label>
          <select v-model="formData.sections[index].width">
            <option value="normal" selected>normal</option>
            <option value="wide">wide</option>
            <option value="full">full-width</option>
          </select>
          <button v-on:click="removeSection(index)" class="danger">delete</button>
          <textarea :id="'s'+index" v-model="formData.sections[index].content" placeholder="html content"></textarea>
        </div>
        <button class="addsection" v-on:click="addSection">Add section</button>
      </div>
      <button class="create" v-on:click="createPost">Create post</button>
    </div>
  </div>
</template>

<script>

export default {
  data: () => ({
    formData: {
      title: '',
      slug: '',
      subtitle: '',
      sections: [
        { width: 'normal', content: '' }
      ],
      category: '',
      published: true
    },
    toggleNewCategory: false,
    newCategory: { name: '', slug: '', description: '', banner: '' },
    categories: [],
    error: '',
    date: new Date()
  }),
  watch: {
    'formData': {
      handler: function() {
        this.saveProgress()
      },
      deep: true
    }
  },
  asyncData(context) {
    return { categories: context.store.state.categories || [] }
  },
  mounted() {
    this.loadProgress()
  },
  methods: {
    resetPost() {
      this.formData = {
        title: '',
        subtitle: '',
        sections: [
          { width: 'normal', content: '' }
        ],
        category: '',
        published: true
      }
    },
    createCategory() {
      const newCategory = this.newCategory
      if (newCategory.name === '') return
      const body = { ...newCategory }
      this.$store.dispatch('saveCategory', body)
        .then(res => {
          console.log(res)
          this.categories.push(res.data)
          this.formData.category = res.data._id
          this.toggleNewCategory = false
        }).catch(console.warn)
    },
    addSection() {
      this.formData.sections.push({ width: 'normal', content: '' })
    },
    removeSection(index) {
      this.formData.sections.splice(index, 1)
    },
    createPost() {
      const formData = this.formData
      let body = { ...formData }
      if (body.category === '') {
        this.error = 'Select or create a category'
        return
      }
      body.sections = body.sections.filter(s => s.content !== '')
      this.$store.dispatch('savePost', body)
        .then(res => {
          this.resetPost()
          console.log(res)
        })
        .catch(e => {
          console.warn(e)
          this.error = e
        })
    },
    setcatslug() {
      this.newCategory.slug = this.slugify(this.newCategory.name)
    },
    setslug() {
      this.formData.slug = this.slugify(this.formData.title)
    },
    slugify(s) {
      if (!typeof s === 'string' || !s) return s
      return s.toLowerCase().replace(/[^\w\s]/gi, '').replace(/\s/g, '-')
    },
    saveProgress(formdata) {
      if (typeof localStorage !== 'undefined') {
        localStorage.setItem('formdata', JSON.stringify(formdata || this.formData))
      }
    },
    loadProgress() {
      if (typeof localStorage !== 'undefined') {
        const data = localStorage.getItem('formdata')
        if (data !== null) {
          this.formData = JSON.parse(data)
        }
      }
    }
  }
}
</script>

<style scoped>
.error {
  color:red;
}
input,textarea{
  display: block;
  width: 100%;
}
textarea{ height: 100px }
.preview{width:70%}
.input{width: 30%; border-left: 2px solid #ddd; min-height: 100vh;}
.col2{
  vertical-align: top;
  display:inline-block;
  padding:20px;
}
section{
  border-left:1px solid #ccc;
  border-right: 1px solid #ccc 
}
article{
  border-left:3px solid #ccc;
  border-right: 3px solid #ccc
}
.formfield {
  margin: 20px 0;
}
.blocklabel {
  display: block;
}
button {
  margin: 10px 0;
}
.create{
  display: block;
  margin: 30px auto 30px auto;
  max-width: 200px;
}
</style>