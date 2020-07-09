class element {
    position: vector;
    velocity: vector;
    rotation: number;
    angle: number;
    color: string;
    friction: number;
    rotationFriction: number;
    collision: boolean;
    children: Array<element>;
    type: string;
    constructor(x: number = 100, y: number = 100, color: string = "Magenta", angle: number = 0, rotation: number = 0, friction: number = 0.93, rotationFriction: number = 0.95) {
        this.position = new vector(x, y)
        this.velocity = new vector(0, 0);
        this.color = color;
        this.rotation = rotation;
        this.angle = angle;
        this.friction = friction;
        this.rotationFriction = rotationFriction;
        this.children = [];
    }

    update() {
        this.angle += this.rotation;
        if (this.angle < 0) {
            this.angle += 2 * Math.PI;
        } else if (this.angle > 2 * Math.PI) {
            this.angle -= 2 * Math.PI;
        }
        if (this.rotation) {
            this.children.forEach(element => {
                element.angle += this.rotation;
                rotate_e1_around_Pos_e2(element, this, this.rotation);
            });
        }
        this.rotation *= this.rotationFriction;
        if (Math.abs(this.rotation) < 0.001) {
            this.rotation = 0;
        }

        this.velocity.multiply(this.friction);
        if (Math.abs(this.velocity.x) < 0.001) {
            this.velocity.x = 0;
        }
        if (Math.abs(this.velocity.y) < 0.001) {
            this.velocity.y = 0;
        }
        this.position.add(this.velocity);

        if (this.position.x > width) {
            this.position.x = 0;
        }
        if (this.position.x < 0) {
            this.position.x = width;
        }
        if (this.position.y > height) {
            this.position.y = 0;
        }
        if (this.position.y < 0) {
            this.position.y = height;
        }
    }

    accelerate(value: vector) {
        this.velocity.add(value);
        this.children.forEach(element => {
            element.accelerate(value);
        });
    }

    add_Position(value: vector): vector {
        this.position.add(value);
        this.children.forEach(element => {
            element.add_Position(value);
        });
        return this.position;
    }

    trigger(obj) {

    }

    draw(color?: string) {
    }
}

class car extends element {
    width: number;
    height: number;
    speed: number;
    maxBoost: number;
    currentBoost: number;
    boosting: boolean;
    collisionBox: circle | rectangle;
    drawCollisionBox: boolean;
    carImg: HTMLImageElement;
    constructor(x: number, y: number, width: number, height: number, angle?: number, rotation?: number, friction?: number, rotationFriction?: number, maxBoost: number = 600) {
        super(x, y, undefined, angle, rotation, friction, rotationFriction);
        this.width = width;
        this.height = height;
        this.collisionBox = new rectangle(x, y, width, height, "rgba(0,0,0,0)");
        this.drawCollisionBox = false;
        this.children = [];
        this.maxBoost = maxBoost;
        this.currentBoost = 0;
        this.type = "car";
        this.carImg = new Image();
    }

    update() {
        this.angle += this.rotation;
        this.rotation *= this.rotationFriction;
        if (Math.abs(this.rotation) < 0.001) {
            this.rotation = 0;
        }
        this.children.forEach(element => {
            element.angle += this.rotation;
            rotate_e1_around_Pos_e2(element, this, this.rotation);
        });

        this.velocity.multiply(this.friction);
        if (Math.abs(this.velocity.x) < 0.001) {
            this.velocity.x = 0;
        }
        if (Math.abs(this.velocity.y) < 0.001) {
            this.velocity.y = 0;
        }
        this.position.add(this.velocity);
        this.collisionBox.position = this.position;
        this.collisionBox.angle = this.angle;

        if (this.position.x > width) {
            this.position.x = 0;
        }
        if (this.position.x < 0) {
            this.position.x = width;
        }
        if (this.position.y > height) {
            this.position.y = 0;
        }
        if (this.position.y < 0) {
            this.position.y = height;
        }
    }

    draw() {
        if (this.collisionBox.collision && settings.collisionStop) {
            this.velocity = new vector(0, 0);
        }
        context.save();
        context.translate(this.position.x, this.position.y);
        context.rotate(this.angle);
        if (this.boosting) {
            context.drawImage(fireImg, -(this.width / 2), (this.height / 2) - this.height / 8, this.width, this.height);
        }
        context.drawImage(this.carImg, -(this.width / 2), -(this.height / 2), this.width, this.height);
        context.restore();

        if (this.drawCollisionBox) {
            if (this.collisionBox.collision) {
                this.collisionBox.draw("red");
            } else {
                this.collisionBox.draw();
            }
        }
    }
}

class point extends element {
    radius: number
    constructor(x: number, y: number, color?: string, angle?: number, rotation?: number, friction?: number, rotationFriction?: number) {
        super(x, y, color || "black", angle, rotation, friction, rotationFriction);
        this.collision = false;
        this.radius = 5;
        this.children = [];
        this.type = "point";
    }

    draw(color?: string) {
        context.fillStyle = color || this.color;
        context.save();
        context.translate(this.position.x, this.position.y);
        context.rotate(this.angle);
        context.beginPath();
        context.arc(0, 0, this.radius, 0, 2 * Math.PI);
        context.fill();
        context.restore();
    }
}

class circle extends element {
    radius: number;
    constructor(x: number, y: number, radius: number, color?: string, angle?: number, rotation?: number, friction?: number, rotationFriction?: number) {
        super(x, y, color || "deepskyblue", angle, rotation, friction, rotationFriction);
        this.radius = radius;
        this.children = [];
        this.type = "circle";
    }

    draw(color?: string) {
        context.fillStyle = color || this.color;
        context.save();
        context.translate(this.position.x, this.position.y);
        context.rotate(this.angle);
        context.beginPath();
        context.arc(0, 0, this.radius, 0, 2 * Math.PI);
        context.fill();
        context.restore();
    }
}

class line extends element {
    length: number;
    pos1: point;
    pos2: point;
    drawPoints: boolean;
    constructor(x: number, y: number, length: number, color?: string, angle?: number, rotation?: number, friction?: number, rotationFriction?: number) {
        super(x, y, color || "Coral", angle, rotation, friction, rotationFriction);
        this.length = length;
        this.type = "line";
        this.drawPoints = false;
        this.pos1 = rotate_e1_around_Pos_e2_Return(new point(this.position.x - this.length / 2, this.position.y), this, this.angle);
        this.pos2 = rotate_e1_around_Pos_e2_Return(new point(this.position.x + this.length / 2, this.position.y), this, this.angle);
    }

    update() {
        this.angle += this.rotation;
        if (this.angle < 0) {
            this.angle += 2 * Math.PI;
        } else if (this.angle > 2 * Math.PI) {
            this.angle -= 2 * Math.PI;
        }
        if (this.rotation) {
            this.children.forEach(element => {
                element.angle += this.rotation;
                rotate_e1_around_Pos_e2(element, this, this.rotation);
            });
            this.pos1 = rotate_e1_around_Pos_e2_Return(this.pos1, this, this.rotation);
            this.pos2 = rotate_e1_around_Pos_e2_Return(this.pos2, this, this.rotation);
        }
        this.rotation *= this.rotationFriction;
        if (Math.abs(this.rotation) < 0.001) {
            this.rotation = 0;
        }

        this.velocity.multiply(this.friction);
        if (Math.abs(this.velocity.x) < 0.001) {
            this.velocity.x = 0;
        }
        if (Math.abs(this.velocity.y) < 0.001) {
            this.velocity.y = 0;
        }

        this.pos1.position.add(this.velocity);
        this.pos2.position.add(this.velocity);
        this.pos1.update();
        this.pos2.update();
        this.calculatePositionAndLengthAndAngle();
        if (this.position.x > width) {
            this.position.x = 0;
        }
        if (this.position.x < 0) {
            this.position.x = width;
        }
        if (this.position.y > height) {
            this.position.y = 0;
        }
        if (this.position.y < 0) {
            this.position.y = height;
        }
    }

    add_Position(value: vector, pos1_2?: point): vector {
        if (pos1_2) {
            pos1_2.position.add(value);
        } else {
            this.pos1.position.add(value);
            this.pos2.position.add(value);
            this.pos1.update();
            this.pos2.update();
            this.children.forEach(element => {
                element.add_Position(value);
            });
            return this.position;
        }
    }

    accelerate(value: vector, pos1_2?: point) {
        if (!pos1_2) {
            this.pos1.accelerate(value);
            this.pos2.accelerate(value);
            this.children.forEach(element => {
                element.accelerate(value);
            });
        } else {
            pos1_2.accelerate(value);
        }
    }

    calculatePositionAndLengthAndAngle() {
        this.length = distance_point_point(this.pos1, this.pos2);
        this.position = this.pos1.position.add_Return(fromVectorToVector(this.pos1.position, this.pos2.position).divide_Return(2));
        this.angle = fromVectorToVector(this.pos1.position, this.pos2.position).get_Angle();
    }

    rotateOnce(angle: number) {
        this.pos1 = rotate_e1_around_Pos_e2_Return(this.pos1, this, angle);
        this.pos2 = rotate_e1_around_Pos_e2_Return(this.pos2, this, angle);
    }

    draw(color?: string) {
        context.strokeStyle = color || this.color;
        context.beginPath();
        context.moveTo(this.pos1.position.x, this.pos1.position.y);
        context.lineWidth = 4;
        context.lineTo(this.pos2.position.x, this.pos2.position.y);
        context.stroke();
        if (this.drawPoints) {
            this.pos1.draw("blue");
            this.pos2.draw("blue");
            new point(this.position.x, this.position.y).draw("green");
        }
    }
}

class rectangle extends element {
    width: number;
    height: number;
    drawPoints: boolean;
    constructor(x: number, y: number, width: number, height: number, color?: string, angle?: number, rotation?: number, friction?: number, rotationFriction?: number) {
        super(x, y, color || "forestgreen", angle, rotation, friction, rotationFriction);
        this.width = width;
        this.height = height;
        this.drawPoints = false;
        this.children = [];
        this.type = "rectangle";
    }

    draw(color?: string) {
        context.fillStyle = color || this.color;
        context.save();
        context.translate(this.position.x, this.position.y);
        context.rotate(this.angle);
        context.beginPath();
        context.rect(-this.width / 2, -this.height / 2, this.width, this.height);
        context.fill();
        context.restore();
        if (this.drawPoints) {
            (rotate_e1_around_Pos_e2_Return(new point(this.position.x - this.width / 2, this.position.y - this.height / 2), this, -this.angle) as point).draw("blue");
            (rotate_e1_around_Pos_e2_Return(new point(this.position.x + this.width / 2, this.position.y - this.height / 2), this, -this.angle) as point).draw("blue");
            (rotate_e1_around_Pos_e2_Return(new point(this.position.x + this.width / 2, this.position.y + this.height / 2), this, -this.angle) as point).draw("blue");
            (rotate_e1_around_Pos_e2_Return(new point(this.position.x - this.width / 2, this.position.y + this.height / 2), this, -this.angle) as point).draw("blue");
        }
    }
}