//distance between two points
function distance_point_point(p1: point, p2: point): number {
    return Math.sqrt(Math.pow(p1.position.x - p2.position.x, 2) + Math.pow(p1.position.y - p2.position.y, 2))
}

function distance_position_position(p1: vector, p2: vector): number {
    return Math.sqrt(Math.pow(p1.x - p2.x, 2) + Math.pow(p1.y - p2.y, 2))
}


//tests if two objects collide
function collide_point_point(p1: point, p2: point): boolean {
    if (p1.position.x == p2.position.x && p1.position.y == p2.position.y) {
        return true;
    }
    return false;
}

function collide_point_point_Radius(p1: point, p2: point): boolean {
    if (distance_point_point(p1, p2) < 5) {
        return true;
    }
    return false;
}

function collide_point_circle(p1: point, c1: circle): boolean {
    if (distance_point_point(p1, new point(c1.position.x, c1.position.y)) <= c1.radius) {
        return true;
    }
    return false;
}

function collide_point_line(p1: point, l1: line, drawPoints?: boolean) {
    let buffer = 2.5;
    if (l1.length == 0) return distance_point_point(p1, l1.pos1) < buffer;
    var t = ((p1.position.x - l1.pos1.position.x) * (l1.pos2.position.x - l1.pos1.position.x) + (p1.position.y - l1.pos1.position.y) * (l1.pos2.position.y - l1.pos1.position.y)) / Math.pow(l1.length, 2);
    t = Math.max(0, Math.min(1, t));
    let shortestPoint = new point(l1.pos1.position.x + t * (l1.pos2.position.x - l1.pos1.position.x), l1.pos1.position.y + t * (l1.pos2.position.y - l1.pos1.position.y));
    if (drawPoints) {
        //shortestPoint.draw("blue");
    }
    return Math.sqrt(distance_position_position(p1.position, shortestPoint.position)) < buffer;
}

function collide_point_rectangle(p1: point, r1: rectangle, drawPoints?: boolean): boolean {
    let angle = r1.angle;
    let p1X = Math.cos(-angle) * (p1.position.x - r1.position.x) - Math.sin(-angle) * (p1.position.y - r1.position.y) + r1.position.x;
    let p1Y = Math.sin(-angle) * (p1.position.x - r1.position.x) + Math.cos(-angle) * (p1.position.y - r1.position.y) + r1.position.y;

    if (drawPoints) {
        let compareX: number,
            compareY: number;

        if (p1X < r1.position.x - r1.width / 2) {
            compareX = r1.position.x - r1.width / 2;
        } else if (p1X > r1.position.x + r1.width / 2) {
            compareX = r1.position.x + r1.width / 2;
        } else {
            compareX = p1X;
        }

        if (p1Y < r1.position.y - r1.height / 2) {
            compareY = r1.position.y - r1.height / 2;
        } else if (p1Y > r1.position.y + r1.height / 2) {
            compareY = r1.position.y + r1.height / 2;
        } else {
            compareY = p1Y;
        }

        let shortestPoint = new point(compareX, compareY);
        shortestPoint = rotate_e1_around_Pos_e2_Return(shortestPoint, r1, r1.angle);
        //shortestPoint.draw("blue");
    }

    if (p1X >= r1.position.x - r1.width / 2 && //right of the left edge
        p1X <= r1.position.x + r1.width / 2 && //left of the right edge
        p1Y >= r1.position.y - r1.height / 2 &&//below the top
        p1Y <= r1.position.y + r1.height / 2   //above the bottom
    ) {
        return true;
    }
    return false;
}

function collide_circle_circle(c1: circle, c2: circle): boolean {
    let dis = distance_position_position(c1.position, c2.position);
    if (dis <= c1.radius + c2.radius) {
        return true;
    }
    return false;
}

function collide_circle_line() {

}

function collide_circle_rectangle(c1: circle, r1: rectangle, drawPoints?: boolean): boolean {
    let angle = r1.angle,
        c1X = Math.cos(-angle) * (c1.position.x - r1.position.x) - Math.sin(-angle) * (c1.position.y - r1.position.y) + r1.position.x,
        c1Y = Math.sin(-angle) * (c1.position.x - r1.position.x) + Math.cos(-angle) * (c1.position.y - r1.position.y) + r1.position.y,
        compareX: number,
        compareY: number;

    if (c1X < r1.position.x - r1.width / 2) {
        compareX = r1.position.x - r1.width / 2;
    } else if (c1X > r1.position.x + r1.width / 2) {
        compareX = r1.position.x + r1.width / 2;
    } else {
        compareX = c1X;
    }

    if (c1Y < r1.position.y - r1.height / 2) {
        compareY = r1.position.y - r1.height / 2;
    } else if (c1Y > r1.position.y + r1.height / 2) {
        compareY = r1.position.y + r1.height / 2;
    } else {
        compareY = c1Y;
    }

    let shortestPoint = new point(compareX, compareY);
    shortestPoint = rotate_e1_around_Pos_e2_Return(shortestPoint, r1, r1.angle);
    if (drawPoints) {
        //shortestPoint.draw("blue");
    }

    if (distance_position_position(new vector(c1.position.x, c1.position.y), shortestPoint.position) <= c1.radius) {
        return true;
    }
    return false;
}

function collide_line_line() {

}

function collide_line_rectangle() {

}

function collide_rectangle_rectangle(r1: rectangle, r2: rectangle, drawPoints?: boolean): boolean {
    if (collide_point_rectangle(rotate_e1_around_Pos_e2_Return(rotate_e1_around_Pos_e2_Return(new point(r2.position.x + r2.width / 2, r2.position.y + r2.height / 2), r2, -r2.angle), r1, -r1.angle), r1, drawPoints) ||
        collide_point_rectangle(rotate_e1_around_Pos_e2_Return(rotate_e1_around_Pos_e2_Return(new point(r2.position.x + r2.width / 2, r2.position.y - r2.height / 2), r2, -r2.angle), r1, -r1.angle), r1, drawPoints) ||
        collide_point_rectangle(rotate_e1_around_Pos_e2_Return(rotate_e1_around_Pos_e2_Return(new point(r2.position.x - r2.width / 2, r2.position.y + r2.height / 2), r2, -r2.angle), r1, -r1.angle), r1, drawPoints) ||
        collide_point_rectangle(rotate_e1_around_Pos_e2_Return(rotate_e1_around_Pos_e2_Return(new point(r2.position.x - r2.width / 2, r2.position.y - r2.height / 2), r2, -r2.angle), r1, -r1.angle), r1, drawPoints) ||

        collide_point_rectangle(rotate_e1_around_Pos_e2_Return(rotate_e1_around_Pos_e2_Return(new point(r1.position.x + r1.width / 2, r1.position.y + r1.height / 2), r1, -r1.angle), r2, -r2.angle), r2, drawPoints) ||
        collide_point_rectangle(rotate_e1_around_Pos_e2_Return(rotate_e1_around_Pos_e2_Return(new point(r1.position.x + r1.width / 2, r1.position.y - r1.height / 2), r1, -r1.angle), r2, -r2.angle), r2, drawPoints) ||
        collide_point_rectangle(rotate_e1_around_Pos_e2_Return(rotate_e1_around_Pos_e2_Return(new point(r1.position.x - r1.width / 2, r1.position.y + r1.height / 2), r1, -r1.angle), r2, -r2.angle), r2, drawPoints) ||
        collide_point_rectangle(rotate_e1_around_Pos_e2_Return(rotate_e1_around_Pos_e2_Return(new point(r1.position.x - r1.width / 2, r1.position.y - r1.height / 2), r1, -r1.angle), r2, -r2.angle), r2, drawPoints)
    ) {
        return true;
    }
    /*
        if (r1.position.x + r1.width / 2 >= r2.position.x - r2.width / 2 &&  //right edge r1 right from left edge r2
            r1.position.x - r1.width / 2 <= r2.position.x + r2.width / 2 &&  //left edge r1 left from right edge r2
            r1.position.y + r1.height / 2 >= r2.position.y - r2.height / 2 &&//bottom edge r1 below top edge r2
            r1.position.y - r1.height / 2 <= r2.position.y + r2.height / 2   //top edge r1 above bottom edge r2
        ) {
            return true;
        }*/
    return false;
}

//other stuff (utils for the utils so to say)
function rotate_e1_around_Pos_e2(e1: element, e2: element, angle: number): void {
    let c1X = Math.cos(angle) * (e1.position.x - e2.position.x) - Math.sin(angle) * (e1.position.y - e2.position.y) + e2.position.x;
    let c1Y = Math.sin(angle) * (e1.position.x - e2.position.x) + Math.cos(angle) * (e1.position.y - e2.position.y) + e2.position.y;
    e1.add_Position(new vector(c1X - e1.position.x, c1Y - e1.position.y));
}

function rotate_e1_around_Pos_e2_Return(e1: element, e2: element, angle: number) {
    let c1X = Math.cos(angle) * (e1.position.x - e2.position.x) - Math.sin(angle) * (e1.position.y - e2.position.y) + e2.position.x;
    let c1Y = Math.sin(angle) * (e1.position.x - e2.position.x) + Math.cos(angle) * (e1.position.y - e2.position.y) + e2.position.y;
    let object: any = e1;
    object.position.x = c1X;
    object.position.y = c1Y;
    return object;
}

function shortestPoint() { //TODO

}