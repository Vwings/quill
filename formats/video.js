import { BlockEmbed } from '../blots/block';
import Link from '../formats/link';

const ATTRIBUTES = [
  'height',
  'width'
];


class Video extends BlockEmbed {
  static create(value) {
    if(value==undefined || value== null || value.trim().length == 0){
      return ;
    }
    let srcValue = this.sanitize(value);
    
    if (srcValue == Link.SANITIZED_URL){
      return ;
    }
    
    let node = super.create(value);
    node.setAttribute('frameborder', '0');
    node.setAttribute('allowfullscreen', true);
    node.setAttribute('src', srcValue);
    node.setAttribute('width' , 560);
    node.setAttribute('height' , 268);
    return node;
  }

  static formats(domNode) {
    return ATTRIBUTES.reduce(function(formats, attribute) {
      if (domNode.hasAttribute(attribute)) {
        formats[attribute] = domNode.getAttribute(attribute);
      }
      return formats;
    }, {});
  }

  static sanitize(url) {
    return sanitize(url);
  }

  static value(domNode) {
    return domNode.getAttribute('src');
  }

  format(name, value) {
    if (ATTRIBUTES.indexOf(name) > -1) {
      if (value) {
        this.domNode.setAttribute(name, value);
      } else {
        this.domNode.removeAttribute(name);
      }
    } else {
      super.format(name, value);
    }
  }
}
Video.blotName = 'video';
Video.className = 'ql-video';
Video.tagName = 'IFRAME';
Video.YOUKU_BASE = 'http://player.youku.com/embed/';
Video.TUDOU_BASE = '';
Video.BILIBILI_BASE = '';
Video.YOUKUID_REGEXP = /(id_)(.*)(\.html)/;
Video.TUDOUID_REGEXP = //;
Video.BILIBILIID_REGEXP = //;


function sanitize(url) {
  return getYTBUrl(Link.sanitize(url));
}

function getYTBUrl(url) {
  if (url.indexOf("v.youku.com") > -1){
    return Video.YOUKU_BASE + YOUKUID_REGEXP.exec(url)[2];
  }else if(url.indexOf("www.tudou.com") > -1){

  }else if(url.indexOf("www.bilibili.com") > -1) {

  }
  return url;
}

export default Video;
