import {useState} from "react"

const Meme = ( { meme, setMeme } ) => {
    const[form, setForm] = useState({
        template_id: meme.id,
        username: 'teasty',
        password: 'PPS$Asr52ttCfaF',
        boxes: [],
    })
    const generateMeme = () => {
        let url = `https://api.imgflip.com/caption_image?template_id=${form.template_id}&username=${form.username}&password=${form.password}`
        form.boxes.map((box,index) => {
            url += `&boxes[${index}][text] = ${box.text}`
        })
        fetch(url).then(res => res.json())
        .then(data => setMeme({...meme, url : data.data.url}))
    }    
    return (
        <div className="memes">
            <img src={meme.url} alt="" />
            {[...Array(meme.box_count)].map((_,ind) => (
                <input
                    key = {ind}
                    type="text"
                    className="inp" 
                    placeholder = {`Meme caption ${ind + 1}`}
                    onChange = {(e) => {
                        const newBoxes = form.boxes;
                        newBoxes[ind] = {text : e.target.value}
                        setForm({...form, boxes: newBoxes})
                    }}    
                />
            ))}
            <div className="btn">
                <button onClick = {generateMeme}>Generate Meme</button>
                <button onClick = {() => (setMeme(null))}>Choose Template</button>
            </div>
        </div>
    );
};

export default Meme
