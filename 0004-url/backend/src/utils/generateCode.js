const generateCode = () => {
    const mainSting = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789"

    let shortCode = ""

    for (let i = 0; i < 6; i++) {
        shortCode += mainSting.charAt(Math.floor(Math.random() * 62))
    }

    return shortCode;
}

export default generateCode;