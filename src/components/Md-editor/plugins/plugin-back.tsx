import type { BytemdPlugin } from 'bytemd'
export default function backPlugin(callback: any): BytemdPlugin {
  return {
    actions: [
      {
        title: 'back',
        icon: '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="16" height="16" fill="currentColor"><path d="M8 7V11L2 6L8 1V5H13C17.4183 5 21 8.58172 21 13C21 17.4183 17.4183 21 13 21H4V19H13C16.3137 19 19 16.3137 19 13C19 9.68629 16.3137 7 13 7H8Z"></path></svg>', // 16x16 SVG icon
        handler: {
          type: 'action',
          click() {
            callback()
          },
        },
      },
    ],
  }
}