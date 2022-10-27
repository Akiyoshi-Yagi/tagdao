import { useState } from "react"
import { useRouter } from 'next/router'

const UpdateProposal = (props) => {
    const [title, setTitle] = useState(props.singleProposal.title)
    const [image, setImage] = useState(props.singleProposal.image)
    const [link, setLink] = useState(props.singleProposal.link)
    const [description, setDescription] = useState(props.singleProposal.description)
    const [blocknumber, setBlocknumber] = useState(props.singleProposal.blocknumber)
    const [start, setStart] = useState(props.singleProposal.start)
    const [expair, setExpair] = useState(props.singleProposal.expair)

    const router = useRouter()

    const handleSubmit = async(e) => {
        e.preventDefault()
        try{
            const response = await fetch(`http://localhost:3000/api/proposal/update/${props.singleProposal._id}`, {
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
            alert("アイテム編集失敗!")
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
        router.push(`/proposal/${props.singleProposal._id}`)
    }

    return (
        <div>
            <h1 className="page-title">アイテム編集</h1>
            <form onSubmit={handleSubmit}>
            <input value={title} onChange={(e) => setTitle(e.target.value)} type="text" name="title" placeholder="アイテム名" required/>
            <input value={image} onChange={(e) => setImage(e.target.value)} type="text" name="image" placeholder="画像" required/>
            <input value={link} onChange={(e) => setLink(e.target.value)} type="text" name="link" placeholder="リンク" required/>
            <textarea value={description} onChange={(e) => setDescription(e.target.value)} name="description" rows={15} placeholder="商品説明" required></textarea>
            <input value={blocknumber} onChange={(e) => setBlocknumber(e.target.value)} type="number" name="blocknumber" placeholder="blocknumber" required/>
            <input value={start} onChange={(e) => setStart(e.target.value)} type="Date" name="start" placeholder="開始日" required/>
            <input value={expair} onChange={(e) => setExpair(e.target.value)} type="Date" name="expair" placeholder="終了日" required/>
            <button onClick={pageTransition}>編集</button>
            </form>
        </div>
    ) 
}

export default UpdateProposal

export const getServerSideProps = async(context) => {
    const response = await fetch(`http://localhost:3000/api/proposal/${context.query.proposal_id}`) 
    const singleProposal = await response.json()
    console.log(singleProposal)
    console.log("aaa")

    return{
        props: singleProposal
    }
}