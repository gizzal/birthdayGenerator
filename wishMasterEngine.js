let wishes =
    [
        {
            code: "microphone",
            description: "Профессиональный микрофон",
        },
        {
            code: "ikea",
            description: "Разрешение на изменение квартиры и бабло на это",
        },
        {
            code: "ticket",
            description: "Билет в любое место",
        },
        {
            code: "laptop",
            description: "Ноутбук для современных потребностей",
        },
        {
            code: "parachute",
            description: "Прыжок с парашютом",
        },
        {
            code: "license",
            description: "Обучение в автошколе"
        },
        {
            code: "vocal",
            description: "Курс вокала",
        },
        {
            code: "makeup",
            description: "Курс мейк-апа",
        },
        {
            code: "studio",
            description: "Набор для видеостудии",
        },
        {
            code: "wine",
            description: "Набор винодельницы и счастливый Илья",
        }
    ]

let storedWishes = []
let imageSet = 1
let pointer = 0

let decision = null

let finalResult = null

let start = () => {
    document.getElementById("startbtn").style.display = "none"
    generateImages(wishes)
}

let checkImageExist = (image_url) => {
    let http = new XMLHttpRequest();
    http.open('HEAD', image_url, false);
    http.send();
    return http.status !== 404;
}

let generateImage = (wish, pointer, id) => {
    let url = `img/${wish[pointer].code + imageSet}.`
    if (checkImageExist(url + "jpg")) {
        document.getElementById(id).src = url + "jpg"
    } else {
        document.getElementById(id).src = url + "png"
    }
}

let generateImages = (wish) => {
    generateImage(wish, pointer, "img1")
    generateImage(wish, pointer + 1, "img2")
}

let storeDecision = (wish, storeWish) => {
    if (decision === "first") {
        storeWish.push(wish[pointer])
    }
    if (decision === "second") {
        storeWish.push(wish[pointer + 1])
    }
}

let storeCustomDecision = (wish, storeWish, customPointer) => {
    storeWish.push(wish[customPointer])
}


let showTheUnicron = () => {
    document.querySelector(".unicron").style.display = "inherit"
}

let hidePictures = () => {
    document.querySelector(".pictures").style.display = "none"
}

let startSets = () => {
    if (decision !== null) {
        storeDecision(wishes, storedWishes)
        pointer = pointer + 2
    }

    if (wishes.length === 1) {
        finalResult = wishes[0].description
        document.getElementById("result").innerHTML = `${finalResult}`
        hidePictures()
        showTheUnicron()
        return
    }

    if (pointer > wishes.length - 2) {
        if (wishes.length % 2 !== 0) {
            storeCustomDecision(wishes, storedWishes, wishes.length - 1)
        }
        imageSet = imageSet + 1
        pointer = 0
        decision = null
        wishes = storedWishes
        storedWishes = []
        console.log(wishes)
        startSets()
    } else {
        generateImages(wishes)
    }

}

let selectWish = (pickedDecision) => {
    decision = pickedDecision
    startSets()
}