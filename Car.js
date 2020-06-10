var canvas = document.getElementById("canvas"), context = canvas.getContext("2d"), height = window.innerHeight, width = window.innerWidth, forward = false, backward = false, turningLeft = false, turningRight = false, myCar, carImg, objectsToDraw = [], order = ["point", "circle", "line", "rectangle"], elementToMove, selectedElement, clickMouseX, clickMouseY, oldMouseX = 0, oldMouseY = 0;
var settings = {
    drawPoints: false,
    collisionStop: true
};
canvas.height = height;
canvas.width = width;
carImg = new Image();
carImg.src = "car.png";
var lol = context.createPattern(carImg, "repeat");
myCar = new car(width / 2, height / 2, 25, 45);
myCar.speed = 0.5;
myCar.collisionBox = new rectangle(myCar.position.x, myCar.position.y, myCar.width, myCar.height);
var c1, r1, r2, anchor, moon, black;
standard();
// eskalation();
function standard() {
    c1 = new circle(300, 500, 30),
        r1 = new rectangle(100, 70, 75, 90),
        r2 = new rectangle(600, 100, 150, 200),
        black = new point(100, 100, "black");
    r2.children.push(c1);
    objectsToDraw.push(c1, r1, r2, black);
}
function eskalation() {
    c1 = new circle(300, 500, 30),
        r1 = new rectangle(100, 70, 75, 90, undefined, undefined, 0.1, undefined, 1),
        r2 = new rectangle(600, 100, 150, 200, undefined, undefined, 0.1, undefined, 1),
        anchor = new point(myCar.position.x, myCar.position.y - 36, undefined, undefined, 0.1, undefined, 1),
        moon = new rectangle(anchor.position.x + 100, anchor.position.y, 20, 20, "LightSlateGrey");
    r2.children.push(c1);
    r1.children.push(r2);
    moon.children.push(r1);
    anchor.children.push(moon);
    myCar.children.push(anchor);
    objectsToDraw.push(c1, r1, r2, anchor, moon);
}
document.onmousedown = function getClick(event) {
    clickMouseX = event.clientX;
    clickMouseY = event.clientY;
    oldMouseX = event.clientX;
    oldMouseY = event.clientY;
    elementToMove = undefined;
    switch (event.button) {
        case 0:
            objectsToDraw.forEach(function (element) {
                var fun = "collide_" + "point_" + element.constructor.name;
                if (element.constructor.name == "point") {
                    fun += "_Radius";
                }
                if (window[fun](new point(clickMouseX, clickMouseY), element)) {
                    elementToMove = element;
                }
            });
            if (!elementToMove) {
                selectedElement = undefined;
            }
            break;
        case 1:
            objectsToDraw.forEach(function (element) {
                var fun = "collide_" + "point_" + element.constructor.name;
                if (window[fun](new point(clickMouseX, clickMouseY), element)) {
                    elementToMove = element;
                }
            });
            elementToMove.angle += Math.PI / 8;
            elementToMove = undefined;
            break;
        default:
            break;
    }
};
document.onmousemove = function moveElement(event) {
    var MouseX = event.clientX;
    var MouseY = event.clientY;
    if (elementToMove && MouseY > 0) {
        var movement = new vector(MouseX - oldMouseX, MouseY - oldMouseY);
        elementToMove.add_Position(movement);
    }
    oldMouseX = MouseX;
    oldMouseY = MouseY;
};
document.onmouseup = function dropElement(event) {
    if (clickMouseX == oldMouseX && clickMouseY == oldMouseY) {
        selectedElement = elementToMove;
    }
    elementToMove = undefined;
};
document.body.addEventListener("keydown", function (event) {
    switch (event.keyCode) {
        case 87: //W
            forward = true;
            break;
        case 65: // A
            turningLeft = true;
            break;
        case 83: //S
            backward = true;
            break;
        case 68: //D
            turningRight = true;
            break;
        case 32: //space
            //shoot(fireMode);
            break;
        case 66: //B
            myCar.velocity.x = 0;
            myCar.velocity.y = 0;
            break;
        case 46:
            remove(selectedElement);
            break;
        default:
            break;
    }
});
document.body.addEventListener("keyup", function (event) {
    switch (event.keyCode) {
        case 87: //up
            forward = false;
            break;
        case 65: // left
            turningLeft = false;
            break;
        case 83: //back
            backward = false;
            break;
        case 68: //right
            turningRight = false;
            break;
        default:
            break;
    }
});
update();
function update() {
    context.clearRect(0, 0, width, height);
    if (forward && !backward) {
        var v = new vector(0, 0);
        v.set_Length(myCar.speed);
        v.set_Angle(myCar.angle + 3 * Math.PI / 2);
        myCar.accelerate(v);
    }
    if (!forward && backward) {
        var v = new vector(0, 0);
        v.set_Length(0.1);
        v.set_Angle(myCar.angle + Math.PI / 2);
        myCar.accelerate(v);
    }
    if (turningLeft && !turningRight) {
        myCar.rotation = -0.03 * Math.PI / 2;
    }
    if (!turningLeft && turningRight) {
        myCar.rotation = 0.03 * Math.PI / 2;
    }
    myCar.update();
    objectsToDraw.forEach(function (element) {
        element.update();
    });
    if (myCar.position.x > width) {
        myCar.position.x = 0;
    }
    if (myCar.position.x < 0) {
        myCar.position.x = width;
    }
    if (myCar.position.y > height) {
        myCar.position.y = 0;
    }
    if (myCar.position.y < 0) {
        myCar.position.y = height;
    }
    update_Collisions();
    //draw the other shapes
    objectsToDraw.forEach(function (thing) {
        if (thing == selectedElement) {
            thing.draw(context, "LawnGreen");
            return;
        }
        else {
            if (thing.collision) {
                thing.draw(context, "red");
                thing.velocity = new vector(0, 0);
            }
            else {
                thing.draw(context);
            }
        }
    });
    //draw the car
    myCar.draw(context, carImg);
    window.requestAnimationFrame(update);
}
function update_Collisions() {
    objectsToDraw.forEach(function (element) {
        element.collision = false;
    });
    myCar.collisionBox.collision = false;
    objectsToDraw.forEach(function (element1) {
        for (var i = objectsToDraw.indexOf(element1) + 1; i < objectsToDraw.length; i++) {
            var order_1 = get_Order(element1, objectsToDraw[i]);
            if (window[order_1.fun](order_1.first, order_1.second, settings.drawPoints)) {
                order_1.first.collision = true;
                order_1.second.collision = true;
            }
        }
        ;
        var name1 = element1.constructor.name, name2 = myCar.collisionBox.constructor;
        if (window["collide_" + name1 + "_" + name2.name](element1, myCar.collisionBox, settings.drawPoints)) { //test with car
            element1.collision = true;
            myCar.collisionBox.collision = true;
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
function remove(obj) {
    objectsToDraw.splice(objectsToDraw.indexOf(obj), 1);
}
//# sourceMappingURL=Car.js.map