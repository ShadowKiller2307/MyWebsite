var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var element = /** @class */ (function () {
    function element(x, y, angle, rotation, friction, rotationFriction) {
        this.position = new vector(x, y);
        this.velocity = new vector(0, 0);
        this.rotation = rotation || 0;
        this.angle = angle || 0;
        this.friction = friction || 0.93;
        this.rotationFriction = rotationFriction || 0.95;
        this.children = [];
    }
    element.prototype.update = function () {
        var _this = this;
        this.angle += this.rotation;
        if (Math.abs(this.rotation) < 0.001) {
            this.rotation = 0;
        }
        this.children.forEach(function (element) {
            element.angle += _this.rotation;
            rotate_e1_around_Pos_e2(element, _this, _this.rotation);
        });
        this.rotation *= this.rotationFriction;
        this.velocity.multiply(this.friction);
        if (Math.abs(this.velocity.x) < 0.001) {
            this.velocity.x = 0;
        }
        if (Math.abs(this.velocity.y) < 0.001) {
            this.velocity.y = 0;
        }
        this.position.add(this.velocity);
    };
    element.prototype.accelerate = function (value) {
        this.velocity.add(value);
        this.children.forEach(function (element) {
            element.accelerate(value);
        });
    };
    element.prototype.add_Position = function (value) {
        this.position.add(value);
        this.children.forEach(function (element) {
            element.add_Position(value);
        });
    };
    return element;
}());
var car = /** @class */ (function (_super) {
    __extends(car, _super);
    function car(x, y, width, height, angle, rotation, friction, rotationFriction) {
        var _this = _super.call(this, x, y, angle, rotation, friction, rotationFriction) || this;
        _this.width = width;
        _this.height = height;
        _this.collisionBox = new rectangle(x, y, width, height, "rgba(0,0,0,0)");
        _this.drawCollisionBox = false;
        _this.children = [];
        return _this;
    }
    car.prototype.update = function () {
        var _this = this;
        this.angle += this.rotation;
        this.rotation *= this.rotationFriction;
        if (Math.abs(this.rotation) < 0.001) {
            this.rotation = 0;
        }
        this.children.forEach(function (element) {
            element.angle += _this.rotation;
            rotate_e1_around_Pos_e2(element, _this, _this.rotation);
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
    };
    car.prototype.draw = function (context, carImg) {
        if (this.collisionBox.collision) {
            this.velocity = new vector(0, 0);
        }
        context.save();
        context.translate(this.position.x, this.position.y);
        context.rotate(this.angle);
        context.drawImage(carImg, -(this.width / 2), -(this.height / 2), this.width, this.height);
        context.restore();
        if (this.drawCollisionBox) {
            if (this.collisionBox.collision) {
                this.collisionBox.draw(context, "red");
            }
            else {
                this.collisionBox.draw(context);
            }
        }
    };
    return car;
}(element));
var point = /** @class */ (function (_super) {
    __extends(point, _super);
    function point(x, y, color, angle, rotation, friction, rotationFriction) {
        var _this = _super.call(this, x, y, angle, rotation, friction, rotationFriction) || this;
        _this.collision = false;
        _this.color = color || "black";
        _this.radius = 5;
        _this.children = [];
        return _this;
    }
    point.prototype.draw = function (context, color) {
        context.fillStyle = color || this.color;
        context.save();
        context.translate(this.position.x, this.position.y);
        context.rotate(this.angle);
        context.beginPath();
        context.arc(0, 0, this.radius, 0, 2 * Math.PI);
        context.fill();
        context.restore();
    };
    return point;
}(element));
var circle = /** @class */ (function (_super) {
    __extends(circle, _super);
    function circle(x, y, radius, color, angle, rotation, friction, rotationFriction) {
        var _this = _super.call(this, x, y, angle, rotation, friction, rotationFriction) || this;
        _this.radius = radius;
        _this.color = color || "deepskyblue";
        _this.children = [];
        return _this;
    }
    circle.prototype.draw = function (context, color) {
        context.fillStyle = color || this.color;
        context.save();
        context.translate(this.position.x, this.position.y);
        context.rotate(this.angle);
        context.beginPath();
        context.arc(0, 0, this.radius, 0, 2 * Math.PI);
        context.fill();
        context.restore();
    };
    return circle;
}(element));
var rectangle = /** @class */ (function (_super) {
    __extends(rectangle, _super);
    function rectangle(x, y, width, height, color, angle, rotation, friction, rotationFriction) {
        var _this = _super.call(this, x, y, angle, rotation, friction, rotationFriction) || this;
        _this.width = width;
        _this.height = height;
        _this.color = color || "forestgreen";
        _this.drawPoints = false;
        _this.children = [];
        return _this;
    }
    rectangle.prototype.draw = function (context, color) {
        context.fillStyle = color || this.color;
        context.save();
        context.translate(this.position.x, this.position.y);
        context.rotate(this.angle);
        context.beginPath();
        context.rect(-this.width / 2, -this.height / 2, this.width, this.height);
        context.fill();
        context.restore();
        if (this.drawPoints) {
            new point(Math.cos(this.angle) * ((this.position.x - this.width / 2) - this.position.x) - Math.sin(this.angle) * ((this.position.y - this.height / 2) - this.position.y) + this.position.x, Math.sin(this.angle) * ((this.position.x - this.width / 2) - this.position.x) + Math.cos(this.angle) * ((this.position.y - this.height / 2) - this.position.y) + this.position.y).draw(context);
            new point(Math.cos(this.angle) * ((this.position.x + this.width / 2) - this.position.x) - Math.sin(this.angle) * ((this.position.y - this.height / 2) - this.position.y) + this.position.x, Math.sin(this.angle) * ((this.position.x + this.width / 2) - this.position.x) + Math.cos(this.angle) * ((this.position.y - this.height / 2) - this.position.y) + this.position.y).draw(context);
            new point(Math.cos(this.angle) * ((this.position.x - this.width / 2) - this.position.x) - Math.sin(this.angle) * ((this.position.y + this.height / 2) - this.position.y) + this.position.x, Math.sin(this.angle) * ((this.position.x - this.width / 2) - this.position.x) + Math.cos(this.angle) * ((this.position.y + this.height / 2) - this.position.y) + this.position.y).draw(context);
            new point(Math.cos(this.angle) * ((this.position.x + this.width / 2) - this.position.x) - Math.sin(this.angle) * ((this.position.y + this.height / 2) - this.position.y) + this.position.x, Math.sin(this.angle) * ((this.position.x + this.width / 2) - this.position.x) + Math.cos(this.angle) * ((this.position.y + this.height / 2) - this.position.y) + this.position.y).draw(context);
        }
    };
    return rectangle;
}(element));
var line = /** @class */ (function (_super) {
    __extends(line, _super);
    function line() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    return line;
}(element));
//# sourceMappingURL=element.js.map