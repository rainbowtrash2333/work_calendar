<template>
    <el-text class="mx-1" size="large" style="font-size: larger;">
        今天上什么班：{{ getWorkType(date) }} 班 <hr> 
    </el-text>

    <div class="cals">
        <vue-hash-calendar :key="updateFlag" ref="calendar" week-start='Monday'  @change="onClick" @slidechange="onSlidechange"
            :mark-date='markDate' picker-type="date" :default-datetime="new Date(queryDate)" />
    </div>
</template>

<script  setup lang="ts">
import { useRoute, useRouter } from "vue-router";
import { ref } from 'vue'
const route = useRoute()
const router = useRouter()
type WrokType = '白' | '中' | '夜' | '休' | 'error'
console.log(router.currentRoute.value.query);
let queryDate:string = router.currentRoute.value.query.date as string

let date = ref<Date>(new Date(queryDate))


function date_TO_String(date_Object: Date): string {
    let date_String: string =
        date_Object.getFullYear() +
        "/" +
        (date_Object.getMonth() + 1) +
        "/" +
        +date_Object.getDate();
    return date_String;
}
function getLastDay(today: Date = new Date()) {
    let next = new Date()
    next.setMonth(today.getMonth() + 1)
    next.setDate(1)
    next.setHours(0, 0, 0, 0)
    return new Date(next.getTime() - (1000 * 24 * 60 * 60)).getDate()
}
let getWorkType = (date: Date, base: string = '2023.3.13', myType: WrokType = '白'): WrokType => {
    date.setHours(0, 0, 0, 0)
    let baseDate = new Date(base)
    baseDate.setHours(0, 0, 0, 0)
    let deff_day = Math.floor(date.getTime() - baseDate.getTime()) / (1000 * 24 * 60 * 60)
    let weeks = ((Math.floor(deff_day / 7) % 3) + 3) % 3
    let days = ((deff_day % 7) + 7) % 7
    // console.log('weeks: ', weeks, " days: ", days, 'deff_day: ', deff_day);

    if (days == 6 && weeks != 2) {
        return '休'
    }
    if (days == 6 && weeks == 2) {
        return '白'
    }
    switch (weeks) {
        case 0:
            return '白'
        case 1:
            return '夜'
        case 2:
            return '中'
        default:
            return 'error'
    }
}
type MarkDate = {
    color: string;
    type: string;
    date: string[]
}
type MarkDateList = MarkDate[]
let getDateMark = (today: Date = new Date()) => {
    // console.log('today: ', today);

    let markDate: MarkDateList = [
        {
            color: '#f00',
            type: 'circle',
            date: [
            ],
        },
        {
            color: '#0f0',
            type: 'circle',
            date: [
            ],
        },
        {
            color: '#ffc107',
            type: 'circle',
            date: [
            ],
        },
    ]

    for (let i = 1; i < getLastDay(today) + 1; i++) {
        let d = new Date()
        d.setHours(0, 0, 0, 0)
        d.setMonth(today.getMonth())
        d.setDate(i)
        let type: WrokType = getWorkType(d)
        switch (type) {
            case '白':
                markDate[0].date.push(date_TO_String(d))
                break
            case '夜':
                markDate[1].date.push(date_TO_String(d))
                break
            case '中':
                markDate[2].date.push(date_TO_String(d))
                break
            default:
                break
        }
    }
    // console.log(markDate);
    return markDate;
}
let onClick = (ckdate: Date) => {
    if(date.value.getMonth()!=ckdate.getMonth()){
    let nextD =new Date()
    nextD.setDate(1)
    nextD.setMonth(ckdate.getMonth())
    nextD.setHours(0,0,0,0)
    markDate =(getDateMark(nextD))
    updateFlag.value=updateFlag.value++
    }
    date.value = ckdate
}
let markDate:any =(getDateMark(date.value))
let updateFlag = ref(0)
const onSlidechange = (direction: string) => {
    let nextD =new Date()
    nextD.setDate(1)
    nextD.setHours(0,0,0,0)
    if(direction=='left'){
        nextD.setMonth(date.value.getMonth()+1)
    }else{
        nextD.setMonth(date.value.getMonth()-1)
    }
    markDate =(getDateMark(nextD))
    updateFlag.value=updateFlag.value++
    

};
</script> 

<style lang="less"></style>