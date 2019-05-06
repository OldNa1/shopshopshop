class EditTable {
    constructor(tbody){
        this.tbody = document.querySelector(tbody);
        this.bindEvents();
    }

    bindEvents () {
        this.tbody.onclick = e => {
            let target = e.target;
            let tr = target.parentNode.parentNode;
            let classList = Array.from(e.target.classList);
            // 通过classList的数组来判断
            if(classList.includes("btn-edit")){
                this.editBtnClick(tr);
            }else if(classList.includes("btn-del")){
                this.delBtnClick(tr);
            }else if(classList.includes("btn-ok")){
                this.okBtnClick(tr);
            }else if(classList.includes("btn-cancel")){
                this.cancelBtnClick(tr);
            }
        }
    }

    editBtnClick (tr) {
        // 把span的内容给对应的input
        Array.from(tr.querySelectorAll("span")).forEach( span => {
            span.nextElementSibling.value = span.innerHTML;
        })
        // 给tr添上edit
        tr.classList.add("edit");
    }

    delBtnClick (tr) {
        if(confirm("确认删除这个角色吗？")){
            // 请求后端删除数据
            let id = tr.getAttribute("data-id");
            // console.log(id) // null
            tools.ajaxGetPromise("api/v1/delete.php",{id}).then(data => {
                if(data.res_code === 1){
                    alert(data.res_message);
                    // tr.remove();
                    // 后台数据操作完成
                    getShop.init();
                }else{
                    alert(data.res_message);
                }
            })
            
        }    
    }

    okBtnClick (tr) {  
        let inputPrice = tr.querySelector(".inputPrice"),
            inputNum = tr.querySelector(".inputNum"),
            id = tr.getAttribute("data-id"),
            price = inputPrice.value,
            num = inputNum.value;
            // console.log(price,num);
            // 发送更新请求
            tools.ajaxGetPromise("api.v1.ok.php",{id,price,num}).then(data => {
                // 给tr移除edit
                tr.classList.remove("edit");
                // alert(data.res_message);
                if(data.res_code === 1){
                    alert(data.res_message);
                    inputPrice.previousElementSibling.innerHTML = inputPrice.value;
                    inputNum.previousElementSibling.innerHTML = inputNum.value;
                }
            })
        
        

        Array.from(tr.querySelectorAll("span")).forEach( span => {
            span.innerHTML = span.nextElementSibling.value;
        })
        // 给tr移除edit
        tr.classList.remove("edit");
    }

    cancelBtnClick (tr) {
        // 给tr移除edit
        tr.classList.remove("edit");
    }
}

new EditTable("#tbody");