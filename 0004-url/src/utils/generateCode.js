const generateCode = () => {
    const mainString = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789"

    const shortCode = ""

    for (let i = 0; i < 5; i++) {
        shortCode += mainString.charAt(Math.floor(Math.random() * 62))
    }

    return shortCode
}

export default generateCode;