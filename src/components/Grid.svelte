<script lang="ts">
  import { setCanvasData } from '../utils/canvas.utils';

  export let gridRows: string[][];
  export let currentPlace: number;

  let canvas!: HTMLCanvasElement;

  $: currentBell = currentPlace?.toString();
  $: setCanvasData(gridRows, currentBell, canvas);
</script>

<canvas bind:this={canvas} width={150} height={534} />

<style lang="scss">
  canvas {
    padding-left: 24px;
  }
</style>
