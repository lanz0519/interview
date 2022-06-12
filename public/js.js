var app = new Vue({
  el: '#app',
  data: {
    channelName: null,
    messageContent: null,
    messageTitle: null,
    msgListChannel: null,
    channels: [],
    channel: null,
    mesgList: [],
    msgPageIndex: 1,
    msgAllCount: 0
  },
  async mounted() {
    this.getChannels()
  },
  methods: {
    createChannel: function () {
      axios({
        url: 'http://localhost:3000/channel',
        headers: {
          'Content-Type': 'application/json',
        },
        method: 'post',
        data: {
          name: this.channelName
        }
      })
        .then((response) => {
          console.log(response);
          this.channelName = null
          this.getChannels()
        })
        .catch(function (error) {
          console.log(error);
        });
    },
    createMessage: function () {
      axios({
        url: 'http://localhost:3000/message',
        headers: {
          'Content-Type': 'application/json',
        },
        method: 'post',
        data: {
          title: this.messageTitle,
          content: this.messageContent,
          channel: this.channel
        }
      })
        .then((res) => {
          console.log(res);
          this.messageTitle = null
          this.messageContent = null
          this.channel = null
        })
        .catch(function (error) {
          console.log(error);
        });
    },
    getChannels: function () {
      axios({
        url: 'http://localhost:3000/channel/list',
        headers: {
          'Content-Type': 'application/json',
        },
        method: 'get',
      })
        .then((res) => {
          this.channels = res.data.channels
        })
        .catch(function (error) {
          console.log(error);
        });
    },
    getMessages: function (id) {
      if (!id) return;
      axios({
        url: 'http://localhost:3000/message/list/' + id,
        headers: {
          'Content-Type': 'application/json',
        },
        method: 'get',
        params: {
          pageIndex: this.msgPageIndex
        }
      })
        .then((res) => {
          this.mesgList = res.data.messages
          this.msgAllCount = res.data.count
          for (let p of this.mesgList) {
            p.createdAt = moment(p.createdAt).format('YYYY-MM-DD hh:mm')
          }
        })
        .catch(function (error) {
          console.log(error);
        });
    },
    msgPrevClick: function () {
      console.log(this.msgAllCount);
      if(this.msgPageIndex >= 1) {
        this.msgPageIndex --
        this.getMessages(this.msgListChannel)
      }
    },
    msgNextClick: function () {
      if(this.msgPageIndex < this.msgAllCount / 5) {
        this.msgPageIndex ++
        this.getMessages(this.msgListChannel)
      }
    },
  },
  watch: {
    msgListChannel: function msgListChannel(newV, oldV) {
      if (newV) {
        this.getMessages(newV)
      }
    }
  }
})