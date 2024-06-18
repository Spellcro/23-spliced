<script lang="ts">
  import { getCanvasDimensions, setCanvasData } from '../utils/canvas.utils';

  export let gridRows: string[][];
  export let currentPlace: number;
  let [width, height] = getCanvasDimensions(gridRows);

  let canvas!: HTMLCanvasElement;

  $: currentBell = currentPlace?.toString();
  $: setCanvasData(gridRows, currentBell, canvas);
</script>

<canvas bind:this={canvas} {width} {height} />

<style lang="scss">
  canvas {
    padding: 0.5rem 0 0.5rem 1.5rem;
  }
</style>
