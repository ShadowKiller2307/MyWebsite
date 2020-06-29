const order = ["point", "circle", "line", "rectangle"];
var canvas = document.getElementById("canvas"), [fw1, bw1, tl1, tr1, fw2, bw2, tl2, tr2, fw3, bw3, tl3, tr3] = new Array(12).fill(false);
let context = canvas.getContext("2d"), height = window.innerHeight, width = window.innerWidth, Cars = [], objectsToDraw = [], affectedByGravity = [], elementToMove, lineEndToMove, selectedElement, clickMouseX, clickMouseY, oldMouseX = 0, oldMouseY = 0, map = {
    "vector": vector,
    "point": point,
    "line": line,
    "circle": circle,
    "rectangle": rectangle,
    "car": car
};
let settings = {
    drawPoints: false,
    collisionStop: false,
    drawUpdates: true,
    darkMode: false
}, carColors = {
    "red": "carRed.png",
    "blue": "carBlue.png",
    "cyan": "carCyan.png",
    "green": "carGreen.png",
    "orange": "carOrange.png",
    "purple": "carPurple.png",
    "yellow": "carYellow.png",
};
canvas.height = height;
canvas.width = width;
//let lol = context.createPattern(carImg, "repeat");
let car1, car2, car3;
let c1, r1, r2, anchor, moon, spot, l1;
testing();
function testing() {
    Cars = [];
    objectsToDraw = [];
    spot = new point(100, 100),
        l1 = new line(140, 200, 200);
    settings.drawPoints = true;
    objectsToDraw.push(spot, l1);
}
function standard() {
    Cars = [];
    car1 = new car(width / 2, height / 2, 25, 45);
    car1.speed = 0.5;
    car1.collisionBox = new rectangle(car1.position.x, car1.position.y, car1.width, car1.height);
    car1.carImg.src = getFirstAvailableColor();
    Cars.push(car1);
    objectsToDraw = [];
    settings.drawPoints = false;
    spot = new point(100, 100, "black"),
        c1 = new circle(300, 500, 30),
        r1 = new rectangle(160, 70, 75, 90),
        r2 = new rectangle(600, 100, 150, 200);
    r2.children.push(c1);
    objectsToDraw.push(c1, r1, r2, spot);
}
function demo() {
    Cars = [];
    objectsToDraw = [];
    spot = new point(width / 2, height / 2, "black"),
        c1 = new circle(width / 2 - 200, height / 2, 30),
        r1 = new rectangle(width / 2 + 200, height / 2, 75, 90),
        car1 = new car(width / 2, height / 2 - 100, 25, 45);
    objectsToDraw.push(spot, c1, r1);
    car1.speed = 0.5;
    car1.collisionBox = new rectangle(car1.position.x, car1.position.y, car1.width, car1.height);
    car1.carImg.src = getFirstAvailableColor();
    Cars.push(car1);
}
function eskalation() {
    Cars = [];
    car1 = new car(width / 2, height / 2, 25, 45);
    car1.speed = 0.5;
    car1.collisionBox = new rectangle(car1.position.x, car1.position.y, car1.width, car1.height);
    Cars.push(car1);
    objectsToDraw = [];
    c1 = new circle(300, 500, 30),
        r1 = new rectangle(100, 70, 75, 90, undefined, undefined, 0.1, undefined, 1),
        r2 = new rectangle(600, 100, 150, 200, undefined, undefined, 0.1, undefined, 1),
        anchor = new point(Cars[0].position.x, Cars[0].position.y - 36, undefined, undefined, 0.1, undefined, 1),
        moon = new rectangle(anchor.position.x + 100, anchor.position.y, 20, 20, "LightSlateGrey");
    r2.children.push(c1);
    r1.children.push(r2);
    moon.children.push(r1);
    anchor.children.push(moon);
    Cars[0].children.push(anchor);
    objectsToDraw.push(c1, r1, r2, anchor, moon);
}
function addCar() {
    let carNew = new car(width / 2, height / 2, 25, 45);
    carNew.speed = 0.5;
    carNew.collisionBox = new rectangle(carNew.position.x, carNew.position.y, carNew.width, carNew.height);
    carNew.carImg.src = getFirstAvailableColor();
    Cars.push(carNew);
}
document.onmousedown = event => {
    clickMouseX = event.clientX;
    clickMouseY = event.clientY;
    oldMouseX = event.clientX;
    oldMouseY = event.clientY;
    elementToMove = undefined;
    let clickPoint = new point(clickMouseX, clickMouseY);
    switch (event.button) {
        case 0:
            objectsToDraw.forEach(element => {
                let fun = "collide_point_" + element.constructor.name;
                if (element.constructor.name == "point") {
                    fun += "_Radius";
                }
                if (window[fun](clickPoint, element)) {
                    elementToMove = element;
                    if (element.constructor.name == "line") {
                        if (window["collide_point_point_Radius"](clickPoint, element.pos1)) {
                            lineEndToMove = element.pos1;
                        }
                        else if (window["collide_point_point_Radius"](clickPoint, element.pos2)) {
                            lineEndToMove = element.pos2;
                        }
                    }
                }
            });
            Cars.forEach(element => {
                let fun = "collide_point_" + element.collisionBox.constructor.name;
                if (window[fun](clickPoint, element)) {
                    elementToMove = element;
                }
            });
            if (!elementToMove) {
                selectedElement = undefined;
            }
            break;
        case 1:
            objectsToDraw.forEach(element => {
                let fun = "collide_" + "point_" + element.constructor.name;
                if (window[fun](clickPoint, element)) {
                    elementToMove = element;
                }
            });
            Cars.forEach(element => {
                let fun = "collide_" + "point_" + element.collisionBox.constructor.name;
                if (window[fun](clickPoint, element)) {
                    elementToMove = element;
                }
            });
            if (elementToMove == selectedElement) {
                elementToMove.rotation += Math.PI / 16;
            }
            else {
                if (elementToMove.constructor.name == "line") {
                    elementToMove.rotateOnce(Math.PI / 8);
                }
                else {
                    elementToMove.angle += Math.PI / 8;
                }
            }
            elementToMove = undefined;
            break;
        default:
            break;
    }
};
document.onmousemove = event => {
    let MouseX = event.clientX;
    let MouseY = event.clientY;
    if (elementToMove && MouseY > 0) {
        let movement = new vector(MouseX - oldMouseX, MouseY - oldMouseY);
        if (elementToMove == selectedElement) {
            if (lineEndToMove) {
                elementToMove.accelerate(movement.divide_Return(8), lineEndToMove);
            }
            else {
                elementToMove.accelerate(movement.divide_Return(8));
            }
        }
        else {
            if (lineEndToMove) {
                elementToMove.add_Position(movement, lineEndToMove);
            }
            else {
                elementToMove.add_Position(movement);
            }
        }
    }
    oldMouseX = MouseX;
    oldMouseY = MouseY;
};
document.onmouseup = event => {
    if (clickMouseX == oldMouseX && clickMouseY == oldMouseY && event.button != 1) {
        selectedElement = elementToMove;
    }
    if (event.button != 1) {
        elementToMove = undefined;
        lineEndToMove = undefined;
    }
};
document.body.addEventListener("keydown", event => {
    console.log(event.keyCode);
    switch (event.keyCode) {
        case 87: //W
            fw1 = true;
            break;
        case 65: // A
            tl1 = true;
            break;
        case 83: //S
            bw1 = true;
            break;
        case 68: //D
            tr1 = true;
            break;
        case 37: //left arrow
            tl2 = true;
            break;
        case 38: //top arrow
            fw2 = true;
            break;
        case 39: //right arrow
            tr2 = true;
            break;
        case 40: //down arrow
            bw2 = true;
            break;
        case 100: //NUMpad 4
            tl3 = true;
            break;
        case 104: //NUMpad 8
            fw3 = true;
            break;
        case 102: //NUMpad 6
            tr3 = true;
            break;
        case 101: //NUMpad 5
            bw3 = true;
            break;
        case 32: //space
            //shoot(fireMode);
            break;
        case 66: //B
            for (let car of Cars) {
                car.velocity.x = 0;
                car.velocity.y = 0;
            }
            break;
        case 46: //Delete
            remove();
            break;
        case 76: //L
            document.getElementById("file-input").click();
            break;
        default:
            break;
    }
});
document.body.addEventListener("keyup", event => {
    switch (event.keyCode) {
        case 87: //W
            fw1 = false;
            break;
        case 65: //A
            tl1 = false;
            break;
        case 83: //S
            bw1 = false;
            break;
        case 68: //D
            tr1 = false;
            break;
        case 37: //left arrow
            tl2 = false;
            break;
        case 38: //top arrow
            fw2 = false;
            break;
        case 39: //right arrow
            tr2 = false;
            break;
        case 40: //down arrow
            bw2 = false;
            break;
        case 100: //NUMpad 4
            tl3 = false;
            break;
        case 104: //NUMpad 8
            fw3 = false;
            break;
        case 102: //NUMpad 6
            tr3 = false;
            break;
        case 101: //NUMpad 5
            bw3 = false;
            break;
        default:
            break;
    }
});
function update() {
    if (settings.drawUpdates) {
        context.clearRect(0, 0, width, height);
    }
    if (settings.darkMode) {
        context.fillStyle = "rgba(30, 30, 30)";
        context.rect(0, 0, width, height);
        context.fill();
    }
    for (let i = 0; i < Cars.length; i++) {
        if (window["fw" + (i + 1)] && !window["bw" + (i + 1)]) {
            let v = new vector(0, 0);
            v.set_Length(Cars[i].speed);
            v.set_Angle(Cars[i].angle + 3 * Math.PI / 2);
            Cars[i].accelerate(v);
        }
        else if (!window["fw" + (i + 1)] && window["bw" + (i + 1)]) {
            let v = new vector(0, 0);
            v.set_Length(0.1);
            v.set_Angle(Cars[i].angle + Math.PI / 2);
            Cars[i].accelerate(v);
        }
        if (window["tl" + (i + 1)] && !window["tr" + (i + 1)]) {
            Cars[i].rotation = -0.03 * Math.PI / 2;
        }
        if (!window["tl" + (i + 1)] && window["tr" + (i + 1)]) {
            Cars[i].rotation = 0.03 * Math.PI / 2;
        }
    }
    update_Collisions();
    //update and draw the other shapes
    for (let thing of objectsToDraw) {
        thing.update();
        if (thing == selectedElement) {
            thing.draw("LawnGreen");
        }
        else {
            if (thing.collision) {
                thing.draw("red");
                if (settings.collisionStop) {
                    thing.velocity = new vector(0, 0);
                }
            }
            else {
                thing.draw();
            }
        }
    }
    //update and draw the car(s)
    Cars.forEach((car) => {
        car.update();
        car.draw();
    });
    window.requestAnimationFrame(update);
}
function update_Collisions() {
    objectsToDraw.forEach(element => {
        element.collision = false;
    });
    Cars.forEach(element => {
        element.collisionBox.collision = false;
    });
    objectsToDraw.forEach(testObject => {
        for (let i = objectsToDraw.indexOf(testObject) + 1; i < objectsToDraw.length; i++) {
            let order = get_Order(testObject, objectsToDraw[i]);
            if (window[order.fun](order.first, order.second, settings.drawPoints)) {
                order.first.collision = true;
                order.second.collision = true;
            }
        }
        ;
        for (let testCar of Cars) {
            let name1 = testObject.constructor.name, name2 = testCar.collisionBox.constructor;
            if (window["collide_" + name1 + "_" + name2.name](testObject, testCar.collisionBox, settings.drawPoints)) {
                testObject.collision = true;
                testCar.collisionBox.collision = true;
            }
        }
    });
}
function get_Order(obj1, obj2) {
    if (order.indexOf(obj1.constructor.name) <= order.indexOf(obj2.constructor.name)) {
        return { first: obj1, second: obj2, fun: "collide_" + obj1.constructor.name + "_" + obj2.constructor.name };
    }
    else {
        return { first: obj2, second: obj1, fun: "collide_" + obj2.constructor.name + "_" + obj1.constructor.name };
    }
}
function remove() {
    if (selectedElement) {
        if (objectsToDraw.indexOf(selectedElement) > -1) {
            objectsToDraw.splice(objectsToDraw.indexOf(selectedElement), 1);
        }
        else if (Cars.indexOf(selectedElement) > -1) {
            Cars.splice(Cars.indexOf(selectedElement), 1);
        }
    }
}
function duplicate() {
    if (selectedElement instanceof element) {
        let temp = new map[selectedElement.type]();
        temp.position = selectedElement.position;
        temp.angle = selectedElement.angle;
        temp.rotation = selectedElement.rotation;
        temp.color = selectedElement.color;
        temp.add_Position(new vector(-20, 20));
        objectsToDraw.push(temp);
        return temp;
    }
}
function getFirstAvailableColor() {
    for (let color in carColors) {
        let available = true;
        for (let testCar of Cars) {
            if (testCar.carImg.src.indexOf(carColors[color]) >= 0) {
                available = false;
            }
        }
        if (available) {
            return carColors[color];
        }
    }
    return carColors["red"]; // default if all Colors are taken
}
function save() {
    let element = document.createElement('a');
    let json = JSON.stringify({ "objects": objectsToDraw, "cars": Cars }, undefined, 2);
    element.setAttribute('href', 'data:text/plain;charset=utf-8,' + encodeURIComponent(json));
    element.setAttribute('download', "CarSimulator");
    element.style.display = 'none';
    document.body.appendChild(element);
    element.click();
    document.body.removeChild(element);
}
function load() {
    if (document.getElementById("file-input").files.length == 0) {
        alert("E R R O R : Please select a valid .txt-file");
        return;
    }
    let file = document.getElementById("file-input").files[0];
    var reader = new FileReader();
    reader.onloadend = () => {
        let data;
        try {
            data = JSON.parse(reader.result);
        }
        catch (err) {
            console.error(err);
            alert("E R R O R : Please select a valid .txt-file");
            return;
        }
        function mapping(obj) {
            let objNew = new map[obj.type]();
            if (obj.type == "car") {
                console.log(objNew);
            }
            Object.entries(obj).forEach((keys) => {
                if (keys[1].type == "vector" || keys[1].type == "rectangle" || keys[1].type == "circle") {
                    objNew[keys[0]] = mapping(keys[1]);
                }
                else if (keys[1] instanceof Array) {
                    keys[1].forEach(element => {
                        mapping(element);
                    });
                }
                else {
                    objNew[keys[0]] = keys[1];
                }
            });
            return objNew;
        }
        objectsToDraw = data.objects.map((obj) => mapping(obj));
        Cars = data.cars.map((obj) => mapping(obj));
        for (let giveColor of Cars) {
            giveColor.carImg.src = getFirstAvailableColor();
        }
    };
    reader.addEventListener("error", function () {
        alert("E R R O R : Failed to read file");
    });
    reader.readAsText(file);
}
document.getElementById("file-input").onchange = load;
update();
//# sourceMappingURL=Car.js.map