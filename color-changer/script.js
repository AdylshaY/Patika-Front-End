const setBg = () => {
    const randomColor = Math.floor(Math.random() * 16777215).toString(16);
    document.body.style.backgroundColor = "#" + randomColor;
    colorName.innerHTML = "Current Color: #" + randomColor;
}

bgChanger.addEventListener("click", setBg);
setBg();