import Link from "next/link"
import { useRouter } from 'next/router'

const ReadAllProposals = (props) => {
    const router = useRouter()
    const pageTransition = () => {
        router.push("/proposal/create")
    }

    return (
        <div>
            <div className="grid-container-in">
            {props.allProposals.map(Proposal => 
                <Link href={`/proposal/${Proposal._id}`} key={Proposal._id}>
                    <a className="card">
                        <div className="texts-area">
                            <h2>¥{Proposal.title}</h2>
                            <p>{Proposal.description.substring(0, 80)}...</p>
                            <h2>¥{Proposal.expair}</h2>
                        </div>
                    </a>
                </Link>
            )}
            </div>
            <div>
                <button onClick={pageTransition}>作成</button>
            </div>
        </div>
    )
}

export default ReadAllProposals

export const getServerSideProps = async() => {
    const response = await fetch("http://localhost:3000/api/proposal/readall")   
    const allProposals = await response.json()   

    return{
        props: allProposals 
    }
}