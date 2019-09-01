// 微信多选消息分享出的消息文本解析器
// 标注 MIME 类型为 message/rfc822 ，但实际并不是

/// <reference lib="es2019" />

export interface Msg {
    author: string;
    date: string;
    time: string;
    text: string;
}

export namespace WechatMessageTextParser {

    const splitLines = (str: string) => {
        return str.split(/\n/g)
    }

    const parseDateStr = (str: string) => {
        const ISO8601DateReg = "(\\d{4})-(1[0-2]|0[1-9])-(3[01]|0[1-9]|[12]\\d)"
        const r = new RegExp(`^—{5} {2}(${ISO8601DateReg}) {2}—{5}$`)
        const match = str.match(r)
        return match && match[1]
    }

    const parseAuthorAndTimeStr = (str: string) => {
        const timeReg = "(2[0-3]|[01]\\d):([0-5]\\d)"
        const match = str.match(`^(.+) {2}(${timeReg})$`)
        if (match) {
            return {
                author: match[1],
                time: match[2],
            }
        }
    }

    export const parse = (msgText: string) => {
        const lines = splitLines(msgText)

        const result: Msg[] = []
        let date: string

        let msgTemp: Msg
        let textTemp: string = ""

        const resetTemp = () => {
            if (msgTemp) {
                msgTemp.text = msgTemp.text.trimRight()
                result.push(msgTemp)
            }
            msgTemp = null
            textTemp = ""
        }

        for (let skip = 2; skip < lines.length; skip++) {

            const line = lines[skip]

            if (parseDateStr(line)) {
                resetTemp()
                date = parseDateStr(line)
                skip += 2
                continue
            } else if (parseAuthorAndTimeStr(line)) {
                resetTemp()
                // @ts-ignore
                msgTemp = parseAuthorAndTimeStr(line)
                skip += 1
                continue
            }

            textTemp += line

            textTemp += "\n"

            msgTemp.date = date
            msgTemp.text = textTemp

        }

        resetTemp()

        return result
    }

}

export default WechatMessageTextParser

