<template lang="pug">
div
  .test(@click="handleClick") {{msg}}
  .tab(ref="tab")
</template>

<script lang="ts">
import Vue from 'vue'
export default Vue.extend({
  data() {
    return {
      msg: 'status ok!'
    }
  },
  methods: {
    handleClick(): void {
      this.msg = 'change ok!'
    },
    initTabScore(): void {
      const renderer = new this.$VF.Renderer(
        this.$refs.tab,
        this.$VF.Renderer.Backends.SVG
      )
      renderer.resize(500, 500)
      const context = renderer.getContext()
      context.setFont('Arial', 10, '').setBackgroundFillStyle('#eed')
      const stave = new this.$VF.Stave(10, 40, 400)
      stave.addClef('treble').addTimeSignature('4/4')
      stave.setContext(context).draw()
      const notes = [
        new this.$VF.StaveNote({
          clef: 'treble',
          keys: ['c/5'],
          duration: 'q'
        }),
        new this.$VF.StaveNote({
          clef: 'treble',
          keys: ['d/4'],
          duration: 'q'
        }),
        new this.$VF.StaveNote({
          clef: 'treble',
          keys: ['b/4'],
          duration: 'qr'
        }),
        new this.$VF.StaveNote({
          clef: 'treble',
          keys: ['c/4', 'e/4', 'g/4'],
          duration: 'q'
        })
      ]
      const notes2 = [
        new this.$VF.StaveNote({ clef: 'treble', keys: ['c/4'], duration: 'w' })
      ]
      const voices = [
        new this.$VF.Voice({ num_beats: 4, beat_value: 4 }).addTickables(notes),
        new this.$VF.Voice({ num_beats: 4, beat_value: 4 }).addTickables(notes2)
      ]
      const formatter = new this.$VF.Formatter()
        .joinVoices(voices)
        .format(voices, 400)
      voices.forEach(function(v) {
        v.draw(context, stave)
      })
    },
  },
  mounted() {
    this.initTabScore()
  }
})
</script>

<style lang="stylus" scoped>
.test
  cursor pointer
  padding 40px
</style>
