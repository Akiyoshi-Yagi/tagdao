import jwt from "jsonwebtoken"

const secret_key = "tagdao"


const auth = (handler) => {
    return async(req, res) => {
        if(req.method === "GET"){
            return handler(req, res)
        }

        //const token = await req.headers.authorization.split(" ")[1]
        const token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJhZGRyZXNzIjoic2FraSIsImlhdCI6MTY2NjY0NDE2MywiZXhwIjoxNjY2NzI2OTYzfQ.ado-XtlbSXoAjpNFdW5D3pHXEY4fxEmfaOyWv1rCQMI"
        if(!token){
            return res.status(401).json({message: "トークンがありません"})
        }

        try {
            const decoded = jwt.verify(token, secret_key)
            req.body.address = decoded.address
            console.log(req.body)
            return handler(req, res)
        } catch (error) {
            return res.status(401).json({message: "トークンが正しくないです"})
            
        }

    }
}

export default auth