var vector = /** @class */ (function () {
    function vector(x, y) {
        this.x = x;
        this.y = y;
    }
    vector.prototype.add = function (vec) {
        this.x += vec.x;
        this.y += vec.y;
    };
    vector.prototype.add_Return = function (vec) {
        return new vector(this.x + vec.x, this.y + vec.y);
    };
    vector.prototype.subtract = function (vec) {
        this.y -= vec.y;
        this.x -= vec.x;
    };
    vector.prototype.subtract_Return = function (vec) {
        return new vector(this.x - vec.x, this.y - vec.y);
    };
    vector.prototype.multiply = function (value) {
        this.x *= value;
        this.y *= value;
    };
    vector.prototype.multiply_Return = function (value) {
        return new vector(this.x * value, this.y * value);
    };
    vector.prototype.divide = function (value) {
        this.x /= value;
        this.y /= value;
    };
    vector.prototype.divide_Return = function (value) {
        return new vector(this.x / value, this.y / value);
    };
    vector.prototype.get_Length = function () {
        return Math.sqrt(this.x * this.x + this.y * this.y);
    };
    vector.prototype.set_Length = function (length) {
        var angle = this.get_Angle();
        this.x = Math.cos(angle) * length;
        this.y = Math.sin(angle) * length;
    };
    vector.prototype.set_Angle = function (angle) {
        var length = this.get_Length();
        this.x = Math.cos(angle) * length;
        this.y = Math.sin(angle) * length;
    };
    vector.prototype.get_Angle = function () {
        return Math.atan2(this.y, this.x);
    };
    vector.prototype.setX = function (x) {
        this.x = x;
    };
    vector.prototype.getX = function () {
        return this.x;
    };
    vector.prototype.setY = function (y) {
        this.y = y;
    };
    vector.prototype.getY = function () {
        return this.y;
    };
    return vector;
}());
//# sourceMappingURL=vector.js.map