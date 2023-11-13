import axios from 'axios'
import React, { useState } from 'react'

export default function TestIMG() {
    const [file, setFile] = useState()
    const upload = () => {
        const formData = new FormData()
        formData.append('file', file)
        axios.post('http://localhost:8000/upload', formData)
            .then(res => { })
            .catch(er => console.log(er))
    }
    return (
        <div className='pt-10'>
            <input type="file" onChange={(e) => setFile(e.target.files[0])} />
            <button className="btn" type="button" onClick={upload}>Upload</button>
        </div>
    )
}
