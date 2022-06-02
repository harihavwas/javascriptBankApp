class Bank{
    createAccount(){
        console.log("Inside create account");
        let account_number = bk_acno.value
        let email = bk_email.value
        let phone = bk_phn.value
        let password = bk_pass.value
        let user={
            account_number:account_number,
            email:email,
            phone:phone,
            password:password,
            balance:2000
        }
        localStorage.setItem(user.account_number,JSON.stringify(user))
        alert("User have been created successfully !")
    }

    validateAccountNumber(account_number){
        return account_number in localStorage?true:false;
    }

    login(){
        // console.log("Inside login");
        let account_number = bk_lg_acc.value
        let password = bk_lg_pass.value
        // console.log(account_number,password);
        if (this.validateAccountNumber(account_number)){
            let data = JSON.parse(localStorage.getItem(account_number))
            if (password==data.password){
                alert("Access granded")
                sessionStorage.setItem("user",account_number)
                window.location.href="./bank_index.html"
            }
            else{
                alert("Invalid password")
            }
        }
        else{
            alert("Invalid account number")
        }

    }

    logout(){
        console.log("here");
        if ("user" in sessionStorage){
            sessionStorage.removeItem("user")
            // window.location.href="./bank_login.html";
            let link = document.querySelector("#logout")
            link.href="./bank_login.html"
        }
        else{
            alert("You must login")
        }
    }
    balanceEnquiry(){
        let logedaccountusernumber = sessionStorage.getItem("user")
        let data = JSON.parse(localStorage.getItem(logedaccountusernumber))
        alert(`Your current balance is ${data.balance}`)
    }
    validateAccountNumbers(to_acno,c_to_acno){
        return to_acno==c_to_acno?true:false
    }
    getdataFromLocalStorage(acno){
        return JSON.parse(localStorage.getItem(acno))
    }
    fundTransfer(){
        let to_acno = bk_to_acno.value
        let c_to_acno = bk_cto_acno.value
        let fund = Number(bk_fund.value)
        if (this.validateAccountNumbers(to_acno,c_to_acno)){
            if (this.validateAccountNumber(to_acno)){
                let logged_user_acno = sessionStorage.getItem("user")
                let logged_user_data = this.getdataFromLocalStorage(logged_user_acno)
                let current_balance = logged_user_data.balance
                // console.log(current_balance);
                if (fund<current_balance){
                    let payee_new_balance = current_balance-fund
                    logged_user_data.balance = payee_new_balance
                    localStorage.setItem(logged_user_acno,JSON.stringify(logged_user_data))
                    let rcvr_data = this.getdataFromLocalStorage(to_acno)
                    let rcvr_balance = Number(rcvr_data.balance)
                    let rcvr_new_balance = rcvr_balance+fund
                    rcvr_data.balance = rcvr_new_balance
                    localStorage.setItem(to_acno,JSON.stringify(rcvr_data))
                    alert("Payment completed successfully !")
                }
                else{
                    alert("Insufficient balance")
                }
            }
            else{
                alert("Invalid account number !")
            }
        }
        else{
            alert("Account number mismatch !")
        }
    }
}

var bank = new Bank()


