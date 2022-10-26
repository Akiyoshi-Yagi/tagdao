import { useState } from "react"
import { useRouter } from 'next/router'
import Link from "next/link" 


const DeleteProposal = (props) => {

    const router = useRouter()

    const handleSubmit = async(e) => {
        e.preventDefault()
        try{
            const response = await fetch(`http://localhost:3000/api/proposal/delete/${props.singleProposal._id}`, {
                method: "POST",
                headers: { 
                    "Accept": "application/json", 
                    "Content-Type": "application/json",
                    "authorization": `Bearer ${localStorage.getItem("token")}`
                }
            })
            const jsonData = await response.json()
            alert(jsonData.message)
        }catch(err){
            alert("アイテム削除失敗!")
        }
    }

    //const loginUser = useAuth()

    function sleep(waitMsec) {
        var startMsec = new Date();
       
        // 指定ミリ秒間だけループさせる（CPUは常にビジー状態）
        while (new Date() - startMsec < waitMsec);
      }

    const pageTransition = () => {
        sleep(3000);
        router.push("/proposal/readall")
    }

    return (
        <div>
            <h1 className="page-title">アイテム削除</h1>
            <form onSubmit={handleSubmit}>
                <h2>{props.singleProposal.title}</h2>
                <h2>{props.singleProposal.image}</h2>
                <h2>{props.singleProposal.link}</h2>
                <h2>{props.singleProposal.description}</h2>
                <h2>{props.singleProposal.blocknumber}</h2>
                <h2>{props.singleProposal.start}</h2>
                <h2>{props.singleProposal.expair}</h2>
                <button onClick={pageTransition}>削除</button>
            </form>
        </div>
    ) 
}

export default DeleteProposal

export const getServerSideProps = async(context) => {
    const response = await fetch(`http://localhost:3000/api/proposal/${context.query.proposal_id}`) 
    const singleProposal = await response.json()
    console.log(singleProposal)

    return{
        props: singleProposal
    }
}