class vector {
    constructor(x, y) {
        this.x = x;
        this.y = y;
        this.type = "vector";
    }
    add(vec) {
        this.x += vec.x;
        this.y += vec.y;
    }
    add_Return(vec) {
        return new vector(this.x + vec.x, this.y + vec.y);
    }
    subtract(vec) {
        this.y -= vec.y;
        this.x -= vec.x;
    }
    subtract_Return(vec) {
        return new vector(this.x - vec.x, this.y - vec.y);
    }
    multiply(value) {
        this.x *= value;
        this.y *= value;
    }
    multiply_Return(value) {
        return new vector(this.x * value, this.y * value);
    }
    divide(value) {
        this.x /= value;
        this.y /= value;
    }
    divide_Return(value) {
        return new vector(this.x / value, this.y / value);
    }
    get_Length() {
        return Math.sqrt(this.x * this.x + this.y * this.y);
    }
    set_Length(length) {
        let angle = this.get_Angle();
        this.x = Math.cos(angle) * length;
        this.y = Math.sin(angle) * length;
    }
    set_Angle(angle) {
        let length = this.get_Length();
        this.x = Math.cos(angle) * length;
        this.y = Math.sin(angle) * length;
    }
    get_Angle() {
        return Math.atan2(this.y, this.x);
    }
}
function fromVectorToVector(v1, v2) {
    return v2.subtract_Return(v1);
}
//# sourceMappingURL=vector.js.map