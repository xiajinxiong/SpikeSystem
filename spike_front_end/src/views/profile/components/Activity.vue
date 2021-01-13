<template>
  <div class="user-activity">

    <div class="post" v-for="a in activities" :key="a.id">
      <div class="user-block">
        <img class="img-circle" :src="'https://wpimg.wallstcn.com/57ed425a-c71e-4201-9428-68760c0537c4.jpg'+avatarPrefix">
        <span class="username text-muted">{{a.publisherName}}</span>
        <span class="description">Shared publicly - {{a.createdAt}}</span>
      </div>
      <p>
        {{a.text}}
      </p>
      <ul class="list-inline">
        <li>
          <span class="link-black text-sm">
            总人数: {{a.count}} 已报名人数: {{a.occupied}}
          </span>
        </li>
        <li>
          <span class="link-black text-sm">
            <svg-icon icon-class="like" />
            <el-button type="mini" @click="signup(a.id)">
              点击报名
            </el-button>
          </span>
        </li>
      </ul>
    </div>
    <!--

    <div class="post">
      <div class="user-block">
        <img class="img-circle" :src="'https://wpimg.wallstcn.com/57ed425a-c71e-4201-9428-68760c0537c4.jpg'+avatarPrefix">
        <span class="username text-muted">Iron Man</span>
        <span class="description">Shared publicly - 7:30 PM today</span>
      </div>
      <p>
        讲座活动
      </p>
      <ul class="list-inline">
        <li>
          <span class="link-black text-sm">
            总人数: 500 已报名人数: 100
          </span>
        </li>
        <li>
          <span class="link-black text-sm">
            <svg-icon icon-class="like" />
            <el-button type="mini" @click="signup()">
              点击报名
            </el-button>
          </span>
        </li>
      </ul>
    </div>

    <div class="post">
      <div class="user-block">
        <img class="img-circle" :src="'https://wpimg.wallstcn.com/9e2a5d0a-bd5b-457f-ac8e-86554616c87b.jpg'+avatarPrefix">
        <span class="username text-muted">Captain American</span>
        <span class="description">Sent you a message - yesterday</span>
      </div>
      <p>
        Lorem ipsum represents a long-held tradition for designers,
        typographers and the like. Some people hate it and argue for
        its demise, but others ignore the hate as they create awesome
        tools to help create filler text for everyone from bacon lovers
        to Charlie Sheen fans.
      </p>
      <ul class="list-inline">
        <li>
          <span class="link-black text-sm">
            <i class="el-icon-share" />
            Share
          </span>
        </li>
        <li>
          <span class="link-black text-sm">
            <svg-icon icon-class="like" />
            Like
          </span>
        </li>
      </ul>
    </div>
    <div class="post">
      <div class="user-block">
        <img class="img-circle" :src="'https://wpimg.wallstcn.com/fb57f689-e1ab-443c-af12-8d4066e202e2.jpg'+avatarPrefix">
        <span class="username">Spider Man</span>
        <span class="description">Posted 4 photos - 2 days ago</span>
      </div>
      <div class="user-images">
        <el-carousel :interval="6000" type="card" height="220px">
          <el-carousel-item v-for="item in carouselImages" :key="item">
            <img :src="item+carouselPrefix" class="image">
          </el-carousel-item>
        </el-carousel>
      </div>
      <ul class="list-inline">
        <li><span class="link-black text-sm"><i class="el-icon-share" /> Share</span></li>
        <li>
          <span class="link-black text-sm">
            <svg-icon icon-class="like" /> Like</span>
        </li>
      </ul>
    </div>
    -->
  </div>
</template>

<script>
const avatarPrefix = '?imageView2/1/w/80/h/80'
const carouselPrefix = '?imageView2/2/h/440'
import {getActivity, enter} from "@/api/activity"
import { MessageBox, Message } from 'element-ui'

export default {
  data() {
    return {
      carouselImages: [
        'https://wpimg.wallstcn.com/9679ffb0-9e0b-4451-9916-e21992218054.jpg',
        'https://wpimg.wallstcn.com/bcce3734-0837-4b9f-9261-351ef384f75a.jpg',
        'https://wpimg.wallstcn.com/d1d7b033-d75e-4cd6-ae39-fcd5f1c0a7c5.jpg',
        'https://wpimg.wallstcn.com/50530061-851b-4ca5-9dc5-2fead928a939.jpg'
      ],
      avatarPrefix,
      carouselPrefix,
      activities: [],
    }
  },
  methods: {
    signup(aid) {
      if (aid != null ) {
        enter(aid)
        .then(data => {
          if (data.data.state == 20000) {
            Message({
                message: "报名成功",
                type: 'success',
                duration: 1 * 1000
              })
            //alert("报名成功")
            //location.reload();
            this.getA()
          }
          else {
            if (data.data.state == 30000) {
              Message({
                message: "报名人数已满",
                type: 'error',
                duration: 1 * 1000
              })
              this.getA()
            }
            else {
            if (data.data.state == 30001) {
              Message({
                message: "您已报名该活动",
                type: 'error',
                duration: 1 * 1000
              })
              this.getA()
            }
          }
          }
          
          
        })
      }
    },
    getA() {
      getActivity()
      .then(data => {
        if (data.code == 20000) {
          
          this.activities = data.data.activities;
          //alert(JSON.stringify(this.activities))
        }
      })
      .catch(error => {
          alert(error)
      })
    },
  },
  created() {
    this.getA();
  }
}
</script>

<style lang="scss" scoped>
.user-activity {
  .user-block {

    .username,
    .description {
      display: block;
      margin-left: 50px;
      padding: 2px 0;
    }

    .username{
      font-size: 16px;
      color: #000;
    }

    :after {
      clear: both;
    }

    .img-circle {
      border-radius: 50%;
      width: 40px;
      height: 40px;
      float: left;
    }

    span {
      font-weight: 500;
      font-size: 12px;
    }
  }

  .post {
    font-size: 14px;
    border-bottom: 1px solid #d2d6de;
    margin-bottom: 15px;
    padding-bottom: 15px;
    color: #666;

    .image {
      width: 100%;
      height: 100%;

    }

    .user-images {
      padding-top: 20px;
    }
  }

  .list-inline {
    padding-left: 0;
    margin-left: -5px;
    list-style: none;

    li {
      display: inline-block;
      padding-right: 5px;
      padding-left: 5px;
      font-size: 13px;
    }

    .link-black {

      &:hover,
      &:focus {
        color: #999;
      }
    }
  }

}

.box-center {
  margin: 0 auto;
  display: table;
}

.text-muted {
  color: #777;
}
</style>
