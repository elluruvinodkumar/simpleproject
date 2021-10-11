const generateOTP = () => {
    let text = "";
    const possible = "0123456789";
    for (let i = 0; i < 4; i++) {
        text += possible.charAt(Math.floor(Math.random() * possible.length));
    }
    console.log('pin:' + text);
    return text;
}

module.exports = {
    generateOTP
}