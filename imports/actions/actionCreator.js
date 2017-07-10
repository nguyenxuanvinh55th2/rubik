// NOTE: tất cả các action (redux) được tạo trong file này, action để client gọi đển để cập nhật lại state và props
export function loginCommand(user){
    return {
        type: 'LOGIN_COMMAND',
        user,
    }
}
export function addNotificationMute(detail){
    return {
        type: 'ADD_NOTIFICATION',
        detail
    }
}
