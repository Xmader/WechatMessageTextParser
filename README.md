# WechatMessageTextParser

> 微信多选消息分享出的消息文本解析器
> (标注 MIME 类型为 message/rfc822 ，但实际并不是)

## 使用

```ts
import { WechatMessageTextParser } from "wechat-msg-text-parser"

const str = "Below is the chat history between xxx and xxx\n\n—————  2019-09-01  —————\n\n\nxxx  00:00\n\ntext\n\n\n\n"

console.log(
    WechatMessageTextParser.parse(str)
)
```

## License

MIT
