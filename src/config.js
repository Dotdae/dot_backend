export function serverTime(){

    let date = new Date();
    let h = (date.getHours() < 10 ? '0' : '') + date.getHours();
    let m = (date.getMinutes() < 10 ?'0' : '')+date.getMinutes();
    let time = h + ':'+ m;

    return time;

}