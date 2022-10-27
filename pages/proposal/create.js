import { useState } from "react"
import { useRouter } from 'next/router'


const CreateProposal = () => {
    const [title, setTitle] = useState("")
    const [image, setImage] = useState("")
    const [link, setLink] = useState("")
    const [description, setDescription] = useState("")
    const [blocknumber, setBlocknumber] = useState("")
    const [start, setStart] = useState("")
    const [expair, setExpair] = useState("")

    const router = useRouter()
    
    const handleSubmit = async(e) => {
        e.preventDefault()
        try{
            const response = await fetch("http://localhost:3000/api/proposal/create", {
                method: "POST",
                headers: { 
                    "Accept": "application/json", 
                    "Content-Type": "application/json",
                    "authorization": `Bearer ${localStorage.getItem("token")}`
                },
                body: JSON.stringify({
                    title: title,    
                    image: image,
                    link: link,             
                    description: description,    
                    blocknumber: blocknumber,
                    start: start,
                    expair: expair,
                })
            })
            const jsonData = await response.json()
            alert(jsonData.message)
        }catch(err){
            alert("プロポーサル作成失敗")
        }
    }

    //const loginUser = useAuth() 

    function sleep(waitMsec) {
        var startMsec = new Date();
       
        // 指定ミリ秒間だけループさせる（CPUは常にビジー状態）
        while (new Date() - startMsec < waitMsec);
    }
    
    const pageTransition = () => {
        sleep(3000)
        router.push("/proposal/readall")
    }

    return (
        <div>
            <h1 className="page-title">プロポーサル作成</h1>
            <form onSubmit={handleSubmit}>
                <input value={title} onChange={(e) => setTitle(e.target.value)} type="text" name="title" placeholder="アイテム名" required/>
                <input value={image} onChange={(e) => setImage(e.target.value)} type="text" name="image" placeholder="画像" required/>
                <input value={link} onChange={(e) => setLink(e.target.value)} type="text" name="link" placeholder="リンク" required/>
                <textarea value={description} onChange={(e) => setDescription(e.target.value)} name="description" rows={15} placeholder="商品説明" required></textarea>
                <input value={blocknumber} onChange={(e) => setBlocknumber(e.target.value)} type="number" name="blocknumber" placeholder="blocknumber" required/>
                <input value={start} onChange={(e) => setStart(e.target.value)} type="Date" name="start" placeholder="開始日" required/>
                <input value={expair} onChange={(e) => setExpair(e.target.value)} type="Date" name="expair" placeholder="終了日" required/>
                <button onClick={pageTransition}>作成</button>
            </form>
        </div>
    )
}

export default CreateProposal