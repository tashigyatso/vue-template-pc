<script>
export default {
  name: 'MenuItem',
  functional: true,
  props: {
    title: {
      type: String,
      default: '',
    },
  },
  render(h, context) {
    const { title } = context.props;
    return h('span', { slot: 'title' }, title);
  },
};
</script>
