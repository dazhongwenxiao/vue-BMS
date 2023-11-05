<template>
  <div>
    <div class="card-header">
        <span>{{title}}</span>
        <svg-icon icon-class="prompt" />
    </div>
    <div class="card-content">
      <span>{{number}}</span>
    </div>
    <div class="card-charts">
      <slot name="charts"></slot>
    </div>
    <div class="card-footer">
      <slot name="footer"></slot>
    </div>

  </div>
</template>

<script>
export default {
    name: 'Details',
    props: ['title','number']
}
</script>

<style>
  .card-header{
    display: flex;
    justify-content: space-between;
    color: #d9d9d9;
    font-size: 14px;
  }
  .card-content{
    margin: 8px auto;
    font-size: 24px;
  }
  .card-charts{
    height: 35px;
    display: flex;
    align-items: flex-end;
    margin-bottom: 10px;
  }
  .card-footer{
    border-top: 1px solid #eee;
    padding-top: 10px;
  }
</style>