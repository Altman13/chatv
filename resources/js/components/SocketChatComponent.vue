<template>
    <div class="container">
        <div class="row">

                <textarea rows="6" readonly="" class="form-control">{{dataMessage.join('\n')}}</textarea>

            <div class="input-group mb-3">
                <input type="text" class="form-control" id="text-chat" placeholder="Текст для оправки" v-model="message">
                <div class="input-group-append">
                    <button @click="sendMessage" class="btn btn-primary" id="send_btn">Отправить сообщение</button>
                </div>
            </div>
        </div>

    </div>

</template>

<script>
    export default {
        data: function () {
            return {dataMessage: [],
                message: "",
            }
        },
        mounted(){
            var socket=io.connect('http://localhost:3000');
            socket.on("chat-action:App\\Events\\NewMessage", function (data) {
                this.dataMessage.push(data.message);
            }.bind(this));

        },
        methods:{
            sendMessage : function () {
             axios({
                 method: 'post',
                 url: '/start/send-message',
                 params: {message: this.message}
             }).then((respone)=>{
                     this.message="";
                 });
            }
        }
    }
</script>

<style scoped>
#text-chat, #send_btn{
    margin-top: 15px;
}

</style>
