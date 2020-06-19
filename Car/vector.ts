class vector {
    x: number;
    y: number;
    constructor(x: number, y: number) {
        this.x = x
        this.y = y
    }

    add(vec: vector) {
        this.x += vec.x;
        this.y += vec.y;
    }

    add_Return(vec: vector) {
        return new vector(this.x + vec.x, this.y + vec.y);
    }

    subtract(vec: vector) {
        this.y -= vec.y;
        this.x -= vec.x;
    }

    subtract_Return(vec: vector) {
        return new vector(this.x - vec.x, this.y - vec.y);
    }

    multiply(value: number) {
        this.x *= value;
        this.y *= value;
    }

    multiply_Return(value: number) {
        return new vector(this.x * value, this.y * value);
    }

    divide(value: number) {
        this.x /= value;
        this.y /= value;
    }

    divide_Return(value: number) {
        return new vector(this.x / value, this.y / value);
    }

    get_Length() {
        return Math.sqrt(this.x * this.x + this.y * this.y);
    }

    set_Length(length: number) {
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

    setX(x: number) {
        this.x = x;
    }

    getX() {
        return this.x;
    }

    setY(y: number) {
        this.y = y;
    }

    getY() {
        return this.y;
    }
}