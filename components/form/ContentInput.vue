<template>
  <client-only>
    <editor
      v-if="!loading"
      ref="toastuiEditor"
      :initial-value="editorText"
      :options="editorOptions"
      preview-style="vertical"
      height="500px"
      initial-edit-type="markdown"
      v-bind="$attrs"
      :visible="true"
      @change="onEditorChange"
    />
  </client-only>
</template>
<script>
import API from '@/utils/API'
import { Editor } from '@toast-ui/vue-editor'
import 'codemirror/lib/codemirror.css'
import '@toast-ui/editor/dist/toastui-editor.css'
import 'highlight.js/styles/github.css'
import codeSyntaxHighlight from '@toast-ui/editor-plugin-code-syntax-highlight'
import colorSyntax from '@toast-ui/editor-plugin-color-syntax'
import hljs from 'highlight.js/lib/common'

export default {
  components: {
    editor: Editor,
  },
  props: ['contents'],
  data() {
    return {
      loading: true,
      editorText: '',
      editorOptions: {
        plugins: [[codeSyntaxHighlight, { hljs }], colorSyntax],
        hooks: {
          addImageBlobHook: this.addImageBlobHook.bind(this),
        },
      },
    }
  },
  mounted() {
    this.editorText = this.contents
    this.loading = false
  },
  methods: {
    onEditorChange() {
      const markdown = this.$refs.toastuiEditor.invoke('getMarkdown')
      const html = this.$refs.toastuiEditor.invoke('getHtml')
      this.$emit('contentChange', {
        value: markdown,
        html,
      })
    },
    addImageBlobHook(blob, callback) {
      const data = new FormData()
      data.append('image', blob)
      const config = {
        header: {
          'Content-Type': 'multipart/form-data',
        },
      }
      API.post('/app/upload_image', data, config).then((res) => {
        callback(res.data.image_url, '')
      })
    },
  },
}
</script>
