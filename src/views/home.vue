<template>
    <div>
        <text>{{msg}}</text>
    </div>
</template>
<script>
    export default {
        data () {
            return {
                msg: 'hello home'
            }
        },
        mounted () {
            this.msg = this.$route.params.a
        }
    }
</script>
<style>
</style>
