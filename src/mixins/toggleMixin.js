export default {
  props: {
    show: {
      type: Boolean,
      default: false
    }
  },
  methods: {
    hideDialog(){
      this.$emit('Update:show', false)
    }
  },
  mounted() {
    console.log('mixin mounted')
  },
}