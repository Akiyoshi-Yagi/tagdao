import { useRouter } from 'next/router'
import Link from "next/link" 

const ReadSingleProposal = (props) => {
    
    const router = useRouter()

    const pollFor = async(e) => {
        e.preventDefault()
        try {
            const response = await fetch(`http://localhost:3000/api/proposal/poll/for/${props.singleProposal._id}`, {
                method: "POST",
                headers: {
                    "Accept": "application/json", 
                    "Content-Type": "application/json",
                    "authorization": `Bearer ${localStorage.getItem("token")}`
                }
                
            })
            const jsonData = await response.json()
            alert(jsonData.message)
            router.push(`/proposal/${props.singleProposal._id}`)

        } catch (error) {
            alert("投票失敗~!~")
        }
    }
    const pollAgainst = async(e) => {
        e.preventDefault()
        try {
            const response = await fetch(`http://localhost:3000/api/proposal/poll/against/${props.singleProposal._id}`, {
                method: "POST",
                headers: {
                    "Accept": "application/json", 
                    "Content-Type": "application/json",
                    "authorization": `Bearer ${localStorage.getItem("token")}`
                },
            })
            const jsonData = await response.json()
            alert(jsonData.message)
            router.push(`/proposal/${props.singleProposal._id}`)

        } catch (error) {
            alert("投票失敗〜〜〜〜")
        }
    }
    return (
        <div className="grid-container-si">
            <div>
                <h1>{props.singleProposal.title}</h1>
                <h2>{props.singleProposal.link}</h2>
                <h2>{props.singleProposal.blocknumber}</h2>
                <h2>{props.singleProposal.start}</h2>
                <h2>{props.singleProposal.expair}</h2>
                <h2>賛成</h2>
                <h2>{props.singleProposal.for}</h2>
                <h2>反対</h2>
                <h2>{props.singleProposal.against}</h2>

                <p>{props.singleProposal.description}</p>
                <div>
                    <h2>投票</h2>
                    <button onClick={pollFor}>賛成</button>
                    <button onClick={pollAgainst}>反対</button>
                    
                </div>
                <div>
                    <h2>以下は、プロポーサル作成者のみ可能な操作</h2>
                    <Link href={`/proposal/update/${props.singleProposal._id}`}><a>プロポーサル編集</a></Link>
                    <Link href={`/proposal/delete/${props.singleProposal._id}`}><a>プロポーサル削除</a></Link>
                </div>
            </div>
        </div>
    )
}

export default ReadSingleProposal

export const getServerSideProps = async(context) => {
    //console.log(context.query.id)
    const response = await fetch(`http://localhost:3000/api/proposal/${context.query.proposal_id}`)  
    const singleProposal = await response.json()
    

    return{
        props: singleProposal
    }
}