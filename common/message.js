/**
 * @param msg 보여줄 메시지
 * @param color 색상
 * @param timeout 시간
 */
class MessageBox {
    static show(msg, color, timeout){
        const messageBox = document.createElement('div');
        messageBox.innerHTML = `<div style="transition:.4s; opacity:0; width:30%; z-index:9999; position:fixed; left:50%; top:70%; 
                                        transform:translateX(-50%)" class="alert alert-${color}">
                                    ${msg}
                                </div>`;
        document.getElementsByTagName('body')[0].append(messageBox);
        
        setTimeout(() => {
            messageBox.firstChild.style.opacity = '1';
        }, 0);

        setTimeout(() => {
            messageBox.firstChild.style.opacity = '0';
        }, timeout);
    }
}