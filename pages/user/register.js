import { useState, useEffect } from "react";
import { ethers } from "ethers"; 
import { useRouter } from 'next/router'


const Login = () => {
    /*
     * ユーザーのウォレットアドレスを格納するために使用する状態変数を定義します。
     */
    const [currentAccount, setCurrentAccount] = useState("");

    const router = useRouter()

    /*この段階でcurrentAccountの中身は空*/
    console.log("currentAccount: ", currentAccount);
    /*
     * ユーザーが認証可能なウォレットアドレスを持っているか確認します。
     */
    const checkIfWalletIsConnected = async () => {
      const { ethereum } = window;
      if (!ethereum) {
        console.log("Make sure you have MetaMask!");
        return;
      } else {
        console.log("We have the ethereum object", ethereum);
      }
      /* ユーザーが認証可能なウォレットアドレスを持っている場合は、
       * ユーザーに対してウォレットへのアクセス許可を求める。
       * 許可されれば、ユーザーの最初のウォレットアドレスを
       * accounts に格納する。
       */
      const accounts = await ethereum.request({ method: "eth_accounts" });
  
      if (accounts.length !== 0) {
        const account = accounts[0];
        console.log("Found an authorized account:", account);
        setCurrentAccount(account);
      } else {
        console.log("No authorized account found");
      }
    };
  
    /*
     * connectWallet メソッドを実装します。
     */
    const connectWallet = async (e) => {
      try {
        const { ethereum } = window;
        if (!ethereum) {
          alert("Get MetaMask!");
          return;
        }
        /*
         * ウォレットアドレスに対してアクセスをリクエストしています。
         */
        const accounts = await ethereum.request({
          method: "eth_requestAccounts",
        });
        console.log("Connected", accounts[0]);

        /*
         * ウォレットアドレスを currentAccount に紐付けます。
         */
        setCurrentAccount(accounts[0]);
        handlesubmit(e)
      } catch (error) {
        console.log(error);
      }
    };

    // アドレス情報をbackendに流す

    const handlesubmit = async(e) => {
        e.preventDefault()
        try {
            const response = await fetch("http://localhost:3000/api/user/login", {
                method: "POST",
                headers: {
                    "Accept": "application/json", 
                    "Content-Type": "application/json"
                },
                body:JSON.stringify({
                    address : currentAccount
                })
            })
            const jsonData = await response.json()
            localStorage.setItem("token", jsonData.token)
            alert(jsonData.message)
            router.push("/proposal/readall")

        } catch (error) {
            alert("ユーザー登録失敗")
        }
    }
  
    // renderNotConnectedContainer メソッドを定義します。
    const renderNotConnectedContainer = () => (
      <button onClick={connectWallet}>
        Connect to Wallet
      </button>
    );
    /*
     * ページがロードされたときに useEffect()内の関数が呼び出されます。
     */
    useEffect(() => {
      checkIfWalletIsConnected();
    }, []);
    return (
    <div>
        <button onClick={connectWallet}>
                 connect wellet
        </button>
    </div>

    );
  };
  export default Login;



      


  
     
      