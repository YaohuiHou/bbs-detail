export default {
  methods: {
    sendData2Native(data, callback) { // 和app通信
      window.WebViewJavascriptBridge.send(data, callback)
    },
    setupImageWrapSiz(wrapper, cw) {
      var images = wrapper.querySelectorAll('img[data-natural-size]');
      images = new Set(images)
      images.forEach(function(image, index) {
        var size = image.getAttribute('data-natural-size');
        if (size && (size = size.match(/(\d+)x(\d+)/)) && size.length === 3) {
          var nw = parseInt(size[1]),
            nh = parseInt(size[2]),
            w, h;
          if (nw <= cw) {
            w = nw;
            h = nh;
          } else {
            w = cw;
            h = Math.round(nh * w / nw);
          }
          image.parentNode.style.cssText = 'width:' + w + 'px;height:' + h + 'px;'
        }
      })
    },
    callNativeMethod(method, param, callback) { // 和app通信
      window.WebViewJavascriptBridge.callHandler(method, param, callback)
    },
    connectWebViewJavascriptBridge(callback) {
      if (window.WebViewJavascriptBridge) {
        callback(window.WebViewJavascriptBridge)
      } else {
        document.addEventListener('WebViewJavascriptBridgeReady', function() {
          callback(window.WebViewJavascriptBridge)
        }, false)
      }
    },
    sendAnalytics(c, a, l) {
      try {
        ga('send', 'event', c, a, l)
      } catch (e) {}
    },
    transformJson(arr, o, json) {
      let jsona = json ? json : {}
      arr.forEach((item) => {
        jsona[item] = o[item]
        this.$set(jsona, jsona[item], o[item])
      })
      return jsona
    },
    adView() {
      function ansycView(id, tanix) {
        var place = document.querySelector('#PAGE_AD_' + id)
        if (place) {
          _mmW.q({
            aid: 'mm_112435607_14478061_' + id,
            serverbaseurl: 'afpeng.alimama.com/',
            destid: 'PAGE_AD_' + id,
            async: tanix ? 0 : 1,
            adNone: function() {
              place.style.display = 'none'
            }
          })
        }
      }
      window.ansycView = ansycView
      if (window.ads_material && Array.isArray(ads_material) && ads_material.length) {
        ads_material.forEach(function(item, index) {
          var id = item.id
          ansycView(id, item.tanix)
        })
      }
    }
  }
}