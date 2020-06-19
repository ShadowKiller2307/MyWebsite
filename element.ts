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
    constructor(x: number, y: number, color: string, angle?: number, rotation?: number, friction?: number, rotationFriction?: number) {
        this.position = new vector(x, y)
        this.velocity = new vector(0, 0);
        this.color = color;
        this.rotation = rotation || 0;
        this.angle = angle || 0;
        this.friction = friction || 0.93;
        this.rotationFriction = rotationFriction || 0.95;
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

    add_Position(value: vector) {
        this.position.add(value);
        this.children.forEach(element => {
            element.add_Position(value);
        });
    }
}

class car extends element {
    position: vector;
    width: number;
    height: number;
    speed: number;
    collisionBox: circle | rectangle;
    drawCollisionBox: boolean;
    children: Array<element>;
    constructor(x: number, y: number, width: number, height: number, angle?: number, rotation?: number, friction?: number, rotationFriction?: number) {
        super(x, y, undefined, angle, rotation, friction, rotationFriction);
        this.width = width;
        this.height = height;
        this.collisionBox = new rectangle(x, y, width, height, "rgba(0,0,0,0)");
        this.drawCollisionBox = false;
        this.children = [];
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
    }

    draw(carImg: HTMLImageElement) {
        if (this.collisionBox.collision && settings.collisionStop) {
            this.velocity = new vector(0, 0);
        }
        context.save();
        context.translate(this.position.x, this.position.y);
        context.rotate(this.angle);
        context.drawImage(carImg, -(this.width / 2), -(this.height / 2), this.width, this.height);
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
    position: vector;
    collision: boolean;
    radius: number
    children: Array<element>;
    constructor(x: number, y: number, color?: string, angle?: number, rotation?: number, friction?: number, rotationFriction?: number) {
        super(x, y, color || "black", angle, rotation, friction, rotationFriction);
        this.collision = false;
        this.radius = 5;
        this.children = [];
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
    position: vector;
    radius: number;
    color: string;
    collision: boolean;
    children: Array<element>;
    constructor(x: number, y: number, radius: number, color?: string, angle?: number, rotation?: number, friction?: number, rotationFriction?: number) {
        super(x, y, color || "deepskyblue", angle, rotation, friction, rotationFriction);
        this.radius = radius;
        this.children = [];
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

class rectangle extends element {
    position: vector;
    width: number;
    height: number;
    color: string;
    collision: boolean;
    drawPoints: boolean;
    children: Array<element>;
    constructor(x: number, y: number, width: number, height: number, color?: string, angle?: number, rotation?: number, friction?: number, rotationFriction?: number) {
        super(x, y, color || "forestgreen", angle, rotation, friction, rotationFriction);
        this.width = width;
        this.height = height;
        this.drawPoints = false;
        this.children = [];
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
            new point(Math.cos(this.angle) * ((this.position.x - this.width / 2) - this.position.x) - Math.sin(this.angle) * ((this.position.y - this.height / 2) - this.position.y) + this.position.x,
                Math.sin(this.angle) * ((this.position.x - this.width / 2) - this.position.x) + Math.cos(this.angle) * ((this.position.y - this.height / 2) - this.position.y) + this.position.y).draw(context);

            new point(Math.cos(this.angle) * ((this.position.x + this.width / 2) - this.position.x) - Math.sin(this.angle) * ((this.position.y - this.height / 2) - this.position.y) + this.position.x,
                Math.sin(this.angle) * ((this.position.x + this.width / 2) - this.position.x) + Math.cos(this.angle) * ((this.position.y - this.height / 2) - this.position.y) + this.position.y).draw(context);

            new point(Math.cos(this.angle) * ((this.position.x - this.width / 2) - this.position.x) - Math.sin(this.angle) * ((this.position.y + this.height / 2) - this.position.y) + this.position.x,
                Math.sin(this.angle) * ((this.position.x - this.width / 2) - this.position.x) + Math.cos(this.angle) * ((this.position.y + this.height / 2) - this.position.y) + this.position.y).draw(context);

            new point(Math.cos(this.angle) * ((this.position.x + this.width / 2) - this.position.x) - Math.sin(this.angle) * ((this.position.y + this.height / 2) - this.position.y) + this.position.x,
                Math.sin(this.angle) * ((this.position.x + this.width / 2) - this.position.x) + Math.cos(this.angle) * ((this.position.y + this.height / 2) - this.position.y) + this.position.y).draw(context);

        }
    }
}

class line extends element {
    position: vector;
}