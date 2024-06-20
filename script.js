

    const colorPickerbtn= document.querySelector('#color-picker')
    const colorList= document.querySelector('.all-colors');
    const clearAll= document.querySelector('.clear-all');
    const pickedColors=JSON.parse(localStorage.getItem('picked-colors')|| "[]")
    const copyColor=elem=>{
        navigator.clipboard.writeText(elem.dataset.color)
        elem.innerText="Copied"
        setTimeout(()=>elem.innerText=elem.dataset.color,1000)
    }
    const showColors=()=>{
        if(pickedColors.length!=0){
            document.querySelector(".picked-colors").classList.remove("hide")
        }
        colorList.innerHTML=pickedColors.map(color=>`
        <li class="color">
                <span class="rect" style="background:${color}; border:1px solid ${color=="#ffffff"?"#ccc":color}"></span>
                <span class="value" data-color=${color}>${color}</span>
            </li>`).join('');
        document.querySelectorAll(".color").forEach(li=>{
            li.addEventListener('click',e=>copyColor(e.currentTarget.lastElementChild))
        })
        // console.log(liTag)
    }
    const activateEyeDropper=async()=>{
        try{
            const eyeDropper=new EyeDropper();
            const response= await eyeDropper.open();
            
            if (!pickedColors.includes(response.sRGBHex)){
                pickedColors.push(response.sRGBHex);
            localStorage.setItem("picked-colors",JSON.stringify(pickedColors));
            }
            console.log(localStorage.getItem("picked-colors"));
            showColors();

        }
        catch(e){
            console.log(e);
        }
    }
    const clearAllColors=()=>{
        pickedColors.length=0;
        localStorage.setItem("picked-colors",JSON.stringify(pickedColors));
        document.querySelector(".picked-colors").classList.add("hide")
        showColors();

    }
    colorPickerbtn.addEventListener('click',activateEyeDropper);    
    clearAll.addEventListener('click',clearAllColors)
    showColors();