import { useEffect, useState } from 'react'

import axios from 'axios'
export const FileUpload = () => {

     const [data, setData] = useState([]);
  
    const [file, setFile] = useState();

    const handleFile = (e) => {
        setFile(e.target.files[0])
    }

    useEffect(() => {
        axios.get('http://localhost:777/')
        .then(res =>{
            setData(res.data[2])
        })
        .catch(err => console.log(err));
        // .then(res => console.log(res))
        // .catch(err => console.log(err));
    },[])


    const hanldeUpload = () => {
        const formdata = new FormData();
        formdata.append('image',file);
        axios.post("http://localhost:777/upload", formdata)
        .then(res => 
            {
            if(res.data.Status === "Success"){
                console.log("Succeded")
            }else{
                console.log("Faild")
            }
        } )
        .catch(err => console.log(err));        
    }
    return (
    <div>
        <input type="file"  onChange={handleFile}/>
        <button onClick={hanldeUpload}>Upload</button>

        <img src={`http://localhost:777/images/ `+ data.photo} style={{width: '500px', height: '500px'}}/>

    </div>
  )
}
