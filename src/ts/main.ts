import Canvas from "./classes/canvas";
import Circle from "./classes/circle";
import {CircleConfig} from "./types";
import Animate from "./classes/animate";
import Constants from "./classes/constants";

class Main {

    constructor() {
    }

    init = () => {
        let random = new Animate(new Canvas({
            id: "random",
            height: Constants.canvas.height,
            width: Constants.canvas.width
        }));
        random.init = () => {
            random.objects = [];
            for (let i = 0; i < 1000; i++) {
                let config: CircleConfig = {
                    canvas: random.c,
                    x: Math.random() * (random.c.width - 4 * 2) + 4,
                    y: Math.random() * (random.c.height - 4 * 2) + 4,
                    dx: (Math.random() - 0.5) * 10,
                    dy: (Math.random() - 0.5) * 10,
                    r: Math.random() * 3 + 1,
                    updateFunction: "random"
                }
                random.objects.push(new Circle(config));
            }
        }
        random.start();

        let gravity = new Animate(new Canvas({
            id: "gravity",
            height: Constants.canvas.height,
            width: Constants.canvas.width
        }));
        gravity.init = () => {
            gravity.objects = [];
            for (let i = 0; i < 100; i++) {
                let config: CircleConfig = {
                    canvas: gravity.c,
                    x: Math.random() * (gravity.c.width - 30 * 2) + 30,
                    y: Math.random() * (gravity.c.height - 30 * 2) + 30,
                    dx: (Math.random() - 0.5) * 5,
                    dy: 10,
                    r: 10 + (Math.random()) * 20,
                    gravity: 5,
                    friction: 0.9,
                    updateFunction: "gravity"
                }
                gravity.objects.push(new Circle(config));
            }
        }
        gravity.start();

        let collision = new Animate(new Canvas({
            id: "collision",
            height: Constants.canvas.height,
            width: Constants.canvas.width
        }));
        collision.init = () => {
            collision.objects = [];
            for (let i = 0; i < 100; i++) {
                let r = Math.random() * 5 + 10;
                let config: CircleConfig = {
                    canvas: collision.c,
                    x: Math.random() * (collision.c.width - r * 2) + r,
                    y: Math.random() * (collision.c.height - r * 2) + r,
                    dx: (Math.random() - 0.5) * 20,
                    dy: (Math.random() - 0.5) * 20,
                    r: r,
                    m: Math.random() * 4 + 1,
                    updateFunction: "collision"
                }

                if (i !== 0) {
                    let failSafe = 0;
                    for (let j = 0; j < collision.objects.length; j++) {
                        let obj = collision.objects[j];
                        if (Math.hypot(config.x! - obj.x, config.y! - obj.y) <= obj.r + config.r!) {
                            config = {
                                ...config,
                                x: Math.random() * (collision.c.width - r * 2) + r,
                                y: Math.random() * (collision.c.height - r * 2) + r,
                                dx: (Math.random() - 0.5) * 10,
                                dy: (Math.random() - 0.5) * 10,
                            }
                            j = -1;
                            failSafe += 1;
                            if (failSafe > 100) {
                                break;
                            }
                        }
                    }
                }
                collision.objects.push(new Circle(config));
            }
        }
        collision.start();

        let tbd = new Animate(new Canvas({
            id: "tbd",
            height: Constants.canvas.height,
            width: Constants.canvas.width
        }));
        tbd.init = () => {
            tbd.objects = [];
        }
        tbd.start();
    }

}

let main = new Main();
main.init();

// let resizeId: NodeJS.Timeout;
// window.addEventListener('resize', () => {
//     clearTimeout(resizeId);
//     resizeId = setTimeout(doneResizing, 500);
// });
//
// function doneResizing() {
//     main.init();
// }
