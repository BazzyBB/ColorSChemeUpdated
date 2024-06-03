const color = document.getElementById("color-box")
const select = document.getElementById("select")
let colorArray = []

document.getElementById("getScheme").addEventListener("click", function(e){
    e.preventDefault()
    fetch(`https://www.thecolorapi.com/scheme?hex=${color.value.substring(1)}&mode=${select.value}`)
        .then(res => res.json())
        .then(data => {
            document.getElementById("main").innerHTML = ""
            colorArray = data.colors.slice(0, 5)
            for (let hex of colorArray) {
                let background = hex.name.closest_named_hex
                document.getElementById("main").innerHTML += `
                <div class="colors-display" style="background-color: ${background}">
                    <p class="color-tag">${background}</p>
                </div>`
            }
            document.querySelectorAll(".colors-display").forEach(item => {
                item.addEventListener("click", function() {
                    const text = this.innerText
                    navigator.clipboard.writeText(text).then(() => {
                        showSnackBar()
                    }).catch(err => {
                        console.error('Failed to copy: ', err)
                    })
                })
            })
        })
})

function showSnackBar() {
    var snackbar = document.getElementById("snackbar");
    snackbar.classList.add("show");
    setTimeout(function() {
        snackbar.classList.remove("show");
    }, 3000);
}