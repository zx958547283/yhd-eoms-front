import axios from 'axios'
import { getToken } from '@/utils/auth'
export default function downloadFile(id, type) {
    axios({
        method: "post",
        url: process.env.BASE_API + '/common/downloadFile',
        data: {
            platform: "web",
            requestUser: "1",
            token: getToken(),
            sign: "aaaa-bbbb-cccc-ddd",
            requestBody: {
                id: id,
                type: type
            }
        },
        responseType: "arraybuffer"
    }).then((res) => {
        let blob = new Blob([res.data], {
            type: ""
        });

        let url = window.URL.createObjectURL(blob)
        let link = document.createElement('a')
        link.style.display = 'none'
        link.href = url
        link.setAttribute('download', "down.jpg");
        document.body.appendChild(link)
        link.click();
        link.remove();
    })
};
