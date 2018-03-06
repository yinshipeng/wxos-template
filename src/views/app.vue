<template>
    <div>
        <text @click="jump">跳转到Home页面(编程式)</text>
        <text @click="go('home')">跳转到Home页面(go方法)</text>
        <text @click="getData">获取字典数据</text>
        <text>{{mobile | mobileAddSpace}}</text>
    </div>
</template>

<script>
    import 'config'

    export default {
        data () {
            return {
                mobile: 13023134296
            }
        },
        methods: {
            jump () {
                this.$router.push({path: 'home', params: {a: 1}})
            },
            getData () {
                this.$request('readDirectories', {}, (resp) => {
                    this.$native.log(JSON.stringify(resp))
                }, (err) => {
                    this.$native.log(JSON.stringify(err))
                }, (progress) => {
                    this.$native.log(JSON.stringify(progress))
                })
            }
        }
    }
</script>