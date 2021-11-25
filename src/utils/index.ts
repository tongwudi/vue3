import { ref } from 'vue';

const nowTime = ref('00:00:00')
// const timer = ref(0)
let timer = 0
const showTime = () => {
    const now = new Date();
    const hours = now.getHours() < 10 ? '0' + now.getHours() : now.getHours()
    const minu = now.getMinutes() < 10 ? '0' + now.getMinutes() : now.getMinutes()
    const sec = now.getSeconds() < 10 ? '0' + now.getSeconds() : now.getSeconds()
    nowTime.value = `${hours}:${minu}:${sec}`
    timer = setTimeout(showTime, 1000)
}
const resetTime = () =>{
    nowTime.value = '00:00:00'
    clearTimeout(timer)
}
export {
    nowTime,
    showTime,
    resetTime
}