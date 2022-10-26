
import Link from "next/link" 

const ReadSingleProposal = (props) => {
    return (
        <div className="grid-container-si">
            <div>
                <h1>{props.singleProposal.title}</h1>
                <h2>¥{props.singleProposal.link}</h2>
                <h2>¥{props.singleProposal.blocknumber}</h2>
                <h2>¥{props.singleProposal.start}</h2>
                <h2>¥{props.singleProposal.expair}</h2>
                <hr/>
                <p>{props.singleProposal.description}</p>
                <div>
                    <Link href={`/proposal/update/${props.singleProposal._id}`}><a>プロポーサル編集</a></Link>
                    <Link href={`/proposal/delete/${props.singleProposal._id}`}><a>プロポーサル削除</a></Link>
                </div>
            </div>
        </div>
    )
}

export default ReadSingleProposal

export const getServerSideProps = async(context) => {
    console.log(context.query.id)
    const response = await fetch(`http://localhost:3000/api/proposal/${context.query.proposal_id}`)  
    const singleProposal = await response.json()
    

    return{
        props: singleProposal
    }
}