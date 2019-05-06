class AddShop {
    constructor () {
        this.inputName = document.querySelector("#inputName");
        this.inputPrice = document.querySelector("#inputPrice");
        this.inputNum = document.querySelector("#inputNum");
        this.addBtn = document.querySelector("#btn-shop-add");
        this.init();
    }

    init () {
        this.addBtn.onclick = () => {
            let name = this.inputName.value,
                price = this.inputPrice.value,
                number = this.inputNum.value;
            console.log(name);
            // 验证表单是否为空
            if(name === "" || price === "" || number === ""){
                console.log(111);
                alert("输入不能为空");
                return;
            }

            tools.ajaxGetPromise("api/v1/add.php",{name,price,number}).then(data => {
                console.log(data);
                if(data.res_code === 1){
                    alert(data.res_message);
                    console.log(1);
                    this.inputName.value = this.inputPrice.value = this.inputNum.value = "";
                    // 让模态层隐藏
                    $('#myModal').modal('hide');
                    // 渲染界面
                    getShop.init();
                }
            })
        }
    }
}

new AddShop();